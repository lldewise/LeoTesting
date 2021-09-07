import React, { Fragment, useState, useEffect, useRef } from 'react';
import EmailSidebar from '../../../../components/adminANDteacher/Mailbox/EmailSidebar/EmailSidebar';
import EmailDetails from '../../../../components/adminANDteacher/Mailbox/EmailDetails/EmailDetails';
import EmailList from '../../../../components/adminANDteacher/Mailbox/EmailList/EmailList';
import MailList from '../../../../components/adminANDteacher/Mailbox/MailList/MailList';
import EmailOneDrive from '../../../../components/adminANDteacher/Mailbox/EmailOneDrive/EmailOneDrive';
import styles from './Mailbox.module.scss';
import {
  listMailFolders,
  listNextMailFolders,
  listMessagesInMailFolder,
  updateMailMessageRaw,
  deleteMailMessage,
  getMailUnread,
  getMailToMe,
  getMailFlagged,
  getMailHasAttachments,
  getMailMentioningMe,
  getMailThread,
  getEmailSenderPersona,
  getEmailAttachment,
  moveMailMessageTo,
  listMailMessagesSortByDate,
  listMailMessagesSortByName,
  listMailMessagesSortBySubject,
  listMailMessagesSortByImportance,
  uploadToOneDrive,
  createForwardMessage,
  getTeamPhoto,
  //likeMessageById,
  markAsRead,
  markAsUnRead,
  markAsflag,
} from '../../../../services/msgraph/email';

import {
  getFilesFromOneDrive,
  getFolderContentFromOneDrive,
  getRecentFromOneDrive,
  getGroupFromTeams,
  getByDriveIdOneDrive,
  getDriveIdByGroupOneDrive,
  getFileFromParentReferencePath,
  getDriveItem,
} from '../../../../services/msgraph/onedrive';
import { listPeople } from '../../../../services/msgraph/people';
import { getUsersList } from '../../../../services/msgraph/user';
import {
  FontIcon,
  ActionButton,
  Stack,
  CommandBarButton,
  ContextualMenuItemType,
} from 'office-ui-fabric-react';
import { useStore } from '../../../../store/store';
import _ from 'lodash';
import moment from 'moment';
import { useBoolean } from '@uifabric/react-hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContextualMenu } from '@fluentui/react';

const stackStyles = { root: { height: 44 } };

const Mailbox: React.FC = () => {
  const [data, dispatch] = useStore();
  const [selectedEmailId, setSelectedEmailId] = useState<any | null>(0);
  const refSelectedMailId: any = useRef();
  const refSelectedMails: any = useRef();
  const [currentSection, setCurrentSection] = useState<any | null>('inbox');
  const [newMessage, setNewMessage] = useState<any>(false);
  const [emails, setEmails] = useState<any[]>([]);
  const [folderList, setFolderList] = useState<any>([]);
  const selectedFolder: any = useRef();
  const [folderUpdate, setFolderUpdate] = useState<any | null>(null);
  const [peopleList, setPeopleList] = useState<any | null>(null);
  const [threadMail, setThreadMail] = useState<any[]>([]);
  const selectedMail: any = useRef();
  const [isFilterAll, setIsFilterAll] = useState(true);
  const [lblSelectedFilter, setLblSelectedFilter] = useState(null);
  const [mailAttachments, setMailAttachments] = useState();
  const [contentImages, setContentImages] = useState();
  const [sortBy, setSortBy] = useState('date');
  const [orderBy, setOrderBy] = useState('desc');
  const orderByRef = useRef('desc');
  const [filterSubMenuProps, setFilterSubMenuProps] = useState<any>([]);
  const [isModalOpenCat, { setTrue: showModalCat, setFalse: hideModalCat }] =
    useBoolean(false);

  const [oneDriveFile, setOneDriveFile] = useState<any[]>([]);
  const [joinedTeams, setJoinedTeams] = useState<any[]>([]);
  const [oneDriveAttachment, setOneDriveAttachment] = useState<any[]>([]);
  const [htmlValue, setHtmlValue] = useState('');
  const [subjectValue, setSubjectValue] = useState('');
  const [toPeopleArrReply, setToPeopleArrReply] = useState<any[]>([]);
  const [ccPeopleArrReply, setCCPeopleArrReply] = useState<any[]>([]);
  const [replyTrigger, setReplyTrigger] = useState<any | null>(null);

  const [selectedfolderName, setSelectedFolderName] = useState('Inbox');
  const [items, setItems] = useState<any[]>([]);
  const [moveToFolderMenu, setMoveToFolderMenu] = useState();
  const [moveFromInbox, setMoveFromInbox] = useState<any>([]);
  const [moveFromOtherFolder, setMoveFromOtherFolder] = useState<any>([]);
  const [inboxMoveToFolders, setInboxMoveToFolders] = useState<any>([]);
  const [nextLink, setNextLink] = useState('');

  useEffect(() => {
    var menuForInbox: any = {
      items: items.filter((x: any) => x.order >= 10),
      onItemClick: (e: any, props: any) => {
        //MoveMailHandler(props.key, selectedEmailId);
        MoveMailHandler(props.key, refSelectedMailId.current);
      },
    };

    var menuForOtherFolder: any = {
      items: items.filter((x: any) => x.order === 0 || x.order > 9),
      onItemClick: (e: any, props: any) => {
        MoveMailHandler(props.key, refSelectedMailId.current);
        // MoveMailHandler(props.key,selectedEmailId);
      },
    };

    setMoveFromInbox(menuForInbox);
    setMoveFromOtherFolder(menuForOtherFolder);
  }, [items]);

  function _getMenu(props: any) {
    // Customize contextual menu with menuAs
    return <ContextualMenu {...props} />;
  }

  const onToggleSelect = React.useCallback(
    (ev, item) => {
      ev && ev.preventDefault();
      if (item) {
        // alert(item.key);
        //    alert(selectedMail.current.id);
        // alert(refSelectedMailId.current);
        MoveMailHandler(item.key, refSelectedMailId.current);
        //  setSelection({ ...selection, [item.key]: selection[item.key] === undefined ? true : !selection[item.key] });
      }
    },
    [selectedEmailId],
  );

  function _onMenuClick(ev: any, item: any) {
    //  alert(item);
    // alert(selectedEmailId);
    //MoveMailHandler(item.key,selectedEmailId);
  }
  const newMessageMenuProps = {
    items: [
      {
        key: 'local',
        text: 'Browse this computer',
      },
      {
        key: 'cloud',
        text: 'Browse cloud locations',
      },
    ],
    onItemClick: (e: any, props: any) => {
      clickStorageHandler(props.key);
    },
  };

  const subMenuProps = {
    items: [
      {
        key: 'sortBy',
        itemType: ContextualMenuItemType.Header,
        text: 'Sort by',
      },
      {
        key: 'date',
        text: 'Date',
      },
      {
        key: 'from',
        text: 'From',
      },
      {
        key: 'importance',
        text: 'Importance',
      },
      {
        key: 'subject',
        text: 'Subject',
      },
      {
        key: 'sortOrder',
        itemType: ContextualMenuItemType.Header,
        text: 'Sort order',
      },
      {
        key: 'asc',
        text: 'Ascending',
      },
      { key: 'desc', text: 'Descending' },
    ],
    onItemClick: (e: any, value: any) => {
      sortFolderHandler(value);
    },
  };

  useEffect(() => {
    // var data: any[] = folderList?.values?.map((element: any) => {
    //   var item: any = folderStructure(element);
    //   return item;
    // });

    let data: any[] = folderList.value;
    if (data) {
      data.map(a => {
        let item: any = folderStructure(a);
      });
    }

    // if (selectedfolderName === "Inbox") {
    //setFolderList(data);
    if (data !== undefined) {
      var othersFolder = data.filter((r: any) => r.order === 10);
      var result = othersFolder.map((a: any) => {
        var item = {
          key: a.displayName,
          text: a.displayName,
        };
        return item;
      });
      var resultFolder = result.filter(
        (r: any) =>
          r.key !== 'Conversation History' &&
          r.key !== 'Outbox' &&
          r.key !== 'Sync Issues',
      );

      console.log(resultFolder);
      //  setItems(resultFolder);
    }
    // }

    // if (selectedfolderName === "Archive" || selectedfolderName === "Deleted Items" || selectedfolderName === "Other Folder") {
    //   //setFolderList(data);
    //   if (data !== undefined) {
    //     //var defaultFolder = data.filter((r) => r.order !== 10);
    //     var othersFolder = data.filter((r) => r.order === 10);
    //     var result = othersFolder.map((a) => {
    //       var item = {
    //         key: a.displayName,
    //         text: a.displayName,
    //       };
    //       return item;
    //     });

    //     var result = othersFolder.map((a) => {
    //       var item = {
    //         key: a.displayName,
    //         text: a.displayName,
    //       };
    //       return item;
    //     });

    //     var resultFolder = result.filter(
    //       (r) =>
    //         r.key !== "Backup" &&
    //         r.key !== "Conversation History" &&
    //         r.key !== "New" &&
    //         r.key !== "Outbox" &&
    //         r.key !== "RSS Subscriptions" &&
    //         r.key !== "sent items backup" &&
    //         r.key !== "Sync Issues"
    //     );
    //     debugger;
    //     console.log(resultFolder);
    //     setItems(resultFolder);
    //   }
    // }
    //updateNewFolder(newFolder);
  }, [folderUpdate]);
  /* 
  useEffect(() => {
    setMoveToFolderMenu(); //jay
  }, [folderUpdate]);
 */
  const folderStructure = (item: any) => {
    switch (item.displayName.toLowerCase()) {
      case 'inbox':
        selectedFolderHandler(item);
        return {
          ...item,
          active: true,
          assign: false,
          icon: 'Inbox',
          key: 'inbox',
          order: 0,
        };
      case 'drafts':
        return {
          ...item,
          active: false,
          assign: false,
          icon: 'Edit',
          key: 'drafts',
          order: 1,
        };
      case 'sent items':
        return {
          ...item,
          active: false,
          assign: false,
          icon: 'Send',
          key: 'sentitems',
          order: 2,
        };
      case 'deleted items':
        return {
          ...item,
          active: false,
          assign: false,
          icon: 'Delete',
          key: 'deleteditems',
          order: 3,
        };
      case 'junk email':
        return {
          ...item,
          active: false,
          assign: false,
          icon: 'Blocked',
          key: 'junkemail',
          order: 4,
        };
      case 'archive':
        return {
          ...item,
          active: false,
          assign: false,
          icon: 'Archive',
          key: 'archive',
          order: 5,
        };
      case 'important stuff':
        return {
          ...item,
          active: false,
          assign: false,
          icon: 'FabricFolder',
          key: 'importantstuff',
          order: 6,
        };
      case 'outbox':
        return {
          ...item,
          active: false,
          assign: false,
          icon: 'FabricFolder',
          key: 'outbox',
          order: 7,
        };
      case 'sync issues':
        return {
          ...item,
          active: false,
          assign: false,
          icon: 'FabricFolder',
          key: 'syncissues',
          order: 8,
        };
      case 'rss feeds':
        return {
          ...item,
          active: false,
          assign: false,
          icon: 'FabricFolder',
          key: 'rssfeeds',
          order: 9,
        };
      default:
        return {
          ...item,
          active: false,
          assign: true,
          icon: 'FabricFolder',
          order: 10,
        };
    }
  };

  useEffect(() => {
    let subs: any = [];
    let menu = subMenuProps;
    menu.items.forEach(a => {
      switch (a.key) {
        case sortBy:
          subs.push(
            Object.assign({}, a, { iconProps: { iconName: 'Accept' } }),
          );
          break;
        case orderBy:
          subs.push(
            Object.assign({}, a, { iconProps: { iconName: 'Accept' } }),
          );
          break;
        default:
          subs.push(a);
          break;
      }
    });
    setFilterSubMenuProps(
      Object.assign({}, { items: subs, onItemClick: menu.onItemClick }),
    );
  }, [sortBy, orderBy]);

  // handles for callout click event
  const clickMenuHandler = (props: any) => {
    switch (props) {
      case 'inbox':
        moveMailMessageTo(selectedEmailId, 'inbox');
        break;
      case 'draft':
        moveMailMessageTo(selectedEmailId, 'drafts');
        break;
      case 'sent':
        moveMailMessageTo(selectedEmailId, 'sentitems');
        break;
      case 'delete':
        moveMailMessageTo(selectedEmailId, 'deleteditems');
        break;
      case 'junk':
        moveMailMessageTo(selectedEmailId, 'junkemail');
        break;
      case 'archive':
        moveMailMessageTo(selectedEmailId, 'archive');
        break;
      default:
        break;
    }
  };

  const openEmail = (id: any, conversationId: any, data: any, folder: any) => {
    // likeMessageById(id).then((r)=>{
    //   debugger
    // });

    setSelectedEmailId(id);
    refSelectedMailId.current = id;

    if (selectedFolder.current.displayName != 'Drafts') {
      var ssss = data.filter((x: any) => x.id === id);
      getThreadMessages(id, conversationId);
      const emails = data;
      var index = emails.findIndex((x: any) => x.id === id);
      if (!emails[index].read) {
        emails[index].read = true;
        var updatedEmail = {
          id: emails[index].id,
          isRead: true,
        };
        updateMailMessageHandler(updatedEmail);

        var folderIem: any = selectedFolder.current;
        index = folder.value.findIndex((r: any) => r.id === folderIem.id);
        folder.value[index].unreadItemCount =
          Number(folder.value[index].unreadItemCount) - 1;
        setFolderList(folder);
        setFolderUpdate(Math.random().toString(10).substring(7));
        setEmails(emails);
      }
      refSelectedMails.current = emails;
      // setSelectedEmailId(id);
      setNewMessage(false);

      getEmailAttachment(folder, id).then(response => {
        setMailAttachments(
          response.value.filter((a: any) => a.isInline === false),
        );
        setContentImages(response.value);
      });
    } else {
      var index: any = emails.findIndex((x: any) => x.id === id);
      var ccListArr: any = [];
      var toListArr: any = [];
      var selectedPeople = data.find((x: any) => x.id === id);
      selectedPeople.cc.forEach((a: any) => {
        var ccList = peopleList.find(
          (element: any) => element.secondaryText == a.emailAdd,
        );
        ccListArr.push(ccList);
      });
      selectedPeople.to.forEach((a: any) => {
        var toList = peopleList.find(
          (element: any) => element.secondaryText == a.emailAdd,
        );
        toListArr.push(toList);
      });
      setToPeopleArrReply(toListArr);
      setCCPeopleArrReply(ccListArr);
      setHtmlValue(data[index].body);
      setSubjectValue(data[index].subject);
      setNewMessage(true);
    }
  };

  const successEmailSent = () => {
    setSelectedEmailId(0);
    setNewMessage(false);
    document.getElementById('notif')!.click();
  };

  const updateMailMessageHandler = (email: any) => {
    updateMailMessageRaw(email).then(response => {});
  };

  const getThreadMessages = (id: any, conversationId: any) => {
    getMailThread(conversationId).then(response => {
      let res = response.value.filter((a: any) => a.id !== id);
      var result = res.map((element: any) => {
        var item = {
          from:
            element.sender !== undefined
              ? element.sender.emailAddress?.address
              : '',
          name:
            element.sender !== undefined
              ? element.sender.emailAddress?.name
              : '',
          date: element.receivedDateTime,
          read: element.isRead,
          selected: false,
          importance: element.importance,
          to: element.toRecipients.map((t: any) => ({
            name: t.emailAddress.name,
            emailAdd: t.emailAddress.address,
          })),
          cc: element.ccRecipients.map((c: any) => ({
            name: c.emailAddress.name,
            emailAdd: c.emailAddress.address,
          })),
          message: element.bodyPreview,
          id: element.id,
          subject: element.subject,
          conversationId: element.conversationId,
          body: element.body.content,
        };
        return item;
      });
      setThreadMail(
        _.orderBy(
          result,
          a => {
            return moment(a.date).format('YYYY-MM-DDTHH:mm:ssZ');
          },
          ['desc'],
        ),
      );
    });
  };

  const handleCheckAll = (check: any, data: any) => {
    const emails = data;
    emails.forEach((a: any) => {
      a.selected = check;
    });
    setSelectedEmailId(0);
    setEmails(emails);
    setNewMessage(false);
  };

  const checkboxTick = (id: any, data: any) => {
    const emails = data;
    const index = emails.findIndex((x: any) => x.id === id);
    emails[index].selected = !emails[index].selected;
    emails[index].read = true;
    selectedMail.current = emails;
    setSelectedEmailId(id);
    setEmails(emails);
    setNewMessage(false);
  };

  const deleteMessage = (id: any) => {
    // Mark the message as 'deleted'
    setNewMessage(false);
    const emailList = [...emails];
    const index = emailList.findIndex((x: any) => x.id === id);
    emailList[index].tag = 'deleted';

    // Select the next message in the list
    let selectedEmailId = '';
    for (const email of emailList) {
      if (email.tag === currentSection) {
        selectedEmailId = email.id;
        break;
      }
    }
    setSelectedEmailId(id);
    setEmails(emailList);
  };

  const setSidebarSection = (section: any) => {
    setNewMessage(false);
    let selectedEmailId = 0;
    if (section !== currentSection) {
      selectedEmailId = 0;
    }
    setCurrentSection(section);
    setSelectedEmailId(selectedEmailId);
  };

  const handleCreateMessage = (isNew: any) => {
    setNewMessage(isNew);
    setSelectedEmailId(0);
    setToPeopleArrReply([]);
    setCCPeopleArrReply([]);
    setHtmlValue('');
    setSubjectValue('');
  };

  const handleDeleteClick = (id: any) => {
    let filterData: any = [...emails];
    let idx = filterData.findIndex((a: any) => a.id === id);
    if (idx > -1) {
      filterData.splice(idx, 1);
      setEmails(filterData);
    }
  };

  useEffect(() => {
    if (data.m365Login) {
      setTimeout(() => {
        getFolderList();
        getPeopleList();
        dispatch('SIDEBARSELECTEDKEY', '64');
      });
    }
  }, [data.m365Login]);

  const getFolderList = () => {
    listMailFolders(20).then(response => {
      setFolderList(response);
      //  formatFolderNames(response);
      setFolderUpdate(Math.random().toString(10).substring(7));
    });
  };

  const getPeopleList = () => {
    getUsersList().then(response => {
      var people = response.value.map((element: any) => {
        var item = {
          text: element.displayName,
          secondaryText: element.mail,
          tertiaryText: '',
          optionalText: '',
          presence: 1,
        };
        return item;
      });
      console.log(response);
      setPeopleList(people);
    });
  };

  useEffect(() => {
    formatFolderNames(folderList.value);
  }, [folderList]);

  const formatFolderNames = (response: any[]) => {
    if (response && response.values !== undefined) {
      let result: any[] = [];
      if (response) {
        result = response.map((element: any) => {
          var item = folderStructure(element);
          return item;
        });
      }

      var sortedFolders = result.sort((a: any, b: any) =>
        (false ? a['order'] < b['order'] : a['order'] > b['order']) ? 1 : -1,
      );

      var displayFolder = sortedFolders.map((a: any) => {
        var item = {
          key: a.order <= 9 ? a.key : a.id,
          text: a.displayName,
          // icon: a.icon,
          order: a.order,
          //  onItemClick: (e, props) => {
          //     alert(props.key);
          //   clickMenuHandler(props.key);
          //  },
        };
        return item;
      });

      console.log('folder names', displayFolder);

      setInboxMoveToFolders(displayFolder.filter((x: any) => x.order >= 10));

      setItems(displayFolder);
    }
  };

  const unReadHandler = (items: any) => {};

  const folderEmailList: any = (data: any, folderName: any) => {
    var result = data.map((element: any) => {
      var item = {
        folderName: folderName,
        from:
          element.sender !== undefined
            ? element.sender.emailAddress?.address
            : '',
        name:
          element.sender !== undefined ? element.sender.emailAddress?.name : '',
        date: new Date(element.receivedDateTime),
        read: element.isRead,
        selected: false,
        importance: element.importance,
        to: element.toRecipients.map((t: any) => ({
          name: t.emailAddress.name,
          emailAdd: t.emailAddress.address,
        })),
        cc: element.ccRecipients.map((c: any) => ({
          name: c.emailAddress.name,
          emailAdd: c.emailAddress.address,
        })),
        message: element.bodyPreview,
        id: element.id,
        subject: element.subject,
        conversationId: element.conversationId,
        body: element.body.content,
        flag: element.flag.flagStatus,
        isFlagged: element.flag.flagStatus === 'notFlagged' ? false : true,
        hasAttachments: element.hasAttachments ? true : false,
        isImportant: element.importance === 'normal' ? false : true,
        draftInfo: folderName === 'Drafts' ? '[Draft]' : '',
      };
      return item;
    });

    return result;
  };

  const selectedFolderHandler = (item: any) => {
    selectedFolder.current = item;

    setSelectedEmailId(0);
    setSelectedFolderName(item.displayName);
    listMessagesInMailFolder(
      item.id,
      'sender, isRead, subject, bodyPreview, receivedDateTime,ccRecipients,toRecipients,conversationId, body, importance, flag, hasAttachments',
      15,
    ).then(response => {
      if (response['@odata.nextLink'] !== undefined) {
        setNextLink(response['@odata.nextLink']);
      }
      setEmails(folderEmailList(response.value, item.displayName));
    });
  };

  const deleteMailHandler = () => {
    var data = [...selectedMail.current];
    var updateData: any = [...selectedMail.current];
    var data1 = data.filter(r => r.selected === true);
    data1.forEach((element, index) => {
      deleteMailMessage(element.id).then(() => {
        updateData = updateData.filter((email: any) => email.id !== element.id);
        setEmails(updateData);
      });
    });
  };
  //multiple checked items
  const MoveMailHandler = (folder: any, selectedEmailId: any) => {
    var data: any = [];
    var data1: any = [];
    var updateData: any = [];
    if (selectedMail.current === undefined) {
      // alert('no selected')
      if (selectedEmailId !== undefined || selectedEmailId !== null) {
        if (emails.length > 0) {
          data = emails;
          data1 = emails.filter((r: any) => r.id === selectedEmailId);
          updateData = emails;
        } else {
          /* for Move to Menu, useRef is used to get the emails list */
          data = refSelectedMails.current;
          data1 = refSelectedMails.current.filter(
            (r: any) => r.id === selectedEmailId,
          );
          updateData = refSelectedMails.current;
        }
      }
    } else {
      data = [...selectedMail.current];
      data1 = data.filter((r: any) => r.selected === true);
      updateData = data;
      if (data1.length === 0) {
        /* for Move to Menu, useRef is used to get selected mail list */
        if (selectedEmailId !== undefined) {
          data = refSelectedMails.current;
          data1 = refSelectedMails.current.filter(
            (r: any) => r.id === selectedEmailId,
          );
          updateData = refSelectedMails.current;
        }
      }
    }

    //var updateData = data;
    data1.forEach((element: any, index: any) => {
      moveMailMessageTo(element.id, folder).then(() => {
        updateData = updateData.filter((email: any) => email.id !== element.id);
        setEmails(updateData);
        selectedMail.current = undefined;
      });
    });
  };

  ///Move single email to deleted Items folder
  const deleteEmailHandler = (id: any) => {
    moveMailMessageTo(id, 'deletedItems').then(() => {
      setEmails(emails.filter((email: any) => email.id !== id));
    });
  };
  ///Move single email to archive folder
  const archiveEmailHandler = (id: any) => {
    moveMailMessageTo(id, 'archive').then(() => {
      setEmails(emails.filter((email: any) => email.id !== id));
    });
  };
  const flagToggleHandler = (id: any) => {
    let email = emails.findIndex((row: any) => row.id === id);
    let updateEmail: any = [...emails];
    /* if (updateEmail[email].read)  {
      updateEmail[email].read = false;
      markAsUnRead(id).then(() => {
        setEmails(updateEmail);
      });
     }else */
    updateEmail[email].isFlagged = true;
    markAsflag(id).then(() => {
      setEmails(updateEmail);
    });
  };
  const markAsReadEmailHandler = (id: any) => {
    let email = emails.findIndex((row: any) => row.id === id);
    let updateEmail: any = [...emails];
    /* if (updateEmail[email].read)  {
      updateEmail[email].read  = false;
      markAsUnRead(id).then(() => {
        setEmails(updateEmail);
      });
     }else */
    updateEmail[email].read = true;
    markAsRead(id).then(() => {
      setEmails(updateEmail);
    });
  };

  const filterFolderHandler = (value: any) => {
    var folder = selectedFolder.current;
    switch (value.key) {
      case 'all':
        selectedFolderHandler(folder);
        break;
      case 'unread':
        unReadFilterCommand(folder);
        break;
      case 'tome':
        toMeFilterCommand(folder);
        break;
      case 'flagged':
        flaggedFilterCommand(folder);
        break;
      case 'attachments':
        attachedmentFilterCommand(folder);
        break;
      case 'mentions':
        mentionMeFilterCommand(folder);
        break;
      default:
        break;
    }
    setLblSelectedFilter(value.text);
    setIsFilterAll(false);
  };

  const sortFolderHandler = (item: any) => {
    if (item.key === 'asc' || item.key === 'desc') {
      orderByRef.current = item.key;
      setOrderBy(item.key);
    } else {
      setSortBy(item.key);
    }
    var folder = selectedFolder.current;
    switch (item.key) {
      case 'date':
        sortDateFolderHandler(folder);
        break;
      case 'from':
        sortFromFilterCommand(folder);
        break;
      case 'importance':
        sortImportanceFilterCommand(folder);
        break;
      case 'subject':
        sortSubjectFilterCommand(folder);
        break;
      case 'asc':
        orderByAscendingFilterCommand(folder);
        break;
      case 'desc':
        orderByDescendingFilterCommand(folder);
        break;
      default:
        break;
    }
  };

  const unReadFilterCommand = (folder: any) => {
    getMailUnread(folder.id).then(response => {
      setEmails(folderEmailList(response.value));
    });
  };

  const toMeFilterCommand = (folder: any) => {
    getMailToMe(folder.id).then(response => {
      setEmails(folderEmailList(response.value));
    });
  };

  const flaggedFilterCommand = (folder: any) => {
    getMailFlagged(folder.id).then(response => {
      setEmails(folderEmailList(response.value));
    });
  };

  const attachedmentFilterCommand = (folder: any) => {
    getMailHasAttachments(folder.id).then(response => {
      setEmails(folderEmailList(response.value));
    });
  };
  const mentionMeFilterCommand = (folder: any) => {
    getMailMentioningMe(folder.id).then(response => {
      setEmails(folderEmailList(response.value));
    });
  };

  //sorting functionality
  const sortDateFolderHandler = (folder: any) => {
    listMailMessagesSortByDate(folder.id, 15, orderByRef.current).then(
      response => {
        setEmails(folderEmailList(response.value));
      },
    );
  };
  const sortFromFilterCommand = (folder: any) => {
    listMailMessagesSortByName(folder.id, 15, orderByRef.current).then(
      response => {
        setEmails(folderEmailList(response.value));
      },
    );
  };
  const sortImportanceFilterCommand = (folder: any) => {
    listMailMessagesSortByImportance(folder.id, 15, orderByRef.current).then(
      response => {
        setEmails(folderEmailList(response.value));
      },
    );
  };
  const sortSubjectFilterCommand = (folder: any) => {
    listMailMessagesSortBySubject(folder.id, 15, orderByRef.current).then(
      response => {
        setEmails(folderEmailList(response.value));
      },
    );
  };
  const orderByAscendingFilterCommand = (folder: any) => {
    switch (sortBy) {
      case 'date':
        sortDateFolderHandler(folder);
        break;
      case 'from':
        sortFromFilterCommand(folder);
        break;
      case 'importance':
        sortImportanceFilterCommand(folder);
        break;
      case 'subject':
        sortSubjectFilterCommand(folder);
        break;
      default:
        break;
    }
  };
  const orderByDescendingFilterCommand = (folder: any) => {
    switch (sortBy) {
      case 'date':
        sortDateFolderHandler(folder);
        break;
      case 'from':
        sortFromFilterCommand(folder);
        break;
      case 'importance':
        sortImportanceFilterCommand(folder);
        break;
      case 'subject':
        sortSubjectFilterCommand(folder);
        break;
      default:
        break;
    }
  };
  //end of sorting

  const saveToLocalCloudHandler = (menu: any, value: any) => {
    switch (menu.key) {
      case 'cloud':
        saveToCloud(value);
        break;
      case 'local':
        saveToLocal(value);
        break;
      default:
        break;
    }
  };

  const saveToCloud = (value: any) => {
    var filename = value.name + '.' + value.contentType.split('/')[1];
    const base64 =
      'data:' + value.contentType + ';base64,' + value.contentBytes;
    var item = base64toBlob(value.contentBytes, value.contentType);
    uploadToOneDrive(item, filename).then(response => {});
  };

  function base64toBlob(base64Data: any, contentType: any) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  const downloadAllAttachmentHandler = (items: any) => {
    if (items) {
      items.forEach((a: any) => {
        saveToLocal(a);
      });
    }
  };

  const saveToLocal = (value: any) => {
    const base64 =
      'data:' + value.contentType + ';base64,' + value.contentBytes;
    const downloadLink = document.createElement('a');
    const fileName = value.name;
    downloadLink.href = base64;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const handleRemoveFilter = () => {
    var folder = selectedFolder.current;
    selectedFolderHandler(folder);
    setIsFilterAll(true);
    setLblSelectedFilter(null);
  };

  const selectedOneDrive = useRef('0');
  const getOneDriveHandler = (item: any) => {
    selectedOneDrive.current = item.key;
    switch (item.key) {
      case '0':
        getRecentOneDrive();
        setJoinedTeams([]);
        break;
      case '1':
        getRecentOneDrive();
        setJoinedTeams([]);
        break;
      case '2':
        getFileOneDrive();
        break;
      case '3':
        GetGroups();
        break;
      case '4':
        break;
    }
  };

  const getFileOneDrive = () => {
    getFilesFromOneDrive().then(response => {
      setOneDriveFile(response.value);
    });
  };

  const getRecentOneDrive = async () => {
    await getRecentFromOneDrive().then(response => {
      setOneDriveFile(response.value);
    });
  };

  const clickStorageHandler = (key: any) => {
    switch (key) {
      case 'local':
        break;
      case 'cloud':
        getRecentOneDrive();
        showModalCat();
        break;
    }
  };

  const getFolderChildrenHandler = (item: any) => {
    getFileFromParentReferencePath(item.parentReference.driveId, item.id).then(
      response => {
        setOneDriveFile(response.value);
      },
    );
  };

  const joinedTeamRef: any = useRef();
  const GetGroups = async () => {
    getGroupFromTeams().then(response => {
      //setJoinedTeams(response.value);
      joinedTeamRef.current = response.value;
      updateGroupPhoto(response.value);
    });
  };

  const updateGroupPhoto = async (data: any) => {
    data.forEach(async (element: any) => {
      var item = await getTeamPhoto(element.id);
      updateJoinedTeamPhoto(item, element);
    });
  };
  const updateJoinedTeamPhoto = (blob: any, item: any) => {
    var updateData: any = joinedTeamRef.current;
    updateData.forEach((element: any) => {
      if (item.id === element.id) element.blob = blob;
    });

    joinedTeamRef.current = updateData;
    var bolBlob = false;
    joinedTeamRef.current.forEach((element: any) => {
      if (element.blob === undefined) {
        bolBlob = true;
      }
    });
    if (!bolBlob) {
      setJoinedTeams(joinedTeamRef.current);
    }
  };

  const GetDriveFromGroupsId = (item: any) => {
    getDriveIdByGroupOneDrive(item.id).then(response => {
      getByDriveIdOneDrive(response.id).then(r => {
        setJoinedTeams([]);
        setOneDriveFile(r.value);
      });
    });
  };

  const selectedItemList: any = useRef();
  const selectedOneDriveItemHandler = async (item: any) => {
    var newItem = item.map((item: any) => {
      var newItem = {
        base64Content: '',
      };
      return { ...item, newItem };
    });
    selectedItemList.current = newItem;

    if (selectedOneDrive.current === '0') {
      newItem.forEach(async (element: any) => {
        var item = await getDriveItem(element.id);
        var url = item['@microsoft.graph.downloadUrl'];
        var base64Code = await getBase64FromUrl(url);
        callback(base64Code, element);
      });
    } else {
      newItem.forEach(async (element: any) => {
        var url = element['@microsoft.graph.downloadUrl'];
        var base64Code = await getBase64FromUrl(url);
        console.log(base64Code);
        callback(base64Code, element);
      });
    }
  };

  const callback = (dataUrl: any, item: any) => {
    var updateData: any = selectedItemList.current;
    updateData.forEach((element: any) => {
      if (item.id === element.id) element.base64Content = dataUrl;
      element.contentType = item.file.mimeType;
    });
    selectedItemList.current = updateData;
    var bolBase64 = false;
    selectedItemList.current.forEach((element: any) => {
      if (element.base64Content === undefined) {
        bolBase64 = true;
      }
    });
    if (!bolBase64) {
      setOneDriveAttachment(updateData);
      hideModalCat();
    }
  };

  const getBase64FromUrl = async (url: any) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };

  useEffect(() => {
    if (data.emailSearchList.length > 0) {
      setEmails(folderEmailList(data.emailSearchList));
    }
  }, [data.emailSearchList]);

  const forwardMessageHandler = (value: any) => {
    createForwardMessage(value.id).then(r => {
      setHtmlValue(r.body.content);
      setNewMessage(true);
    });
  };

  const replyMessageHandler = (value: any, attachment: any) => {
    createForwardMessage(value.id).then(r => {
      var toListArr = [];
      var selectedPeople: any = emails.find(
        (x: any) => x.id === selectedEmailId,
      );
      var toList: any = peopleList.find(
        (element: any) => element.secondaryText == selectedPeople.from,
      );
      toListArr.push(toList);
      setToPeopleArrReply(toListArr);
      setHtmlValue(r.body.content);
      setNewMessage('Reply');
      setReplyTrigger(Math.random().toString(10).substring(7));
    });
  };

  const replyAllMessageHandler = (value: any, attachment: any) => {
    createForwardMessage(value.id).then(r => {
      var ccListArr: any = [];
      var toListArr: any = [];
      var selectedPeople: any = emails.find(
        (x: any) => x.id === selectedEmailId,
      );
      selectedPeople.cc.forEach((a: any) => {
        var ccList = peopleList.find(
          (element: any) => element.secondaryText == a.emailAdd,
        );
        ccListArr.push(ccList);
      });
      var toList = peopleList.find(
        (element: any) => element.secondaryText == selectedPeople.from,
      );
      toListArr.push(toList);
      setToPeopleArrReply(toListArr);
      setCCPeopleArrReply(ccListArr);
      setHtmlValue(r.body.content);
      setNewMessage(true);
    });
  };

  const notify = () => toast.success('Your email has been sent successfully.');

  const fetchMoreData = () => {
    // 20 more records in 1 sec
    setTimeout(() => {
      listNextMailFolders(nextLink).then(response => {
        if (response['@odata.nextLink'] !== undefined) {
          setNextLink(response['@odata.nextLink']);
        }
        if (response.value.length > 0) {
          setEmails(emails.concat(folderEmailList(response.value)));
        }
      });
    }, 1000);
  };
  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="success"
      />
      <EmailOneDrive
        isModalOpen={isModalOpenCat}
        hideModal={hideModalCat}
        oneDriveFile={oneDriveFile}
        getFile={getOneDriveHandler}
        getFolderChildren={getFolderChildrenHandler}
        joinedTeams={joinedTeams}
        getTeamsDriveItem={GetDriveFromGroupsId}
        selectedOneDriveItem={selectedOneDriveItemHandler}
      />
      <div className={'ms-Grid-row '}>
        <div className={'ms-Grid-col ms-lg12 ' + styles.header}>
          <div className={'ms-Grid-col ms-lg1 ' + styles.iconWidth}>
            <FontIcon iconName="Mail" />
          </div>
          <div className={'ms-Grid-col ms-lg6 ' + styles.headertitle}>Mail</div>
          <div className={'AttendanceHeader ' + styles.helpIcon}>
            <button id="notif" className={styles.notifButton} onClick={notify}>
              Notify!
            </button>
            <ActionButton
              iconProps={{ iconName: 'Settings' }}
              className={styles.actionButton}>
              Mail Settings
            </ActionButton>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.sidebar}>
            <EmailSidebar
              // emails={emails}
              // setSidebarSection={(section: any) => {
              //   setSidebarSection(section);
              // }}
              onCreateMessage={() => handleCreateMessage(true)}
              // deleted={deletedCount}
              // unread={unreadCount}
              folderList={folderList}
              onSelectedFolder={selectedFolderHandler}
              folderUpdate={folderUpdate}
            />
          </div>
          <div className={styles.emailListAndContentContainer}>
            {!newMessage ? (
              <Fragment>
                <div className={styles.headerIcon}>
                  <Stack horizontal styles={stackStyles}>
                    {selectedEmailId === 0 && (
                      <CommandBarButton
                        key="Delete"
                        iconProps={{ iconName: 'Delete' }}
                        text="Empty Folder"
                        className={styles.commandButton}
                        onClick={() =>
                          MoveMailHandler('deleteditems', selectedEmailId)
                        }
                      />
                    )}
                    {selectedEmailId !== 0 && (
                      <CommandBarButton
                        iconProps={{ iconName: 'Delete' }}
                        text="Delete"
                        className={styles.commandButton}
                        onClick={() =>
                          MoveMailHandler('deleteditems', selectedEmailId)
                        }
                      />
                    )}

                    {selectedEmailId !== 0 && (
                      <CommandBarButton
                        iconProps={{ iconName: 'Archive' }}
                        text="Archive"
                        className={styles.commandButton}
                        onClick={() =>
                          MoveMailHandler('archive', selectedEmailId)
                        }
                      />
                    )}

                    {selectedEmailId !== 0 && (
                      <CommandBarButton
                        iconProps={{ iconName: 'Blocked' }}
                        text="Junk"
                        className={styles.commandButton}
                        onClick={() =>
                          MoveMailHandler('junkemail', selectedEmailId)
                        }
                      />
                    )}

                    {/*                 {selectedEmailId !== 0 && (
                      <CommandBarButton
                        iconProps={{ iconName: "FabricMovetoFolder" }}
                        text="Move to"
                        split={true}
                        menuProps={moveToFolderMenu}
                        className={styles.commandButton}
                      />
                    )}
 */}

                    {selectedEmailId !== 0 &&
                      selectedFolder.current.displayName === 'Inbox' && (
                        <CommandBarButton
                          iconProps={{ iconName: 'FabricMovetoFolder' }}
                          text="Move to"
                          split={true}
                          menuProps={moveFromInbox}
                          className={styles.commandButton}
                          // onMenuClick={_onMenuClick}
                          // menuAs={_getMenu}
                        />
                      )}
                    {selectedEmailId !== 0 &&
                      selectedFolder.current.order >= 10 && (
                        <CommandBarButton
                          iconProps={{ iconName: 'FabricMovetoFolder' }}
                          text="Move to"
                          split={true}
                          menuProps={moveFromOtherFolder}
                          className={styles.commandButton}
                        />
                      )}
                    {selectedEmailId !== 0 &&
                      selectedFolder.current.displayName === 'Archive' && (
                        <CommandBarButton
                          iconProps={{ iconName: 'FabricMovetoFolder' }}
                          text="Move to"
                          split={true}
                          menuProps={moveFromOtherFolder}
                          className={styles.commandButton}
                        />
                      )}
                    {selectedEmailId !== 0 &&
                      selectedFolder.current.displayName ===
                        'Deleted Items' && (
                        <CommandBarButton
                          iconProps={{ iconName: 'FabricMovetoFolder' }}
                          text="Move to"
                          split={true}
                          menuProps={moveFromOtherFolder}
                          className={styles.commandButton}
                        />
                      )}
                    {/*                 {selectedEmailId !== 0 && (
                      <CommandBarButton
                        iconProps={{ iconName: "CreateMailRule" }}
                        text="Categorize"
                        className={styles.commandButton}
                      />
                    )} */}
                    {currentSection !== 'drafts' && (
                      <CommandBarButton
                        iconProps={{ iconName: 'Mail' }}
                        text="Mark as read"
                        className={styles.commandButton}
                      />
                    )}

                    {selectedEmailId !== 0 && (
                      <CommandBarButton
                        iconProps={{ iconName: 'Flag' }}
                        text="Flag"
                        className={styles.commandButton}
                      />
                    )}
                    {currentSection === 'drafts' && selectedEmailId === 0 && (
                      <CommandBarButton
                        iconProps={{ iconName: 'Delete' }}
                        text="Empty folder"
                        className={styles.commandButton}
                      />
                    )}
                  </Stack>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className={styles.headerIconNewMessage}>
                  <Stack horizontal styles={stackStyles}>
                    <CommandBarButton
                      iconProps={{ iconName: 'Send' }}
                      text="Send"
                      className={'btnPlain btnPrimary ' + styles.marginR10}
                    />
                    <CommandBarButton
                      iconProps={{ iconName: 'Attach' }}
                      text="Attach"
                      split={true}
                      menuProps={newMessageMenuProps}
                      className={'btnPlain btnPrimary ' + styles.marginR10}
                    />
                    <CommandBarButton
                      iconProps={{ iconName: 'Delete' }}
                      text="Discard"
                      className={'btnPlain btnPrimary ' + styles.marginR10}
                    />
                  </Stack>
                </div>
              </Fragment>
            )}
            <div className={styles.content}>
              <div className={styles.emailList}>
                {/*               <EmailList
                  emails={emails}
                  onEmailRead={openEmail}
                  onEmailSelected={checkboxTick}
                  onCheckAll={handleCheckAll}
                  selectedEmailId={selectedEmailId}
                  currentSection={currentSection}
                  folderEmail={folderList}
                  unReadHandler={unReadHandler}
                  filterFolder={filterFolderHandler}
                  sortFolder={sortFolderHandler}
                  isFilterAll={isFilterAll}
                  lblSelectedFilter={lblSelectedFilter}
                  handleRemoveFilter={handleRemoveFilter}
                  subMenuProps={filterSubMenuProps}
                />   */}
                <MailList
                  emails={emails}
                  onEmailRead={openEmail}
                  onEmailSelected={checkboxTick}
                  onCheckAll={handleCheckAll}
                  // selectedEmailId={selectedEmailId}
                  // currentSection={currentSection}
                  folderEmail={folderList}
                  // unReadHandler={unReadHandler}
                  filterFolder={filterFolderHandler}
                  sortFolder={sortFolderHandler}
                  isFilterAll={isFilterAll}
                  lblSelectedFilter={lblSelectedFilter}
                  handleRemoveFilter={handleRemoveFilter}
                  subMenuProps={filterSubMenuProps}
                  selectedFolderName={selectedfolderName}
                  fetchMoreData={fetchMoreData}
                  deleteEmail={deleteEmailHandler}
                  markAsRead={markAsReadEmailHandler}
                  flagToggle={flagToggleHandler}
                  archiveEmail={archiveEmailHandler}
                />
              </div>
              <div className={styles.emailDetails}>
                <EmailDetails
                  email={emails.find((x: any) => x.id === selectedEmailId)}
                  // onDelete={(id:any) => {
                  //   deleteMessage(id);
                  // }}
                  new={newMessage}
                  peopleList={peopleList}
                  threadMail={threadMail}
                  mailAttachments={mailAttachments}
                  contentImages={contentImages}
                  saveToComputer={saveToLocalCloudHandler}
                  oneDriveAttachment={oneDriveAttachment}
                  downloadAll={downloadAllAttachmentHandler}
                  htmlValue={htmlValue}
                  subjectValue={subjectValue}
                  forwardMessge={forwardMessageHandler}
                  replyMessage={replyMessageHandler}
                  replyAllMessage={replyAllMessageHandler}
                  successEmailSent={successEmailSent}
                  toPeopleArrReply={toPeopleArrReply}
                  ccPeopleArrReply={ccPeopleArrReply}
                  //replyTrigger={replyTrigger}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Mailbox;
