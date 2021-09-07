import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { useStore } from '../../../../store/store';
import {
  DetailsListLayoutMode,
  DetailsRow,
  SelectionMode,
} from 'office-ui-fabric-react/lib/DetailsList';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import {
  SearchBox,
  IconButton,
  Link,
  FontIcon,
  ScrollablePane,
  ScrollbarVisibility,
  StickyPositionType,
  Sticky,
  ConstrainMode,
} from 'office-ui-fabric-react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DetailsRowFields } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsRowFields';
import styles from './ClassesLists.module.scss';
import './ClassesLists.scss';
import _ from 'lodash';
import Pagination from '../../../../components/userInterface/Pagination/Pagination';
import { useHistory } from 'react-router-dom';
type ClassesListsProps = {
  adminSelectedSubject: any;
  shimmer: boolean;
  updateLoading: () => void;
};

const ClassesLists: React.FC<ClassesListsProps> = props => {
  const data = useStore()[0];
  // eslint-disable-next-line
  const [adminClasses, setAdminClasses] = useState(data.adminClassesLists);
  const [itemLists, setItemLists] = useState<any[]>([]);
  const [shimmer, setShimmer] = useState<boolean>(props.shimmer);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage] = useState(15); //display per page
  const [dataColumn, setDataColumn] = useState<any[]>([]);
  // eslint-disable-next-line
  const [selectedSubjectId, setSelectedSubjectId] = useState();
  const history = useHistory();

  const menuProps = {
    items: [
      {
        id: '1',
        key: 'duplicateLesson',
        text: 'Duplicate Lesson',
        iconProps: { iconName: 'Copy' },
      },
      {
        id: '2',
        key: 'deleteUser',
        text: 'Delete User',
        iconProps: { iconName: 'Delete' },
      },
    ],
    onItemClick: (value: any) => {
      clickMenuHandler(value);
    },
  };

  // handles for callout click event
  const clickMenuHandler = (value: any) => {
    switch (value) {
      case 'Duplicate Lesson':
        break;
      case 'Delete User':
        break;
      default:
        break;
    }
  };

  // navigate to create subject page and auto populate details
  const gotoDetails = () => {
    history.push('./class-details');
  };

  // set item after clicking the link more icon
  const handleLinkMoreClick = () => {};

  // search item on the list
  const searchChange = (item: any) => {
    var updateData: any[] = [...itemLists];
    if (item !== undefined) {
      var value = item.target.value;
      var newdata = updateData.filter(
        i => i.className.toLowerCase().indexOf(value) > -1,
      );
      var onSearch = value ? newdata : updateData;
      setItemLists(onSearch);
    } else {
      setItemLists(filterData(props.adminSelectedSubject.id));
    }
  };

  const _columns = [
    {
      key: 'column0',
      name: 'Class Name',
      fieldName: 'ClassName',
      isSorted: true,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      minWidth: 150,
      maxWidth: 200,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, props.adminSelectedSubject);
      },
      onRender: (item: any) => {
        return (
          <>
            <div className={styles.nameContainer}>
              <div className={styles.name}>
                <Link
                  href="#"
                  className="nameLink"
                  onClick={() => gotoDetails()}>
                  {item.classTitle}
                </Link>
              </div>
              <IconButton
                id={'moreLink' + item.id}
                iconProps={{
                  iconName: 'moreVertical',
                  onClick: () => handleLinkMoreClick(),
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
      name: 'Subject Name',
      fieldName: 'SubjectName',
      isSorted: false,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      minWidth: 190,
      maxWidth: 190,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, props.adminSelectedSubject);
      },
      onRender: (item: any) => {
        return (
          <>
            <div className={styles.name}>{item.xprsSubject}</div>
          </>
        );
      },
    },
    {
      key: 'column2',
      name: 'Period',
      fieldName: 'Period',
      isSorted: false,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      minWidth: 190,
      maxWidth: 220,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, props.adminSelectedSubject);
      },
      onRender: (item: any) => {
        return (
          <>
            <div className={styles.name}>{item.period}</div>
          </>
        );
      },
    },
    {
      key: 'column3',
      name: 'Classes',
      fieldName: 'Classes',
      isSorted: false,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      minWidth: 190,
      maxWidth: 190,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, props.adminSelectedSubject);
      },
      onRender: (item: any) => {
        return (
          <>
            <div className={styles.name}>{item.classYear}</div>
          </>
        );
      },
    },
    {
      key: 'column4',
      name: 'No. of Student(s)',
      fieldName: 'NumOfStudents',
      isSorted: false,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      minWidth: 100,
      maxWidth: 120,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, props.adminSelectedSubject);
      },
      onRender: (item: any) => {
        return (
          <Fragment>
            <div className={styles.name}>{item.numberOfStudent}</div>
          </Fragment>
        );
      },
    },
    {
      key: 'column5',
      name: 'Teacher',
      fieldName: 'Teacher',
      isSorted: false,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      minWidth: 190,
      maxWidth: 200,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClick(ev, column, props.adminSelectedSubject);
      },
      onRender: (item: any) => {
        return (
          <>
            <div className={styles.name}>{item.teacher}</div>
          </>
        );
      },
    },
  ];

  const filterData = (id: any) => {
    const data = [...adminClasses];
    const item = data.filter(a => a.subjectId === id);
    return item;
  };

  useEffect(() => {
    if (data.adminClassesLists.length > 0) {
      setItemLists(data.adminClassesLists);
      setDataColumn(_columns);
      setSelectedSubjectId(props.adminSelectedSubject?.id);
      props.updateLoading();
    } else {
      setItemLists([]);
    }
  }, [data.adminClassesLists, data.adminClassesLists.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // Get current page
  const indexOfLastPage = currentPage * perPage;
  const indexOfFirstPage = indexOfLastPage - perPage;
  const currentDataPage = itemLists?.slice(indexOfFirstPage, indexOfLastPage);

  // Change page
  const paginate = (item: any) => {
    setCurrentPage(item);
  };

  function _onColumnClick(ev: any, column: any, item: any) {
    const data: any[] = filterData(item.id);
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
    setItemLists(newList);
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

  const renderNoData = () => {
    if (props.adminSelectedSubject && props.adminSelectedSubject?.id !== null) {
      return (
        <div className={styles.noData}>No result found. Please try again.</div>
      );
    } else {
      return (
        <div className={styles.contentPlaceholder}>
          <div className={styles.info}>
            <div>
              <FontIcon
                iconName="Dictionary"
                className={styles.icon}></FontIcon>
            </div>
            <div className={styles.contentTitle}>Select a Subject</div>
            <div className={styles.description}>
              The list of classes will display here after selection.
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className={'ms-Grid-col ms-lg12 ' + styles.searchContainer}>
        <SearchBox
          placeholder="Search class..."
          onChange={ev => searchChange(ev)}
          className={'underlinedSearch ' + styles.search}
          autoFocus={false}
        />
      </div>
      <div>
        {itemLists?.length > 0 ? (
          <>
            <div
              className={
                'ms-Grid-col ms-lg12 customScroll ' + styles.dataContainer
              }>
              <div className="contentDataAccountClasses">
                <Fabric>
                  <ScrollablePane
                    scrollbarVisibility={ScrollbarVisibility.auto}>
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
                      onRenderDetailsHeader={(
                        headerProps,
                        defaultRender: any,
                      ) => {
                        return (
                          <Sticky
                            stickyPosition={StickyPositionType.Header}
                            isScrollSynced={true}
                            stickyBackgroundColor="transparent">
                            <div>{defaultRender(headerProps)}</div>
                          </Sticky>
                        );
                      }}
                      enableShimmer={props.shimmer}
                    />
                    <div className="paginationContainer">
                      <Pagination
                        perPage={perPage}
                        totalPages={itemLists?.length}
                        paginate={paginate}
                      />
                    </div>
                  </ScrollablePane>
                </Fabric>
              </div>
            </div>
          </>
        ) : (
          !props.shimmer && renderNoData()
        )}
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

export default ClassesLists;
