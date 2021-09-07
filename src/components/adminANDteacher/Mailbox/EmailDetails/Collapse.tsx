import React, { Fragment, useState, useEffect } from "react";
import {
  DefaultButton,
  FontIcon,
  Persona,
  PersonaSize,
  IconButton,
  TooltipHost,
  Stack,
  Link,
  ActionButton,
  CommandBarButton,
} from "office-ui-fabric-react";
import { truncateLongName } from "../../../../util/commonFunction";
import moment from "moment";
import { getEmailSenderPersona } from "../../../../services/msgraph/email";
import styles from "./EmailDetails.module.scss";
import { useStore } from '../../../../store/store';

const dpPerson = {
  root: {
    fontSize: "18px !important",
    width: "55px",
  },
};

type CollapseProps = {
  email: any
};

const Collapse: React.FC<CollapseProps> = props => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [photoUrl, setPhotoUrl] = useState<any | null>(null);
  const [dataStore] = useStore();

  const getProfileImage = (emailAddress:any) => {
      if (dataStore.userPreferences.emailDomain !== '' && emailAddress.includes(dataStore.userPreferences.emailDomain)) {
      getEmailSenderPersona(emailAddress)
        .then((res:any) => {
          setPhotoUrl(res);
        })
        .catch((err) => {
          setPhotoUrl(null);
        });
    } else {
      setPhotoUrl(null);
    }
  };

  useEffect(() => {
    if (props.email) {
      getProfileImage(props.email?.from);
    }
  }, [props.email]);

  const togglePanel = (e:any) => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Fragment>
      {!isCollapsed && (
        <div onClick={(e) => togglePanel(e)} className={styles.colHeader}>
          <div className={styles.colPersona}>
            <Persona
              imageUrl={photoUrl}
              hidePersonaDetails={true}
              text={props.email.name}
              size={PersonaSize.size40}
              styles={dpPerson}
            />
          </div>
          <div className={styles.colContent}>
            <div className={styles.nameAndBody}>
              <div>{props.email.name}</div>
              <div>
                {truncateLongName(
                  props.email.message.replace(/<[^>]+>/g, ""),
                  70
                )}
              </div>
            </div>
            <div className={styles.colDate}>
              <div>{""}</div>
              <span>
                <span className={styles.colDateItem}>
                  {moment(props.email.date).format("ddd ")}
                </span>
                &nbsp;
                <span className={styles.colDateItem}>
                  {moment(props.email.date).format("MM/DD/YYYY ")}
                </span>
                &nbsp;
                <span className={styles.colDateItem}>
                  {moment(props.email.date).format("hh:MM A")}
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
      {isCollapsed && (
        <div className="content" onClick={(e) => togglePanel(e)}>
          {props.children}
        </div>
      )}
    </Fragment>
  );
};

export default Collapse;