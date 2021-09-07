import React, { useState, useEffect, useRef } from 'react';
import {
  SearchBox,
  IconButton,
  Spinner,
  SpinnerSize,
  ScrollablePane,
  ScrollbarVisibility,
  StickyPositionType,
  Sticky,
  ConstrainMode,
} from 'office-ui-fabric-react';
import styles from './StudentList.module.scss';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DetailsRowFields } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsRowFields';
import {
  DetailsListLayoutMode,
  DetailsRow,
  SelectionMode,
} from 'office-ui-fabric-react/lib/DetailsList';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import './StudentList.scss';
import Pagination from '../../userInterface/Pagination/Pagination';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import _ from 'lodash';
import { useStore } from '../../../store/store';
import { useHistory } from 'react-router-dom';
import apiGet from '../../../services/apiGet';

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

type StudentListProps = {
  listItems: any[];
};

const StudentList: React.FC<StudentListProps> = props => {
  const [data, dispatch] = useStore();
  const [studentList, setStudentList] = useState<any[]>([]);
  const [enrolledStudent, setEnrolledStudent] = useState<any[]>([]);
  const [dataColumn, setDataColumn] = useState<any[] | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage] = useState<number>(15); //display per page
  const [shimmer, setShimmer] = useState<boolean>(true);

  const selectedAccount = useRef<any>(null);
  const spinner = useRef<boolean>(false);
  const id = useRef<any>();

  const history = useHistory();

  const menuProps = {
    items: [
      {
        id: '1',
        key: 'manageInfo',
        text: 'Manage education info',
        iconProps: { iconName: 'ContactCard' },
      },
      {
        id: '2',
        key: 'manageProfile',
        text: 'Manage Profile',
        iconProps: { iconName: 'EditContact' },
      },
      {
        id: '3',
        key: 'disenroll',
        text: 'Disenroll',
        iconProps: { iconName: 'RemoveFilter' },
      },
    ],
    onItemClick: (e: any, props: any) => {
      spinner.current = true;
      clickMenuHandler(props);
    },
  };

  const _columns = [
    {
      key: 'column0',
      name: 'Name',
      fieldName: 'NameWithSort',
      isSorted: true,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      minWidth: 320,
      maxWidth: 350,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, props.listItems);
      },
      onRender: (item: any) => {
        const a = item.student.split('/')[1];
        return (
          <>
            <div className={styles.nameContainer}>
              <div className={styles.studentName}>
                <Persona
                  imageUrl={item.imgUrl}
                  hidePersonaDetails={true}
                  text={item.fullName}
                  size={PersonaSize.size32}
                  secondaryText={item.course}
                  styles={dpPerson}
                />

                <div
                  className={'btnLinkDark ' + styles.name}
                  onClick={() => handleLinkClick(item)}>
                  {item.fullName}{' '}
                </div>
                {spinner.current && a === id.current && (
                  <Spinner
                    size={SpinnerSize.small}
                    className={styles.spinner}
                  />
                )}
              </div>
              <IconButton
                id={'moreLink' + item.id}
                iconProps={{
                  iconName: 'moreVertical',
                  onClick: () => handleCAlloutClick(item),
                }}
                className="btnIcon btnIconDark btnIcon hideMenuIcon"
                menuProps={menuProps}
              />
            </div>
          </>
        );
      },
    },
    {
      key: 'column1',
      name: 'ID',
      fieldName: 'ID',
      isSorted: false,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      minWidth: 50,
      maxWidth: 60,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, props.listItems);
      },
      onRender: (item: any) => {
        return (
          <>
            <div className={styles.tableMargin}>{item.id.split('/')[1]}</div>
          </>
        );
      },
    },
    {
      key: 'column2',
      name: 'Batch',
      fieldName: 'Batch',
      isSorted: false,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      minWidth: 220,
      maxWidth: 240,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, props.listItems);
      },
      onRender: (item: any) => {
        return (
          <>
            <div className={styles.tableMargin}>{item.batchId}</div>
          </>
        );
      },
    },
    {
      key: 'column3',
      name: 'Study Programme',
      fieldName: 'StudyProgramme',
      isSorted: false,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      minWidth: 220,
      maxWidth: 240,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, props.listItems);
      },
      onRender: (item: any) => {
        return (
          <>
            <div className={styles.tableMargin}>{item.studyProgram}</div>
          </>
        );
      },
    },
    {
      key: 'column4',
      name: 'Education Group',
      fieldName: 'EducationGroup',
      isSorted: false,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      minWidth: 220,
      maxWidth: 240,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, props.listItems);
      },
      onRender: (item: any) => {
        return (
          <>
            <div className={styles.tableMargin}>{item.educationGroup}</div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (data.studentAccountList.length > 0) {
      const items = data.studentAccountList;
      setStudentList(items);
    }
  }, [data.studentAccountList.length]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (props.listItems.length > 0) {
      setEnrolledStudent(props.listItems);

      setDataColumn(_columns);
      setTimeout(() => {
        setShimmer(false);
      }, 500);
    }
  }, [props.listItems, props.listItems.length]); //eslint-disable-line react-hooks/exhaustive-deps

  const clickMenuHandler = (id: any) => {
    const item = id.key;
    if (item === '') {
      spinner.current = false;
    }
    switch (item) {
      case 'manageInfo':
        gotoEnrollmentPage();
        break;
      case 'manageProfile':
        gotoManageProfilePage();
        break;
      default:
        break;
    }
  };

  const handleCAlloutClick = (item: any) => {
    id.current = item.student.split('/')[1];
    selectedAccount.current = item;
  };

  const handleLinkClick = (item: any) => {
    dispatch('ENROLLEDSTUDENTSELECTED', item);
    id.current = item.student.split('/')[1];
    spinner.current = true;
    const details = {
      imageUrl: null,
      imageInitials:
        item.firstName.substring(0, 1) + item.lastName.substring(0, 1),
      text: item.firstName + ' ' + item.lastName,
      secondaryText: null,
      tertiaryText: null,
      optionalText: null,
      firstname: item.firstName,
      lastname: item.lastName,
      email: '',
      id: item.student.split('/')[1],
      lang: 'en',
      role: null,
      school: 'harvard',
      contactNo: '',
      secondaryContactNo: '',
    };
    dispatch('SELECTEDUSERPROFILE', details);
    history.push('./profile/myprofile');
  };

  const searchChange = (item: any) => {
    const updateData = [...enrolledStudent];
    if (item !== undefined) {
      const value = item.target.value;
      const newdata = updateData.filter(
        i => i.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1,
      );
      const onSearch = value ? newdata : updateData;
      setEnrolledStudent(onSearch);
    } else {
      setEnrolledStudent(props.listItems);
    }
  };

  const gotoEnrollmentPage = () => {
    history.push('./student-enrollment');
  };

  const gotoManageProfilePage = () => {
    const itemId = selectedAccount.current.student.split('/')[1];
    const students = data.studentAccountList;
    id.current = itemId;

    const accountType = {
      isEdit: true,
      userType: 'Student',
    };

    dispatch('SELECTEDUSERACCOUNTTYPE', accountType);
    const selected = students.filter(a => a.id === itemId);
    dispatch('SELECTEDUSERACCOUNT', selected);

    getUserGuardians(itemId);
    setTimeout(() => {
      dispatch('UPDATE_NAVIGATION', '61');
      history.push('administration/user-account/create');
    }, 3000);
  };

  const getUserGuardians = (user: any) => {
    // Get user guardians
    const p = {
      clientId: data.userExternalUnique,
    };
    apiGet.get(
      'api/school/' + data.userProfile.school + '/guardians/user/' + user,
      { params: p },
    );
  };

  // Get current page
  const indexOfLastPage = currentPage * perPage;
  const indexOfFirstPage = indexOfLastPage - perPage;
  const currentDataPage = enrolledStudent?.slice(
    indexOfFirstPage,
    indexOfLastPage,
  );

  // Change page
  const paginate = (item: any) => {
    setCurrentPage(item);
  };

  function _onColumnClick(ev: any, column: any, data: any) {
    const userColumns = _columns.slice();
    const currColumn = userColumns.filter(
      currCol => column.key === currCol.key,
    )[0];
    userColumns.forEach(newCol => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = false;
      }
    });
    const newList = _copyAndSort(
      data,
      currColumn.fieldName,
      currColumn.isSortedDescending,
    );
    setEnrolledStudent(newList);
    setDataColumn(userColumns);
  }

  function _copyAndSort<T>(
    items: T[],
    columnKey: string,
    isSortedDescending?: boolean,
  ): T[] {
    const key = columnKey as keyof T;
    return items
      .slice(0)
      .sort((a: T, b: T) =>
        (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1,
      );
  }

  return (
    <>
      <div className={'ms-Grid-col ms-lg12 ' + styles.searchContainer}>
        <SearchBox
          placeholder="Search student's name..."
          onChange={ev => searchChange(ev)}
          className={'underlinedSearch ' + styles.search}
          autoFocus={false}
        />
      </div>
      <div
        className={'ms-Grid-col ms-lg12 customScroll ' + styles.dataContainer}>
        <div className="contentDataAccount">
          <Fabric>
            <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
              <ShimmeredDetailsList
                items={currentDataPage || []}
                columns={dataColumn}
                setKey="none"
                layoutMode={DetailsListLayoutMode.justified}
                selectionPreservedOnEmptyClick={true}
                isHeaderVisible={true}
                onRenderRow={renderRow}
                checkboxVisibility={2}
                selectionMode={SelectionMode.none}
                constrainMode={ConstrainMode.unconstrained}
                onRenderDetailsHeader={(headerProps, defaultRender: any) => {
                  return (
                    <Sticky
                      stickyPosition={StickyPositionType.Header}
                      isScrollSynced={true}
                      stickyBackgroundColor="transparent">
                      <div>{defaultRender(headerProps)}</div>
                    </Sticky>
                  );
                }}
                enableShimmer={shimmer}
              />
              {!shimmer && (
                <div className="paginationContainer">
                  <Pagination
                    perPage={perPage}
                    totalPages={enrolledStudent?.length}
                    paginate={paginate}
                  />
                </div>
              )}
            </ScrollablePane>
          </Fabric>
        </div>
      </div>
    </>
  );
};

function renderRow(props: any) {
  return <DetailsRow rowFieldsAs={renderRowFields} {...props} />;
}

function renderRowFields(props: any, key: any) {
  return (
    <span>
      <DetailsRowFields {...props} key={key} />
    </span>
  );
}

export default StudentList;
