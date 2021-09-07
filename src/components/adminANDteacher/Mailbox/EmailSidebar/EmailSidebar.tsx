import React, { useEffect, useState, Fragment } from 'react';
import { FontIcon, PrimaryButton, TextField } from 'office-ui-fabric-react';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import styles from './EmailSidebar.module.scss';
import { ActionButton } from '@fluentui/react';
import {
  createMailFolders,
  updateMailFolders,
  deleteMailFolders,
} from '../../../../services/msgraph/email';
import Classes from '../../../../pages/Classes';

type EmailSidebarProps = {
  folderList: any;
  folderUpdate: any;
  onSelectedFolder: any;
  onCreateMessage: any;
};

const EmailSidebar: React.FC<EmailSidebarProps> = props => {
  const [folderList, setFolderList] = useState();
  const [newFolderList, setNewFolderList] = useState();

  useEffect(() => {
    var data = props.folderList?.value?.map((element:any) => {
      var item = folderStructure(element);
      return item;
    });

    //setFolderList(data);
    if (data !== undefined) {
      var defaultFolder = data.filter((r:any) => r.order !== 10);
      var othersFolder = data.filter((r:any) => r.order === 10);
      defaultFolder = _copyAndSort(defaultFolder, 'order', false);
      othersFolder.push({
        id: 1,
        displayName: 'New folder',
        count: '0',
        icon: 'FabricFolder',
        active: false,
        assign: false,
        unreadItemCount: 0,
      });
      updateFolderDiv(defaultFolder, othersFolder);
      updateNewFolder(othersFolder, defaultFolder);
    }

    //updateNewFolder(newFolder);
  }, [props.folderUpdate]);

  const _copyAndSort = (items:any, columnKey:any, isSortedDescending:any) => {
    const key = columnKey;
    return items
      .slice(0)
      .sort((a:any, b:any) =>
        (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1,
      );
  };

  /*  const folderStructure = (item) => {
    switch (item.displayName.toLowerCase()) {
      case "inbox":
        props.onSelectedFolder(item);
        return {
          ...item,
          active: true,
          assign: false,
          icon: "Inbox",
          order: 0,
        };
      case "drafts":
        return {
          ...item,
          active: false,
          assign: false,
          icon: "Edit",
          order: 1,
        };
      case "sent items":
        return {
          ...item,
          active: false,
          assign: false,
          icon: "Send",
          order: 2,
        };
      case "deleted items":
        return {
          ...item,
          active: false,
          assign: false,
          icon: "Delete",
          order: 3,
        };
      case "junk email":
        return {
          ...item,
          active: false,
          assign: false,
          icon: "Blocked",
          order: 4,
        };
      case "archive":
        return {
          ...item,
          active: false,
          assign: false,
          icon: "Archive",
          order: 5,
        };
      case "important stuff":
        return {
          ...item,
          active: false,
          assign: false,
          icon: "FabricFolder",
          order: 6,
        };
      default:
        return {
          ...item,
          active: false,
          assign: true,
          icon: "FabricFolder",
          order: 10,
        };
    }
  }; */
  const folderStructure = (item:any) => {
    switch (item.displayName.toLowerCase()) {
      case 'inbox':
        //selectedFolderHandler(item);
        props.onSelectedFolder(item);
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
  const onSelectedItemHandler = (item:any, folderStruc:any, data:any, data1:any) => {
    props.onSelectedFolder(item);
    var updatedFolder = [...data];
    var updatedNewFolder = [...data1];

    updatedFolder.forEach(element => {
      element.active = false;
    });
    updatedNewFolder.forEach(element => {
      element.active = false;
    });

    if (folderStruc === 1) {
      updatedFolder.forEach(element => {
        element.active = false;
        if (element.id === item.id) element.active = true;
      });
    } else {
      updatedNewFolder.forEach(element => {
        element.active = false;
        if (element.id === item.id) element.active = true;
      });
    }

    updateFolderDiv(updatedFolder, updatedNewFolder);
    updateNewFolder(updatedNewFolder, updatedFolder);
  };

  useEffect(() => {
    //updateFolderDiv(folder);
    //updateNewFolder(newFolder);
  }, []);

  const updateFolderDiv = (data:any, data1:any) => {
    var folderDiv:any = [];
    data.forEach((element:any, key:any) => {
      var activeStyle = element.active ? styles.activeItem : '';
      folderDiv.push(
        <li
          key={key}
          className={styles.listItem + ' ' + activeStyle}
          onClick={() => {
            onSelectedItemHandler(element, 1, data, data1);
          }}>
          <div className={styles.flexContainer}>
            <div className={styles.iconAlign}>
              <FontIcon iconName={element.icon} className={styles.icon} />
            </div>
            <div className={styles.displayName}>
              <span className="item-label">{element.displayName}</span>
              <span className={styles.itemCount}>
                {element.unreadItemCount === 0 ? '' : element.unreadItemCount}
              </span>
            </div>
          </div>
        </li>,
      );
    });
    setFolderList(folderDiv);
  };

  const rightClickEditHandler = (item:any, div:any, id:any) => {
    document.getElementById(div)!.hidden = false;
    document.getElementById(id)!.focus();
  };

  const rightClickDeleteHandler = (item:any, data:any, data1:any) => {
    deleteNewFolderName(item.id, data, data1);
  };

  const updateNewFolder = (data:any, data1:any) => {
    var folderDiv:any = [];
    data.forEach((element:any, index:any) => {
      var activeStyle = element.active ? styles.activeItem : '';
      var activeStyleFont = element.active ? styles.activeItemFont : '';

      if (element.assign) {
        folderDiv.push(
          <div key={index}>
            <ContextMenuTrigger id={'rightClickFolder' + index}>
              <div
                id={'moreLink' + element.id}
                className={styles.nflistItem + ' ' + activeStyle}
                onClick={() => {
                  onSelectedItemHandler(element, 2, data1, data);
                }}>
                <div
                  className={
                    styles.container1 +
                    ' ' +
                    styles.newFolder +
                    ' ' +
                    styles.newActiveItem +
                    ' ' +
                    activeStyleFont
                  }>
                  <div className={styles.flexContainer}>
                    <div className={styles.iconAlign}>
                      <FontIcon
                        iconName="FabricFolder"
                        className={styles.icon}
                      />
                    </div>
                    <div>
                      <span className="item-label">{element.displayName}</span>
                      <span className={styles.itemCount}>
                        {element.unreadItemCount === 0
                          ? ''
                          : element.unreadItemCount}
                      </span>
                    </div>
                  </div>
                  <div
                    id={'dnf_' + index}
                    hidden={true}
                    className={styles.container2 + ' ' + styles.textField}>
                    <TextField
                      onMouseLeave={() =>
                        newFolderonMouseLeaveHandler('dnf_' + index)
                      }
                      onKeyDown={e => {
                        newFolderLeaveHandler(
                          e,
                          'dnf_' + index,
                          element.id,
                          true,
                          data,
                          data1,
                        );
                      }}
                      id={'nf_' + index}
                      defaultValue={element.displayName}
                    />
                  </div>
                </div>
              </div>
            </ContextMenuTrigger>

            <ContextMenu id={'rightClickFolder' + index}>
              <MenuItem>
                <div>
                  <ActionButton
                    iconProps={{ iconName: 'Edit' }}
                    onClick={() =>
                      rightClickEditHandler(
                        element,
                        'dnf_' + index,
                        'nf_' + index,
                      )
                    }>
                    {' '}
                    Edit
                  </ActionButton>
                </div>
              </MenuItem>
              <MenuItem>
                <div>
                  <ActionButton
                    iconProps={{ iconName: 'Delete' }}
                    onClick={() =>
                      rightClickDeleteHandler(element, data, data1)
                    }>
                    {' '}
                    Delete
                  </ActionButton>
                </div>
              </MenuItem>
            </ContextMenu>
          </div>,
        );
      } else {
        folderDiv.push(
          <div key={index} className={styles.newFolderContainer}>
            <div
              onClick={() => newFolderHandler('nf_' + index, 'dnf_' + index)}
              className={
                styles.container1 +
                ' ' +
                styles.newFolder +
                ' ' +
                styles.newInActiveItem
              }>
              {element.displayName}
              <div
                id={'dnf_' + index}
                hidden={true}
                className={styles.container2 + ' ' + styles.textField}>
                <TextField
                  onMouseLeave={() =>
                    newFolderonMouseLeaveHandler('dnf_' + index)
                  }
                  onKeyDown={e => {
                    newFolderLeaveHandler(
                      e,
                      'dnf_' + index,
                      element.id,
                      false,
                      data,
                      data1,
                    );
                  }}
                  id={'nf_' + index}
                />
              </div>
            </div>
          </div>,
        );
      }
    });
    setNewFolderList(folderDiv);
  };

  const newFolderHandler = (id:any, div:any) => {
    document.getElementById(div)!.hidden = false;
    document.getElementById(id)!.focus();
  };
  const newFolderLeaveHandler = (e:any, docId:any, id:any, isEdit:any, data:any, data1:any) => {
    if (e.keyCode == 13) {
      updateNewFolderName(id, e.target.value, isEdit, data, data1);
      document.getElementById(docId)!.hidden = true;
    }
  };

  const newFolderonMouseLeaveHandler = (id:any) => {
    document.getElementById(id)!.hidden = true;
  };

  const updateNewFolderName = (id:any, value:any, isEdit:any, data:any, data1:any) => {
    var updateData = [...data];
    if (!isEdit) {
      createMailFolders(value, false).then(response => {
        updateData.forEach(element => {
          if (element.id === id) {
            element.id = response.id;
            element.displayName = value;
            element.assign = true;
          }
        });
        if (!isEdit) {
          var item = {
            id: updateData.length + 1,
            displayName: 'New folder',
            count: '0',
            icon: 'FabricFolder',
            active: false,
            assign: false,
            unreadItemCount: 0,
          };
          updateData.push(item);
        }
        updateNewFolder(updateData, data1);
      });
    } else {
      updateMailFolders(id, value, false).then(response => {
        updateData.forEach(element => {
          if (element.id === id) {
            element.displayName = response.displayName;
            element.assign = true;
          }
        });
        updateNewFolder(updateData, data1);
      });
    }
  };

  const deleteNewFolderName = (id:any, data:any, data1:any) => {
    deleteMailFolders(id).then(response => {
      var updateData = [...data];
      var index = updateData.findIndex(r => r.id === id);
      updateData.splice(index, 1);
      updateNewFolder(updateData, data1);
    });
  };

  return (
    <Fragment>
      <div id={styles.sidebar}>
        <div className={styles.sidebarCompose}>
          <PrimaryButton
            text="New Message"
            className={'btnPrimary marginR15 ' + styles.btnNewMessage}
            onClick={() => props.onCreateMessage(true)}
          />
        </div>

        <ul className={styles.sidebarItems}>{folderList}</ul>
        {newFolderList}
      </div>
    </Fragment>
  );
};

export default EmailSidebar;
