import React, { Fragment, useEffect, useState, useRef } from 'react';
import styles from './ClassCreate.module.scss';
import { LabelNames } from '../../../../util/constant';
import { intl } from '../../../../util/commonFunction';
import ClassInformation from './ClassInformation/ClassInformation';
import Students from './Students';
import PeriodAndElement from './PeriodAndElement/PeriodAndElement';
import Teacher from './Teacher/Teacher';
import Notes from './Notes/Notes';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../../../store/store';
import { FontIcon, Nav } from 'office-ui-fabric-react';
import apiGet from '../../../../services/apiGet';
const navStyles = {
  root: {
    width: 208,
    height: 350,
    boxSizing: 'border-box',
    border: '1px solid #eee',
    overflowY: 'auto',
  },
};

const ClassNav = [
  {
    links: [
      {
        name: 'Class Information',
        key: '1',
        icon: 'Info',
        disabled: false,
      },
      {
        name: 'Class Period & Elements',
        key: '2',
        icon: 'EventDate',
        disabled: false,
      },
      {
        name: 'Students',
        key: '4',
        icon: 'IDBadge',
        disabled: false,
      },
      {
        name: 'Teacher',
        key: '5',
        icon: 'AccountManagement',
        disabled: false,
      },
      {
        name: 'Notes',
        key: '6',
        icon: 'Message',
        disabled: false,
      },
    ],
  },
];

const xprsSubject = ['English', 'Math', 'Science', 'History'].map(item => ({
  key: item,
  name: item,
}));

const teacherList = [
  {
    id: 1,
    imageUrl: null,
    name: 'Dennis Migrino',
  },
  {
    id: 2,
    imageUrl: null,
    name: 'Leo Lopez',
  },
  {
    id: 3,
    imageUrl: null,
    name: 'Eric Cantorna',
  },
  {
    id: 4,
    imageUrl: null,
    name: 'Jay Celeste',
  },
];

const finalYearSample = [
  {
    id: 1,
    name: 'Summer 2021',
  },
  {
    id: 2,
    name: 'Summer 2022',
  },
  {
    id: 3,
    name: 'Summer 2023',
  },
  {
    id: 4,
    name: 'Summer 2024',
  },
];

const ClassCreate: React.FC = () => {
  const [data, dispatch] = useStore();
  const history = useHistory();
  const [navLink, setNavLink] = useState<any[]>(ClassNav);
  const [selectedMenu, setSelectedMenu] = useState<string>('1');
  const selectedMenuRef = useRef();
  const [container, setContainer] = useState<JSX.Element>();
  //const [teacherList,setTeacherList] =useState();

  const _onLinkClick = (ev: any, item: any) => {
    selectedMenuRef.current = item.key.toString();
    setSelectedMenu(item.key.toString());
    selectedNavigation(item.key);
  };

  const cancelHandler = () => {
    history.push('../manage-classes');
  };

  const selectedNavigation = (key: any) => {
    switch (Number(key)) {
      case 1:
        return setContainer(
          <ClassInformation xprsSubject={xprsSubject} cancel={cancelHandler} />,
        );
      case 2:
        return setContainer(
          <PeriodAndElement finalYearList={finalYearSample} />,
        );
      case 3:
        return setContainer(<></>);
      case 4:
        return setContainer(<Students />);
      case 5:
        return setContainer(
          <Teacher
            xprsSubject={xprsSubject}
            teacherList={teacherList}
            cancel={cancelHandler}
          />,
        );
      case 6:
        return setContainer(<Notes />);

      default:
    }
  };

  // Getting the list of enrolled student --------------------------------------------
  useEffect(() => {
    if (data.userProfile.id !== null) {
      getEnrolledStudent();
    }
  }, [data.userProfile.id]);

  const getEnrolledStudent = () => {
    apiGet
      .get(
        'api/school/' +
          data.userProfile.school +
          '/student/enrolled/list?clientId=' +
          data.userExternalUnique,
      )
      .then(res => {
        if (res.status === 200) {
          dispatch('SETENROLLEDSTUDENTLIST', res.data);
        }
      });
  };
  //----------------------------------------------------------------------------------

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    selectedNavigation('1');
  };

  // const getTeacherList = () => {
  //     var teacher = []
  //       var item = {
  //         text: "Eric Cantorna",
  //         secondaryText: "",
  //         tertiaryText: "",
  //         optionalText: "",
  //         presence: 1,
  //         image:null
  //       };
  //       teacher.push(item);
  //     setTeacherList(teacher);
  // };

  // useEffect(()=>{
  //   getTeacherList();
  // },[])

  return (
    <>
      <div className={'ms-Grid-row noAteduPrint'}>
        <div className={'ms-Grid-col ms-lg12 ' + styles.header}>
          <div className={'ms-Grid-row '}>
            <div className={'ms-Grid-col ms-lg12 '}>
              <div className={'ms-Grid-col ms-lg1 ' + styles.iconWidth}>
                <FontIcon iconName="Dictionary" />
              </div>
              <div className={'ms-Grid-col ms-lg6 ' + styles.headertitle}>
                Classes
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.containerPad}>
        <div className="ms-Grid-row ">
          <div className={'ms-Grid-col ms-lg12 ' + styles.headerTitle}>
            {intl(LabelNames.userprofilecreate)} class
          </div>
        </div>
        <div className="ms-Grid-row ">
          <div className={'ms-Grid-col ms-lg12 ' + styles.headerdesc}>
            Create a class for a student to study. You can also duplicate an
            existing class
          </div>
        </div>
        <br />
        <div className="ms-Grid-row ">
          <div className="ms-Grid-col ms-lg12 ">
            <div className={styles.container}>
              <div className={styles.sidenav}>
                <div className={'AccountSettingPersona ' + styles.persona}>
                  <div className={styles.navTitle}>2021 EN/k</div>
                  <div className={styles.navSubTtitle}>2021 - Summer 2024</div>
                </div>
                <div className={'navProfileContainer '}>
                  <Nav
                    onLinkClick={_onLinkClick}
                    selectedKey={selectedMenu}
                    ariaLabel="Nav basic example"
                    styles={navStyles}
                    groups={navLink}
                  />
                </div>
              </div>
              <div
                className={
                  selectedMenuRef.current !== '4'
                    ? styles.content
                    : styles.studentContainer + ' accountingScroll'
                }>
                {container}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassCreate;
