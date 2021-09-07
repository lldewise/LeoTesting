import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { useStore } from '../../../store/store';
import {
  DetailsListLayoutMode,
  DetailsRow,
  SelectionMode,
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import { SearchBox } from 'office-ui-fabric-react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DetailsRowFields } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsRowFields';
import styles from '../SubjectList/SubjectList.module.scss';
import './SubjectList.scss';
import { truncateLongName } from '../../../util/commonFunction';

type SubjectListProps = {
  handleSelectedItem: any;
};
const SubjectList: React.FC<SubjectListProps> = props => {
  //eslint-disable-next-line
  const [data, dispatch] = useStore();
  const [itemLists, setItemLists] = useState<any[]>([]);
  //eslint-disable-next-line
  const [shimmer, setShimmer] = useState(false);

  useEffect(() => {
    if (data.adminSubjectLists.length > 0) {
      setItemLists(data.adminSubjectLists);
    }
  }, [data.adminSubjectLists.length]); //eslint-disable-line react-hooks/exhaustive-deps

  const _columns = [
    {
      key: 'column0',
      name: 'Class Name',
      fieldName: 'ClassName',
      minWidth: 150,
      maxWidth: 200,
      onRender: (item: any) => {
        return (
          <>
            <div>
              <div
                className={styles.itemhover}
                onClick={() => props.handleSelectedItem(item)}>
                <div className={'ms-Grid-col ms-lg12 ' + styles.itemCell}>
                  <div className={'ms-Grid-col ms-lg5 ' + styles.fontIcon}>
                    {item.code}
                  </div>
                  <div className={'ms-Grid-col ms-lg5 ' + styles.customPadding}>
                    <p className={'selected ' + styles.titleFont}>
                      {truncateLongName(item.name, 15)}
                    </p>
                  </div>
                  <div className={'ms-Grid-col ms-lg2 ' + styles.customWidth}>
                    <i
                      className="ms-Icon ms-Icon--ChevronRight selected"
                      aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      },
    },
  ];

  const searchChange = () => {};

  return (
    <>
      <div className={'ms-Grid-col ms-lg12 ' + styles.searchContainer}>
        <SearchBox
          placeholder="Search subject..."
          onChange={(ev: any) => searchChange()}
          className={'underlinedSearch ' + styles.search}
          autoFocus={false}
        />
      </div>
      <div
        className={'ms-Grid-col ms-lg12 customScrollY ' + styles.dataContainer}>
        <div className="contentDataAccountSubject">
          <Fabric>
            {/* <MarqueeSelection selection={any}> */}
            <ShimmeredDetailsList
              items={itemLists}
              columns={_columns}
              setKey="none"
              layoutMode={DetailsListLayoutMode.justified}
              selectionPreservedOnEmptyClick={true}
              onRenderRow={renderRow}
              checkboxVisibility={2}
              enableShimmer={shimmer}
              selectionMode={SelectionMode.single}
              isHeaderVisible={false}
            />
            {/* </MarqueeSelection> */}
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

export default SubjectList;
