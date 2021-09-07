import React, { Fragment, useState } from 'react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import classes from './Grades.module.scss';
import { Bar } from 'react-chartjs-2';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { GradeList } from '../../../components/itemlist/GradeList';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import pic1 from '../../../assets/images/persona/helle.png';
import { LabelNames } from '../../../util/constant';
import { intl } from '../../../util/commonFunction';
import * as ChartJS from 'chart.js';

const chartOptions = {
  showScale: true,
  pointDot: true,
  showLines: false,
  maintainAspectRatio: false,
  legend: {
    display: false,
    labels: {
      boxWidth: 50,
      fontSize: 10,
      fontColor: '#bbb',
      padding: 5,
      fontBold: 'bold',
    },
    position: 'bottom',
    align: 'center',
  },

  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 10,
          stepSize: 2,
          fontColor: '#A5A7A8',
        },
        gridLines: {
          color: 'rgba(0, 0, 0, 0)',
        },
      },
    ],
    xAxes: [
      {
        maxBarThickness: 30,
        barPercentage: 1 /* change this */,
        categoryPercentage: 0.5 /* change this */,
        gridLines: {
          color: 'rgba(0, 0, 0, 0)',
        },
      },
    ],
  },

  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 10,
      bottom: 0,
    },
  },

  tooltips: {
    // Disable the on-canvas tooltip
    enabled: false,
    titleFontColor: 'black',
    custom: function (tooltipModel: ChartJS.ChartTooltipModel) {
      // Tooltip Element
      let tooltipEl = document.getElementById('chartjs-tooltip');

      // Create element on first render
      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.innerHTML = '<table class="graphContainer"></table>';
        document.body.appendChild(tooltipEl);
      }

      // Hide if no tooltip
      if (tooltipModel.opacity === 0) {
        tooltipEl.style.opacity = '0';
        return;
      }

      // Set caret Position
      tooltipEl.classList.remove('above', 'below', 'no-transform');
      tooltipEl.classList.add('graphdiv');
      if (tooltipModel.yAlign) {
        tooltipEl.classList.add(tooltipModel.yAlign);
      } else {
        tooltipEl.classList.add('no-transform');
      }

      function getBody(bodyItem: ChartJS.ChartTooltipModelBody) {
        return bodyItem.lines;
      }

      // Set Text
      if (tooltipModel.body) {
        const titleLines = tooltipModel.title || [];
        const bodyLines = tooltipModel.body.map(getBody);

        let innerHtml = '<thead>';

        titleLines.forEach(title => {
          innerHtml +=
            '<tr><th class="graphTitle">' +
            title +
            ' Grade: <span class="graphValue">' +
            tooltipModel.dataPoints[0].value +
            '</span></th></tr>';
        });
        innerHtml += '</thead><tbody>';

        bodyLines.forEach((body, i) => {
          //var colors = tooltipModel.labelColors[i];
          //   var style = "background:" + colors.backgroundColor;
          //   style += "; border-color:" + colors.borderColor;
          //   style += "; border-width: 2px";
          innerHtml += '<tr><td></td></tr>';
        });
        innerHtml += '</tbody>';

        const tableRoot: HTMLTableElement | null =
          tooltipEl.querySelector('table');
        if (tableRoot) {
          tableRoot.innerHTML = innerHtml;
        }
      }

      // `this` will be the overall tooltip

      // eslint-disable-next-line
      const position = (this as any)._chart.canvas.getBoundingClientRect();

      // Display, position, and set styles for font
      tooltipEl.style.opacity = '1';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.left =
        position.left + window.pageXOffset + tooltipModel.caretX + 'px';
      tooltipEl.style.top =
        position.top + window.pageYOffset + tooltipModel.caretY + 'px';
      tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
      tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
      tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
      tooltipEl.style.padding =
        tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
      tooltipEl.style.pointerEvents = 'none';
    },
  },
};
const data1 = {
  labels: [
    '1st Assessment',
    '2nd Assessment',
    'Final Assessment',
    'Final Grade',
    'Exam Grade',
  ],
  datasets: [
    {
      label: 'Written Grade',
      backgroundColor: '#a27de5',
      borderColor: '#a27de5',
      hoverBackgroundColor: '#a27de5',
      barThickness: 35,
      stack: '1',
      data: [10, 7, 10, 0, 0],
    },
    {
      label: 'Oral Grade',
      backgroundColor: '#e5daf8',
      borderColor: '#e5daf8',
      hoverBackgroundColor: '#e5daf8',
      barThickness: 35,
      stack: '3',
      data: [8, 6, 10, 0, 0],
    },
  ],
};

ChartJS.defaults.global.defaultFontColor = 'black';
ChartJS.defaults.global.defaultFontSize = 13;

const items = [
  {
    subject: '1st Assessment',
    oralGrade: 10,
    writtenGrade: 7,
    remarks: 'Lorem ipsum dolor sit met, consetuer sadipscing elitr',
  },
  {
    subject: '2st Assessment',
    oralGrade: 7,
    writtenGrade: 6,
    remarks: 'Lorem ipsum dolor sit met, consetuer sadipscing elitr',
  },
  {
    subject: 'Final Assessment',
    oralGrade: 10,
    writtenGrade: 10,
    remarks:
      'I have seen your hardwork and perseverance. Keep up the good work, Mona!',
  },
  {
    subject: 'Final Grade',
    oralGrade: 0,
    writtenGrade: 0,
    remarks: null,
  },
  {
    subject: 'Exam Grade',
    oralGrade: 0,
    writtenGrade: 0,
    remarks: null,
  },
];

const Media = () => {
  const [toggleSelected, setToggleSelecetd] = useState<string | null>();
  const [toggleBol, setToggleBol] = useState(false);
  const [barClasses, setBarClasses] = useState(classes.barcontainer);
  const [classicView, setClassicView] = useState(
    <Bar
      data={data1}
      width={100}
      height={50}
      options={chartOptions as ChartJS.ChartOptions}
    />,
  );

  const legenddiv: JSX.Element[] = [];
  data1.datasets.forEach((item, i) => {
    legenddiv.push(
      <span className="padR10" key={i}>
        <span className="padR5">
          <FontIcon
            iconName="FullCircleMask"
            className={classes.fontIcon}
            style={{ color: item.backgroundColor }}
          />
        </span>
        <span>{item.label}</span>
      </span>,
    );
  });

  const toggleHandler = (
    ev: React.MouseEvent<HTMLElement>,
    checked?: boolean,
  ) => {
    if (checked !== undefined) {
      setToggleBol(checked);

      if (checked) {
        setToggleSelecetd(classes.toggleSelected);
        setClassicView(<GradeList items={items} />);
        setBarClasses('');
      } else {
        setToggleSelecetd(null);
        setClassicView(
          <Bar
            data={data1}
            width={100}
            height={50}
            options={chartOptions as ChartJS.ChartOptions}
          />,
        );
        setBarClasses(classes.barcontainer);
      }
    }
  };

  const examplePersona = {
    imageUrl: pic1,
    imageInitials: '',
  };

  return (
    <>
      <div className={'ms-Grid-row padT40 ' + classes.container}>
        <div className={'ms-Grid-col ms-lg12 bclist ' + classes.container}>
          <div className={'ms-Grid-row ' + classes.subContainer}>
            <div className={'ms-Grid-col ms-lg5 ' + classes.gradeBorder}>
              <div className="ms-Grid-row">
                <div
                  className={
                    'ms-Grid-col ms-lg12 text-center ' + classes.statusHeader
                  }>
                  <i
                    className={
                      'ms-Icon ms-Icon--Trophy2Solid ' + classes.trophy
                    }
                    aria-hidden="true"
                  />{' '}
                  {intl(LabelNames.youreachamp)}
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-lg12 ">
                  <div className="ms-Grid-col ms-lg6 text-center padl15">
                    <div className={classes.statusScore}>10</div>
                    <div className={classes.statuslabel}>Written Grade</div>
                  </div>
                  <div className="ms-Grid-col ms-lg6 text-center padR15">
                    <div className={classes.statusScore}>10</div>
                    <div className={classes.statuslabel}>Oral Grade</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ms-Grid-col ms-lg7 ">
              <div className="ms-Grid-row">
                <div className={'ms-Grid-col ms-lg12 ' + classes.remarksheader}>
                  <div className={classes.remarksheadertitle}>
                    Final Assessment
                  </div>
                  <div className={classes.remarksheaderdate}>Jan-Feb 2020</div>
                  <br />
                  <div className={classes.persona}>
                    <div>
                      <Persona
                        {...examplePersona}
                        size={PersonaSize.size24}
                        presence={2}
                        hidePersonaDetails={true}
                      />
                    </div>
                    <div className={classes.personaremarks}>
                      "I have seen your hardwork and perseverance. Keep up the
                      good work, Mona!"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="ms-Grid-row">
        <div className={'ms-Grid-col ms-lg12 bclist ' + classes.container}>
          <div className={'ms-Grid-row ' + classes.barHeader}>
            <div className={'ms-Grid-col ms-lg6 ' + classes.headerleft}>
              {intl(LabelNames.schoolyear)} 2020
            </div>
            <div className={'ms-Grid-col ms-lg6 '}>
              <span>
                <Toggle
                  className={classes.headerright + ' ' + toggleSelected}
                  onText={intl(LabelNames.classicview)}
                  offText={intl(LabelNames.classicview)}
                  onChange={toggleHandler}
                />
              </span>
            </div>
          </div>
          <br />
          <div className={'ms-Grid-row '}>
            <div className={'ms-Grid-col ms-lg12 ' + barClasses}>
              {classicView}
            </div>
          </div>
          <br />

          <div className="ms-Grid-row">
            <div className={'ms-Grid-col ms-lg12 ' + classes.legend}>
              {!toggleBol ? legenddiv : null}
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  );
};

export default Media;
