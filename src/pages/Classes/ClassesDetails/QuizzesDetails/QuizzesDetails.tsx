import React, { Fragment } from 'react';
import QuizzesCard from '../../../../components/userInterface/QuizzesCard/QuizzesCard';

import classes from './QuizzesDetails.module.scss';

type QuizzesDetailsProps = {
  chartData: any[];
};

const QuizzesDetails: React.FC<QuizzesDetailsProps> = props => {
  const cardView: any[] = [];
  props.chartData.forEach((item, i) => {
    cardView.push(
      <div className="ms-Grid-col ms-lg4 padR15" key={i}>
        <QuizzesCard item={item} />
      </div>,
    );
  });

  return (
    <>
      <div className={'ms-Grid-row padT40 ' + classes.container}>
        <div className="ms-Grid-col ms-lg12">{cardView}</div>
      </div>
    </>
  );
};

export default QuizzesDetails;
