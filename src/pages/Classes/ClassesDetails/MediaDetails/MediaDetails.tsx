import React, { Fragment, useState } from 'react';
import { useStore } from '../../../../store/store';
import { MediaList } from '../../../../components/itemlist/MediaList/MediaList';
import classes from './MediaDetails.module.scss';
import { LabelNames } from '../../../../util/constant';
import { intl } from '../../../../util/commonFunction';
import { Dropdown, ActionButton, FontIcon, Icon } from 'office-ui-fabric-react';
import { getFileTypeIconProps } from '@uifabric/file-type-icons';
import { useBoolean } from '@uifabric/react-hooks';
import { IconButton } from 'office-ui-fabric-react';

const sortingOptions = [
  { key: 'Date latest-oldest', text: 'Date latest-oldest' },
  { key: 'Date oldest latest', text: 'Date oldest latest' },
  { key: 'A-Z', text: 'A-Z' },
  { key: 'Z-A', text: 'Z-A' },
];

const SortingdropdownStyles = {
  dropdown: {
    width: 150,
  },
};

interface IMenuCSS {
  marginTop: any;
  marginLeft: any;
}

const MediaDetails: React.FC = () => {
  // eslint-disable-next-line
  const [data, dispatch] = useStore();
  const [listData, setListData] = useState(data.mediaList);
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
    useBoolean(false);
  const [menucss, setMenucss] = useState<IMenuCSS | null>();

  const viewdropDownHandler = (data: any) => {
    setMenucss({
      marginTop: data.clientY - 5 + 'px',
      marginLeft: data.clientX - 80 + 'px',
    });
    toggleIsCalloutVisible();
  };
  const closedropDownHandler = (data: any) => {
    toggleIsCalloutVisible();
  };

  const _columns = [
    {
      key: '0',
      name: '',
      fieldName: '',
      minWidth: 30,
      maxWidth: 30,
      onRender: (item: any) => {
        const myicon =
          item.icon.length > 0 ? (
            <Icon
              {...getFileTypeIconProps({
                extension: item.icon,
                size: 40,
                imageFileType: 'png',
              })}
            />
          ) : (
            <FontIcon className={classes.fontIcon} iconName={item.fonticon} />
          );
        return <div>{myicon}</div>;
      },
    },
    {
      key: '1',
      name: '',
      fieldName: '',
      minWidth: 100,
      maxWidth: 420,
      onRender: (item: any) => {
        return <div className={'padT10 ' + classes.title}>{item.name}</div>;
      },
    },

    {
      key: '2',
      name: '',
      fieldName: '',
      minWidth: 10,
      maxWidth: 10,
      onRender: (item: any) => {
        return (
          <div className="padT10">
            {item.check ? (
              <div
                onMouseEnter={ev => {
                  viewdropDownHandler(ev);
                }}
                onMouseLeave={closedropDownHandler}
                className="padR10">
                <FontIcon
                  className={classes.moreVertical}
                  iconName="MoreVertical"
                />
              </div>
            ) : null}
          </div>
        );
      },
    },

    {
      key: '2',
      name: '',
      fieldName: '',
      minWidth: 60,
      maxWidth: 60,
      onRender: (item: any) => {
        return (
          <div className="padT10">
            <div className={classes.itemSingle}>
              <span> Oct 2</span>
            </div>
          </div>
        );
      },
    },
    {
      key: '3',
      name: '',
      fieldName: '',
      minWidth: 80,
      maxWidth: 80,
      onRender: (item: any) => {
        return <div className="padT10">Submitted</div>;
      },
    },
    {
      key: '4',
      name: '',
      fieldName: '',
      minWidth: 20,
      maxWidth: 20,
      onRender: (item: any) => {
        return (
          <div>
            <div className={classes.itemSingle}>
              <IconButton
                iconProps={{ iconName: 'Edit' }}
                className={'btnIcon hideMenuIcon ' + classes.iconEdit}
              />
            </div>
          </div>
        );
      },
    },

    {
      key: '5',
      name: '',
      fieldName: '',
      minWidth: 100,
      maxWidth: 100,
      onRender: (item: any) => {
        return (
          <div>
            <div>
              <span className={classes.itemDetailsBold}>{item.createdby}</span>
              <span> edited</span>
            </div>
            <div className={classes.itemDetails}>{item.lastupdated}</div>
          </div>
        );
      },
    },
  ];

  const showHorizontalHandler = (value: any) => {
    const updateData = [...listData];
    updateData.forEach((item, index) => {
      const checkValue = value[index];
      item.check = false;
      if (checkValue !== undefined) {
        item.check = !item.check;
      }
    });
    setListData(updateData);
  };

  return (
    <>
      <div className="ms-Grid-row ">
        <div className="ms-Grid-col ms-lg12">
          <div className={'ms-Grid-row bclist ' + classes.container}>
            <div className={'ms-Grid-col ms-lg5 '}>
              <div className={'ms-Grid-row bclist DropdownBoderLess '}>
                <div className={'ms-Grid-col ms-lg1 ' + classes.filterwidth}>
                  <FontIcon iconName="Sort" className={classes.cursor} />
                </div>
                <div className={'ms-Grid-col ms-lg3 ' + classes.options}>
                  <Dropdown
                    defaultSelectedKey="Date latest-oldest"
                    options={sortingOptions}
                    styles={SortingdropdownStyles}
                  />
                </div>
              </div>
            </div>
            <div
              className={
                'ms-Grid-col ms-lg7 IconBlack DropdownBoderLess ' +
                classes.commandright
              }>
              <ActionButton
                iconProps={{ iconName: 'CalculatorAddition' }}
                className={classes.actionButton}>
                {intl(LabelNames.new)}
              </ActionButton>

              <ActionButton
                iconProps={{ iconName: 'Upload' }}
                className={classes.actionButton}>
                {intl(LabelNames.upload)}
              </ActionButton>

              <ActionButton
                iconProps={{ iconName: 'Download' }}
                className={classes.actionButton}>
                {intl(LabelNames.download)}
              </ActionButton>
            </div>
          </div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-lg12">
              <MediaList
                itemlist={listData}
                _columns={_columns}
                isCalloutVisible={isCalloutVisible}
                menucss={menucss}
                toggleIsCalloutVisible={toggleIsCalloutVisible}
                showHorizontal={showHorizontalHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaDetails;
