// Create the main myMSALObj instance
import { handleError } from '../commonFunction';
import { msalConfig, loginRequest } from './authConfig';
import * as msal from '@azure/msal-browser';
import { msGraphAPI, clientIds } from './graphConfig';
import { EventType } from '@azure/msal-browser';
import { Literal } from '../../util/constant';

import logger from 'loglevel';
import { isMatch } from 'lodash';

// configuration parameters are located at authConfig.js
export const oMSAL = new msal.PublicClientApplication(msalConfig);
var graph = require('@microsoft/microsoft-graph-client');

const AuthHandling = {
  REDIRECT: 'redirect',
  POPUP: 'popup',
};

let authHandling = AuthHandling.POPUP;
let localAccountId = '';
let accounts = oMSAL.getAllAccounts();

// Account selection logic is app dependent. Adjust as needed for different use cases.
if (accounts.length > 0) {
  const isMatched = false;
  const username = JSON.parse(sessionStorage[Literal.AUTH_STOREGE_KEY])
    .principal.id.preferred_username;
  for (var index = 0; index < accounts.length; ++index) {
    if (accounts[index].username === username) {
      oMSAL.setActiveAccount(accounts[index]);
      isMatch = true;
    }
  }
  if (!isMatched) {
    logger.debug(
      'MSAL: No matching username found used for AteduSSO. Defaulting to 0.',
    );
    oMSAL.setActiveAccount(accounts[0]);
  }
}

oMSAL.addEventCallback(event => {
  logger.debug('MSAL: New acount-selection routine called.');
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account;
    oMSAL.setActiveAccount(account);
  }
});

export async function selectAccount() {
  /**
   * See here for more info on account retrieval:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
   */
  logger.debug('MSAL: Old account-selection routine called.');
  const currentAccounts = await oMSAL.getAllAccounts();
  if (currentAccounts.length === 0) {
    return;
  } else if (currentAccounts.length > 1) {
    logger.debug('MSAL: Multiple accounts detected.');
    handleError('Multiple accounts detected.');
    const username = JSON.parse(sessionStorage[Literal.AUTH_STOREGE_KEY])
      .principal.id.preferred_username;
    for (var index = 0; index < currentAccounts.length; ++index) {
      if (currentAccounts[index].username === username) {
        localAccountId = currentAccounts[index].localAccountId;
        return currentAccounts[index];
      }
    }
    logger.debug(
      'MSAL: No matching username found used for AteduSSO. Defaulting to 0.',
    );
    localAccountId = currentAccounts[0].localAccountId;
    return currentAccounts[0];
  } else if (currentAccounts.length === 1) {
    localAccountId = currentAccounts[0].localAccountId;
    return currentAccounts[0];
  }
}

export async function handleResponse(response, callback) {
  /**
   * To see the full list of response object properties, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
   */
  if (response !== null) {
    localAccountId = response.account.localAccountId;
    if (callback) {
      callback(response.account);
    }
  } else {
    var selectedAccount = await selectAccount();
    if (callback) {
      callback(selectedAccount);
    }
  }
}

export async function signIn(token) {
  /**
   * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
   */
  switch (authHandling) {
    case AuthHandling.POPUP:
      await oMSAL
        .loginPopup(loginRequest)
        .then(await handleResponse)
        .catch(error => {
          handleError(error);
        });
      break;
    case AuthHandling.REDIRECT:
      /**
       * Throws: interaction_in_progress: Interaction is currently in progress. Please ensure that this interaction has been completed before calling an interactive API
       * https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/3007
       * BUG
       * PEr checking, 06.22.2021, the same issue still exists.
       **/
      //await oMSAL.loginRedirect(loginRequest)
      //    .then(await handleResponse)
      //    .catch(error => {
      //        handleError(error);
      //    });
      await oMSAL
        .handleRedirectPromise()
        .then(authResult => {
          const account = oMSAL.getActiveAccount();
          if (!account) {
            oMSAL.loginRedirect(loginRequest);
          }
        })
        .catch(error => {
          console.log(error);
          handleError(error);
        });
      break;
    default:
      break;
  }
}

export async function signOut() {
  /**
   * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
   */
  // Choose which account to logout from by passing a username.
  const logoutRequest = {
    account: await oMSAL.getAccountByLocalId(localAccountId),
  };
  await oMSAL.logout(logoutRequest);

  logger.info('MSAL: Sign-out');
}

export async function getGraphAccessToken(request) {
  /**
   * See here for more info on account retrieval:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
   */
  request.account = await oMSAL.getAccountByLocalId(localAccountId);
  return await oMSAL.acquireTokenSilent(request).catch(error => {
    logger.warn(
      `MSAL: Silent-Token acquisition failed. Acquiring a token using ${authHandling}`,
    );
    if (error instanceof msal.InteractionRequiredAuthError) {
      // fallback to interaction when silent call fails
      switch (authHandling) {
        case AuthHandling.POPUP:
          return oMSAL
            .acquireTokenPopup(request)
            .then(tokenResponse => {
              logger.debug(tokenResponse);
              return tokenResponse;
            })
            .catch(error => {
              handleError(error);
            });
        case AuthHandling.REDIRECT:
          return oMSAL
            .acquireTokenRedirect(request)
            .then(tokenResponse => {
              logger.debug(tokenResponse);
              return tokenResponse;
            })
            .catch(error => {
              handleError(error);
            });
        default:
          break;
      }
    } else {
      handleError(error);
    }
  });
}

export async function getGraphClient(request) {
  const client = graph.Client.init({
    baseUrl: msGraphAPI.Endpoint,
    defaultVersion: msGraphAPI.Version,
    authProvider: async done => {
      const response = await getGraphAccessToken(request);
      done(null, response?.accessToken);
    },
  });
  return client;
}

export async function getPreferredUsername() {
  const account = await oMSAL.getAccountByLocalId(localAccountId);
  return account.idTokenClaims.preferred_username;
}

export async function getBetaClient(request) {
  const client = graph.Client.init({
    baseUrl: msGraphAPI.BetaEndpoint,
    authProvider: async done => {
      const response = await getGraphAccessToken(request);
      done(null, response?.accessToken);
    },
  });
  return client;
}

export async function getMSALAccessTokenForDownstreamApi() {
  var request = {
    scopes: [`api://${clientIds.WebApi}/.default`],
    forceRefresh: false,
  };
  const response = await getGraphAccessToken(request);
  return response.accessToken;
}

export async function getMSALAccessToken() {
  const response = await getGraphAccessToken(loginRequest);
  return response.accessToken;
}

export async function getMSALIdToken() {
  const response = await getGraphAccessToken(loginRequest);
  return response.idToken;
}
