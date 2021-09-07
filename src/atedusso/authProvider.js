import React, { useEffect, useRef } from 'react';
import { useAuthentication } from '../util/context/authentication';
import { useStore } from '../store/store';
import { signOut } from '../util/msgraph/authHandler';
import { handleError } from '../util/commonFunction';
import logger from 'loglevel';
import {
  setMSALLoggingLevel,
  setPreferredUsername,
} from '../util/msgraph/authConfig';
import apiGet from '../services/apiGet';
import apiAccount, { useAxiosLoader } from '../services/apiAccount';
import { v4 as uuidv4 } from 'uuid';

export default function AuthProvider({ atedusso: iam, children }) {
  const apiAccountError = useAxiosLoader();

  const ateduSSO = useRef();
  const [data, dispatch] = useStore();
  // eslint-disable-next-line
  const { login, logout, principal } = useAuthentication();

  useEffect(() => {
    if (data.userExternalId != null) {
      apiGet
        .get(
          `/api/school/${encodeURIComponent(
            data.userProfile.school,
            )}/userExternal/${data.userExternalId}?clientId=${
              data.userExternalUnique
          }`,
        )
        .then(response => {})
        .catch(error => {
          handleError(error);
          ateduSSO.current.logout();
        })
        .then(() => {
          // always executed
        });
    }
  }, [data.userExternalId]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    async function authenticate() {
      ateduSSO.current = iam;
      ateduSSO.current.onReady = async authenticated => {
        if (ateduSSO.current.authenticated) {
          logger.info('Authenticated');
          const authdata = {
            id: ateduSSO.current.idTokenParsed,
            accessToken: ateduSSO.current.token,
            logging_level:
              ateduSSO.current.idTokenParsed.logging_level ?? undefined,
          };

          if (authdata.logging_level !== undefined) {
            await logger.setLevel(authdata.logging_level);
            setMSALLoggingLevel(logger.getLevel());
            logger.info(`Logging level: ${authdata.logging_level}`);
          }

          let activation_code = undefined;
          const paths = window.location.pathname.split('/');
          paths.forEach(async (element, index) => {
            if (
              element === 'account-activation' &&
              paths[index + 1] !== undefined
            ) {
              activation_code = paths[index + 1];
              return;
            }
          });

          if (activation_code === undefined) {
            if (
              ateduSSO.current.idTokenParsed.hasOwnProperty('activation_code')
            ) {
              activation_code = ateduSSO.current.idTokenParsed.activation_code;
            }
          }

          if (activation_code !== undefined && activation_code !== '') {
            logger.info(
              `Attempting to activate ${ateduSSO.current.idTokenParsed.sub} with ${activation_code}`,
            );
            const activationResponse = await activateAccount(
              activation_code,
              ateduSSO.current.token,
            );
            if (activationResponse !== undefined) {
              if (activationResponse === 202) {
                await setPreferredUsername(
                  ateduSSO.current.tokenParsed.preferred_username,
                  { domain_hint: 'organizations' },
                );
                await login(authdata);
                // **  !!!Switch the two when using NemID Production!!! ** //
                // dispatch("UPDATE_EXTERNALID", ateduSSO.current.idTokenParsed.sub);
                await dispatch(
                  'UPDATE_EXTERNALID',
                  ateduSSO.current.idTokenParsed.sub ===
                    '069f697a-21f4-4c15-8af1-58ea711615e7'
                    ? 'ccab7c9d-ef54-42be-a0e2-8e7c86b68c24'
                    : ateduSSO.current.idTokenParsed.sub,
                );
                window.location.replace(window.location.origin);
              } else if (activationResponse === 404) {
                logger.warn(`${activation_code} is invalid`);
                ateduSSO.current.logout();
              }
            } else {
              logger.warn(
                `Activation of ${ateduSSO.current.idTokenParsed.sub} failed`,
              );
              ateduSSO.current.logout();
            }
          } else {
            await setPreferredUsername(
              ateduSSO.current.tokenParsed.preferred_username,
              { domain_hint: 'organizations' },
            );
            await login(authdata);
            // **  !!!Switch the two when using NemID Production!!! ** //
            // dispatch("UPDATE_EXTERNALID", ateduSSO.current.idTokenParsed.sub);
            dispatch(
              'UPDATE_EXTERNALID',
              ateduSSO.current.idTokenParsed.sub ===
                '069f697a-21f4-4c15-8af1-58ea711615e7'
                ? 'ccab7c9d-ef54-42be-a0e2-8e7c86b68c24'
                : ateduSSO.current.idTokenParsed.sub,
            );
          }
        } else {
          logger.info('NOT Authenticated. Redirecting to login.');
          ateduSSO.current.login();
        }
      };
      ateduSSO.current.onAuthSuccess = function () {
        logger.info('Auth Success');
      };
      ateduSSO.current.onAuthError = function () {
        logger.info('Auth Error');
      };
      ateduSSO.current.onAuthRefreshSuccess = function () {
        logger.info('Auth Refresh Success');
      };
      ateduSSO.current.onAuthRefreshError = function () {
        logger.info('Auth Refresh Error');
      };
      ateduSSO.current.onAuthLogout = async function () {
        logger.info('Auth Logout');
        // IF there's an external resource we need to logout from, do it here.
        await signOut();
      };
      ateduSSO.current.onTokenExpired = async function () {
        logger.info('Access token expired.');
        await ateduSSO.current
          .updateToken(5)
          .then(async refreshed => {
            if (refreshed) {
              logger.info('Token was successfully refreshed.');
              const authdata = {
                id: ateduSSO.current.idTokenParsed,
                accessToken: ateduSSO.current.token,
                logging_level: ateduSSO.current.idTokenParsed.logging_level
                  ? ateduSSO.current.idTokenParsed.logging_level
                  : undefined,
              };
              await setPreferredUsername(
                ateduSSO.current.tokenParsed.preferred_username,
                { domain_hint: 'organizations' },
              );
              await login(authdata);
            } else {
              logger.info('Token is still valid.');
            }
          })
          .catch(() => {
            logger.info(
              'Failed to refresh the token, or the session has expired.',
            );
          });
      };
      ateduSSO.current.onActionUpdate = function (status) {
        logger.info('AIA status: ' + status);
      };
    }
    async function activateAccount(activation_code, access_token) {
      return await apiAccount
        .patch(`/api/account-activation/${activation_code}`, null, {
          headers: {
            'Content-Type': 'application/json',
            'X-Correlation-Id': uuidv4(),
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then(async response => {
          return response.status;
        })
        .catch(async error => {
          handleError(error);
          return null;
        });
    }
    authenticate();
  }, [iam]); // eslint-disable-line react-hooks/exhaustive-deps

  return React.Children.only(children);
}
