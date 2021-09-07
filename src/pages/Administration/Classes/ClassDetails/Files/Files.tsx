import React, { Fragment, useEffect, useState } from 'react';
import styles from './Files.module.scss';
import './Files.scss';
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
  MarqueeSelection,
  Selection,
  PrimaryButton,
  DefaultButton,
  FontIcon,
  Icon,
  Breadcrumb,
  IBreadcrumbItem,
} from 'office-ui-fabric-react';
import Pagination from '../../../../../components/userInterface/Pagination/Pagination';
import { getFileTypeIconProps } from '@uifabric/file-type-icons';

const students = [
  {
    name: 'Files.docx',
    studentId: '1y 01',
    batch: '2020y',
    registrationPeriod: '1/8/2021 - 30/6/2022',
    subjectCategory: 'Line of Study',
  },
  {
    name: 'Files.jpg',
    studentId: '1y 02',
    batch: '2020y',
    registrationPeriod: '1/8/2021 - 30/6/2022',
    subjectCategory: 'Line of Study',
  },
  {
    name: 'Files.jpg',
    studentId: '1y 03',
    batch: '2020y',
    registrationPeriod: '1/8/2021 - 30/6/2022',
    subjectCategory: 'Line of Study',
  },
];

type FileProps = {
  shimmer: boolean;
  getFolderChildren: (item: any) => void;
};

const Files: React.FC<FileProps> = props => {
  const [perPage] = useState(15); //display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [StudentList, setStudentList] = useState(students);
  const [column, setColumn] = useState();
  const [breadcrumbList, setBreadCrumbList] = useState<IBreadcrumbItem[]>([]);

  const indexOfLastPage = currentPage * perPage;
  const indexOfFirstPage = indexOfLastPage - perPage;
  const currentDataPage = students?.slice(indexOfFirstPage, indexOfLastPage);

  const _selection = new Selection({
    onSelectionChanged: () => {
      // props.selectedFile(_selection.getSelection());
    },
  });

  const onBreadcrumbItemClicked = (ev: any, item: any) => {};

  const items: any[] = [
    { text: 'My Files' },
    { text: 'Folder Name', onClick: onBreadcrumbItemClicked },
  ];

  useEffect(() => {
    const updatedItem = [...items];
    setBreadCrumbList(updatedItem);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const paginate = (item: any) => {
    setCurrentPage(item);
  };

  const _column = [
    {
      key: '1',
      name: 'Name',
      iconName: 'Page',
      minWidth: 300,
      maxWidth: 420,
      isSorted: true,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        //  _onColumnClickDrafts(ev, column, oneDriveFile.current);
      },
      onRender: (item: any) => {
        var divContent = false;
        if (item.folder !== undefined) divContent = true;

        return (
          <div className={styles.flex}>
            <div className={styles.subFileContent}>
              {divContent ? (
                <FontIcon
                  onClick={() => props.getFolderChildren(item)}
                  iconName="FolderHorizontal"
                />
              ) : (
                <Icon
                  {...getFileTypeIconProps({
                    extension: item.name.split('.')[1],
                    size: 16,
                    imageFileType: 'png',
                  })}
                />
              )}
            </div>
            {divContent ? (
              <div onClick={() => props.getFolderChildren(item)}>
                {' '}
                {item.name}
              </div>
            ) : (
              <div> {item.name}</div>
            )}
          </div>
        );
      },
    },
    {
      key: '2',
      name: 'Date created',
      minWidth: 100,
      maxWidth: 100,
      isSorted: false,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        //  _onColumnClickDrafts(ev, column, oneDriveFile.current);
      },
      onRender: (item: any) => {
        return (
          // <div>{moment(item.lastModifiedDateTime).format("D/MM/YYYY")}</div>
          <div>01/0//2020</div>
        );
      },
    },
    {
      key: '3',
      name: 'Modified by',
      minWidth: 100,
      maxWidth: 100,
      isSorted: false,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        //  _onColumnClickDrafts(ev, column, oneDriveFile.current);
      },
      onRender: (item: any) => {
        return (
          <div>Jeff Turing</div>
          // <div>{formatBytes(item.size)}</div>
        );
      },
    },
    {
      key: '4',
      name: 'Modified',
      minWidth: 100,
      maxWidth: 100,
      isSorted: false,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        //  _onColumnClickDrafts(ev, column, oneDriveFile.current);
      },
      onRender: (item: any) => {
        return (
          <div>2 days ago</div>
          // <div>{item.lastModifiedBy.user?.displayName}</div>
        );
      },
    },
    {
      key: '4',
      name: 'File size',
      minWidth: 80,
      maxWidth: 80,
      isSorted: false,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        //  _onColumnClickDrafts(ev, column, oneDriveFile.current);
      },
      onRender: (item: any) => {
        return (
          <div>1.29 MB</div>
          // <div>{item.lastModifiedBy.user?.displayName}</div>
        );
      },
    },
    {
      key: '4',
      name: 'Privacy',
      minWidth: 100,
      maxWidth: 100,
      isSorted: false,
      isSortedDescending: false,
      onColumnClick: (ev: any, column: any) => {
        //  _onColumnClickDrafts(ev, column, oneDriveFile.current);
      },
      onRender: (item: any) => {
        return (
          <div>Privacy</div>
          // <div>{item.lastModifiedBy.user?.displayName}</div>
        );
      },
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <div className="padR10">
          <PrimaryButton
            text="Upload"
            iconProps={{ iconName: 'Upload' }}
            className="btnPrimary marginR15"
          />
        </div>
        <div className="btnNoBorder">
          <DefaultButton
            text="New Folder"
            iconProps={{ iconName: 'Add' }}
            className="btnDefault marginR15"
          />
        </div>
      </div>
      <div className={styles.flexContainer1}>
        <Breadcrumb
          items={breadcrumbList}
          maxDisplayedItems={10}
          ariaLabel="Breadcrumb with items rendered as buttons"
          overflowAriaLabel="More links"
          className={styles.BreadcrumbContainer}
        />
      </div>
      <div
        className={'ms-Grid-col ms-lg12 customScroll ' + styles.dataContainer}>
        <div className="FilesDetailList">
          <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
            <MarqueeSelection selection={_selection}>
              <ShimmeredDetailsList
                items={currentDataPage}
                columns={_column}
                selection={_selection}
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
            </MarqueeSelection>
            <div className="paginationContainer">
              <Pagination
                perPage={perPage}
                totalPages={students?.length}
                paginate={paginate}
              />
            </div>
          </ScrollablePane>
        </div>
      </div>
    </div>
  );
};

export default Files;

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
