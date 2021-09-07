import React, { Fragment } from 'react';
import styles from './ActivitiesParticipants.module.scss';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
//import { LabelNames } from "../../../../util/constant";
//import { intl } from "../../../../util/commonFunction";

import {
  Dropdown,
  Checkbox,
  SearchBox,
  FontIcon,
  Persona,
  PersonaSize,
  Callout,
  getTheme,
  FontWeights,
  mergeStyleSets,
  Icon,
} from 'office-ui-fabric-react';

import { useId } from '@uifabric/react-hooks';
const typeSCSS = require('../../../../assets/ui-kit/_variables.scss');
const theme = getTheme();

const stylesCallOut = mergeStyleSets({
  buttonArea: {
    verticalAlign: 'top',
    display: 'inline-block',
    textAlign: 'center',
    margin: '0 100px',
    minWidth: 130,
    height: 32,
  },
  callout: {
    maxWidth: 450,
    width: 450,
  },
  header: {
    padding: '18px 24px 12px',
  },
  title: [
    theme.fonts.xLarge,
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
    },
  ],
  inner: {
    height: '100%',
  },
  actions: {
    position: 'relative',
    width: '100%',
    whiteSpace: 'nowrap',
  },
  subtext: [
    theme.fonts.small,
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
    },
  ],
  link: [
    theme.fonts.medium,
    {
      color: theme.palette.neutralPrimary,
    },
  ],
});

const dropdownStylesGroups = {
  dropdown: { width: '200px' },
};
const dpPerson = {
  root: {
    fontSize: '18px',
  },
  primaryText: {
    fontSize: '14px !important',
  },
  secondaryText: {
    fontSize: '14px !important',
  },
};

const groupOptions = [
  { key: '1', text: 'Class' },
  { key: '2', text: 'Students' },
  { key: '3', text: 'Teachers' },
  { key: '4', text: 'Rooms' },
  { key: '5', text: 'Resources' },
];

type ActivitiesParticipantsProps = {
  groupHandler: any;
  searchOnchanged: any;
  // filterSuggestedTags={filterSuggestedTags}
  getTextFromItem: any;
  pickerSuggestionsProps: any;
  // inputProps={inputProps}
  groupHold: any;
  groupStudents: any;
  groupTeachers: any;
  groupRooms: any;
  groupResources: any;
  onDeleteItem: any;
  groupValue: any;
  isCalloutVisible: any;
  toggleIsCalloutVisible: any;
  searchList: any;
  defaultValue: any;
  handleChange: any;
  formValues: any;
};

const ActivitiesParticipants: React.FC<ActivitiesParticipantsProps> = props => {
  const [groupSelected, setGroupSelected] = React.useState(null);
  const [placeHolder, setPlaceHolder] = React.useState(
    'Search class, students, teachers, rooms and resources...',
  );

  const labelId = useId('callout-label');
  const descriptionId = useId('callout-description');

  const onRenderTitle = (options: any) => {
    let wrapper = null;
    if (options[0].text === 'Class') {
      wrapper = (
        <Icon
          iconName="Group"
          style={{ color: typeSCSS.classScheduleBorder }}
        />
      );
    } else if (options[0].text === 'Students') {
      wrapper = (
        <Icon
          iconName="IDBadge"
          style={{ color: typeSCSS.classScheduleBorder }}
        />
      );
    } else if (options[0].text === 'Teachers') {
      wrapper = (
        <Icon
          iconName="AccountManagement"
          style={{ color: typeSCSS.classScheduleBorder }}
        />
      );
    } else if (options[0].text === 'Rooms') {
      wrapper = (
        <Icon iconName="POI" style={{ color: typeSCSS.classScheduleBorder }} />
      );
    } else if (options[0].text === 'Resources') {
      wrapper = (
        <Icon
          iconName="CubeShape"
          style={{ color: typeSCSS.classScheduleBorder }}
        />
      );
    }

    const option = options[0];
    return (
      <div>
        <span style={{ paddingRight: '6px' }}>{wrapper}</span>
        <span>{option.text}</span>
      </div>
    );
  };

  const onRenderGroupOption = (option: any) => {
    let wrapper: any = '';
    if (option.text === 'Class') {
      wrapper = (
        <Icon
          iconName="Group"
          aria-hidden="true"
          style={{ color: typeSCSS.classScheduleBorder }}
        />
      );
    } else if (option.text === 'Students') {
      wrapper = (
        <Icon
          iconName="IDBadge"
          aria-hidden="true"
          style={{ color: typeSCSS.classScheduleBorder }}
        />
      );
    } else if (option.text === 'Teachers') {
      wrapper = (
        <Icon
          iconName="AccountManagement"
          aria-hidden="true"
          style={{ color: typeSCSS.classScheduleBorder }}
        />
      );
    } else if (option.text === 'Rooms') {
      wrapper = (
        <Icon
          iconName="POI"
          aria-hidden="true"
          style={{ color: typeSCSS.classScheduleBorder }}
        />
      );
    } else if (option.text === 'Resources') {
      wrapper = (
        <Icon
          iconName="CubeShape"
          aria-hidden="true"
          style={{ color: typeSCSS.classScheduleBorder }}
        />
      );
    }

    return (
      <div style={{ display: 'flex' }}>
        <>
          <div style={{ width: '20px' }} id={option.key}>
            {wrapper}
          </div>
          <div id={option.key}>{option.text}</div>
        </>
      </div>
    );
  };

  const handleDeleteClick = (item: any, group: any) => {
    props.onDeleteItem(item, group);
  };

  const onChangeGroupSelected = (item: any) => {
    setGroupSelected(item.key);
    props.groupHandler(item);
    switch (item.text) {
      case 'Class':
        setPlaceHolder('Seach for class...');
        break;
      case 'Students':
        setPlaceHolder('Seach for students...');
        break;
      case 'Teachers':
        setPlaceHolder('Seach for teachers...');
        break;
      case 'Rooms':
        setPlaceHolder('Seach for rooms...');
        break;
      case 'Resources':
        setPlaceHolder('Seach for resources...');
        break;
      default:
        break;
    }
  };

  const onChangeValue = (item: any) => {
    props.searchOnchanged(item);
  };

  return (
    <div className={'ms-Grid-col ms-sm12  ms-lg12 ' + styles.activityForm}>
      <div className="ms-Grid-row">
        <div className={styles.formTitle}>Add Participants</div>
      </div>
      <div className="ms-Grid-row">
        <div className="horizontal-textfield">
          <Dropdown
            options={groupOptions}
            styles={dropdownStylesGroups}
            onRenderOption={onRenderGroupOption}
            onRenderTitle={onRenderTitle}
            defaultSelectedKey="-1"
            // autoComplete="type"
            // name="type"
            onChanged={onChangeGroupSelected}
            placeholder="Choose a group..."
          />
          <div className="padR10"></div>
          <div className={'divpadt10 ' + styles.searchField}>
            <SearchBox
              placeholder={placeHolder}
              onChanged={ev => {
                onChangeValue(ev);
              }}
              value={props.defaultValue}
              id="searchBox"
              disabled={!groupSelected}
            />
            {props.isCalloutVisible && (
              <Callout
                className={stylesCallOut.callout}
                ariaLabelledBy={labelId}
                ariaDescribedBy={descriptionId}
                role="alertdialog"
                id=""
                gapSpace={5}
                target={'#searchBox'}
                onDismiss={props.toggleIsCalloutVisible}
                isBeakVisible={false}
                setInitialFocus>
                <div className={stylesCallOut.inner}>{props.searchList}</div>
              </Callout>
            )}
          </div>
        </div>
      </div>
      <br />
      <div className="ms-Grid-row ">
        <table className={styles.tableContainer}>
          <thead>
            <tr>
              <th className={styles.leftCol}></th>
              <th className={styles.rightCol}>Selected Participants</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.groupTitle}>Class</td>
              <td>
                <div style={{ display: 'flex' }}>
                  {props.groupHold?.map((a: any, key: any) => {
                    return (
                      <div className={styles.holdItem} key={key}>
                        <span className={styles.hold}>
                          <FontIcon
                            iconName="Group"
                            className={styles.holdIcon}></FontIcon>
                        </span>
                        {a.name}
                        <span>
                          <FontIcon
                            iconName="Cancel"
                            className={styles.deleteIcons}
                            onClick={() =>
                              handleDeleteClick(a, 'Hold')
                            }></FontIcon>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </td>
            </tr>
            <tr>
              <td className={styles.groupTitle}>Students</td>
              <td>
                <div style={{ display: 'flex' }}>
                  {props.groupStudents?.map((a: any, key: any) => {
                    return (
                      <div className={styles.studentsItem} key={key}>
                        <span>
                          <Persona
                            text={a.name}
                            size={PersonaSize.size24}
                            secondaryText={a.name}
                            styles={dpPerson}
                          />
                        </span>
                        <span>
                          <FontIcon
                            iconName="Cancel"
                            className={styles.deleteIcons}
                            onClick={() =>
                              handleDeleteClick(a, 'Students')
                            }></FontIcon>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </td>
            </tr>
            <tr>
              <td className={styles.groupTitle}>Teachers</td>
              <td>
                <div style={{ display: 'flex' }}>
                  {props.groupTeachers?.map((a: any, key: any) => {
                    return (
                      <div className={styles.teachersItem} key={key}>
                        <span>
                          <Persona
                            text={a.name}
                            size={PersonaSize.size24}
                            secondaryText={a.name}
                            styles={dpPerson}
                          />
                        </span>
                        <span>
                          <FontIcon
                            iconName="Cancel"
                            className={styles.deleteIcons}
                            onClick={() =>
                              handleDeleteClick(a, 'Teachers')
                            }></FontIcon>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </td>
            </tr>
            <tr>
              <td className={styles.groupTitle}>Rooms</td>
              <td>
                <div style={{ display: 'flex' }}>
                  {props.groupRooms?.map((a: any, key: any) => {
                    return (
                      <div className={styles.roomsItem} key={key}>
                        <span className={styles.rooms}>
                          <FontIcon
                            iconName="POI"
                            className={styles.roomsIcon}></FontIcon>
                        </span>
                        {a.name}
                        <span>
                          <FontIcon
                            iconName="Cancel"
                            className={styles.deleteIcons}
                            onClick={() =>
                              handleDeleteClick(a, 'Rooms')
                            }></FontIcon>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </td>
            </tr>
            <tr>
              <td className={styles.groupTitle}>Resources</td>
              <td>
                <div style={{ display: 'flex' }}>
                  {props.groupResources?.map((a: any, key: any) => {
                    return (
                      <div className={styles.resourcesItem} key={key}>
                        <span className={styles.resources}>
                          <FontIcon
                            iconName="CubeShape"
                            className={styles.resourcesIcon}></FontIcon>
                        </span>
                        {a.name}
                        <span>
                          <FontIcon
                            iconName="Cancel"
                            className={styles.deleteIcons}
                            onClick={() =>
                              handleDeleteClick(a, 'Resources')
                            }></FontIcon>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <div className="ms-Grid-row">
        <Checkbox
          name="reserveParticipants"
          label=" Activity is credit giving (The student will be credited for absence in other classes)"
          defaultChecked={true}
        />
      </div>
      <br />
      <div className="ms-Grid-row">
        <div className="horizontal-textfield">
          <Label style={{ width: '80px' }} htmlFor="note">
            Note
          </Label>
          <TextField
            autoComplete="note"
            className={styles.noteField}
            name="note"
            onChange={props.handleChange}
            value={props.formValues.note}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivitiesParticipants;
