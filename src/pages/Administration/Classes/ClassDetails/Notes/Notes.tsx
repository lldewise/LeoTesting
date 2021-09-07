import React, { Fragment, useState, useEffect } from 'react';
import styles from './Notes.module.scss';
import {
  PrimaryButton,
  ActionButton,
  TextField,
  Dropdown,
  DefaultButton,
} from 'office-ui-fabric-react';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import emptyItems from '../../../../../assets/empty.png';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { intl } from '../../../../../util/commonFunction';
import { LabelNames } from '../../../../../util/constant';
import pic1 from '../../../../../assets/images/persona/helle.png';
import ClassDetailsNote from '../../../../../components/userInterface/ClassDetailsNote/ClassDetailsNote';
import {
  Icon,
  Modal,
  getTheme,
  mergeStyleSets,
  FontWeights,
} from '@fluentui/react';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { IconButton } from '@fluentui/react/lib/Button';

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

const notesItem = [
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

const cancelIcon = { iconName: 'Cancel' };

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

const Notes: React.FC = () => {
  const [notesData, setNotesData] = useState<any[]>(notesItem);
  const [profileNotesList, setNewsProfileNotesList] = useState<any[]>([]);
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(false);
  const [notes, setNotes] = useState<any[]>([]);

  const titleId = useId('title');

  const examplePersona = {
    imageUrl: notesItem[0].persona,
    imageInitials: notesItem[0].initial,
  };

  useEffect(() => {
    let profileNotes: any[] = [];
    notesData.forEach((item, i) => {
      profileNotes.push(
        <div key={i} className={styles.divnewFeeds}>
          <ClassDetailsNote item={item} />
        </div>,
      );
    });
    setNewsProfileNotesList(profileNotes);
  }, [notesData]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddNotes = () => {
    setNotes(notesItem);
  };

  return (
    <div>
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
              <div className={styles.divname}>{notesItem[0].name}</div>
              <div className={styles.personadetail}>
                <i className="ms-Icon ms-Icon--Lock" aria-hidden="true"></i>{' '}
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
      <div className="ms-Grid-row ">
        <div className={styles.contentMargin}>
          <div className={'ms-Grid-row ' + styles.contentColor}>
            <div className={styles.flexContainer}>
              <div className="ms-Grid-row ">
                <div className={'ms-Grid-col ms-lg5 ' + styles.headerFilter}>
                  <div className={'ms-Grid-row bclist DropdownBoderLess '}>
                    <div className={'ms-Grid-col ms-lg1 ' + styles.filterwidth}>
                      <FontIcon iconName="Sort" className={styles.cursor} />
                    </div>
                    <div className={'ms-Grid-col ms-lg3 ' + styles.options}>
                      <Dropdown
                        defaultSelectedKey="Date latest-oldest"
                        options={sortingOptions}
                        styles={SortingdropdownStyles}
                      />
                    </div>
                  </div>
                </div>

                <div className={'ms-Grid-col ms-lg6 ' + styles.addNotesBtn}>
                  <ActionButton
                    className={'btnPlain btnPrimary '}
                    iconProps={{ iconName: 'Message' }}
                    text="Add note"
                    onClick={showModal}
                  />
                </div>
              </div>
            </div>
            <div className="ms-Grid-col ms-lg12">
              <div className={'ms-Grid-row'}>
                <div className={'ms-Grid-col ms-lg12 ' + styles.notesBox}>
                  {notes?.length === 0 ? (
                    <div className={styles.emptyDiv}>
                      <div>
                        <FontIcon
                          className={styles.subtitleIcon}
                          iconName="Message"
                          onClick={handleAddNotes}
                        />
                      </div>
                      <div className={styles.subtitle}>
                        Do you have things to note?
                      </div>
                      <div className={styles.subtitle1}>
                        Click the Add note button to create one
                      </div>
                    </div>
                  ) : (
                    <div>{profileNotesList}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
