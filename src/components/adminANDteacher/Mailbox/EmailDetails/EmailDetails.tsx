import React, { Fragment, useState, useRef } from 'react';
import styles from './EmailDetails.module.scss';
import { TextField } from '@fluentui/react/lib/TextField';
import TextEditor from '../TextEditor/TextEditor';
import ReactEditor from '../RoosterTextEditor/ReactEditor'
import noMailSelected from '../../../../assets/no-mail-selected.png';
import {
  NormalPeoplePicker,
  ValidationState,
  getTheme,
  mergeStyleSets,
} from 'office-ui-fabric-react';
import {
  DefaultButton,
  FontIcon,
  Persona,
  PersonaSize,
  IconButton,
  TooltipHost,
  Stack,
  ActionButton,
} from 'office-ui-fabric-react';
import moment from 'moment';
import { useEffect } from 'react';
import { sendMail } from '../../../../services/msgraph/email';
import {
  createMailMessage,
  updateMailMessage,
  getEmailSenderPersona,
} from '../../../../services/msgraph/email';
import  Collapse  from './Collapse';
import { EmailAttachment } from './EmailAttachments';
import { IPersonaProps } from '@fluentui/react/lib/Persona';
import { useStore } from '../../../../store/store';
import {EditorViewState} from 'roosterjs-react';

const userList = [
  {
    imageUrl: null,
    imageInitials: 'AD',
    text: 'Dennis Migrino',
    secondaryText: '',
    tertiaryText: '',
    optionalText: '',
    presence: 1,
  },
  {
    imageUrl: null,
    imageInitials: 'LL',
    text: 'Leo Lopez',
    secondaryText: '',
    tertiaryText: '',
    optionalText: '',
    presence: 1,
  },
  {
    imageUrl: null,
    imageInitials: 'EC',
    text: 'Eric Cantorna',
    secondaryText: '',
    tertiaryText: '',
    optionalText: '',
    presence: 1,
  },
  {
    imageUrl: null,
    imageInitials: 'JC',
    text: 'Jay Celeste',
    secondaryText: '',
    tertiaryText: '',
    optionalText: '',
    presence: 1,
  },
];

const dpPerson = {
  root: {
    fontSize: '18px !important',
    width: '55px',
  },
};

const testTags = [
  "Principal's Office",
  'Admin Office',
  'Accounting Office',
  'Marketing Office',
].map(item => ({ key: item, name: item }));

type EmailDetailsProps = {
  email: any;
  peopleList: any;
  toPeopleArrReply: any;
  ccPeopleArrReply: any;
  contentImages: any;
  mailAttachments: any;
  new: any;
  downloadAll: any;
  successEmailSent: any;
  replyMessage: any;
  replyAllMessage: any;
  forwardMessge: any;
  saveToComputer: any;
  threadMail: any;
  subjectValue: any;
  htmlValue: any;
  oneDriveAttachment: any;
};

const EmailDetails: React.FC<EmailDetailsProps> = props => {
  const [mostRecentlyUsed, setMostRecentlyUsed] = useState<any | null>();
  const [peopleList, setPeopleList] = useState<any | null>();
  const [delayResults] = useState(false);
  const [isPickerDisabled] = useState(false);
  const peoplpicker = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [emailId, setEmailId] = useState();
  const [toPeopleArr, setToPeopleArr] = useState<any[]>([]);
  const [ccPeopleArr, setCCPeopleArr] = useState<any[]>([]);
  const [attachments, setAttachments] = useState<any[]>([]);
  const [subject, setSubject] = useState<any | null>();
  const [photoUrl, setPhotoUrl] = useState<any | null>(null);
  const [emailAttachment, setEmailAttachment] = useState<any | null>();
  const [emailBody, setEmailBody] = useState<any | null>(null);
  const [dataStore] = useStore();

  const content: any = useRef();

  const getProfileImageThread = (emailAddress: any) => {
      if (dataStore.userPreferences.emailDomain !== '' && emailAddress.includes(dataStore.userPreferences.emailDomain)) {
      getEmailSenderPersona(emailAddress)
        .then(res => {
          return res;
        })
        .catch(err => {
          return "";
        });
    } else {
      return "";
    }
  };

  const getProfileImage = (emailAddress: any) => {
      if (dataStore.userPreferences.emailDomain !== '' && emailAddress.includes(dataStore.userPreferences.emailDomain)) {
      getEmailSenderPersona(emailAddress)
        .then((res: any) => {
          setPhotoUrl(res);
        })
        .catch(err => {
          setPhotoUrl(null);
        });
    } else {
      setPhotoUrl(null);
    }
  };

  useEffect(() => {
    if (props.email) {
      content.current = props.email.body;
      getProfileImage(props.email?.from);
      if (props.contentImages?.length > 0) {
        let images = props.contentImages;
        if (images.length > 0) {
          images.forEach((a:any) => {
            if (a.isInline && a.contentType.includes('image')) {
              let str = 'cid:' + a.contentId;
              const byteCharacters = atob(a.contentBytes);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              let image = new Blob([byteArray], { type: a.contentType });
              let imageUrl = URL.createObjectURL(image);
              content.current = content.current.replace(str, imageUrl);
            }
          });
        }
        setEmailBody(content.current);
      } else {
        setEmailBody(props.email.body);
      }
    }
  }, [props.email, props.contentImages]);

  useEffect(() => {
    if (props.mailAttachments != undefined) {
      setEmailAttachment(props.mailAttachments);
    }
  }, [props.mailAttachments]);

  useEffect(() => {
    if (props.peopleList != undefined) {
      setPeopleList(props.peopleList);
      setMostRecentlyUsed(props.peopleList);
    }
  }, [props.peopleList]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!props.email && !props.new) {
    return (
      <div className={'customScroll ' + styles.contentPlaceholder}>
        <div className={styles.info}>
          <img
            alt={noMailSelected}
            src={noMailSelected}
            style={{ height: '120px' }}
          />
        </div>
      </div>
    );
  }

  const toPeopleHandler = (data: any) => {
    props.toPeopleArrReply.push(data);
    return data;
  };

  const onChangeTextValueField = (ev: any) => {
    setSubject(ev.target.value);
  };

  const ccPeopleHandler = (data: any) => {
    props.ccPeopleArrReply.push(data);
    return data;
  };

  const getTextFromItem = (item: any) => item.name;

  const onRemoveSuggestion = (item: any) => {
    const indexPeopleList = peopleList.indexOf(item);
    const indexMostRecentlyUsed = mostRecentlyUsed.indexOf(item);

    if (indexPeopleList >= 0) {
      const newPeople = peopleList
        .slice(0, indexPeopleList)
        .concat(peopleList.slice(indexPeopleList + 1));
      setPeopleList(newPeople);
    }

    if (indexMostRecentlyUsed >= 0) {
      const newSuggestedPeople = mostRecentlyUsed
        .slice(0, indexMostRecentlyUsed)
        .concat(mostRecentlyUsed.slice(indexMostRecentlyUsed + 1));
      setMostRecentlyUsed(newSuggestedPeople);
    }
  };

  // const onFilterChanged = (filterText: any, currentPersonas: any, limitResults: any) => {
  //   if (filterText) {
  //     let filteredPersonas = filterPersonasByText(filterText);

  //     filteredPersonas = removeDuplicates(filteredPersonas, currentPersonas);
  //     filteredPersonas = limitResults
  //       ? filteredPersonas.slice(0, limitResults)
  //       : filteredPersonas;
  //     return filterPromise(filteredPersonas);
  //   } else {
  //     return [];
  //   }
  // };

  const onFilterChanged = (
    filterText: string,
    currentPersonas?: IPersonaProps[],
    limitResults?: number,
  ): IPersonaProps[] | Promise<IPersonaProps[]> => {
    if (filterText) {
      let filteredPersonas = filterPersonasByText(filterText);

      filteredPersonas = removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults
        ? filteredPersonas.slice(0, limitResults)
        : filteredPersonas;
      return filterPromise(filteredPersonas);
    } else {
      return [];
    }
  };

  const filterPersonasByText = (filterText: any) => {
    return peopleList.filter((item: any) => doesTextStartWith(item.text, filterText));
  };

  function removeDuplicates(personas: any, possibleDupes: any) {
    return personas.filter(
      (persona: any) => !listContainsPersona(persona, possibleDupes),
    );
  }

  function validateInput(input: any) {
    if (input.indexOf('@') !== -1) {
      return ValidationState.valid;
    } else if (input.length > 1) {
      return ValidationState.warning;
    } else {
      return ValidationState.invalid;
    }
  }

  const filterPromise = (personasToReturn: any) => {
    if (delayResults) {
      return convertResultsToPromise(personasToReturn);
    } else {
      return personasToReturn;
    }
  };

  const filterSelectedTags = (filterText: any, tagList: any) => {
    return filterText
      ? testTags.filter(
          tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0,
        )
      : [];
  };

  const returnMostRecentlyUsed = (currentPersonas: any) => {
    return filterPromise(removeDuplicates(mostRecentlyUsed, currentPersonas));
  };

  const sendMailHandler = (textField: any, files: any) => {
    attachments.push(files);

    if (props.toPeopleArrReply.length > 0) {
      toPeopleArr.push(props.toPeopleArrReply[0].secondaryText);
    }
    sendMail(
      subject,
      'Normal',
      textField,
      toPeopleArr,
      ccPeopleArr,
      attachments,
    ).then(response => {
      props.successEmailSent();
    });
  };

  const saveAsDraftHandler = (textField: any) => {
    if (emailId != undefined) {
      updateMailMessage(
        emailId,
        subject,
        'High',
        textField,
        toPeopleArr,
        ccPeopleArr,
      );
    } else {
      createMailMessage(
        subject,
        'High',
        textField,
        toPeopleArr,
        ccPeopleArr,
      ).then(response => {
        setEmailId(response.id);
      });
    }
  };

  const calloutProps = { gapSpace: 0 };
  const hostStyles = { root: { display: 'inline-block' } };
  const likeIcon = { iconName: 'Like' };
  const replyIcon = { iconName: 'Reply' };
  const replyAllIcon = { iconName: 'ReplyAll' };
  const forwardIcon = { iconName: 'Forward' };
  const moreIcon = { iconName: 'More' };
  const showAllIcon = { iconName: 'DoubleChevronDown' };
  const hideIcon = { iconName: 'DoubleChevronUp' };
  const downloadIcon = { iconName: 'ChevronDown' };
  const downloadAllIcon = { iconName: 'Down' };

  const handleExpandAttachment = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDownloadAllAttachment = () => {
    props.downloadAll(emailAttachment);
  };

  return (
    <Fragment>
      <div className={styles.emailContent}>
        {!props.new ? (
          <Fragment>
            <div className={'newMessageScroll ' + styles.body}>
              <div className={styles.subject}>{props.email.subject}</div>
              {props.email.importance === 'high' && (
                <div className={styles.important}>
                  <FontIcon
                    iconName="Info"
                    className={styles.iconImportant}></FontIcon>
                  <span>This message was sent with High importance.</span>
                </div>
              )}
              <div className={styles.mainMessage}>
                <div className={styles.senderHeader}>
                  <div className={styles.personaHolder}>
                    <Persona
                      imageUrl={photoUrl}
                      hidePersonaDetails={false}
                      text={props.email.name}
                      size={PersonaSize.size40}
                      styles={dpPerson}
                    />
                    <div className={styles.emailFromContainer}>
                      <div>{props.email.name}</div>
                      <div>
                        <span className={styles.date}>
                          {moment(props.email.date).format('ddd')}
                        </span>
                        &nbsp;
                        <span className={styles.date}>
                          {moment(props.email.date).format('MM/DD/YYYY')}
                        </span>
                        &nbsp;
                        <span className={styles.date}>
                          {moment(props.email.date).format('hh:MM A')}
                        </span>
                      </div>
                      <div>
                        <span>To: </span>
                        {props.email.to?.map((a: any, key: any) => (
                          <span key={key}>
                            {a.name}
                            {'<'}
                            <a href={'mailto:' + a.emailAdd} target="_blank">
                              {a.emailAdd}
                            </a>
                            {'>; '}
                          </span>
                        ))}
                      </div>
                      {props.email?.cc.length > 0 && (
                        <div>
                          <span>Cc: </span>
                          {props.email.cc?.map((a: any, key: any) => (
                            <span key={key}>
                              {a.name}
                              {'<'}
                              <a href={'mailto:' + a.emailAdd} target="_blank">
                                {a.emailAdd}
                              </a>
                              {'>; '}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.buttonHolder}>
                    <TooltipHost
                      content="Like"
                      calloutProps={calloutProps}
                      styles={hostStyles}>
                      <IconButton iconProps={likeIcon} />
                    </TooltipHost>
                    <TooltipHost
                      content="Reply"
                      calloutProps={calloutProps}
                      styles={hostStyles}>
                      <IconButton
                        iconProps={replyIcon}
                        onClick={() =>
                          props.replyMessage(props.email, props.mailAttachments)
                        }
                      />
                    </TooltipHost>
                    <TooltipHost
                      content="Reply All"
                      calloutProps={calloutProps}
                      styles={hostStyles}>
                      <IconButton
                        iconProps={replyAllIcon}
                        onClick={() =>
                          props.replyAllMessage(
                            props.email,
                            props.mailAttachments,
                          )
                        }
                      />
                    </TooltipHost>
                    <TooltipHost
                      content="Forward"
                      calloutProps={calloutProps}
                      styles={hostStyles}>
                      <IconButton
                        iconProps={forwardIcon}
                        onClick={() =>
                          props.forwardMessge(
                            props.email,
                            props.mailAttachments,
                          )
                        }
                      />
                    </TooltipHost>
                    <TooltipHost
                      content="More"
                      calloutProps={calloutProps}
                      styles={hostStyles}>
                      <IconButton iconProps={moreIcon} />
                    </TooltipHost>
                  </div>
                </div>
                {!isExpanded ? (
                  <Fragment>
                    <div className={styles.attachments}>
                      {emailAttachment
                        ?.filter(
                          (a: any) =>
                            a.contentType.split('/')[0] === 'image' &&
                            a.isInline === false,
                        )
                        .map((a: any, key: any) => (
                          <EmailAttachment
                            item={a}
                            key={key}
                            saveToComputer={props.saveToComputer}
                          />
                        ))}
                    </div>
                    <div className={styles.fileAttachments}>
                      {emailAttachment
                        ?.filter(
                          (a: any) =>
                            a.contentType.split('/')[0] === 'application' ||
                            a.contentType.split('/')[0] === 'text' ||
                            a.contentType.split('/')[0] === 'video' ||
                            a.contentType.split('/')[0] === 'audio',
                        )
                        .map((a: any, key: any) => (
                          <EmailAttachment
                            item={a}
                            key={key}
                            saveToComputer={props.saveToComputer}
                          />
                        ))}
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className={styles.attachmentsHidden}>
                      {emailAttachment
                        ?.filter((a: any) => a.contentType.split('/')[0] === 'image')
                        .map((a: any, key: any) => (
                          <EmailAttachment
                            item={a}
                            key={key}
                            saveToComputer={props.saveToComputer}
                          />
                        ))}
                    </div>
                    <div className={styles.fileAttachmentsHidden}>
                      {emailAttachment
                        ?.filter(
                          (a: any) => a.contentType.split('/')[0] === 'application',
                        )
                        .map((a: any, key: any) => (
                          <EmailAttachment
                            item={a}
                            key={key}
                            saveToComputer={props.saveToComputer}
                          />
                        ))}
                    </div>
                  </Fragment>
                )}

                <div className={styles.btnToggleAttachment}>
                  {emailAttachment?.length > 0 && (
                    <Fragment>
                      <Stack horizontal wrap horizontalAlign="stretch">
                        <ActionButton
                          iconProps={!isExpanded ? showAllIcon : hideIcon}
                          text={
                            !isExpanded
                              ? 'Show all ' +
                                emailAttachment.length +
                                ' attachments'
                              : 'Hide some attachments'
                          }
                          className={'btnPlain btnPrimary ' + styles.marginR10}
                          onClick={handleExpandAttachment}
                        />
                        <ActionButton
                          iconProps={downloadAllIcon}
                          text="Download all"
                          className="btnPlain btnPrimary"
                          onClick={handleDownloadAllAttachment}
                        />
                      </Stack>
                    </Fragment>
                  )}
                </div>
                <div dangerouslySetInnerHTML={{ __html: emailBody }} />
              </div>
              {props.threadMail?.map((a: any, key: any) => (
                <div className={styles.collapsableMessage} key={key}>
                  <Collapse email={a}>
                    <div>
                      <div className={styles.senderHeader}>
                        <div className={styles.personaHolder}>
                          <Persona
                            imageUrl={getProfileImageThread(a.from)}
                            hidePersonaDetails={true}
                            text={a.name}
                            size={PersonaSize.size40}
                            styles={dpPerson}
                          />
                          <div className={styles.emailFromContainer}>
                            <div>{a.name}</div>
                            <div>
                              <span className={styles.date}>
                                {moment(a.date).format('ddd')}
                              </span>
                              &nbsp;
                              <span className={styles.date}>
                                {moment(a.date).format('MM/DD/YYYY')}
                              </span>
                              &nbsp;
                              <span className={styles.date}>
                                {moment(a.date).format('hh:MM A')}
                              </span>
                            </div>
                            <div>
                              <span>To: </span>
                              {a.to?.map((b: any, key: any) => (
                                <span key={key}>
                                  {b.name}
                                  {'<'}
                                  <a
                                    href={'mailto:' + b.emailAdd}
                                    target="_blank">
                                    {b.emailAdd}
                                  </a>
                                  {'>; '}
                                </span>
                              ))}
                            </div>
                            <div>
                              <span>Cc: </span>
                              {a.cc?.map((c: any, key: any) => (
                                <span key={key}>
                                  {c.name}
                                  {'<'}
                                  <a
                                    href={'mailto:' + c.emailAdd}
                                    target="_blank">
                                    {c.emailAdd}
                                  </a>
                                  {'>; '}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className={styles.buttonHolder}>
                          <TooltipHost
                            content="Like"
                            calloutProps={calloutProps}
                            styles={hostStyles}>
                            <IconButton iconProps={likeIcon} />
                          </TooltipHost>
                          <TooltipHost
                            content="Reply"
                            calloutProps={calloutProps}
                            styles={hostStyles}>
                            <IconButton iconProps={replyIcon} />
                          </TooltipHost>
                          <TooltipHost
                            content="Reply All"
                            calloutProps={calloutProps}
                            styles={hostStyles}>
                            <IconButton iconProps={replyAllIcon} />
                          </TooltipHost>
                          <TooltipHost
                            content="Forward"
                            calloutProps={calloutProps}
                            styles={hostStyles}>
                            <IconButton iconProps={forwardIcon} />
                          </TooltipHost>
                          <TooltipHost
                            content="More"
                            calloutProps={calloutProps}
                            styles={hostStyles}>
                            <IconButton iconProps={moreIcon} />
                          </TooltipHost>
                        </div>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: a.body,
                        }}
                      />
                    </div>
                  </Collapse>
                </div>
              ))}
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className={styles.editor}>
              <div className={'mailNewMessage'}>
                <div className="ms-Grid-row ">
                  <div className={'ms-Grid-col ms-lg12 ' + styles.toCC}>
                    <div className="ms-Grid-col ms-lg1">
                      <DefaultButton text="To" />
                    </div>
                    <div className={'ms-Grid-col ms-lg10 ' + styles.toCCField}>
                      <NormalPeoplePicker
                        onResolveSuggestions={onFilterChanged}
                        onEmptyInputFocus={returnMostRecentlyUsed}
                        getTextFromItem={getTextFromItem}
                        className={styles.peoplePicker}
                        key={'normal'}
                        onRemoveSuggestion={onRemoveSuggestion}
                        onValidateInput={validateInput}
                        removeButtonAriaLabel={'Remove'}
                        componentRef={peoplpicker}
                        onInputChange={onInputChange}
                        resolveDelay={300}
                        disabled={isPickerDisabled}
                        onItemSelected={toPeopleHandler}
                        selectedItems={props.toPeopleArrReply}
                      />
                    </div>
                  </div>
                  <hr className={'divider'} />
                </div>
                <div className="ms-Grid-row ">
                  <div className={'ms-Grid-col ms-lg12 ' + styles.toCC}>
                    <div className="ms-Grid-col ms-lg1">
                      <DefaultButton text="CC" />
                    </div>
                    <div className={'ms-Grid-col ms-lg10 ' + styles.toCCField}>
                      <NormalPeoplePicker
                        onResolveSuggestions={onFilterChanged}
                        onEmptyInputFocus={returnMostRecentlyUsed}
                        getTextFromItem={getTextFromItem}
                        className={styles.peoplePicker}
                        key={'normal'}
                        onRemoveSuggestion={onRemoveSuggestion}
                        onValidateInput={validateInput}
                        removeButtonAriaLabel={'Remove'}
                        componentRef={peoplpicker}
                        onInputChange={onInputChange}
                        resolveDelay={300}
                        disabled={isPickerDisabled}
                        onItemSelected={ccPeopleHandler}
                        selectedItems={props.ccPeopleArrReply}
                      />
                    </div>
                  </div>
                  <hr className={'divider'} />
                </div>

                <div className="ms-Grid-row ">
                  <div className={'ms-Grid-col ms-lg12 ' + styles.addSubject}>
                    {props.subjectValue !== '' ? (
                      <TextField
                        placeholder="Add a subject"
                        onChange={e => onChangeTextValueField(e)}
                        value={props.subjectValue}
                      />
                    ) : (
                      <TextField
                        placeholder="Add a subject"
                        onChange={e => onChangeTextValueField(e)}
                        defaultValue={props.htmlValue !== '' ? 'Fw:' : ''}
                      />
                    )}
                  </div>
                  <hr className={'divider'} />
                </div>
              </div>
              <TextEditor
                sendMail={sendMailHandler}
                saveAsDraft={saveAsDraftHandler}
                oneDriveAttachment={props.oneDriveAttachment}
                htmlValue={props.htmlValue}
                subjectValue={props.subjectValue}
                mailAttachments={props.mailAttachments}
                onCreateMessage
              />
              {/* <ReactEditor viewState={}/> */}
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    width: '680px',
  },
  header: [
    {
      flex: '1 1 auto',
      fontSize: '20px',
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: '600',
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

function onInputChange(input: any) {
  const outlookRegEx = /<.*>/g;
  const emailAddress = outlookRegEx.exec(input);

  if (emailAddress && emailAddress[0]) {
    return emailAddress[0].substring(1, emailAddress[0].length - 1);
  }

  return input;
}
function doesTextStartWith(text: any, filterText: any) {
  return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
}

function listContainsPersona(persona: any, personas: any) {
  if (!personas || !personas.length || personas.length === 0) {
    return false;
  }
  return personas.filter((item: any) => item.text === persona.text).length > 0;
}

function convertResultsToPromise(results: any) {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(results), 2000),
  );
}

export default EmailDetails;
