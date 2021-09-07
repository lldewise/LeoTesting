import React, { Fragment, useEffect, useState } from 'react';
import styles from './Students.module.scss';
import {
  Persona,
  ScrollablePane,
  ShimmeredDetailsList,
  ScrollbarVisibility,
  Sticky,
  SelectionMode,
  StickyPositionType,
  PersonaSize,
  SearchBox,
  ActionButton,
} from 'office-ui-fabric-react';
import Pagination from '../../../../../components/userInterface/Pagination/Pagination';

const students = [
  {
    name: 'Arthur Lopez',
    studentId: '1y 01',
    batch: '2020y',
    registrationPeriod: '1/8/2021 - 30/6/2022',
    subjectCategory: 'Line of Study',
  },
  {
    name: 'James Lopez',
    studentId: '1y 02',
    batch: '2020y',
    registrationPeriod: '1/8/2021 - 30/6/2022',
    subjectCategory: 'Line of Study',
  },
  {
    name: 'Dennis Lopez',
    studentId: '1y 03',
    batch: '2020y',
    registrationPeriod: '1/8/2021 - 30/6/2022',
    subjectCategory: 'Line of Study',
  },
];

type ClassStudentProps = {
  shimmer: boolean;
};

const Student: React.FC<ClassStudentProps> = props => {
  const [perPage] = useState(15); //display per page
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [StudentList, setStudentList] = useState<any[]>(students);
  const [column, setColumn] = useState<any[]>([]);

  const indexOfLastPage = currentPage * perPage;
  const indexOfFirstPage = indexOfLastPage - perPage;
  const currentDataPage = students?.slice(indexOfFirstPage, indexOfLastPage);

  const paginate = (item: number) => {
    setCurrentPage(item);
  };

  const _column = [
    {
      key: '0',
      name: 'Name',
      minWidth: 190,
      maxWidth: 300,
      isSorted: true,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClickDrafts(ev, column, students);
      },
      onRender: (item: any) => {
        return (
          <div>
            <Persona
              text={item.name}
              secondaryText={item.studentId}
              size={PersonaSize.size40}
              imageUrl={undefined}
            />
          </div>
        );
      },
    },
    {
      key: '1',
      name: 'Batch',
      minWidth: 80,
      maxWidth: 100,
      isSorted: false,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClickDrafts(ev, column, students);
      },
      onRender: (item: any) => {
        return <div>{item.batch}</div>;
      },
    },
    {
      key: '2',
      name: 'Registration Period',
      minWidth: 150,
      maxWidth: 150,
      isSorted: false,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClickDrafts(ev, column, students);
      },
      onRender: (item: any) => {
        return <div>{item.registrationPeriod}</div>;
      },
    },
    {
      key: '3',
      name: 'Subject Category',
      minWidth: 80,
      maxWidth: 100,
      isSorted: false,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        _onColumnClickDrafts(ev, column, students);
      },
      onRender: (item: any) => {
        return <div>{item.subjectCategory}</div>;
      },
    },
  ];

  const _onColumnClickDrafts = (ev: any, column: any, value: any) => {
    const newColumns = _column.slice();
    const currColumn: any = newColumns.filter(
      currCol => column.key === currCol.key,
    )[0];

    let newItems = _copyAndSort(
      value,
      currColumn.fieldName,
      !currColumn.isSortedDescending,
    );

    newColumns.forEach(newCol => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        newCol.onColumnClick = (ev, column) => {
          _onColumnClickDrafts(ev, column, newItems);
        };
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });

    setStudentList(newItems);
    setColumn(newColumns);
  };

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <div className={'ms-Grid-col ms-lg12 ' + styles.searchContainer}>
          <SearchBox
            placeholder="Search name..."
            onChange={() => {}}
            className={'underlinedSearch ' + styles.search}
            autoFocus={false}
          />
        </div>
        <div className={styles.marginLeft}>
          <ActionButton
            className="btnPlain btnPrimary"
            iconProps={{ iconName: 'Edit' }}
            text="Edit"
          />
        </div>
      </div>
      <div
        className={'ms-Grid-col ms-lg12 customScroll ' + styles.dataContainer}>
        <div className="contentDataAccount">
          <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
            <ShimmeredDetailsList
              items={currentDataPage}
              columns={_column}
              selectionMode={SelectionMode.none}
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
              enableShimmer={props.shimmer}
            />
            <div>
              <div className={' paginationContainer1 ' + styles.borderPage}>
                <Pagination
                  perPage={perPage}
                  totalPages={students?.length}
                  paginate={paginate}
                />
              </div>
            </div>
          </ScrollablePane>
        </div>
      </div>
    </div>
  );
};

export default Student;

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
