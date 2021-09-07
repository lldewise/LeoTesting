// For a full list of msal.js configuration parameters, 

import * as msalInstance from "@azure/msal-browser";
import logger from 'loglevel';
import { Endpoints } from '../../environment';
import { clientIds } from './graphConfig';

const ua = window.navigator.userAgent;
const msie = ua.indexOf("MSIE ");
const msie11 = ua.indexOf("Trident/");
const msedge = ua.indexOf("Edge/");
const firefox = ua.indexOf("Firefox");
const isIE = msie > 0 || msie11 > 0;
const isEdge = msedge > 0;
const isFirefox = firefox > 0; // Only needed if you need to support the redirect flow in Firefox incognito


// visit https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
export let msalConfig = {
    auth: {
        clientId: clientIds.WebApp,
        authority: "https://login.microsoftonline.com/common/",
        redirectUri: Endpoints.msal.redirectUri,
        postLogoutRedirectUri: Endpoints.msal.postLogoutRedirectUri,
        navigateToLoginRequestUrl: true,
    },
    cache: {
        storeAuthStateInCookie: isIE || isEdge || isFirefox
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case msalInstance.LogLevel.Error:
                        logger.error(message);
                        return;
                    case msalInstance.LogLevel.Info:
                        logger.info(message);
                        return;
                    case msalInstance.LogLevel.Verbose:
                        logger.debug(message);
                        return;
                    case msalInstance.LogLevel.Warning:
                        logger.warn(message);
                        return;
                    default:
                        return;
                }
            },
            level: (process.env.NODE_ENV === 'production') ? msalInstance.LogLevel.Error : msalInstance.LogLevel.Info
        }
    }
}
/** 
 * Scopes you enter here will be consented once you authenticate. For a full list of available authentication parameters, 
 * visit https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */

export const loginRequest = {
    scopes: ["openid", "profile", "offline_access", "email", "User.Read"],
    //extraScopesToConsent: [`api://${clientIds.WebApi}/.default`],
    //extraScopesToConsent: ["api://84ab99b0-34ab-4fc0-bbf9-8402f5790d8e/access_as_user"],
    //extraScopesToConsent: [],
    forceRefresh: false,
}

// Add here scopes for silent token request
export const silentRequest = {
    scopes: loginRequest.scopes,
    extraScopesToConsent: loginRequest.extraScopesToConsent,
    forceRefresh: loginRequest.forceRefresh,
}

export function setMSALLoggingLevel(newLoggingLevel) {
    msalConfig.system.loggerOptions.level = newLoggingLevel;
}

export function setPreferredUsername(login_hint, extraQueryParameters) {
    //https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-js-sso
    loginRequest.loginHint = login_hint;
    loginRequest.extraQueryParameters = { extraQueryParameters };
    silentRequest.loginHint = login_hint;
    silentRequest.extraQueryParameters = { extraQueryParameters };
}