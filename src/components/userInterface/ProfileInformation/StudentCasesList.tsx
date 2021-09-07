import React, { Fragment, useState } from 'react';
import styles from './ProfileInformation.module.scss';
import {
  FontIcon,
  Icon,
  DetailsList,
  Persona,
  PersonaSize,
  PrimaryButton,
  IconButton,
} from 'office-ui-fabric-react';
import { getFileTypeIconProps } from '@uifabric/file-type-icons';
import emptyItems from '../../../assets/empty.png';
import moment from 'moment';
import { CheckboxVisibility, DetailsListLayoutMode } from '@fluentui/react';
import './StudentCasesList.scss';

const dpPerson = {
  root: {
    fontSize: '18px !important',
  },
  primaryText: {
    fontSize: '14px !important',
    fontWeight: '400',
  },
  secondaryText: {
    fontSize: '14px !important',
  },
  initials: {
    textDecoration: 'none !important',
  },
  coin: {
    textDecoration: 'none !important',
  },
};

const handleUpload = () => {};

type StudentCasesListProps = {
  listItems: any[];
  isUpload: any;
  uploadFileHandler: any;
};

const StudentCasesList: React.FC<StudentCasesListProps> = props => {
  const menuPropsActive = {
    items: [
      {
        id: '1',
        key: 'downloadFile',
        text: 'Download',
        iconProps: { iconName: 'Download' },
      },
      {
        id: '2',
        key: 'deleteFile',
        text: 'Delete',
        iconProps: { iconName: 'Delete' },
      },
    ],
    onItemClick: (e: any, value: any) => {
      clickMenuHandler(value);
    },
  };

  const clickMenuHandler = (item: any) => {
    if (item.key === 'uploadFile') {
      props.uploadFileHandler(item);
    }
  };

  const handleCAlloutClick = (item: any) => {};

  const _columns = [
    {
      key: '0',
      name: 'File name',
      fieldName: '',
      minWidth: 240,
      maxWidth: 240,
      onRender: (item: any) => {
        const myicon =
          item.icon !== undefined ? (
            <>
              <div className={styles.fileNameSection}>
                <Icon
                  {...getFileTypeIconProps({
                    extension: item.icon,
                    size: 40,
                    imageFileType: 'png',
                  })}
                />{' '}
                <div className={'padT10 ' + styles.title}>{item.name}</div>
              </div>
              <div className={styles.bntSection}>
                <IconButton
                  id={'moreLink' + item.id}
                  iconProps={{
                    iconName: 'moreVertical',
                    onClick: () => handleCAlloutClick(item),
                  }}
                  className="btnIcon btnIconDark btnIcon hideMenuIcon"
                  menuProps={menuPropsActive}
                />
              </div>
            </>
          ) : (
            <>
              <div className={styles.fileNameSection}>
                <FontIcon
                  className={styles.fontIcon}
                  iconName={item.fonticon}
                />{' '}
                <div className={'padT10 ' + styles.title}>{item.name}</div>
              </div>
              <div className={styles.bntSection}>
                <IconButton
                  id={'moreLink' + item.id}
                  iconProps={{
                    iconName: 'moreVertical',
                    onClick: () => handleCAlloutClick(item),
                  }}
                  className="btnIcon btnIconDark btnIcon hideMenuIcon"
                  menuProps={menuPropsActive}
                />
              </div>
            </>
          );
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            {myicon}
          </div>
        );
      },
    },
    {
      key: '1',
      name: 'Uploaded by',
      fieldName: '',
      minWidth: 100,
      maxWidth: 100,
      onRender: (item: any) => {
        return (
          <div className={styles.personaSection}>
            <Persona
              imageUrl={item.imgUrl}
              hidePersonaDetails={true}
              text={item.createdby}
              size={PersonaSize.size32}
              styles={dpPerson}
            />
            <span className={styles.lastUpdated}>
              on {moment(item.lastupdated).format('MMMM DD, YYYY')}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="ms-Grid-row">
        {!props.isUpload ? (
          <div className="ms-Grid-col ms-lg12 contentStudentCasesList">
            <DetailsList
              items={props.listItems}
              columns={_columns}
              selectionPreservedOnEmptyClick={true}
              setKey="set"
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
              checkboxVisibility={CheckboxVisibility.always}
            />
          </div>
        ) : (
          <>
            <div className="ms-Grid-row ">
              <div
                className={
                  'ms-Grid-col ms-lg12 ' + styles.uploadSectionContainer
                }>
                <div className={styles.info}>
                  <img
                    alt={emptyItems}
                    src={emptyItems}
                    style={{ height: '90px' }}
                  />
                  <div className={styles.uploadMessageTitle}>
                    Nothing to show here
                  </div>
                  <div className={styles.uploadMessage}>
                    Do you have a file to upload for a case?
                  </div>
                  <div className={styles.uploadMessageBtn}>
                    <PrimaryButton
                      onClick={handleUpload}
                      text="Upload a file"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default StudentCasesList;
