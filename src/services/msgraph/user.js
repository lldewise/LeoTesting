import { handleError } from '../../util/commonFunction';
import { getGraphClient } from '../../util/msgraph/authHandler';
import { graphConfig } from '../../util/msgraph/graphConfig';
import logger from 'loglevel';

export async function getUserDetails() {
  const request = {
    endpoint: graphConfig.Me.Endpoint,
    scopes: graphConfig.Me.Scopes.GetUserDetails,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  const user = await client
    .api(request.endpoint)
    .select('displayName,mail,mailboxSettings,userPrincipalName')
    .get();
  return user;
}

export async function getUsersList() {
  const request = {
    endpoint: graphConfig.Users.Endpoint,
    scopes: graphConfig.Users.Scopes.ListUsers,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  return await client.api(request.endpoint).get();
}
