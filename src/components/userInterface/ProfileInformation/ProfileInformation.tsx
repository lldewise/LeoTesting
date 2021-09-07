import React, { Fragment, useState, useEffect } from 'react';
import styles from './ProfileInformation.module.scss';
import {
  Pivot,
  PivotItem,
  PrimaryButton,
  ActionButton,
  Stack,
  TextField,
  Dropdown,
  DefaultButton,
} from 'office-ui-fabric-react';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { useStore } from '../../../store/store';
import moment from 'moment';
import emptyItems from '../../../assets/empty.png';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { intl } from '../../../util/commonFunction';
import { LabelNames } from '../../../util/constant';
import pic1 from '../../../assets/images/persona/helle.png';
import {
  Icon,
  Modal,
  getTheme,
  mergeStyleSets,
  FontWeights,
} from '@fluentui/react';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { IconButton } from '@fluentui/react/lib/Button';
import ProfileNotes from '../../../components/userInterface/ProfileNotes/ProfileNotes';
import StudentCasesList from './StudentCasesList';

const dpPerson = {
  root: {
    fontSize: '18px !important',
    display: 'inline-block',
  },
};

const SortingdropdownStyles = {
  dropdown: {
    width: 150,
  },
};

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

interface INotesItem {
  id: any;
  name: any;
  initial: any;
  persona: any | undefined;
  date: any;
  comments: any;
  status: any;
  active: any;
}

const notesItem: INotesItem[] = [
  {
    id: 1,
    name: 'Anne Nielsen',
    initial: 'AN',
    persona: pic1,
    date: 'October 2, 2020 Fri ',
    comments:
      '<p>No late comers allowed! Bring your English 101 Book. Please study the attached file.</p>',
    status: 2,
    active: true,
  },
];

const guardianList: any[] = [
  {
    imageInitials: 'AK',
    text: 'Ana Kane',
    secondaryText: 'Mother',
    tertiaryText: '09134123123',
    email: 'ak@email.com',
  },
  {
    imageInitials: 'KK',
    text: 'Kristoff Kane',
    secondaryText: 'Father',
    tertiaryText: '09876543211',
    email: 'kk@email.com',
  },
];

const cancelIcon: any = { iconName: 'Cancel' };

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});
const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};

type ProfileInformation = {
  user: any;
  dataStore: any;
};

const ProfileInformation: React.FC<ProfileInformation> = props => {
  //eslint-disable-next-line
  const [pivotActive, setPivotActive] = useState(1);
  //eslint-disable-next-line
  const [data, dispatch] = useStore();
  const [cases, setCases] = useState(data.casesList);
  const [isUpload, setIsUpload] = useState(false);
  const [profileNotesList, setnewsProfileNotesList] = useState<any[] | []>([]);
  const [newsFeedData, setNewsFeedData] = useState(notesItem);
  const [studentGuardians, setStudentGuardians] = useState<any[] | []>([]);
  const [notes, setNotes] = useState<any[] | []>([]);
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(false);

  const examplePersona = {
    imageUrl: notesItem[0].persona,
    imageInitials: notesItem[0].initial,
  };

  const titleId = useId('title');

  useEffect(() => {
    let profileNotes: any[] = [];
    newsFeedData.forEach((item, i) => {
      profileNotes.push(
        <div key={i} className={styles.divnewFeeds}>
          <ProfileNotes item={item} />
        </div>,
      );
    });

    setnewsProfileNotesList(profileNotes);
  }, [newsFeedData]); // eslint-disable-line react-hooks/exhaustive-deps

  const pivotHandler = (value: any) => {
    setIsUpload(false);
    setPivotActive(value.props.itemKey);
  };

  const uploadFile = (e: any) => {
    setIsUpload(true);
  };

  const handleUpload = () => {};
  const handleAddGuardian = () => {
    setStudentGuardians(guardianList);
  };

  const handleAddNotes = () => {
    setNotes(notesItem);
  };

  const cardStyles = {
    root: {
      minWidth: '100%',
      height: 440,
    },
  };

  return (
    <>
      <div className="ms-Grid-row">
        <div className={'ms-Grid-col ms-lg12 ' + styles.body}>
          <div className={'ms-Grid-col ms-lg12 '}>
            <hr className={styles.pivotDivider} />
            <Pivot onLinkClick={pivotHandler}>
              <PivotItem
                headerText="Education Info"
                itemIcon="Bank"
                itemKey="1">
                <div className={styles.contentMargin}>
                  <div className={'ms-Grid-row ' + styles.contentColor}>
                    {props.dataStore.enrolledStudentSelected == null ? (
                      <div className="ms-Grid-row ">
                        <div
                          className={
                            'ms-Grid-col ms-lg12 ' +
                            styles.noGuardianSectionContainer
                          }>
                          <div className={styles.info}>
                            <img
                              alt={emptyItems}
                              src={emptyItems}
                              style={{ height: '90px' }}
                            />
                            <div className={styles.noGuardianMessageTitle}>
                              Nothing to show here
                            </div>
                            <div className={styles.noGuardianMessage}>
                              This student is not yet enrolled.
                            </div>
                            <div className={styles.noGuardianMessageBtn}>
                              <PrimaryButton
                                // onClick={handleAddGuardian}
                                text="Enroll now"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className={styles.flexContainer}>
                          <div
                            className={
                              'ms-Grid-col ms-lg12 ' +
                              styles.schoolContentHeader
                            }>
                            {props.user?.firstname} {"'s"} current education
                            information
                          </div>
                          <div className={styles.schoolEditBtn}>
                            <ActionButton
                              className={'btnPlain btnPrimary '}
                              iconProps={{ iconName: 'Edit' }}
                              text="Edit"
                            />
                          </div>
                        </div>
                        <div
                          className={
                            'ms-Grid-col ms-lg6 ' + styles.schoolContentInfo
                          }>
                          <div className="divpadt10">
                            <Stack>
                              <TextField
                                label="Education"
                                className="readonly-textfield"
                                readOnly
                                defaultValue={
                                  props.dataStore.enrolledStudentSelected !=
                                  null
                                    ? props.dataStore.enrolledStudentSelected
                                        ?.education
                                    : '-'
                                }
                              />
                              <TextField
                                label="Student Program"
                                className="readonly-textfield"
                                readOnly
                                defaultValue={
                                  props.dataStore.enrolledStudentSelected !=
                                  null
                                    ? props.dataStore.enrolledStudentSelected
                                        ?.studyProgram
                                    : '-'
                                }
                              />
                              <TextField
                                label="Line of Study"
                                className="readonly-textfield"
                                readOnly
                                defaultValue={
                                  props.dataStore.enrolledStudentSelected !=
                                  null
                                    ? props.dataStore.enrolledStudentSelected
                                        ?.lineStudy
                                    : '-'
                                }
                              />
                              <TextField
                                label="Batch"
                                className="readonly-textfield"
                                readOnly
                                defaultValue={
                                  props.dataStore.enrolledStudentSelected !=
                                  null
                                    ? props.dataStore.enrolledStudentSelected
                                        ?.batchId
                                    : '-'
                                }
                              />
                              <TextField
                                label="Temporary Batch"
                                className="readonly-textfield"
                                readOnly
                                defaultValue={
                                  props.dataStore.enrolledStudentSelected !=
                                  null
                                    ? props.dataStore.enrolledStudentSelected
                                        ?.temporarybatch
                                    : '-'
                                }
                              />
                            </Stack>
                          </div>
                        </div>
                        <div
                          className={
                            'ms-Grid-col ms-lg6 ' + styles.schoolContentInfo
                          }>
                          <div className="divpadt10">
                            <Stack>
                              <TextField
                                label="Enrollment Date"
                                className="readonly-textfield"
                                readOnly
                                defaultValue={
                                  props.dataStore.enrolledStudentSelected !=
                                  null
                                    ? moment(
                                        props.dataStore.enrolledStudentSelected
                                          ?.enrollementDate,
                                      ).format('DD/MM/yyyy')
                                    : '-'
                                }
                              />
                              <TextField
                                label="Disenrollment Date"
                                className="readonly-textfield"
                                readOnly
                                defaultValue={
                                  props.dataStore.enrolledStudentSelected
                                    ?.disenrollmentdate !== undefined
                                    ? props.dataStore.enrolledStudentSelected
                                        ?.disenrollmentdate
                                    : '-'
                                }
                              />
                              <TextField
                                label="Disenrollment Reason"
                                className="readonly-textfield"
                                readOnly
                                defaultValue={
                                  props.dataStore.enrolledStudentSelected
                                    ?.disenrollmentreason !== undefined
                                    ? props.dataStore.enrolledStudentSelected
                                        ?.disenrollmentreason
                                    : '-'
                                }
                              />
                              <TextField
                                label="Disenrollment Note"
                                className="readonly-textfield"
                                readOnly
                                defaultValue={
                                  props.dataStore.enrolledStudentSelected
                                    ?.disenrollmentnote !== undefined
                                    ? props.dataStore.enrolledStudentSelected
                                        ?.disenrollmentnote
                                    : '-'
                                }
                              />
                              <div className={styles.titlestudent}>
                                Student's Application
                              </div>
                              <div>
                                <ActionButton
                                  className={
                                    'btnPlain btnInfo ' + styles.actionButton
                                  }
                                  iconProps={{ iconName: 'Link' }}
                                  text="Go to student's application"
                                />
                              </div>
                            </Stack>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </PivotItem>

              <PivotItem
                headerText="Guardian"
                itemIcon="ContactHeart"
                itemKey="2">
                <div className={styles.contentMargin}>
                  <div className={'ms-Grid-row ' + styles.contentColor}>
                    {studentGuardians && studentGuardians?.length === 0 ? (
                      <>
                        <div className="ms-Grid-row ">
                          <div
                            className={
                              'ms-Grid-col ms-lg12 ' +
                              styles.noGuardianSectionContainer
                            }>
                            <div className={styles.info}>
                              <img
                                alt={emptyItems}
                                src={emptyItems}
                                style={{ height: '90px' }}
                              />
                              <div className={styles.noGuardianMessageTitle}>
                                Nothing to show here
                              </div>
                              <div className={styles.noGuardianMessage}>
                                This student has no record of a guardian.
                              </div>
                              <div className={styles.noGuardianMessageBtn}>
                                <PrimaryButton
                                  onClick={handleAddGuardian}
                                  text="Add a guardian"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={styles.flexContainer}>
                          <div
                            className={
                              'ms-Grid-col ms-lg12 ' +
                              styles.guardianContentHeader
                            }>
                            This is the available information about{' '}
                            {props.user?.firstname}
                            {"'s"} guardian(s):
                          </div>
                          <div className={styles.schoolEditBtn}>
                            <ActionButton
                              className={'btnPlain btnPrimary '}
                              iconProps={{ iconName: 'Edit' }}
                              text="Edit"
                            />
                          </div>
                        </div>

                        <div className={styles.guardianInfoContainer}>
                          {studentGuardians?.length > 0 &&
                            studentGuardians.map((a, i) => (
                              <div
                                key={i}
                                className={
                                  'ms-Grid-col ms-lg12 ' +
                                  styles.guardianContentInfo
                                }>
                                <Persona
                                  imageInitials={a.imageInitials}
                                  styles={dpPerson}
                                />
                                <div className={styles.personaInfo}>
                                  <span className={styles.name}>{a.text}</span>
                                  <span className={styles.relation}>
                                    {a.secondaryText}
                                  </span>
                                  <span className={styles.contact}>
                                    {a.tertiaryText}
                                    <Icon
                                      iconName="RadioBullet"
                                      className={styles.icnBullet}
                                    />
                                    {a.email}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </PivotItem>

              <PivotItem
                headerText="Student Case's"
                itemIcon="Info"
                itemKey="3">
                <div className={styles.contentMargin}>
                  <div className={'ms-Grid-row ' + styles.contentColor}>
                    <div className={styles.flexContainer}>
                      {!isUpload && (
                        <>
                          <div
                            className={
                              'ms-Grid-col ms-lg6 ' + styles.casesContentHeader
                            }>
                            List of {props.user?.firstname} {"'s"} case
                          </div>
                          <div
                            className={
                              'ms-Grid-col ms-lg6 ' + styles.buttonHolder
                            }>
                            <Stack horizontal wrap horizontalAlign="end">
                              <ActionButton
                                iconProps={{ iconName: 'Upload' }}
                                text="Upload"
                                className={
                                  'btnPlain btnPrimary ' + styles.marginR10
                                }
                                onClick={e => uploadFile(e)}
                              />
                              <ActionButton
                                iconProps={{ iconName: 'Download' }}
                                text="Download"
                                className="btnPlain btnPrimary"
                              />
                            </Stack>
                          </div>
                        </>
                      )}
                    </div>
                    <div className={styles.casesInfoContainer}>
                      <StudentCasesList
                        listItems={cases}
                        isUpload={isUpload}
                        uploadFileHandler={uploadFile}
                      />
                    </div>
                  </div>
                </div>
              </PivotItem>
              <PivotItem headerText="Notes" itemIcon="Message" itemKey="4">
                <Modal
                  titleAriaId={titleId}
                  isOpen={isModalOpen}
                  onDismiss={hideModal}
                  isBlocking={false}
                  containerClassName={contentStyles.container}>
                  <div className={contentStyles.header}>
                    <span id={titleId}>Add a note</span>
                    <IconButton
                      styles={iconButtonStyles}
                      iconProps={cancelIcon}
                      ariaLabel="Close popup modal"
                      onClick={hideModal}
                    />
                  </div>
                  <div className={contentStyles.body}>
                    <div className={styles.noteFlexContainer}>
                      <div className={styles.col1}>
                        <Persona
                          {...examplePersona}
                          size={PersonaSize.size48}
                          presence={notesItem[0].status}
                          hidePersonaDetails={true}
                        />
                      </div>

                      <div className={styles.col2}>
                        <div className={styles.divname}>
                          {notesItem[0].name}
                        </div>
                        <div className={styles.personadetail}>
                          <i
                            className="ms-Icon ms-Icon--Lock"
                            aria-hidden="true"></i>{' '}
                          Private
                        </div>
                      </div>
                    </div>

                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-lg12">
                        <TextField
                          multiline
                          rows={3}
                          placeholder="Type your notes here..."
                        />
                      </div>
                    </div>
                    <div className="notesBtnPos">
                      <DefaultButton text="Cancel" />
                      <PrimaryButton text="Save" />
                    </div>
                  </div>
                </Modal>
                <div className={styles.contentMargin}>
                  <div className={'ms-Grid-row ' + styles.contentColor}>
                    {notes?.length === 0 ? (
                      <div className="ms-Grid-row ">
                        <div
                          className={
                            'ms-Grid-col ms-lg12 ' +
                            styles.noGuardianSectionContainer
                          }>
                          <div className={styles.info}>
                            <img
                              alt={emptyItems}
                              src={emptyItems}
                              style={{ height: '90px' }}
                            />
                            <div className={styles.noGuardianMessageTitle}>
                              Nothing to show here
                            </div>
                            <div className={styles.noGuardianMessage}>
                              Do you have things to note?
                            </div>
                            <div className={styles.noGuardianMessageBtn}>
                              <PrimaryButton
                                onClick={handleAddNotes}
                                text="Add Note"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className={styles.notesFlexContainer}>
                          <div
                            className={
                              'ms-Grid-col ms-lg12 ' +
                              styles.schoolContentHeader
                            }>
                            These are the notes added to {props.user?.firstname}
                            .
                          </div>
                          <div className={styles.addNotesBtn}>
                            <ActionButton
                              className={'btnPlain btnPrimary '}
                              iconProps={{ iconName: 'Message' }}
                              text="Add note"
                              onClick={showModal}
                            />
                          </div>
                        </div>
                        <div className="ms-Grid-col ms-lg12">
                          <div
                            className={'ms-Grid-col ms-lg5 ' + styles.sortIcon}>
                            <div
                              className={
                                'ms-Grid-row bclist DropdownBoderLess '
                              }>
                              <div
                                className={
                                  'ms-Grid-col ms-lg1 ' + styles.filterwidth
                                }>
                                <FontIcon
                                  iconName="Sort"
                                  className={styles.cursor}
                                />
                              </div>
                              <div
                                className={
                                  'ms-Grid-col ms-lg3 ' + styles.options
                                }>
                                <Dropdown
                                  defaultSelectedKey="Date latest-oldest"
                                  options={sortingOptions}
                                  styles={SortingdropdownStyles}
                                />
                              </div>
                            </div>
                          </div>
                          <div className={'ms-Grid-row'}>
                            <div
                              className={
                                'ms-Grid-col ms-lg11 ' + styles.notesBox
                              }>
                              {profileNotesList}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </PivotItem>
            </Pivot>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInformation;
