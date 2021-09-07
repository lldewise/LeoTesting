import React, { Fragment } from 'react';
import Card from '../../../../components/userInterface/Card/Card';
import classes from './TodosDetails.module.scss';

type TodosDetails = {
  dueSoonList: any[];
};

const TodosDetails: React.FC<TodosDetails> = props => {
  const cardView: any[] = [];
  props.dueSoonList.forEach((item, i) => {
    cardView.push(
      <div className={'ms-Grid-col ms-lg4 padR15 ' + classes.cardwith} key={i}>
        <Card item={item} />
      </div>,
    );
  });

  return (
    <>
      <div className={'ms-Grid-row padT40 ' + classes.container}>
        <div className="ms-Grid-col ms-lg12 TodoCoursel">{cardView}</div>
      </div>
    </>
  );
};

export default TodosDetails;
