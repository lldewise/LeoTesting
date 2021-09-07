import React, { Fragment, useState } from 'react';
import { useBoolean } from '@uifabric/react-hooks';
import image1 from '../../../../assets/quicklink.png';
import classes from './MyQuicklinks.module.scss';
import { ActionButton } from 'office-ui-fabric-react';
//eslint-disable-next-line
import { Callout, Stack, IconButton, Link } from "office-ui-fabric-react";
import { intl } from '../../../../util/commonFunction';
import { LabelNames } from '../../../../util/constant';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../../../store/store';

const quickLinkList = [
  {
    id: 1,
    image: image1,
    text: 'Enroll Student',
  },
  {
    id: 2,
    image: image1,
    text: 'Credit Absence',
  },
  {
    id: 3,
    image: image1,
    text: 'Add Activity',
  },
  {
    id: 4,
    image: image1,
    text: 'Create Team',
  },
];

interface IMargin{
  marginTop:string,
  marginLeft:string
}

interface IQuickLinks {
  id: number;
  image: string;
  text: string;
};

const MyQuickLinks: React.FC = () => {
  //eslint-disable-next-line
  const [data, dispatch] = useStore();
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
    useBoolean(false);
  const [menucss, setMenucss] = useState<IMargin | null>(null);
  const history = useHistory();

  //eslint-disable-next-line
  // const calloutHandler = (data: any) => {
  //   setMenucss({
  //     marginTop: data.clientY - 30 + 'px',
  //     marginLeft: data.clientX - 75 + 'px',
  //   });

  //   toggleIsCalloutVisible();
  // };

  const gotoPage = (item: IQuickLinks) => {
    switch (item.id) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        dispatch('SELECTEDACTIVITYITEM', null);
        history.push('./administration/activities/create');
        dispatch('UPDATE_NAVIGATION', 63);
        break;
      case 4:
        break;
      default:
        break;
    }
  };

  const quiklink: any[] = [];

  quickLinkList.forEach((item, index) => {
    quiklink.push(
      <Link className={'card-default ' + classes.divwidth} key={index}>
        <div
          key={index}
          className={classes.quicklinkDiv}
          onClick={() => gotoPage(item)}>
          <div className={'card-default-body ' + classes.cardQuicklinks}>
            <Stack horizontal horizontalAlign="center">
              <img
                src={item.image}
                className={classes.imageList}
                alt={item.text}
              />
              <div className={classes.title}>{item.text}</div>
              <div className={classes.icon}>
                {/* <IconButton
                  onClick={(data) => {
                    calloutHandler(data, item);
                  }}
                  iconProps={{ iconName: "More" }}
                  className={classes.FontIcon}
                /> */}
              </div>
            </Stack>
          </div>
        </div>
      </Link>,
    );
  });

  const moreQuikLink = (
    <div className={'card-default ' + classes.divwidthMore}>
      <div className={'card-default-body ' + classes.container}>
        <ActionButton className={'btnPlain btnInfo ' + classes.quicklinkmore}>
          +5
        </ActionButton>
      </div>
    </div>
  );

  return (
    <>
      {isCalloutVisible ? (
        <Callout
          onDismiss={toggleIsCalloutVisible}
          role="alertdialog"
          // className={menucss}
          isBeakVisible={false}
          gapSpace={0}
          setInitialFocus>
          <div>
            <ActionButton allowDisabledFocus>Delete</ActionButton>
          </div>
          <div>
            <ActionButton allowDisabledFocus>Edit</ActionButton>
          </div>
        </Callout>
      ) : null}

      <div className={'ms-Grid-row '}>
        <div className={'dashboard-title'}>{intl(LabelNames.myquicklinks)}</div>
      </div>

      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg12 ">
          <Stack horizontal wrap horizontalAlign="stretch">
            {quiklink} {moreQuikLink}
          </Stack>
        </div>
      </div>
    </>
  );
};

export default MyQuickLinks;