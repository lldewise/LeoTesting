import React, { useState, useEffect } from 'react';
import { Checkbox, TextField } from 'office-ui-fabric-react';
import styles from './SchoolYearLists.module.scss';
import './SchoolYearLists.scss';
import { Fragment } from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DetailsRowFields } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsRowFields';
import {
  DetailsList,
  DetailsListLayoutMode,
  DetailsRow,
  SelectionMode,
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { intl } from '../../../../util/commonFunction';
import { LabelNames } from '../../../../util/constant';

type SchoolYearListProps = {
  listItem: any[];
  onInputFieldHandler: (value: any, id: any, column: any) => void;
  checkBoxChangeHandler: (checked: boolean, item: any) => void;
};

const SchoolYearLists: React.FC<SchoolYearListProps> = props => {
  const [scYearLists, setSCYearLists] = useState<any[]>([]);
  useEffect(() => {
    setSCYearLists(props.listItem);
  }, [props.listItem]); //eslint-disable-line react-hooks/exhaustive-deps

  const onChangeTextValueField = (item: any, id: any, col: any) => {
    let val = item.target.value;
    props.onInputFieldHandler(val, id, col);
  };

  const _columns: any[] = [
    {
      key: 'column0',
      name: 'School Year',
      fieldName: 'NameWithSort',
      minWidth: 90,
      maxWidth: 200,
      onRender: (item: any) => {
        let checked = item.active === 1 ? true : false;
        return (
          <Fragment>
            <div className={styles.nameContainer}>
              <Checkbox
                checked={checked}
                onChange={() => props.checkBoxChangeHandler(checked, item)}
              />
              <span
                className={'btnLinkDark ' + styles.name}
                onClick={() => props.checkBoxChangeHandler(checked, item)}>
                {item.schoolYear}
              </span>
            </div>
          </Fragment>
        );
      },
    },
    {
      key: 'column1',
      name: 'Aftalt timetal',
      fieldName: '',
      minWidth: 80,
      maxWidth: 200,
      onRender: (item: any) => {
        return (
          <Fragment>
            <TextField
              id={item.agreedTime}
              value={item.agreedTime}
              onChange={e => onChangeTextValueField(e, item.id, 'agreedTime')}
            />
          </Fragment>
        );
      },
    },
    {
      key: 'column2',
      name: (
        <div>
          <div>PlusBank-</div>
          <div className={styles.secondLine}>forretning</div>
        </div>
      ),
      fieldName: '',
      minWidth: 80,
      maxWidth: 200,
      onRender: (item: any) => {
        return (
          <Fragment>
            <TextField
              id={item.plusBankBussiness}
              value={item.plusBankBussiness}
              onChange={e =>
                onChangeTextValueField(e, item.id, 'plusBankBussiness')
              }
            />
          </Fragment>
        );
      },
    },
    {
      key: 'column3',
      name: (
        <div>
          <div>MinusBank-</div>
          <div className={styles.secondLine}>forretning</div>
        </div>
      ),
      fieldName: '',
      minWidth: 80,
      maxWidth: 200,
      onRender: (item: any) => {
        return (
          <Fragment>
            <TextField
              id={item.minusBankBussiness}
              value={item.minusBankBussiness}
              onChange={e =>
                onChangeTextValueField(e, item.id, 'minusBankBussiness')
              }
            />
          </Fragment>
        );
      },
    },
    {
      key: 'column4',
      name: 'Overtime maks',
      fieldName: '',
      minWidth: 80,
      maxWidth: 200,
      onRender: (item: any) => {
        return (
          <Fragment>
            <TextField
              id={item.maxOvertime}
              value={item.maxOvertime}
              onChange={e => onChangeTextValueField(e, item.id, 'maxOvertime')}
            />
          </Fragment>
        );
      },
    },
    {
      key: 'column5',
      name: (
        <div>
          <div>Undertime</div>
          <div className={styles.secondLine}>maks</div>
        </div>
      ),
      fieldName: '',
      minWidth: 80,
      maxWidth: 200,
      onRender: (item: any) => {
        return (
          <Fragment>
            <TextField
              id={item.maxUndertime}
              value={item.maxUndertime}
              onChange={e => onChangeTextValueField(e, item.id, 'maxUndertime')}
            />
          </Fragment>
        );
      },
    },
  ];

  return (
    <Fragment>
      <div className={'ms-Grid-col ms-lg-12 ' + styles.dataContainer}>
        <div className="contentDataSchoolYear">
          <Fabric>
            {scYearLists?.length > 0 && (
              <DetailsList
                items={scYearLists}
                columns={_columns}
                setKey="none"
                layoutMode={DetailsListLayoutMode.justified}
                selectionPreservedOnEmptyClick={true}
                isHeaderVisible={true}
                onRenderRow={renderRow}
                checkboxVisibility={2}
                selectionMode={SelectionMode.none}
              />
            )}
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

export default SchoolYearLists;
