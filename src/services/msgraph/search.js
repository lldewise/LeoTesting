import { handleError } from '../../util/commonFunction';
import { getGraphClient } from '../../util/msgraph/authHandler';
import { graphConfig } from '../../util/msgraph/graphConfig';
import logger from 'loglevel';
import {
  GraphRequestOptions,
  PageCollection,
  PageIterator,
} from '@microsoft/microsoft-graph-client';

//export enum entityTypes {
//    "list",
//    "site",
//    "listItem",
//    "message",
//    "event",
//    "drive",
//    "driveItem",
//    "externalItem",
//}

/*
 *
 * +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--+
 * | Object: searchRequest                                                                                                                                                                                                                                                                                                            |  |
 * +----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--+
 * | Reference: https://docs.microsoft.com/en-us/graph/api/resources/searchrequest?view=graph-rest-1.0                                                                                                                                                                                                                                |  |
 * +------------------+-----------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--+
 * | Property         | Type                  | Description                                                                                                                                                                                                                                                                           |  |
 * +------------------+-----------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--+
 * | contentSources   | String collection     | Contains the connection to be targeted.                                                                                                                                                                                                                                               |  |
 * +------------------+-----------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--+
 * | enableTopResults | Boolean               | This triggers hybrid sort for messages :  the first 3 messages are the most relevant. This property is only  applicable to entityType=message. Optional.                                                                                                                              |  |
 * +------------------+-----------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--+
 * | entityTypes      | entityType collection | One or more types of resources expected in the response. Possible values are: list, site, listItem, message, event, drive, driveItem, externalItem. See known limitations for those combinations of two or more entity types that are supported in the same search request. Required. |  |
 * +------------------+-----------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--+
 * | fields           | String collection     | Contains the fields to be returned for each resource object specified in entityTypes,  allowing customization of the fields returned by default otherwise,  including additional fields such as custom managed properties from  SharePoint and OneDrive. Optional.                    |  |
 * +------------------+-----------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--+
 * | from             | Int32                 | Specifies the offset for the search results. Offset 0 returns the very first result. Optional.                                                                                                                                                                                        |  |
 * +------------------+-----------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--+
 * | query            | searchQuery           | Contains the query terms. Required.                                                                                                                                                                                                                                                   |  |
 * +------------------+-----------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--+
 * | size             | Int32                 | The size of the page to be retrieved. Optional.                                                                                                                                                                                                                                       |  |
 * +------------------+-----------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--+
 *
 */
export async function searchRaw(searchRequest) {
  const request = {
    endpoint: graphConfig.Search.Endpoint,
    scopes: graphConfig.Search.Scopes.QueryData,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  const user = await client
    .api(request.endpoint)
    .header('Content-Type', 'application/json')
    .post(searchRequest);
  return user;
}
export async function search(queryString, from, size, entityTypeArray) {
  const entityTypes = [];

  if (entityTypeArray) {
    entityTypeArray.forEach(async (element, index) => {
      entityTypes.push(element);
    });
  }

  const searchRequest = {
    entityTypes: entityTypes,
    query: queryString,
    from: from,
    size: size,
  };
  return await searchRaw(searchRequest);
}
