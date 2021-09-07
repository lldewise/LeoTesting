import i18n from '../i18n/i18n';
import { Literal, AteduDataLiterals } from './constant';
import logger from 'loglevel';
import moment from 'moment';

export const intl = name => {
  return i18n.t(name);
};

export const isJSON = str => {
  if (typeof str !== Literal.string) {
    return false;
  }
  try {
    const _result = JSON.parse(str);
    const _type = Object.prototype.toString.call(_result);
    return _type === Literal.object || _type === Literal.object_Array;
  } catch (err) {
    return false;
  }
};

export const isUndefinedOrEmpty = value => {
  if (value === null) {
    return true;
  }
  const result = value !== undefined ? value : '';
  return result.length === 0 ? true : false;
};

export const isCPRValid = cpr => {
  return /^[0-3][0-9][0-1][0-9]\d{2}\d{4}$/i.test(cpr);
};

export const isArray = obj => {
  return Object.prototype.toString.call(obj) === Literal.object_Array;
};

export const parseAteduDataPayload = str => {
  if (str.startsWith(AteduDataLiterals.HEADER_CHARACTER)) {
    const _jsonString = str.substring(1, str.length);
    return JSON.parse(_jsonString);
  } else {
    return undefined;
  }
};

export const getAteduData = (property, jsonArray, resultList) => {
  if (isArray(jsonArray)) {
    for (let index = 0; index < jsonArray.length; ++index) {
      const level = jsonArray[index];
      if (isArray(level)) {
        if (level.length > 1 && level[0] === property) {
          // The `header` matches so let's store or return the data associated with it.
          if (resultList) {
            resultList.push(level[1]);
          } else {
            return level[1];
          }
        } else if (isArray(level[1])) {
          // Oh, another array! Let's dig deeper.
          const result = getAteduData(property, level[1], resultList);
          if (result) {
            return result;
          }
        }
      } else if (level === property) {
        // The `header` matches so let's store or return the data associated with it.
        if (resultList) {
          resultList.push(jsonArray[index + 1]);
        } else {
          return jsonArray[index + 1];
        }
      } else if (jsonArray.length > 1) {
        if (
          jsonArray[index + 1] &&
          jsonArray[index + 1].hasOwnProperty(property)
        ) {
          // Get the value using property instead.
          // NOTE: Done only on the top level.
          const jsonObject = jsonArray[index + 1][property];
          if (jsonObject && resultList) {
            resultList.push(jsonObject);
          } else if (jsonObject) {
            return jsonObject;
          }
        }
      }
    }
  } else {
    // Let's check if jsonArray is an array of JSON objects which we can just reference their `property`.
    // NOTE: Done only on the top level.
    if (jsonArray.hasOwnProperty(property)) {
      if (resultList) {
        resultList.push(jsonArray[property]);
      } else {
        return jsonArray[property];
      }
    } else {
      // We're done! I'm through with you!
      return undefined;
    }
  }
};

export const getWeekRange = date => {
  return {
    from: moment(date).startOf('week').toDate(),
    to: moment(date).endOf('week').toDate(),
  };
};

//export const hasSchoolRole = (schoolRoles, role) => {
//    if (userdata && role) {
//        if (userdata[1][AteduDataLiterals.STAFF_ROLES]) {
//            for (var i = 0; i < userdata[1][AteduDataLiterals.STAFF_ROLES].length; i++) {
//                if (userdata[1][AteduDataLiterals.STAFF_ROLES][i] == `role/${role}`) {
//                    return true;
//                }
//            }
//            return false;
//        }
//        else if (userdata[1][AteduDataLiterals.USER_ROLE]) {
//           // I don't know what a user/role value is. Change when I already know.
//            logger.warn("Unknown USER/Role");
//            if (role == 'student') { return true; }
//            else { return false; }
//        }
//        else { return false; }
//    }
//    else { return false;}
//}

//export const hasRole = (roles, role) => {
//    for (var index = 0; index < roles.length; index++) {
//        if (roles[index] == /${role}`) {
//            return true;
//        }
//    }
//}

export const hasRole = (roles, role) => {
  if (roles !== null && roles !== undefined) {
    if (Array.isArray(roles)) {
      for (let index = 0; index < roles.length; index++) {
        if (roles[index] === role) {
          return true;
        }
      }
    } else {
      if (roles === role) {
        return true;
      }
    }
  }
  return false;
};

export const getRoles = school => {
  const entityRoles = [];
  const roles = [];
  // We are combining all roles regardless of the Actor. This should be sorted out when determine how we should implement roles.
  for (let index = 0; index < Object.keys(school).length; index++) {
    getAteduData(Object.keys(school)[index], school, entityRoles);
  }
  for (let i = 0; i < entityRoles.length; ++i) {
    for (let jndex = 0; jndex < entityRoles[i].length; ++jndex) {
      if (
        entityRoles[i][jndex]
          .toString()
          .startsWith(AteduDataLiterals.ROLE_F_SLASH)
      ) {
        const role = entityRoles[i][jndex]
          .toString()
          .split(AteduDataLiterals.F_SLASH)
          .pop();
        if (role.length > 0) {
          roles.push(role);
        }
      }
    }
  }
  return roles;
};

export const prettfyArray = arrayOfStrings => {
  for (let index = 0; index < arrayOfStrings.length; ++index) {
    arrayOfStrings[index] = capitalizeFirstLetter(arrayOfStrings[index]);
  }
  return arrayOfStrings.join(AteduDataLiterals.ARRAY_DELIMITER);
};

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const beautifyName = string => {
  if (string !== undefined) {
    const data = string.split('/')[1].split('.');
    const first = data[0].charAt(0).toUpperCase() + data[0].slice(1);
    const last = data[1].charAt(0).toUpperCase() + data[1].slice(1);
    return first + ' ' + last;
  } else {
    return '';
  }
};

export const handleError = error => {
  logger.error(error);
};

export const getError = (data, entityId) => {
  if (entityId && typeof entityId === Literal.string) {
    const dataForEntity = getAteduData(entityId, data);
    if (dataForEntity) {
      return getAteduData(Literal.error, dataForEntity);
    } else {
      return undefined;
    }
  } else {
    return getAteduData(Literal.error, data);
  }
};

export const truncateLongName = (str, n) => {
  let result = '';
  if (str !== undefined) {
    result = str.length > n ? str.substr(0, n - 1) + '...' : str;
  }
  return result;
};

export const AssingIconSchedule = groupid => {
  let icon = '';
  switch (groupid.toUpperCase()) {
    case 'HOLD':
      icon = 'Group';
      break;
    case 'TEACHERS':
      icon = 'AccountManagement';
      break;
    case 'STUDENTS':
      icon = 'IDBadge';
      break;
    case 'ROOMS':
      icon = 'POI';
      break;
    case 'RESOURCES':
      icon = 'CubeShape';
      break;
    default:
      break;
  }
  return icon;
};

// Helper methods
export const getPrettyDate = date => {
  date = date.split(' ')[0];
  const newDate = date.split('-');
  const month = moment(date).format('MMM');
  return `${month} ${newDate[2]}, ${newDate[0]}`;
};

// Remove the seconds from the time
export const getPrettyTime = date => {
  const time = date.split(' ')[1].split(':');
  return `${time[0]}:${time[1]}`;
};

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const getBase64 = file => {
  return new Promise(resolve => {
    let fileInfo;
    let baseURL = '';
    let fName = '';
    let ftype = '';
    // Make new FileReader
    const reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      console.log('Called', reader);
      baseURL = reader.result;
      fName = file.name;
      ftype = file.type;
      resolve(
        Object.assign(
          [{}],
          { contentByte: baseURL },
          { fileName: fName, fileType: ftype },
        ),
      );
    };
  });
};
