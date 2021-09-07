import React, { Fragment, useState, useEffect } from 'react';
import classes from './CategoryModal.module.scss';
import { LabelNames } from '../../../../util/constant';
import { intl } from '../../../../util/commonFunction';
import {
  mergeStyleSets,
  Modal,
  IconButton,
  getTheme,
  FontIcon,
  PrimaryButton,
} from 'office-ui-fabric-react';

type CategoryModalProps = {
  menu: any;
  continue: any;
  isModalOpen: any;
  hideModal: any;
  title: any;
  subtitle: any;
  showModal:any;
};

const CategoryModal: React.FC<CategoryModalProps> = props => {
  const [activeMenu, setActiveMenu] = useState(props.menu);
  const [categoryItem, setCategoryItem] = useState(
    props.menu.find((r:any) => r.active === true),
  );

  const menuHandler = (id:any) => {
    const updatedList = [...activeMenu];
    id = Number(id);
    updatedList.forEach(item => {
      item.classname = classes.box;
      item.active = false;
      if (item.id === id) {
        item.classname = classes.boxActive;
        item.active = true;
        setCategoryItem(item);
      }
    });
    setActiveMenu(updatedList);
  };

  useEffect(() => {
    const updatedList = [...activeMenu];
    updatedList.forEach(item => {
      item.classname = classes.box;
      if (item.active) {
        item.classname = classes.boxActive;
        item.active = true;
        setCategoryItem(item);
      }
    });
    setActiveMenu(updatedList);
  }, [props.menu]); //eslint-disable-line react-hooks/exhaustive-deps

  const menuList:any = [];
  activeMenu.forEach((item:any, index:any) => {
    const cssContainer = item.active ? '' : 'categoryHover';
    menuList.push(
      <div
        className="ms-Grid-row "
        onClick={() => {
          menuHandler(item.id);
        }}
        key={index}>
        <div className={'ms-Grid-col ms-lg12 ' + cssContainer}>
          <div
            className={
              'ms-Grid-row  ' + item.classname + ' ' + classes.hoverItem
            }>
            <div className="ms-Grid-col ms-lg12 text-center">
              <FontIcon className={classes.fontIcon} iconName={item.icon} />
            </div>
            <div
              className={'ms-Grid-col ms-lg12 text-center ' + classes.boxtitle}>
              {item.title}
            </div>
          </div>
          <br />
          {item.active === true ? (
            <div className={'ms-Grid-row '}>
              <div
                className={
                  'ms-Grid-col ms-lg12 text-center ' + classes.description
                }>
                {item.description}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>,
    );
  });

  return (
    <>
      <Modal
        isOpen={props.isModalOpen}
        onDismiss={props.hideModal}
        containerClassName={contentStyles.container}>
        <div className={contentStyles.header}>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={props.hideModal}
          />
        </div>
        <div className={contentStyles.body}>
          <div className="ms-Grid-row ">
            <div className="ms-Grid-col ms-lg12 ">
              <div className={classes.titleHeader}>{intl(props.title)}</div>
              <div className={classes.titleHeaderbot}>
                {intl(props.subtitle)}
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + classes.container}>
              {menuList}
            </div>
            <br />
            <br />
            <br />
            <div className="text-center ">
              {' '}
              <PrimaryButton
                className="btnPrimary"
                onClick={() => {
                  props.continue(categoryItem);
                }}
                text={intl(LabelNames.continue)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

const cancelIcon = { iconName: 'Cancel' };
const theme = getTheme();
const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    width: '680px',
  },
  header: [
    {
      flex: '1 1 auto',
      fontSize: '20px',
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: '600',
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});

export default CategoryModal;
