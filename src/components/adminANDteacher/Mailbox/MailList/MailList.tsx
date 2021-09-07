import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import moment from 'moment';
import styles from './MailList.module.scss';
import PersonaAvatar from './PersonaAvatar';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import {
  Checkbox,
  Persona,
  PersonaSize,
  ActionButton,
  FontIcon,
  Stack,
  IconButton,
} from 'office-ui-fabric-react';
import { truncateLongName } from '../../../../util/commonFunction';
import noMailItems from '../../../../assets/no-mail-items.png';
import { Text } from '@fluentui/react';
import { now } from 'moment';
import _ from 'lodash';

import InfiniteScroll from 'react-infinite-scroll-component';
const dpPerson = {
  root: {
    fontSize: '18px !important',
  },
};

type MailListProps = {
  emails: any,
  onEmailRead: any,
  onEmailSelected: any,
  onCheckAll: any,
  folderEmail: any,
  filterFolder: any,
  sortFolder: any,
  isFilterAll: any,
  lblSelectedFilter: any,
  handleRemoveFilter: any,
  subMenuProps: any,
  selectedFolderName: any,
  fetchMoreData: any,
  deleteEmail: any,
  markAsRead: any,
  archiveEmail: any,
  flagToggle: any,
};

// MAIL LIST : LISTS ALL THE MAILS BASED ON SELECTION FROM FOLDERS
const MailList: React.FC<MailListProps> = props => {
  const {
    emails,
    onEmailRead,
    onEmailSelected,
    onCheckAll,
    folderEmail,
    // filterUnread,
    filterFolder,
    sortFolder,
    isFilterAll,
    lblSelectedFilter,
    handleRemoveFilter,
    subMenuProps,
    selectedFolderName,
    fetchMoreData,
    deleteEmail,
    markAsRead,
    archiveEmail,
    flagToggle,
  } = props;

  const [id, setId] = useState(0);
  const [selectedMail, setSelectedMail] = useState(0);
  const [selectedFolder, setSelectedFolder] = useState(selectedFolderName);

  const [emailList, setEmailList] = useState(emails);
  //const [isFetching, setIsFetching] = InfiniteScroll(fetchMoreData);

  const handleClick = useCallback(
    (item, emails, folderEmail) => {
      setId(item.id);
      //alert(item.subject);
      onEmailRead(item.id, item.conversationId, emails, folderEmail);
    },
    [setId, onEmailRead],
  );

  useEffect(() => {
    setSelectedFolder(selectedFolderName);
  }, [selectedFolderName]);

  /*     const handleClick = useCallback((mail) => {
      
     // setId(id); 
     setSelectedMail(mail)
     //setSelectedMail(item)
     onEmailRead(mail.id, mail.conversationId, emails, folderEmail);
     
      console.log(mail);
    },[setSelectedMail,onEmailRead,emails,folderEmail]) */

  const clickFilterHandler = useCallback(value => {
    filterFolder(value);
  }, []);

  const flagClickHandler = useCallback(
    value => {
      //alert(value);
      flagToggle(value);
    },
    [flagToggle],
  );

  const readToggleClickHandler = useCallback(
    value => {
      markAsRead(value);
    },
    [markAsRead],
  );

  const archiveClickHandler = useCallback(
    value => {
      archiveEmail(value);
    },
    [archiveEmail],
  );

  const TickCheckboxHandler = useCallback(
    (value, emails) => {
      alert(value.subject);
      onEmailSelected(value.id, emails);
    },
    [onEmailSelected],
  );

  const handleCheckAll = (item:any, isCheck:any) => {
    // filterUnread(item);
    onCheckAll(isCheck, emails);
  };

  const handleMouseOver = useCallback(item => {
    if (!item.selected) {
      setId(item.id);
    }
  }, []);
  const handleMouseOut = (item:any) => {
    setId(0);
  };

  const deleteClickHandler = useCallback(
    emailId => {
      deleteEmail(emailId);
    },
    [deleteEmail],
  );

  const generateMailList = useCallback(() => {
    return emails.map((email:any, index:any) => {
      return (
        <li
          key={index}
          onClick={id => {
            handleClick(email, emails, folderEmail);
          }}
          className={[
            !email.read ? styles.unread : '',
            id === email.id ? styles.selected : '',
          ].join(' ')}>
          <div className={styles.persona}>
            {id !== email.id && !email.selected && (
              <div className={styles.personaCheck}>
                <PersonaAvatar
                  address={email.from}
                  name={email.name}
                  size={10}
                />
              </div>
            )}
            {id === email.id && !email.selected && (
              <div className={styles.checkTop}>
                <Checkbox
                  className={styles.checkItem}
                  onChange={e => TickCheckboxHandler(email, emails)}
                  defaultChecked={email.selected}
                />
              </div>
            )}
            {email.selected && (
              <div className={styles.checkTop}>
                <Checkbox
                  className={styles.checkItem}
                  onChange={e => TickCheckboxHandler(email, emails)}
                  defaultChecked={email.selected}
                />
              </div>
            )}
          </div>
          <div className={styles.mailInfo}>
            <div className={styles.iconTitleWrapper}>
              <div
                className={[styles.name, !email.read && styles.unread].join(
                  ' ',
                )}>
                {email.folderName === 'Drafts' && (
                  <span>
                    <span className={styles.draftTag}>{email.draftInfo} </span>
                    {email.to?.map((a:any, key:any) => (
                      <span key={key}>{a.name}; </span>
                    ))}{' '}
                  </span>
                )}
                {email.folderName !== 'Drafts' && <span>{email.name} </span>}
              </div>
              <span className={styles.iconWrapper}>
                <FontIcon
                  aria-label="Delete"
                  iconName="Delete"
                  title="Delete"
                  className={[styles.iconStyles, styles.iconDeleteStyles].join(
                    ' ',
                  )}
                  onClick={deleteClickHandler.bind(null, email.id)}
                />

                {/*            <IconButton 
                    iconProps={"Delete"} title="Delete" ariaLabel="Delete"
                    className={[styles.iconStyles, styles.iconDeleteStyles].join( " ")}
                    onClick={deleteClickHandler.bind(null, email.id)} 
                /> */}
                <FontIcon
                  aria-label="Mail"
                  iconName="Mail"
                  /*   title= {email.read ? "Mark as unread" : "Mark as read"} */
                  title={'Mark as read'}
                  className={[styles.iconStyles, styles.iconDeleteStyles].join(
                    ' ',
                  )}
                  onClick={readToggleClickHandler.bind(null, email.id)}
                />
                <FontIcon
                  aria-label="Flag"
                  iconName="Flag"
                  /*  title ={email.isFlagged ?  "Unflag this message" : "Flag this message"} */
                  title={'Flag this message'}
                  className={[styles.iconStyles, styles.iconDeleteStyles].join(
                    ' ',
                  )}
                  onClick={flagClickHandler.bind(null, email.id)}
                />
                <FontIcon
                  aria-label="Archive"
                  iconName="Archive"
                  title={'Archive'}
                  className={[styles.iconStyles, styles.iconDeleteStyles].join(
                    ' ',
                  )}
                  onClick={archiveClickHandler.bind(null, email.id)}
                />
                {email.hasAttachments && (
                  <FontIcon
                    aria-label="Attach"
                    iconName="Attach"
                    className={[styles.iconStyles, styles.iconClipStyles].join(
                      ' ',
                    )}
                    /*  onClick={deleteClickHandler.bind(null, email.id)} */
                  />
                )}
                {email.isImportant && (
                  <FontIcon
                    aria-label="Important"
                    iconName="Important"
                    className={[
                      styles.iconStyles,
                      styles.iconImportantStyles,
                    ].join(' ')}
                    /*  onClick={deleteClickHandler.bind(null, email.id)} */
                  />
                )}
              </span>
            </div>
            <div className={styles.subjectWrapper}>
              <div
                className={[styles.subject, !email.read && styles.unread].join(
                  ' ',
                )}>
                <span>{email.subject.replace(/<.*?>/gi, '')}</span>
              </div>
              <span className={styles.dateWrapper}>
                {moment(email.date).diff(
                  moment(email.date).format('YYYY-MM-DD'),
                  'days',
                ) <= 1 ? (
                  <span className={styles.date}>
                    {moment(email.date).format('hh:MM A')}
                  </span>
                ) : moment(email.date).diff(
                    moment(email.date).format('YYYY-MM-DD'),
                    'days',
                  ) <= 7 ? (
                  <span>
                    <span className={styles.date}>
                      {moment(email.date).format('ddd,')}{' '}
                      {moment(email.date).format('MM/DD')}
                    </span>
                  </span>
                ) : (
                  <span>
                    <span className={styles.date}>
                      {moment(email.date).format('MM/DD/YYYY')}
                    </span>
                  </span>
                )}
              </span>
            </div>
            <div className={styles.subjectContent}>
              <span>{email.message.replace(/<.*?>/gi, '')}</span>
            </div>
          </div>
        </li>
      );
    });
  }, [
    id,
    emails,
    handleClick,
    folderEmail,
    TickCheckboxHandler,
    deleteClickHandler,
    readToggleClickHandler,
    flagClickHandler,
    archiveClickHandler,
  ]);

  const fallBack = () => {
    /*  return (
            <div className={classes.fallBackStyles}>
                <img src={noMail} alt="nothing present here" />
                <span>Nothing in {mailData.selectedFolder.toLowerCase()}.</span>
                <span>Looks empty over here!</span>
            </div> 
        )*/
  };

  const filterMenuProps = {
    items: [
      {
        key: 'all',
        text: 'All',
        iconProps: { iconName: 'Accept' },
      },
      {
        key: 'unread',
        text: 'Unread',
        iconProps: { iconName: '' },
      },
      {
        key: 'tome',
        text: 'To me',
        iconProps: { iconName: '' },
      },
      {
        key: 'flagged',
        text: 'Flagged',
        iconProps: { iconName: '' },
      },
      {
        key: 'mentions',
        text: 'Mentions',
        iconProps: { iconName: '' },
      },
      {
        key: 'attachments',
        text: 'Attachments',
        iconProps: { iconName: '' },
      },
      {
        key: 'sort',
        text: 'Sort',
        subMenuProps: subMenuProps,
      },
    ],
    onItemClick: (e:any, value:any) => {
      clickFilterHandler(value);
    },
  };
  return (
    <Fragment>
      <div className="email-list">
        <div className={styles.header}>
          <div className={styles.headerCheckBoxWrapper}>
            {selectedFolder !== 'Deleted Items' && (
              <Checkbox
                className={styles.checkAll}
                onChange={(e, isCheck) => handleCheckAll(e, isCheck)}
              />
            )}
            <div className={styles.headerFolderName}>{selectedFolder}</div>
          </div>
          {isFilterAll && (
            <ActionButton
              text="Filter"
              menuProps={filterMenuProps}
              split={true}
              className={'btnPlain btnPrimary ' + styles.btnFilterCustom}
            />
          )}
          {!isFilterAll && (
            <ActionButton
              text={lblSelectedFilter}
              iconProps={{ iconName: 'ChromeClose' }}
              className={
                'btnPlain btnPrimary btnIconRight ' + styles.btnFilterCustom
              }
              onClick={handleRemoveFilter}
            />
          )}
        </div>
      </div>
      <div className={styles.emailListContainer}>
        <main>
          <InfiniteScroll
            dataLength={emails.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<div className={styles.loading}> <Spinner size={SpinnerSize.medium} /></div>}
            height={'calc(100vh - 200px)'}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }>
            <ul>{generateMailList()}</ul>
          </InfiniteScroll>
        </main>
      </div>
    </Fragment>
  );
};

export default MailList;
