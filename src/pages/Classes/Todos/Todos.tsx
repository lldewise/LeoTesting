import React, { Fragment, useEffect, useState } from 'react';
import classes from './Todos.module.scss';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { useStore } from '../../../store/store';
import Card from '../../../components/userInterface/Card/Card';
import { LabelNames } from './../../../util/constant';
import { intl } from '../../../util/commonFunction';
import Slider from 'infinite-react-carousel';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Assignmentlist } from '../../../components/itemlist';
const pivotStyles = {
  root: [
    {
      borderBottomColor: '#6c35d4 !mportant',
    },
  ],
  linkIsSelected: {
    selectors: {
      ':before': {
        height: '3px',
        backgroundColor: '#6c35d4',
      },
    },
  },
  text: {
    fontSize: '14px',
    fontFamily: 'Segoe UI',
  },
};

const homeworkOptions = [
  { key: 'All Homeworks', text: intl(LabelNames.allhomeworks) },
  { key: 'Submitted', text: intl(LabelNames.submitted) },
  { key: 'Due Soon', text: intl(LabelNames.dueSoon) },
  { key: 'Past Due', text: intl(LabelNames.passdue) },
];

const assignmentOptions = [
  { key: 'All Assignments', text: intl(LabelNames.allassignment) },
  { key: 'Submitted', text: intl(LabelNames.submitted) },
  { key: 'Due Soon', text: intl(LabelNames.dueSoon) },
  { key: 'Past Due', text: intl(LabelNames.passdue) },
];

const sortingOptions = [
  {
    key: 'Date latest-oldest',
    text: intl(LabelNames.date) + ' ' + intl(LabelNames.latestoldest),
  },
  {
    key: 'Date oldest-latest',
    text: intl(LabelNames.date) + ' ' + intl(LabelNames.oldestlatest),
  },
  { key: 'A-Z', text: intl(LabelNames.az) },
  { key: 'Z-A', text: intl(LabelNames.za) },
];

// const linkItem1 = [
//   {
//     name: intl(LabelNames.homeWorks),
//     classname: classes.aLinkactive,
//   },
//   {
//     name: intl(LabelNames.assignments),
//     classname: classes.aLink,
//   },
// ];

const settings = {
  slidesToShow: 4,
  arrows: false,
  arrowsBlock: false,
};

const AllHomedropdownStyles = {
  dropdown: {
    width: 135,
  },
};

const SortingdropdownStyles = {
  dropdown: {
    width: 150,
  },
};

type TodosProps = {
  dueSoonList: any[];
};

const Todos: React.FC<TodosProps> = props => {
  const [data] = useStore();
  const [cardView, setCardView] = useState<JSX.Element>();

  useEffect(() => {
    const cardView: any[] = [];
    props.dueSoonList.forEach((item, i) => {
      cardView.push(
        <div
          className={'ms-Grid-col ms-lg3 padR15 ' + classes.cardwith}
          key={i}>
          <Card item={item} />
        </div>,
      );
    });
    setCardView(<Slider {...settings}>{cardView}</Slider>);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className={classes.container}>
        <div className="ms-Grid-row padT20">
          <div className={'ms-Grid-col ms-lg12 ' + classes.dueSoon}>
            {intl(LabelNames.dueSoon)}
          </div>
        </div>
        <br />
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg12 TodoCoursel">{cardView}</div>
        </div>
        <br />
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-lg12 ">
            <Pivot styles={pivotStyles}>
              <PivotItem headerText={intl(LabelNames.homeWorks)} itemKey="1">
                <br />
                <div
                  className={
                    'ms-Grid-row bclist DropdownBoderLess ' + classes.selection
                  }>
                  <div className={'ms-Grid-col ms-lg1 ' + classes.filterwidth}>
                    <FontIcon iconName="Filter" />
                  </div>
                  <div className={'ms-Grid-col ms-lg3 ' + classes.allhome}>
                    <Dropdown
                      defaultSelectedKey="All Homeworks"
                      options={homeworkOptions}
                      styles={AllHomedropdownStyles}
                    />
                  </div>
                  <div className={'ms-Grid-col ms-lg1 ' + classes.filterwidth}>
                    <FontIcon iconName="Sort" className={classes.cursor} />
                  </div>
                  <div className={'ms-Grid-col ms-lg3 ' + classes.sorting}>
                    <Dropdown
                      defaultSelectedKey="Date latest-oldest"
                      options={sortingOptions}
                      styles={SortingdropdownStyles}
                    />
                  </div>
                </div>

                <div className="ms-Grid-row">
                  <Assignmentlist
                    itemlist={data.classeshomeworklist}
                    onClickRow={() => {}}
                  />
                </div>
              </PivotItem>
              <PivotItem headerText={intl(LabelNames.assignments)} itemKey="2">
                <br />
                <div
                  className={
                    'ms-Grid-row bclist DropdownBoderLess ' + classes.selection
                  }>
                  <div className={'ms-Grid-col ms-lg1 ' + classes.filterwidth}>
                    <FontIcon iconName="Filter" />
                  </div>
                  <div className={'ms-Grid-col ms-lg3 ' + classes.allhome}>
                    <Dropdown
                      defaultSelectedKey="All Assignments"
                      options={assignmentOptions}
                      styles={AllHomedropdownStyles}
                    />
                  </div>
                  <div className={'ms-Grid-col ms-lg1 ' + classes.filterwidth}>
                    <FontIcon iconName="Sort" className={classes.cursor} />
                  </div>
                  <div className={'ms-Grid-col ms-lg3 ' + classes.sorting}>
                    <Dropdown
                      defaultSelectedKey="Date latest-oldest"
                      options={sortingOptions}
                      styles={SortingdropdownStyles}
                    />
                  </div>
                </div>

                <div className="ms-Grid-row">
                  <Assignmentlist
                    itemlist={data.classesassignmentlist}
                    onClickRow={() => {}}
                  />
                </div>
              </PivotItem>
            </Pivot>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todos;
