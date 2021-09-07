import React, { useState, Fragment, useRef, useEffect } from 'react';
import {
  SearchBox,
  Callout,
  Persona,
  DirectionalHint,
  PersonaSize,
} from 'office-ui-fabric-react';
import logger from 'loglevel';
import { useBoolean } from '@fluentui/react-hooks';
import classes from './TopMenu.module.scss';
import { searchByFrom } from '../../../services/msgraph/email';
import { useStore } from '../../../store/store';

const SearchEngine: React.FC = () => {
  const [isCalloutVisible, { setTrue: calloutTrue, setFalse: calloutFalse }] =
    useBoolean(false);
  const [peopleDiv, setPeopleDiv] = useState<any>();
  const [data, dispatch] = useStore();
  const sidebarSelected = useRef();
  const searchChangeHandler = (item?: string) => {
    if (item === '') {
      calloutFalse();
    } else {
      calloutTrue();
      searhByFromHandler(item as string);
    }
  };

  const searhByFromHandler = (text: string) => {
    if (sidebarSelected.current === '64') {
      searchByFrom(text).then(r => {
        listFromPeople(r.value);
      });
    }
  };

  const listFromPeople = (result: any) => {
    const divPeople: any[] = [];
    result.forEach((element: any) => {
      divPeople.push(
        <div
          key={element.id}
          onClick={() => {
            gotoMailHandler(result);
          }}
          className={'PersonaSearch ' + classes.linkHover}>
          <Persona
            text={element.from.emailAddress.name}
            secondaryText={`from:"${element.from.emailAddress.address}"`}
            size={PersonaSize.size40}
          />
        </div>,
      );
    });
    setPeopleDiv(divPeople);
  };
  const gotoMailHandler = (result: any) => {
    dispatch('EMAILSEARCHLISTRESULT', result);
  };

  useEffect(() => {
    sidebarSelected.current = data.sidebarSelectedKey;
  }, [data.sidebarSelectedKey]);

  return (
    <>
      {isCalloutVisible && (
        <Callout
          //ariaLabelledBy={labelId}
          //ariaDescribedBy={descriptionId}
          className={classes.callout}
          role="alertdialog"
          gapSpace={5}
          target="#topSearchBox"
          onDismiss={calloutFalse}
          isBeakVisible={false}
          directionalHint={DirectionalHint.bottomLeftEdge}>
          <div className={classes.searchContainer}>
            <div className={classes.title}>Suggested searches</div>
            {peopleDiv}
          </div>
        </Callout>
      )}

      <SearchBox
        id="topSearchBox"
        placeholder="Search"
        onSearch={newValue => logger.log('value is ' + newValue)}
        onChange={(_e, value) => searchChangeHandler(value)}
        className="ms-Grid-col lg4 searchbox"
        style={{ width: '400px' }}
      />
    </>
  );
};

export default SearchEngine;
