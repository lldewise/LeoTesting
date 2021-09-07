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
 * +-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | Object: fileAttachment                                                                                                                                                                        |
 * +-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | Reference: https://docs.microsoft.com/en-us/graph/api/resources/fileattachment?view=graph-rest-1.0                                                                                            |
 * +----------------------+----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | Property             | Type           | Description                                                                                                                                           |
 * +----------------------+----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | contentBytes         | Edm.Binary     | The base64-encoded contents of the file.                                                                                                              |
 * +----------------------+----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | contentId            | String         | The ID of the attachment in the Exchange store.                                                                                                       |
 * +----------------------+----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | contentLocation      | String         | Do not use this property as it is not supported.                                                                                                      |
 * +----------------------+----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | contentType          | String         | The content type of the attachment.                                                                                                                   |
 * +----------------------+----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | id                   | String         | The attachment ID.                                                                                                                                    |
 * +----------------------+----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | isInline             | Boolean        | Set to true if this is an inline attachment.                                                                                                          |
 * +----------------------+----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | lastModifiedDateTime | DateTimeOffset | The date and time when the attachment was last modified.                                                                                              |
 * +----------------------+----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | name                 | String         | The name representing the text that is  displayed below the icon representing the embedded attachment.This does  not need to be the actual file name. |
 * +----------------------+----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | size                 | Int32          | The size in bytes of the attachment.                                                                                                                  |
 * +----------------------+----------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
 *
 */
export async function listMailAttachments(id) {
  const request = {
    endpoint: `${graphConfig.Messages.Endpoint}/${id}/attachments`,
    scopes: graphConfig.Messages.Scopes.ListAttachments,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  return await client.api(request.endpoint).get();
}
export async function addMailFileAttachmentRaw(mailId, attachment) {
  const request = {
    endpoint: `${graphConfig.Messages.Endpoint}/${mailId}/attachments`,
    scopes: graphConfig.Messages.Scopes.AddAttachment,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  return await client
    .api(request.endpoint)
    .header('Content-Type', attachment.contentType)
    .post(attachment);
}
export async function addMailFileAttachment(
  mailId,
  name,
  contentType,
  contentBytes,
) {
  const request = {
    endpoint: `${graphConfig.Messages.Endpoint}/${mailId}/attachments`,
    scopes: graphConfig.Messages.Scopes.AddAttachment,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  const attachment = {
    '@odata.type': '#microsoft.graph.fileAttachment',
    name: name,
    contentType: contentType,
    contentBytes: contentBytes,
  };
  const client = await getGraphClient(request);
  return await client
    .api(request.endpoint)
    .header('Content-Type', attachment.contentType)
    .post(attachment);
}
export async function getMailItemAttachment(mailId, attachementId) {
  const request = {
    endpoint: `${graphConfig.Messages.Endpoint}/${mailId}/attachments${attachementId}`,
    scopes: graphConfig.Messages.Scopes.GetAttachment,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  return await client.api(request.endpoint).get();
}
export async function deleteMailItemAttachment(mailId, attachementId) {
  const request = {
    endpoint: `${graphConfig.Messages.Endpoint}/${mailId}/attachments${attachementId}`,
    scopes: graphConfig.Messages.Scopes.GetAttachment,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  return await client.api(request.endpoint).delete();
}
export async function createSessionToAttachLargeFile(
  mailId,
  attachmentType,
  name,
  size,
) {
  const request = {
    endpoint: `${graphConfig.Messages.Endpoint}/${mailId}/attachments/createUploadSession`,
    scopes: graphConfig.Messages.Scopes.CreateMessageSessionToAttachLargeFile,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  const uploadSession = {
    AttachmentItem: {
      attachmentType: attachmentType,
      name: name,
      size: size,
    },
  };
  return await client.api(request.endpoint).post(uploadSession);
}

/*
 *
 * +-----------------------------------------------------------------------------------------------------------------------------------------+
 * | Object: itemAttachment                                                                                                                  |
 * +-----------------------------------------------------------------------------------------------------------------------------------------+
 * | Reference: https://docs.microsoft.com/en-us/graph/api/resources/itemattachment?view=graph-rest-1.0                                      |
 * +----------------------+----------------+-------------------------------------------------------------------------------------------------+
 * | Property             | Type           | Description                                                                                     |
 * +----------------------+----------------+-------------------------------------------------------------------------------------------------+
 * | contentType          | String         | The content type of the attachment.                                                             |
 * +----------------------+----------------+-------------------------------------------------------------------------------------------------+
 * | id                   | String         | The attachment ID.                                                                              |
 * +----------------------+----------------+-------------------------------------------------------------------------------------------------+
 * | isInline             | Boolean        | Set to true if the attachment is inline, such as an embedded image within the body of the item. |
 * +----------------------+----------------+-------------------------------------------------------------------------------------------------+
 * | lastModifiedDateTime | DateTimeOffset | The last time and date that the attachment was modified.                                        |
 * +----------------------+----------------+-------------------------------------------------------------------------------------------------+
 * | name                 | String         | The display name of the attachment.                                                             |
 * +----------------------+----------------+-------------------------------------------------------------------------------------------------+
 * | size                 | Int32          | The size in bytes of the attachment.                                                            |
 * +----------------------+----------------+-------------------------------------------------------------------------------------------------+
 *
 */

/*
 *
 * +-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | Object: referenceAttachment                                                                                                                                                                                                                                                   |
 * +-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | Reference: https://docs.microsoft.com/en-us/graph/api/resources/referenceattachment?view=graph-rest-1.0                                                                                                                                                                       |
 * +----------------------+----------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | Property             | Type           | Description                                                                                                                                                                                                                           |
 * +----------------------+----------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | contentType          | String         | The content type of the attachment.                                                                                                                                                                                                   |
 * +----------------------+----------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | id                   | String         | The attachment ID.  Read-only.                                                                                                                                                                                                        |
 * +----------------------+----------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | isInline             | Boolean        | Set to true if the attachment appears inline in the body of the embedding object.                                                                                                                                                     |
 * +----------------------+----------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | lastModifiedDateTime | DateTimeOffset | The date and time when the attachment was  last modified. The Timestamp type represents date and time information  using ISO 8601 format and is always in UTC time. For example, midnight  UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z |
 * +----------------------+----------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | name                 | String         | The text that is displayed below the icon representing the embedded attachment. This does not need to be the actual file name.                                                                                                        |
 * +----------------------+----------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | size                 | Int32          | The size of the metadata that is stored on  the message for the attachment in bytes. This value does not indicate  the size of the actual file.                                                                                       |
 * +----------------------+----------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 *
 */
