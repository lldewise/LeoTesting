import React, { Fragment, useState } from 'react';
import styles from './EmailList.module.scss';
import { Checkbox, ActionButton } from 'office-ui-fabric-react';
import noMailItems from '../../../../assets/no-mail-items.png';
import { EmailListItem } from './EmailListItem';

const EmailList = ({
  emails,
  onEmailRead,
  onEmailSelected,
  onCheckAll,
  folderEmail,
  filterUnread,
  filterFolder,
  sortFolder,
  isFilterAll,
  lblSelectedFilter,
  handleRemoveFilter,
  subMenuProps,
}) => {
  if (emails.length === 0) {
    return (
      <Fragment>
        <div className="email-list">
          <div className={styles.header}>
            <Checkbox
              className={styles.checkAll}
              onChange={(e, isCheck) => handleCheckAll(e, isCheck)}
            />
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
        <div className={styles.empty}>
          <div className={styles.images}>
            <img
              alt={noMailItems}
              src={noMailItems}
              style={{ height: '110px', width: '110px' }}
            />
          </div>
          Looks empty over here.
        </div>
      </Fragment>
    );
  }

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
    onItemClick: (e, value) => {
      clickFilterHandler(value);
    },
  };

  const clickFilterHandler = value => {
    filterFolder(value);
  };

  const handleCheckAll = (item, isCheck) => {
    // filterUnread(item);
    onCheckAll(isCheck, emails);
  };

  return (
    <Fragment>
      <div className="email-list">
        <div className={styles.header}>
          <Checkbox
            className={styles.checkAll}
            onChange={(e, isCheck) => handleCheckAll(e, isCheck)}
          />
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
      {emails.map((email, key) => {
        return (
          <EmailListItem
            key={key}
            onEmailClicked={id => {
              onEmailRead(id, email.conversationId, emails, folderEmail);
            }}
            onCheckboxTick={id => {
              onEmailSelected(id, emails);
            }}
            email={email}
          />
        );
      })}
    </Fragment>
  );
};

export default EmailList;
