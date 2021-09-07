import { handleError } from '../../util/commonFunction';
import { getGraphClient } from '../../util/msgraph/authHandler';
import { graphConfig } from '../../util/msgraph/graphConfig';
import logger from 'loglevel';
import {
  GraphRequestOptions,
  PageCollection,
  PageIterator,
} from '@microsoft/microsoft-graph-client';

/*
 *
 * +---------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | Object: outlookCategory                                                                                                                                             |
 * +---------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | Reference: https://docs.microsoft.com/en-us/graph/api/resources/outlookcategory?view=graph-rest-1.0                                                                 |
 * +-------------+---------------+---------------------------------------------------------------------------------------------------------------------------------------+
 * | Property    | Type          | Description                                                                                                                           |
 * +-------------+---------------+---------------------------------------------------------------------------------------------------------------------------------------+
 * | displayName | String        | A unique name that identifies a category  in the user's mailbox. After a category is created, the name cannot be  changed. Read-only. |
 * +-------------+---------------+---------------------------------------------------------------------------------------------------------------------------------------+
 * | color       | categoryColor | A pre-set color constant that characterizes a category, and that is mapped to one of 25 predefined colors. See the note below.        |
 * +-------------+---------------+---------------------------------------------------------------------------------------------------------------------------------------+
 *
 */
export async function listCategories() {
  const request = {
    endpoint: graphConfig.Categories.Endpoint,
    scopes: graphConfig.Categories.Scopes.ListCategories,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  return await client.api(request.endpoint).get();
}
export async function createCAtegory(displayName, color) {
  const request = {
    endpoint: graphConfig.Categories.Endpoint,
    scopes: graphConfig.Categories.Scopes.CreateCategory,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  const outlookCategory = {
    displayName: displayName,
    color: color,
  };
  return await client.api(request.endpoint).post(outlookCategory);
}
export async function getCategory(id) {
  const request = {
    endpoint: `${graphConfig.Categories.Endpoint}/${id}`,
    scopes: graphConfig.Categories.Scopes.GetMessage,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  return await client.api(request.endpoint).get();
}
export async function updateCategory(id, color) {
  const request = {
    endpoint: `${graphConfig.Categories.Endpoint}/${id}`,
    scopes: graphConfig.Categories.Scopes.UpdateCategory,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  const outlookCategory = {
    color: color,
  };
  return await client.api(request.endpoint).update(outlookCategory);
}
export async function deleteCategory(id) {
  const request = {
    endpoint: `${graphConfig.Categories.Endpoint}/${id}`,
    scopes: graphConfig.Categories.Scopes.DeleteCategory,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  return await client.api(request.endpoint).delete();
}
