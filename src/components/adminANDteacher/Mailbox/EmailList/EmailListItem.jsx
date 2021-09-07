import React, { useState, Fragment, useEffect } from "react";
import moment from "moment";
import styles from "./EmailList.module.scss";
import { Checkbox, Persona, PersonaSize } from "office-ui-fabric-react";
import { truncateLongName } from "../../../../util/commonFunction";
import { getEmailSenderPersona } from "../../../../services/msgraph/email";
import { useStore } from '../../../../store/store';

const dpPerson = {
  root: {
    fontSize: "18px !important",
  },
};

export const EmailListItem = ({ email, onEmailClicked, onCheckboxTick }) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [id, setId] = useState(0);
  const [dataStore] = useStore();

  // fetch User Profile Image
  function getProfileImage(emailAddress) {
      if (dataStore.userPreferences.emailDomain !== '' && emailAddress.includes(dataStore.userPreferences.emailDomain)) {
      getEmailSenderPersona(emailAddress)
        .then((res) => {
          setPhotoUrl(res);
        })
        .catch((err) => {
          return "";
        });
    } else {
      return null;
    }
  }

  useEffect(() => {
    getProfileImage(email.from);
  }, []);

  const handleMouseOver = (item) => {
    if (!item.selected) {
      setId(item.id);
    }
  };

  const handleMouseOut = (item) => {
    setId(0);
  };

  return (
    <Fragment>
      {email.read ? (
        <div
          onMouseEnter={() => handleMouseOver(email)}
          onMouseLeave={() => handleMouseOut(email)}
          className={styles.contentContainer}>
          {id !== email.id && !email.selected && (
            <div className={styles.personaCheck}>
              <Persona
                imageUrl={photoUrl}
                hidePersonaDetails={true}
                text={email.name}
                size={PersonaSize.size24}
                styles={dpPerson}
              />
            </div>
          )}
          {id === email.id && !email.selected && (
            <div className={styles.checkTop}>
              <Checkbox
                className={styles.checkItem}
                onChange={(e) => onCheckboxTick(email.id)}
                defaultChecked={email.selected}
              />
            </div>
          )}
          {email.selected && (
            <div className={styles.checkTop}>
              <Checkbox
                className={styles.checkItem}
                onChange={(e) => onCheckboxTick(email.id)}
                defaultChecked={email.selected}
              />
            </div>
          )}
          <div
            className={styles.emailItem}
            onClick={() => {
              onEmailClicked(email.id);
            }}>
            <div className={styles.name}>{email.name}</div>
            <div className={styles.subject}>
              <span className={styles.subjectName}>
                {truncateLongName(email.subject.replace(/<[^>]+>/g, ""), 20)}
              </span>
              {moment(email.date).subtract(7, "days") <=
              moment().subtract(7, "days") ? (
                <span>
                  <span className={styles.date}>
                    {moment(email.date).format("ddd,")}
                  </span>
                  &nbsp;
                  <span className={styles.date}>
                    {moment(email.date).format("hh:MM A")}
                  </span>
                </span>
              ) : (
                <span>
                  <span className={styles.date}>
                    {moment(email.date).format("MMM/DD/YYYY")}
                  </span>
                </span>
              )}
            </div>
            <div className={styles.details}>
              {truncateLongName(email.message.replace(/<[^>]+>/g, ""), 40)}
            </div>
          </div>
        </div>
      ) : (
        <div
          onMouseEnter={() => handleMouseOver(email)}
          onMouseLeave={() => handleMouseOut(email)}
          className={styles.contentContainerUnread}>
          {id !== email.id && !email.selected && (
            <div className={styles.personaCheck}>
              <Persona
                imageUrl={email.imageUrl}
                hidePersonaDetails={true}
                text={email.name}
                size={PersonaSize.size24}
                styles={dpPerson}
              />
            </div>
          )}
          {id === email.id && !email.selected && (
            <div className={styles.checkTop}>
              <Checkbox
                className={styles.checkItem}
                onChange={(e) => onCheckboxTick(email.id)}
                defaultChecked={email.selected}
              />
            </div>
          )}
          {email.selected && (
            <div className={styles.checkTop}>
              <Checkbox
                className={styles.checkItem}
                onChange={(e) => onCheckboxTick(email.id)}
                defaultChecked={email.selected}
              />
            </div>
          )}

          <div
            className={styles.emailItem}
            onClick={() => {
              onEmailClicked(email.id);
            }}>
            <div className={styles.name}>{email.name}</div>
            <div className={styles.subject}>
              <span className={styles.subjectName}>
                {truncateLongName(email.subject.replace(/<[^>]+>/g, ""), 20)}
              </span>
              {moment(email.date).subtract(7, "days") <=
              moment().subtract(7, "days") ? (
                <span>
                  <span className={styles.date}>
                    {moment(email.date).format("ddd,")}
                  </span>
                  &nbsp;
                  <span className={styles.date}>
                    {moment(email.date).format("hh:MM A")}
                  </span>
                </span>
              ) : (
                <span>
                  <span className={styles.date}>
                    {moment(email.date).format("MMM/DD/YYYY")}
                  </span>
                </span>
              )}
            </div>
            <div className={styles.details}>
              {truncateLongName(email.message.replace(/<[^>]+>/g, ""), 40)}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
