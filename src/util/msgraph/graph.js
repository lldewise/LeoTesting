import { handleError } from "../commonFunction";
import { HttpMethods } from "../constant";
import { getGraphAccessToken } from "./authHandler";
import { graphConfig } from "./graphConfig";
import logger from 'loglevel';
import { v4 as uuidv4 } from "uuid";

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export async function callMSGraphAsync(graphRequest, httpMethod, callback) {
    await getGraphAccessToken(graphRequest)
        .then(response => {
            callMSGraphAPIAsync(graphRequest.endpoint, httpMethod, response.accessToken, graphRequest.body, callback);
        })
        .catch(error => {
            handleError(error);
        });
}

/** 
 * Helper function to call MS Graph API endpoint
 * using the authorization bearer token scheme
*/
export async function callMSGraphAPIAsync(endpoint, method, accessToken, body, callback) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append("X-Correlation-Id", uuidv4());
    headers.append("Content-Type", "application/json");

    const options = {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    };

    logger.log('request made to Graph API at: ' + new Date().toString());

    fetch(endpoint, options)
        .then(response => response.json())
        .then(response => callback(response, endpoint))
        .catch(error => logger.log(error));
}

export async function getMailFolders() {
    var request = {
        endpoint: graphConfig.MailFolders.Endpoint,
        scopes: graphConfig.MailFolders.Scopes,
        forceRefresh: false
    }
    await callMSGraphAsync(request, HttpMethods.GET, outputToConsole)
}

export async function getMail() {
    var request = {
        endpoint: "https://graph.microsoft.com/v1.0/me/messages/",
        scopes: ["Mail.ReadBasic", "Mail.Read"],
        forceRefresh: false
    }
    await callMSGraphAsync(request, HttpMethods.GET, outputToConsole)
}

export async function sendMail(body) {

    var request = {
        endpoint: "https://graph.microsoft.com/v1.0/me/sendMail",
        scopes: ["Mail.ReadWrite", "Mail.Send"],
        forceRefresh: false,
        body: {
            "message": {
                "subject": "Test Email",
                "body": {
                    "contentType": "html",
                    "content": body
                },
                "toRecipients": [
                    {
                        "emailAddress": {
                            "address": "leo.lopez@dewise.com"
                        }
                    }
                ],
                "ccRecipients": [
                    // {
                    //     "emailAddress": {
                    //         "address": "orlando.celeste@dewise.com"
                    //     }
                    // },
                    // {
                    //     "emailAddress": {
                    //         "address": "eric.cantorna@dewise.com"
                    //     }
                    // },
                    // {
                    //     "emailAddress": {
                    //         "address": "bf@dewise.com"
                    //     }
                    // },
                    // {
                    //     "emailAddress": {
                    //         "address": "dennis.migrino@dewise.com"
                    //     }
                    // },
                ]
            },
            "saveToSentItems": "false"
        }
    }
    await callMSGraphAsync(request, HttpMethods.POST, outputToConsole)
}

function outputToConsole(data, endpoint) {
    logger.info('Graph API responded at: ' + new Date().toString());
    logger.info(endpoint);
    logger.info(data);
}