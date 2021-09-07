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
 * +-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | Object: person                                                                                                                                                                                                                                                                                      |
 * +-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | Reference: https://docs.microsoft.com/en-us/graph/api/resources/person?view=graph-rest-1.0                                                                                                                                                                                                          |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | Property             | Type                          | Description                                                                                                                                                                                                                                  |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | birthday             | String                        | The person's birthday.                                                                                                                                                                                                                       |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | companyName          | String                        | The name of the person's company.                                                                                                                                                                                                            |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | department           | String                        | The person's department.                                                                                                                                                                                                                     |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | displayName          | String                        | The person's display name.                                                                                                                                                                                                                   |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | scoredEmailAddresses | scoredEmailAddress collection | The person's email addresses.                                                                                                                                                                                                                |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | givenName            | String                        | The person's given name.                                                                                                                                                                                                                     |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | id                   | String                        | The person's unique identifier. Read-only.                                                                                                                                                                                                   |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | imAddress            | String                        | The instant message voice over IP (VOIP) session initiation protocol (SIP) address for the user. Read-only.                                                                                                                                  |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | isFavorite           | Boolean                       | true if the user has flagged this person as a favorite.                                                                                                                                                                                      |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | jobTitle             | String                        | The person's job title.                                                                                                                                                                                                                      |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | officeLocation       | String                        | The location of the person's office.                                                                                                                                                                                                         |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | personNotes          | String                        | Free-form notes that the user has taken about this person.                                                                                                                                                                                   |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | personType           | personType                    | The type of person.                                                                                                                                                                                                                          |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | phones               | phone collection              | The person's phone numbers.                                                                                                                                                                                                                  |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | postalAddresses      | location collection           | The person's addresses.                                                                                                                                                                                                                      |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | profession           | String                        | The person's profession.                                                                                                                                                                                                                     |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | surname              | String                        | The person's surname.                                                                                                                                                                                                                        |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | userPrincipalName    | String                        | The user principal name (UPN) of the  person. The UPN is an Internet-style login name for the person based on  the Internet standard RFC 822. By convention, this should map to the person's email name. The general format is alias@domain. |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | websites             | website collection            | The person's websites.                                                                                                                                                                                                                       |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 * | yomiCompany          | String                        | The phonetic Japanese name of the person's company.                                                                                                                                                                                          |
 * +----------------------+-------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 *
 */
//export async function listPeopleRaw(queryParameters) {
//    var request = {
//        endpoint: nextLink || graphConfig.People.Endpoint,
//        scopes: graphConfig.People.Scopes.ListPeople,
//        forceRefresh: false
//    }
//    const client = await getGraphClient(request);
//    return await client
//        .api(request.endpoint)
//        .header("Accept", "application/json")
//        .get();
//}
export async function listPeople() {
  const request = {
    endpoint: graphConfig.People.Endpoint,
    scopes: graphConfig.People.Scopes.ListPeople,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  return await client
    .api(request.endpoint)
    .header('Accept', 'application/json')
    .get();
}
export async function searchPeople(queryString) {
  const request = {
    endpoint: graphConfig.People.Endpoint,
    scopes: graphConfig.People.Scopes.ListPeople,
    forceRefresh: false,
  };
  const client = await getGraphClient(request);
  return await client
    .api(request.endpoint)
    .header('Accept', 'application/json')
    .search(queryString)
    .select('id,displayName,jobTitle,scoredEmailAddresses')
    .get();
}
