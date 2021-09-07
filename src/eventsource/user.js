import {
  getError,
  getRoles,
  getAteduData,
  handleError,
} from '../util/commonFunction';
//eslint-disable-next-line
import { Errors, AteduDataLiterals } from '../util/constant';
import { signIn } from '../util/msgraph/authHandler';
import { getUserDetails } from '../services/msgraph/user';
import {
  listMailFolders,
  listMailMessages,
  listMessagesInMailFolder,
  listNextMessagesInMailFolder,
  listNextMailMessages,
  getMailThread,
  getMailUnread,
  toggleIsReadFlag,
  getEmailSenderPersona,
  listMessagesWithSizeInMailFolder,
  getTeamPhoto,
} from '../services/msgraph/email';
import { listContacts } from '../services/msgraph/contacts';
import { searchPeople } from '../services/msgraph/people';
import { listCategories } from '../services/msgraph/categories';
import { getGroupFromTeams } from '../services/msgraph/onedrive';
import logger from 'loglevel';

export const userSettingNotification = (dispatch, data) => {
  const filterData = data.filter(a => a[0] === 'entity/data');
  dispatch('USERSETTING_NOTIFICATION', filterData);
};

export const updateUserProfile = (dispatch, data) => {
  const filterData = data.filter(a => a[0] === 'entity/data');
  dispatch('USER_PROFILEUPDATE', filterData);
};

export const updateUser = async (dispatch, value, data, logger, logout) => {
  try {
    if (value !== null || value !== undefined) {
      const userId = getAteduData(
        AteduDataLiterals.ID,
        getAteduData(data.userExternalId, value),
      );
      const user = getAteduData(userId, value);
      const staff = getEntityInformation(value, 'staff');
      if (user !== undefined) {
        const affiliations = getAteduData(AteduDataLiterals.SCHOOLS, value);
        //We'll support a single school for the meantime. That would be Harvard.
        let activeSchool = getAteduData('school/harvard', affiliations);
        if (activeSchool === undefined) {
          activeSchool = getAteduData('school/carnegie', affiliations);
        }
        const activeSchoolRoles = getRoles(activeSchool);

        const emailParts = user['user/email'].split('@');

        const userData = {
          data: {
            rawData: value,
            id: data.userExternalId,
            user: user,
            affiliations: affiliations,
            school: activeSchool,
            roles: activeSchoolRoles ? activeSchoolRoles : ['student'],
            staff: staff,
          },
          profile: user,
          preferences: {
            timezone: 'UTC',
            timeFormat: 'HH:mm:ss',
            emailDomain:
              emailParts.length > 1 ? emailParts[emailParts.length - 1] : '',
            //emailDomain: '',
          },
        };
        // REMOVE WHEN TRANSFERRED BACK TO ATEDU TENANT!
        // REMOVE WHEN TRANSFERRED BACK TO ATEDU TENANT!
        userData.preferences.emailDomain = 'dewise.com';
        // REMOVE WHEN TRANSFERRED BACK TO ATEDU TENANT!
        // REMOVE WHEN TRANSFERRED BACK TO ATEDU TENANT!

        signIn()
          .then(async () => {
            const user = await getUserDetails();
            const emailParts = user.mail.split('@');
            userData.preferences = {
              timezone: user.mailboxSettings.timeZone || 'UTC',
              timeFormat: user.mailboxSettings.timeFormat || 'HH:mm:ss',
              emailDomain:
                emailParts.length > 1 ? emailParts[emailParts.length - 1] : '',
            };

            // REMOVE WHEN TRANSFERRED BACK TO ATEDU TENANT!
            // REMOVE WHEN TRANSFERRED BACK TO ATEDU TENANT!
            userData.preferences.emailDomain = 'dewise.com';
            // REMOVE WHEN TRANSFERRED BACK TO ATEDU TENANT!
            // REMOVE WHEN TRANSFERRED BACK TO ATEDU TENANT!

            //const mailFolders = await listMailFolders(20);
            //debugger

            //const soretedBySize = await listMessagesWithSizeInMailFolder("inbox", "sender,subject,bodyPreview,conversationId,isRead", 10);
            //debugger

            //const mailMessages = await listMailMessages("sender,subject,bodyPreview,conversationId,isRead", 300);
            //debugger

            //const teams = await getGroupFromTeams();
            //debugger;

            // const teamPhoto = await getTeamPhoto("e8be0e83-4e28-409b-991a-e2654269c825");
            // debugger;

            //toggleIsReadFlag({
            //    isRead: true, ids: [
            //        "AAMkAGU4ZWRkYmM0LTIwNTQtNDk0My04NjU3LTI4OTQ1MzNjNWZhMABGAAAAAAAD6ZvFheiMRqsMU7X4_4oDBwAZeeio_lmuTY2LinkSvnpTAAAAAAEMAAAZeeio_lmuTY2LinkSvnpTAAEMK_hKAAA=",
            //        "AAMkAGU4ZWRkYmM0LTIwNTQtNDk0My04NjU3LTI4OTQ1MzNjNWZhMABGAAAAAAAD6ZvFheiMRqsMU7X4_4oDBwAZeeio_lmuTY2LinkSvnpTAAAAAAEKAAAZeeio_lmuTY2LinkSvnpTAAEMLIiiAAA="
            //    ]
            //});
            //debugger

            //const conversation = await getMailThread(mailMessages["value"][0].conversationId);
            //debugger

            //const contacts = await listContacts();
            //debugger
            //const people = await searchPeople("dewise");
            //debugger
            //const peopleLeo = await searchPeople("leo");
            //debugger

            //const messagesInFolders0 = await listMessagesInMailFolder(mailFolders.value[6].id, "sender,subject,bodyPreview,receivedDateTime", 10, null);
            //debugger
            //const messagesInFolders1 = await listNextMailMessages(messagesInFolders0["@odata.nextLink"]);
            //debugger

            //const categories = await listCategories();
            //debugger
            dispatch('M365LOGIN', true);
          })
          .catch(error => {
            // FAILUE IN GETTING THE M365 ACCOUNT!!!! What do we do when this happens?
            handleError(error);
          })
          .finally(() => {});

        dispatch('CURRENTDB_USER', userData);
        return;
      }
      logger.warn(getError(value, data.userExternalId)?.message);
    }
    debugger;
    logger.debug(Errors.INVALID_USER);
    await logout();
  } catch (ex) {
    debugger;
    logger.error(ex);
    await logout();
  }
};

const getEntityInformation = (data, entity) => {
  let result = null;
  data.forEach(element => {
    if (element[1][0].includes(entity)) {
      result = element[1];
      return true;
    }
  });
  return result;
};

export const guardianBySchool = (dispatch, data) => {
  const filterData = data.filter(a => a[0] === 'entity/data');
  dispatch('GUARDIANBYSCHOOLLIST', filterData);
};
