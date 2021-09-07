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
import styles from './UserAccountLists.module.scss';
import { Fragment } from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DetailsRowFields } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsRowFields';
import {
  DetailsListLayoutMode,
  DetailsRow,
  SelectionMode,
} from 'office-ui-fabric-react/lib/DetailsList';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import './UserAccountLists.scss';
import { intl } from '../../../../util/commonFunction';
import { LabelNames } from '../../../../util/constant';
import moment from 'moment';
import Pagination from '../../../userInterface/Pagination/Pagination';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import _ from 'lodash';

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

type UserAccountListProps = {
  listItem: any[];
  activeTab: string;
  isLoading: boolean;
  spinner: boolean;
  manageAccountHandler: (item: any) => void;
  manageCalloutHandler: (item: any) => void;
  manageLinkHandler: (item: any) => void;
};

const UserAccountLists: React.FC<UserAccountListProps> = props => {
  const [userLists, setUserLists] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage] = useState<number>(15); //display per page
  const [dataColumn, setDataColumn] = useState<any[]>([]);
  const [shimmer, setShimmer] = useState<boolean>(true);

  const spinner = useRef<boolean>(props.spinner);
  const id = useRef<string | undefined>();

  const menuPropsActive = {
    items: [
      {
        id: '1',
        key: 'manageAccount',
        text: 'Manage Account',
        iconProps: { iconName: 'IDBadge' },
      },
      {
        id: '3',
        key: 'deleteUser',
        text: 'Delete User',
        iconProps: { iconName: 'Delete' },
      },
    ],
    onItemClick: (props: any) => {
      // spinner.current = true;
      clickMenuHandler(props);
    },
  };

  const clickMenuHandler = (id: any) => {
    let item = id.target.innerText;
    props.manageAccountHandler(item);
  };

  const _columns: any[] = [
    {
      key: 'column0',
      name: 'Name',
      fieldName: 'NameWithSort',
      isSorted: true,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      minWidth: 200,
      maxWidth: 230,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, props.listItem);
      },
      onRender: (item: any) => {
        return (
          <Fragment>
            <div className={styles.nameContainer}>
              <div className={styles.studentName}>
                <Persona
                  imageUrl={item.imgUrl}
                  hidePersonaDetails={true}
                  text={item.name}
                  size={PersonaSize.size32}
                  secondaryText={item.course}
                  styles={dpPerson}
                />

                <div
                  className={'btnLinkDark ' + styles.name}
                  onClick={() => handleLinkClick(item)}>
                  {item.name}{' '}
                </div>
              </div>
              {props.spinner && item.id === id.current ? (
                <Spinner size={SpinnerSize.small} className={styles.spinner} />
              ) : (
                <IconButton
                  id={'moreLink' + item.id}
                  iconProps={{
                    iconName: 'moreVertical',
                    onClick: () => handleCAlloutClick(item),
                  }}
                  className="btnIcon btnIconDark btnIcon hideMenuIcon"
                  menuProps={menuPropsActive}
                />
              )}
            </div>
          </Fragment>
        );
      },
    },
    {
      key: 'column1',
      name: 'Status',
      fieldName: 'Status',
      isSorted: false,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      minWidth: 50,
      maxWidth: 60,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, props.listItem);
      },
      onRender: (item: any) => {
        return (
          <Fragment>
            <div className={styles.tableMargin}>{item.status}</div>
          </Fragment>
        );
      },
    },
    {
      key: 'column2',
      name: 'ID',
      fieldName: 'ID',
      isSorted: false,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      minWidth: 250,
      maxWidth: 270,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, props.listItem);
      },
      onRender: (item: any) => {
        let id = null;
        if (props.activeTab === 'Student') {
          id = item.studentId;
        } else if (props.activeTab === 'Staff') {
          id = item.staffId;
        } else if (props.activeTab === 'Guardian') {
          id = item.guardianId;
        }
        return (
          <Fragment>
            <div className={styles.tableMargin}>{id}</div>
          </Fragment>
        );
      },
    },
    {
      key: 'column3',
      name: 'Email',
      fieldName: 'Email',
      isSorted: false,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      minWidth: 220,
      maxWidth: 240,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, props.listItem);
      },
      onRender: (item: any) => {
        return (
          <Fragment>
            <div className={styles.tableMargin}>{item.email}</div>
          </Fragment>
        );
      },
    },
    {
      key: 'column4',
      name: 'Role(s)',
      fieldName: 'Roles',
      isSorted: false,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      minWidth: 150,
      maxWidth: 180,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, props.listItem);
      },
      onRender: (item: any) => {
        let element = [];
        for (let i = 0; i < item.roles?.length; i++) {
          element.push(
            <div key={i}>
              <span>{item.roles[i]}</span>
              <span style={{ marginRight: '3px' }}>
                {i !== item.roles.length - 1 && ','}
              </span>
            </div>,
          );
        }
        return <div className={styles.roleName}>{element}</div>;
      },
    },
    {
      key: 'column5',
      name: 'Last Updated By',
      fieldName: 'LastUpdatedBy',
      isSorted: false,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      minWidth: 120,
      maxWidth: 120,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, props.listItem);
      },
      onRender: (item: any) => {
        return (
          <Fragment>
            <div className={styles.tableMargin}>{item.modifiedBy}</div>
          </Fragment>
        );
      },
    },
    {
      key: 'column6',
      name: 'Date',
      fieldName: 'Date',
      isSorted: false,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      minWidth: 100,
      maxWidth: 150,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, props.listItem);
      },
      onRender: (item: any) => {
        let modifiedDate =
          item.modifiedDate !== undefined
            ? moment(item.modifiedDate['tx-time']).format('MMM. DD, YYYY')
            : null;
        return (
          <Fragment>
            <div className={styles.tableMargin}>{modifiedDate}</div>
          </Fragment>
        );
      },
    },
  ];

  const handleCAlloutClick = (item: any) => {
    id.current = item.id;
    props.manageCalloutHandler(item);
  };

  const handleLinkClick = (item: any) => {
    id.current = item.id;
    spinner.current = true;
    props.manageLinkHandler(item);
  };

  useEffect(() => {
    if (props.listItem.length > 0) {
      setUserLists(props.listItem);
      setDataColumn(_columns);
      setTimeout(() => {
        setShimmer(false);
      }, 500);
    }
  }, [props]); //eslint-disable-line react-hooks/exhaustive-deps

  const searchChange = (item: any) => {
    var updateData = [...userLists];
    if (item !== undefined) {
      var value = item.target.value;
      var newdata = updateData.filter(
        i => i.name.toLowerCase().indexOf(value) > -1,
      );
      var onSearch = value ? newdata : updateData;
      setUserLists(onSearch);
    } else {
      setUserLists(props.listItem);
    }
  };

  // Get current page
  const indexOfLastPage = currentPage * perPage;
  const indexOfFirstPage = indexOfLastPage - perPage;
  const currentDataPage = userLists?.slice(indexOfFirstPage, indexOfLastPage);

  // Change page
  const paginate = (item: number) => {
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
    setUserLists(newList);
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
    <Fragment>
      <div className={'ms-Grid-col ms-lg12 ' + styles.searchContainer}>
        <SearchBox
          placeholder="Search user..."
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
                enableShimmer={props.isLoading}
              />
              {!shimmer && (
                <div className="paginationContainer">
                  <Pagination
                    perPage={perPage}
                    totalPages={userLists?.length}
                    paginate={paginate}
                  />
                </div>
              )}
            </ScrollablePane>
          </Fabric>
        </div>
      </div>
    </Fragment>
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

export default UserAccountLists;
