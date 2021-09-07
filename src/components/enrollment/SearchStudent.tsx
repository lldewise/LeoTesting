import React, { useState, Fragment, useRef, useEffect } from 'react';
import {
  SearchBox,
  Callout,
  Persona,
  DirectionalHint,
  PersonaSize,
  ActionButton,
  Icon,
} from 'office-ui-fabric-react';
import logger from 'loglevel';
import { useBoolean } from '@fluentui/react-hooks';
import classes from './SearchStudent.module.scss';
//import { searchByFrom } from "../../services/msgraph/email";
import { useStore } from '../../store/store';

const SearchStudent: React.FC = () => {
  const [isCalloutVisible, { setTrue: calloutTrue, setFalse: calloutFalse }] =
    useBoolean(false);
  const [peopleDiv, setPeopleDiv] = useState<any[]>([]);
  const [data, dispatch] = useStore();
  const sidebarSelected = useRef();
  const [studentList, setStudentList] = useState<any[]>([]);

  const studentTest = [
    { name: '1 Jay Celeste', address: 'jayxceleste@gmail.com' },
    { name: '2 Dennis MIgino', address: 'dennis@gmail.com' },
    { name: '3 Jay Celeste', address: 'jayxceleste@gmail.com' },
    { name: '4 Dennis MIgino', address: 'dennis@gmail.com' },
    { name: '5 Jay Celeste', address: 'jayxceleste@gmail.com' },
    { name: '6 Dennis MIgino', address: 'dennis@gmail.com' },
    { name: '7 Jay Celeste', address: 'jayxceleste@gmail.com' },
    { name: '8 Dennis MIgino', address: 'dennis@gmail.com' },
  ];

  const searchChangeHandler = (item: any) => {
    if (item == '') {
      calloutFalse();
    } else {
      calloutTrue();
      searhByFromHandler(item);
    }
  };

  // useEffect(() => {
  //   setStudentList(studentTest);
  // }, [studentTest]);

  const searhByFromHandler = (text: any) => {
    //load data here...
    //listFromPeople(studentList);
    //empty testing
    listFromPeople([]);
  };

  const listFromPeople = (result: any[]) => {
    const divPeople: any[] = [];
    result.forEach(element => {
      divPeople.push(
        <div
          key={element.id}
          onClick={() => {
            gotoMailHandler(result);
          }}
          className={'PersonaSearch ' + classes.linkHover}>
          <Persona
            text={element.name}
            secondaryText={element.address}
            imageUrl={''}
            size={PersonaSize.size40}
          />
        </div>,
      );
    });

    if (result.length > 0) {
      setPeopleDiv(divPeople);
    } else {
      setPeopleDiv([]);
    }
  };

  const gotoMailHandler = (result: any) => {
    dispatch('EMAILSEARCHLISTRESULT', result);
  };

  return (
    <>
      {isCalloutVisible && (
        <Callout
          className={classes.callout}
          role="alertdialog"
          gapSpace={5}
          target="#searchStudentBox"
          onDismiss={calloutFalse}
          isBeakVisible={false}
          directionalHint={DirectionalHint.bottomLeftEdge}>
          <div className={classes.searchContainer}>
            {peopleDiv.length > 0 ? (
              <>
                <div className={classes.title}>Suggested People</div>
                <div className={classes.resultList}>{peopleDiv}</div>
              </>
            ) : (
              <div className={classes.noresult}>
                <ActionButton className="btnPlain ">
                  Create Student
                </ActionButton>
              </div>
            )}
          </div>
        </Callout>
      )}

      <SearchBox
        id="searchStudentBox"
        placeholder="Search the student account you want to enroll"
        iconProps={{ iconName: 'ProfileSearch' }}
        onSearch={newValue => logger.log('value is ' + newValue)}
        onChange={(e, value) => searchChangeHandler(value)}
        style={{ width: '400px' }}
      />
    </>
  );
};
export default SearchStudent;
