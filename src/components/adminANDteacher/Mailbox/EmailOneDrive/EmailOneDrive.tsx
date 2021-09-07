import React, { Fragment, useState, useEffect, useRef } from "react";
import classes from "./EmailOneDrive.module.scss";
import { LabelNames } from "../../../../util/constant";
import { intl } from "../../../../util/commonFunction";
import { getFileTypeIconProps } from "@uifabric/file-type-icons";
import {
  mergeStyleSets,
  Modal,
  getTheme,
  FontIcon,
  Icon,
  DefaultButton,
  Persona,
  PersonaSize,
} from "office-ui-fabric-react";
import EmailOneDriveList from "./EmailOneDriveList/EmailOneDriveList";
import moment from "moment";
import { formatBytes } from "../../../../util/commonFunction";
import { Stylesheet } from "@fluentui/react";

const oneDriveNav = [
  {
    name: "OneDrive - Dewise Aps",
    key: "0",
    icon: "",
    fontIcon: "onedrive",
    active: false,
    noSelected: false,
  },
  {
    name: "Recent",
    key: "1",
    icon: "",
    fontIcon: "",
    active: true,
    noSelected: true,
  },
  {
    name: "Files",
    key: "2",
    icon: "",
    fontIcon: "",
    active: false,
    noSelected: true,
  },
  {
    name: "Teams",
    key: "3",
    icon: "Group",
    fontIcon: "",
    active: false,
    noSelected: true,
  },
  // {
  //   name: "Recent attachment",
  //   key: "4",
  //   icon: "",
  //   fontIcon: "outlook",
  //   active: false,
  //   noSelected: false
  // },
];

var sampleData = [
  {
    name: "Test",
    icon: "docx",
  },
  {
    name: "Test1",
    icon: "docx",
  },
  {
    name: "Test2",
    icon: "docx",
  },
  {
    name: "Test3",
    icon: "docx",
  },
];

type EmailOneDriveProps = {
  oneDriveFile: any;
  getFolderChildren: any;
  getFile: any;
  joinedTeams: any;
  getTeamsDriveItem: any; 
  isModalOpen: any;
  hideModal: any;
  selectedOneDriveItem: any;
};

const EmailOneDrive: React.FC<EmailOneDriveProps> = (props) => {
  const [sidebarList, setSidebarList] = useState<any | null>();
  const [shimmer, setShimmer] = useState(false);
  const [bolNext, setBolNext] = useState(true);
  const [column, setColumn] = useState<any | null>();
  const [fileList, setFileList] = useState(props.oneDriveFile);
  const [selectedMenu, setSelectedMenu] = useState(oneDriveNav[1]);
  const [myTeams, setMyTeams] = useState<any | null>();
  const oneDriveItem = useRef();
  const oneDriveFile = useRef([]);
  useEffect(() => {
    loadSideBar(oneDriveNav);
  }, []);

  useEffect(() => {
    oneDriveFile.current = props.oneDriveFile;
    setColumn(_fileColumn);
    setFileList(props.oneDriveFile);
  }, [props.oneDriveFile]);

  const selectedHandler = (item:any) => {
    var updateData = [...oneDriveNav];
    updateData.forEach((element) => {
      element.active = false;
      if (item.key === "0") {
        if (item.key === "0" && element.key === "1") {
          element.active = true;
          setSelectedMenu(element);
        }
      } else if (item.key === element.key) {
        element.active = true;
        setSelectedMenu(element);
      }
    });
    loadSideBar(updateData);
    props.getFile(item);
  };

  const loadSideBar = (data:any) => {
    var updateData = [...data];
    var divSidebar:any[] = [];
    updateData.forEach((element, index) => {
      var classActive = element.active
        ? classes.contentactive
        : classes.content;
      var image =
        element.fontIcon != ""
          ? "https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/svg/" +
          element.fontIcon +
          "_48x1.svg"
          : "";

      divSidebar.push(
        <div
          key={index}
          className={classActive}
          onClick={() => selectedHandler(element)}>
          <div className={classes.imagePad}>
            {element.fontIcon != "" ? (
              <img src={image} width="20" height="20" />
            ) : (
              <div className={classes.space}></div>
            )}
            {element.icon != "" && (
              <FontIcon iconName={element.icon} className={classes.icon} />
            )}
          </div>
          <div>{element.name}</div>
        </div>
      );
    });
    setSidebarList(divSidebar);
  };

  const _onColumnClickDrafts = (ev:any, column:any, value:any) => {
    const newColumns = _fileColumn.slice();
    const currColumn:any = newColumns.filter(
      (currCol) => column.key === currCol.key
    )[0];

    let newItems = _copyAndSort(
      value,
      currColumn.fieldName,
      !currColumn.isSortedDescending
    );

    newColumns.forEach((newCol) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        newCol.onColumnClick = (ev, column) => {
          _onColumnClickDrafts(ev, column, newItems);
        };
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });

    setFileList(newItems);
    setColumn(newColumns);
  };

  useEffect(() => {
    setColumn(_fileColumn);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const _fileColumn = [
    {
      key: "1",
      name: "Name",
      iconName: "Page",
      minWidth: 300,
      maxWidth: 420,
      isSorted: true,
      isSortedDescending: false,
      onColumnClick: (ev:any, column:any) => {
        _onColumnClickDrafts(ev, column, oneDriveFile.current);
      },
      onRender: (item:any) => {
        var divContent = false;
        if (item.folder !== undefined) divContent = true;

        return (
          <div className={classes.flexContainer}>
            <div className={classes.subFileContent}>
              {divContent ? (
                <FontIcon
                  onClick={() => props.getFolderChildren(item)}
                  iconName="FolderHorizontal"
                />
              ) : (
                <Icon
                  {...getFileTypeIconProps({
                    extension: item.name.split(".")[1],
                    size: 16,
                    imageFileType: "png",
                  })}
                />
              )}
            </div>
            {divContent ? (
              <div onClick={() => props.getFolderChildren(item)}>
                {" "}
                {item.name}
              </div>
            ) : (
              <div> {item.name}</div>
            )}
          </div>
        );
      },
    },
    {
      key: "2",
      name: "Modified",
      minWidth: 100,
      maxWidth: 100,
      isSorted: false,
      isSortedDescending: false,
      onColumnClick: (ev:any, column:any) => {
        _onColumnClickDrafts(ev, column, oneDriveFile.current);
      },
      onRender: (item:any) => {
        return (
          <div>{moment(item.lastModifiedDateTime).format("D/MM/YYYY")}</div>
        );
      },
    },
    {
      key: "3",
      name: "Size",
      minWidth: 100,
      maxWidth: 100,
      isSorted: false,
      isSortedDescending: false,
      onColumnClick: (ev:any, column:any) => {
        _onColumnClickDrafts(ev, column, oneDriveFile.current);
      },
      onRender: (item:any) => {
        return <div>{formatBytes(item.size)}</div>;
      },
    },
    {
      key: "4",
      name: "Modified by",
      minWidth: 100,
      maxWidth: 100,
      isSorted: false,
      isSortedDescending: false,
      onColumnClick: (ev:any, column:any) => {
        _onColumnClickDrafts(ev, column, oneDriveFile.current);
      },
      onRender: (item:any) => {
        return <div>{item.lastModifiedBy.user?.displayName}</div>;
      },
    },
  ];

  const selectedFileHandler = (item:any) => {
    if (item.length > 0) {
      setBolNext(false);
      oneDriveItem.current = item;
    } else {
      setBolNext(true);
    }
  };

  useEffect(() => {
    if (props.joinedTeams.length > 0) {
      var divGroup:any[] = [];
      props.joinedTeams.forEach((item:any, index:any) => {
        divGroup.push(
          <div
            className={"ms-Grid-col ms-lg3 " + classes.persona}
            key={index}
            onClick={() => props.getTeamsDriveItem(item)}>
            <Persona
              text={item.displayName}
              size={PersonaSize.size40}
              imageUrl={URL.createObjectURL(item.blob)}
            />
          </div>
        );
      });
      setMyTeams(divGroup);
    }
  }, [props.joinedTeams]);

  return (
    <Fragment>
      <Modal
        isOpen={props.isModalOpen}
        onDismiss={props.hideModal}
        containerClassName={contentStyles.container}>
        <div className={classes.flexContainer}>
          <div className={classes.headerTitle}>Browse from Cloud Locations</div>
          <div className={classes.titleContent1}>
            <FontIcon
              className={classes.closeIcon}
              onClick={props.hideModal}
              iconName="ChromeClose"
            />
          </div>
        </div>

        <div className={classes.container}>
          <div className={classes.subContainer1}>
            <div>{sidebarList}</div>
          </div>
          <div className={classes.subContainer2}>
            <div className={classes.flexContainer}>
              <div className={classes.titleContent}>
                One Drive  &nbsp;
                <FontIcon
                  className={classes.chevIcon}
                  iconName="ChevronRight"
                />{" "}
                &nbsp;
                <span className={classes.titleBold}>{selectedMenu.name}</span>
              </div>
            </div>
            <div className={classes.contentBody}>
              {props.joinedTeams.length === 0 ? (
                <EmailOneDriveList
                  itemlist={fileList}
                  _columns={column}
                  shimmer={shimmer}
                  selectedFile={selectedFileHandler}
                />
              ) : (
                <div
                  className={"ms-Grid-row " + classes.myTeamContainer}
                  dir="ltr">
                  {myTeams}
                </div>
              )}
            </div>
            <div className={classes.button}>
              <DefaultButton
                text="Next"
                type="button"
                disabled={bolNext}
                onClick={() => {
                  props.selectedOneDriveItem(oneDriveItem.current);
                }}
              />{" "}
              <DefaultButton
                text="Cancel"
                type="button"
                onClick={props.hideModal}
              />
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

const cancelIcon = { iconName: "Cancel" };
const theme = getTheme();
const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
    width: "92%",
    height: "85%",
  },
  header: [
    {
      flex: "1 1 auto",
      fontSize: "20px",
      color: theme.palette.neutralPrimary,
      display: "flex",
      alignItems: "center",
      fontWeight: "600",
      padding: "12px 12px 14px 24px",
    },
  ],
  body: {
    flex: "4 4 auto",
    padding: "0 24px 24px 24px",
    overflowY: "hidden",
    selectors: {
      p: { margin: "14px 0" },
      "p:first-child": { marginTop: 0 },
      "p:last-child": { marginBottom: 0 },
    },
  },
});

export default EmailOneDrive;
function _copyAndSort(items:any, columnKey:any, isSortedDescending:any) {
  const key = columnKey;
  return items
    .slice(0)
    .sort((a:any, b:any) =>
      (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1
    );
}
