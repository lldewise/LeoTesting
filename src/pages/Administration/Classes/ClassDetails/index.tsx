import React, { Fragment, useEffect, useState } from 'react';
import classes from './ClassDetails.module.scss';
import DialogConfimation from '../../../../components/userInterface/DialogConfirmation/DialogConfirmation';
import {
  DialogType,
  ActionButton,
  FontIcon,
  Pivot,
  PivotItem,
  IconButton,
  Breadcrumb,
  IBreadcrumbItem,
  Stylesheet,
} from 'office-ui-fabric-react';
import { useStore } from '../../../../store/store';
import { intl } from '../../../../util/commonFunction';
import { LabelNames } from '../../../../util/constant';
import Student from './Students/Students';
import Teacher from './Teacher/Teacher';
import Notes from './Notes/Notes';
import Files from './Files/Files';
const pivotStyles = {
  root: [
    {
      borderBottomColor: '#6c35d4 !mportant',
    },
  ],
  linkIsSelected: {
    selectors: {
      ':before': {
        height: '3px',
        backgroundColor: '#6c35d4',
      },
    },
  },
  text: {
    fontSize: '14px',
    fontFamily: 'Segoe UI',
  },
};

const ClassDetails: React.FC = () => {
  const [breadcrumbList, setBreadCrumb] = useState<IBreadcrumbItem[]>([]);
  const [shimmer, setShimmer] = useState<boolean>(false);
  const menuProps = {
    items: [
      {
        id: '1',
        key: 'edit',
        text: 'Manage Class',
        iconProps: { iconName: 'Edit' },
      },
      {
        id: '2',
        key: 'delete',
        text: 'Duplicate Class',
        iconProps: { iconName: 'Copy' },
      },
    ],
    onItemClick: (data: any, value: any) => {
      clickMenuHandler(data, value);
    },
  };

  const onBreadcrumbItemClicked = () => {};

  const items: any[] = [
    { text: intl(LabelNames.classes) },
    { text: 'English', onClick: onBreadcrumbItemClicked },
  ];

  useEffect(() => {
    const updatedItem = [...items];
    updatedItem[1].text = 'English';
    updatedItem.push({ text: '2020 EN/k', isCurrentItem: true });
    setBreadCrumb(updatedItem);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getFolderChildren = (item: any) => {};

  const clickMenuHandler = (data: any, value: any) => {};
  return (
    <>
      <div className={classes.headerContainer}>
        <div className="ms-Grid-row ">
          <div className="ms-Grid-col ms-lg12 ">
            <div className={'ms-Grid-row '}>
              <div
                className={
                  'ms-Grid-col ms-lg12 ' +
                  classes.header +
                  ' ' +
                  classes.headerFlex
                }>
                <div>
                  <Breadcrumb
                    items={breadcrumbList}
                    maxDisplayedItems={10}
                    ariaLabel="Breadcrumb with items rendered as buttons"
                    overflowAriaLabel="More links"
                    className={classes.BreadcrumbContainer}
                  />
                </div>
                <div className={classes.pullRight}>
                  <ActionButton
                    className="btnPlain btnPrimary"
                    iconProps={{ iconName: 'CommentAdd' }}
                    text="Add Note"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={'ms-Grid-row ' + classes.date}>
        <div className="ms-Grid-col ms-lg-12">
          <div className="ms-Grid-col ms-lg-12">
            <div className={classes.headerFlex + ' ' + classes.titleSubject}>
              <div>{'2021 EN/k'}</div>
              <div className={classes.headerTitleIcon}>
                <IconButton
                  id={'moreLink'}
                  iconProps={{
                    iconName: 'More',
                    onClick: () => {},
                  }}
                  className="btnIcon btnIconDark btnIconLg hideMenuIcon"
                  menuProps={menuProps}
                />
              </div>
            </div>

            <div className={classes.headerFlex}>
              <div
                className={
                  classes.headerFlex + ' ' + classes.titleSubjectDetils
                }>
                <div className={classes.headerIcon}>
                  <FontIcon iconName="Info" className="padR5" />
                </div>
                <div>{'7972A Englelsk (bek-1, gym-bel-497)'}</div>
                <div className={'padl5 ' + classes.headerIcon}>
                  <FontIcon iconName="RadioBullet" />
                </div>
                {' Line of Study'}
              </div>
            </div>
            <div className={classes.headerFlex}>
              <div
                className={
                  classes.headerFlex + ' ' + classes.titleSubjectDetils
                }>
                <div className={classes.headerIcon}>
                  <FontIcon iconName="Group" />
                </div>
                <div>1k en</div>
              </div>
              <div
                className={
                  classes.headerFlex + ' ' + classes.titleSubjectDetils
                }>
                <div className={classes.headerIcon}>
                  <FontIcon iconName="EventDate" />
                </div>
                <div>2021/22</div>
              </div>
              <div
                className={
                  classes.headerFlex + ' ' + classes.titleSubjectDetils
                }>
                <div className={classes.headerIcon}>
                  <FontIcon iconName="IDBadge" />
                </div>
                <div>3</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.pivotPad}>
        <Pivot styles={pivotStyles} defaultSelectedKey={'2'}>
          <PivotItem
            headerText={'To Do'}
            itemIcon="WaitlistConfirm"
            itemKey="1"></PivotItem>
          <PivotItem itemIcon="IDBadge" headerText={'Student'} itemKey="2">
            <Student shimmer={shimmer} />
          </PivotItem>
          <PivotItem
            itemIcon="AccountManagement"
            headerText={'Teacher'}
            itemKey="3">
            <Teacher />
          </PivotItem>
          <PivotItem itemIcon="Message" headerText={'Notes'} itemKey="4">
            <Notes />
          </PivotItem>
          <PivotItem itemIcon="DocumentSet" headerText={'Files'} itemKey="5">
            <Files getFolderChildren={getFolderChildren} shimmer={shimmer} />
          </PivotItem>
          <PivotItem
            itemIcon="ClipboardList"
            headerText={'Attendance'}
            itemKey="6"></PivotItem>
          <PivotItem
            itemIcon="LineChart"
            headerText={'Grades'}
            itemKey="7"></PivotItem>
        </Pivot>
      </div>
    </>
  );
};
export default ClassDetails;
