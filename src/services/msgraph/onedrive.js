import { getGraphClient, getBetaClient } from '../../util/msgraph/authHandler';
import { graphConfig } from '../../util/msgraph/graphConfig';

export async function getFilesFromOneDrive() {
  const request = {
    endpoint: `${graphConfig.OneDrive.Endpoint}/root/children`,
    scopes: graphConfig.OneDrive.Scopes.ListFiles,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  return await client.api(request.endpoint).get();
}

export async function getGroupFromTeams() {
  const request = {
    endpoint: `${graphConfig.Me.Endpoint}/joinedTeams`,
    scopes: graphConfig.Me.Scopes.GroupTeams,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  return await client.api(request.endpoint).get();
}

export async function getFolderContentFromOneDrive(folderId) {
  const request = {
    endpoint: `${graphConfig.OneDrive.Endpoint}/items/${folderId}/children`,
    scopes: graphConfig.OneDrive.Scopes.ListFiles,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  return await client.api(request.endpoint).get();
}

export async function getRecentFromOneDrive() {
  
  const request = {
    endpoint: `${graphConfig.OneDrive.Endpoint}/recent`,
    scopes: graphConfig.OneDrive.Scopes.ListFiles,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  return await client.api(request.endpoint).get();
}

export async function getGroupProfileImage(id) {
  const request = {
    endpoint: `/teams/${id}/photo`,
    scopes: graphConfig.Me.Scopes.GroupTeams,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  return await client.api(request.endpoint).get();
}

export async function getByDriveIdOneDrive(id) {
  const request = {
    endpoint: `${graphConfig.OneDrive.Drives}/${id}/root/children`,
    scopes: graphConfig.OneDrive.Scopes.ListFiles,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  return await client.api(request.endpoint).get();
}

export async function getDriveIdByGroupOneDrive(id) {
  const request = {
    endpoint: `${graphConfig.OneDrive.Groups}/${id}/drive`,
    scopes: graphConfig.OneDrive.Scopes.ListFiles,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  return await client.api(request.endpoint).get();
}

export async function getFileFromParentReferencePath(driveId, itemId) {
  const request = {
    endpoint: `/drives/${driveId}/items/${itemId}/children`,
    scopes: graphConfig.OneDrive.Scopes.ListFiles,
    forceRefresh: false,
  };

  const client = await getGraphClient(request);
  return await client.api(request.endpoint).get();
}

export async function getDriveItem(id) {
  const request = {
    endpoint: `${graphConfig.OneDrive.Endpoint}/items/${id}`,
    scopes: graphConfig.OneDrive.Scopes.ListFiles,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  return await client.api(request.endpoint).get();
}
