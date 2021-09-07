import React, { Fragment } from 'react';
import QuizzesCard from '../../../components/userInterface/QuizzesCard/QuizzesCard';
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
} from 'office-ui-fabric-react/lib/DetailsList';
import classes from './Quizzes.module.scss';
import { LabelNames } from '../../../util/constant';
import { intl } from '../../../util/commonFunction';

// const _onColumnClick = (ev: any, column: any) => {
//   //const { columns, items } =columns ;
//   const newColumns = columns.slice();
//   const currColumn = newColumns.filter(
//     currCol => column.key === currCol.key,
//   )[0];
//   newColumns.forEach(newCol => {
//     if (newCol === currColumn) {
//       currColumn.isSortedDescending = !currColumn.isSortedDescending;
//       currColumn.isSorted = true;
//       this.setState({
//         announcedMessage: `${currColumn.name} is sorted ${
//           currColumn.isSortedDescending ? 'descending' : 'ascending'
//         }`,
//       });
//     } else {
//       newCol.isSorted = false;
//       newCol.isSortedDescending = true;
//     }
//   });
//   const newItems = _copyAndSort(
//     items,
//     currColumn.fieldName,
//     currColumn.isSortedDescending,
//   );
//   this.setState({
//     columns: newColumns,
//     items: newItems,
//   });
// };

const items: any[] = [
  {
    title: 'Quiz #7',
    score: 95,
    quizDate: 'Yesterday',
    uploadedBy: 'Clarrise Washington',
  },
  {
    title: 'Quiz #6',
    score: 95,
    quizDate: '2 days ago',
    uploadedBy: 'Clarrise Washington',
  },
  {
    title: 'Quiz #5',
    score: 25,
    quizDate: '3 days ago',
    uploadedBy: 'Clarrise Washington',
  },
  {
    title: 'Quiz #4',
    score: 50,
    quizDate: 'Last week',
    uploadedBy: 'Clarrise Washington',
  },
  {
    title: 'Quiz #3',
    score: 95,
    quizDate: 'Yesterday',
    uploadedBy: 'Clarrise Washington',
  },
  {
    title: 'Quiz #2',
    score: 95,
    quizDate: 'Yesterday',
    uploadedBy: 'Clarrise Washington',
  },
  {
    title: 'Quiz #1',
    score: 95,
    quizDate: 'Yesterday',
    uploadedBy: 'Clarrise Washington',
  },
];
const columns: any[] = [
  {
    key: 'column1',
    name: 'Title',
    fieldName: 'title',
    minWidth: 100,
    maxWidth: 120,
    isSorted: false,
    isSortedDescending: false,
    sortAscendingAriaLabel: 'Sorted A to Z',
    sortDescendingAriaLabel: 'Sorted Z to A',
    //  onColumnClick: _onColumnClick,
    data: 'string',
  },
  {
    key: 'column2',
    name: 'Score',
    fieldName: 'score',
    minWidth: 250,
    maxWidth: 270,

    data: 'number',
    // onColumnClick: _onColumnClick,
  },
  {
    key: 'column3',
    name: 'Quiz',
    fieldName: 'quizDate',
    minWidth: 100,
    maxWidth: 150,
    //  onColumnClick: _onColumnClick,
  },
  {
    key: 'column4',
    name: 'Uploaded By',
    fieldName: 'uploadedBy',
    minWidth: 100,
    maxWidth: 150,

    data: 'string',
    // onColumnClick: _onColumnClick,
  },
];

type QuizzesProps = {
  chartData: any[];
};

const Quizzes: React.FC<QuizzesProps> = props => {
  const cardView: any[] = [];
  props.chartData.forEach((item, i) => {
    cardView.push(
      <div
        className={'ms-Grid-col ms-lg4 padR15 ' + classes.colQuizCard}
        key={i}>
        <QuizzesCard item={item} />
      </div>,
    );
  });

  const _getKey = (item: any, index: any) => {
    return index;
  };
  const _onItemInvoked = (item: any) => {
    alert(`Item invoked: ${item.subject}`);
  };
  const onRenderCell = (item: any, index: any, column: any) => {
    const fieldContent = item[column.fieldName];
    let value = '-';
    if (fieldContent?.toString().length > 0) {
      if (fieldContent?.toString() !== '0') {
        value = fieldContent;
      }
    } else {
      value = '-';
    }
    let result = (
      <div className={'ms-Grid-row ' + classes.scoreMargin}>
        <div className="ms-Grid-col-lg12">
          <span className={classes.detailslist}>{value}</span>
        </div>
      </div>
    );
    const grade =
      item.score < 75 ? (
        <div
          className={classes.progressBarFail}
          style={{ width: item.score + '%' }}
        />
      ) : (
        <div
          className={classes.progressBarPass}
          style={{ width: item.score + '%' }}
        />
      );
    const gradeLabel =
      item.score < 75 ? (
        <label className={classes.scoreFailLabel}>{item.score}%</label>
      ) : (
        <label className={classes.scorePassLabel}>{item.score}%</label>
      );
    if (column.data === 'number') {
      result = (
        <div className={'ms-Grid-row ' + classes.scoreMargin}>
          <div className={classes.progressPass}>{grade}</div>
          {gradeLabel}
        </div>
      );
    }

    if (column.name === 'Title') {
      result = (
        <div className={'ms-Grid-row ' + classes.scoreMargin}>
          <label className={classes.titleFont}>{item.title}</label>
        </div>
      );
    }

    return result;
  };

  return (
    <>
      <div className={'ms-Grid-row padT20 ' + classes.container}>
        <div className={'ms-Grid-col ms-lg12 ' + classes.recentScore}>
          {intl(LabelNames.recentscore)}
        </div>
      </div>
      <br />
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg12">{cardView}</div>
      </div>
      <br />

      <div className={'ms-Grid-row ' + classes.divGrade}>
        <div className="ms-Grid-col ms-sm12  ms-lg12">
          <label className={classes.labelGrade}>
            {intl(LabelNames.averagescore)} 95%
          </label>
        </div>
      </div>

      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-lg12 QuizzesDetailListHeader">
          <DetailsList
            items={items}
            columns={columns}
            selectionMode={SelectionMode.none}
            getKey={_getKey}
            setKey="none"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            onItemInvoked={_onItemInvoked}
            onRenderItemColumn={onRenderCell}
          />
        </div>
      </div>
    </>
  );
};

export default Quizzes;
