import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';

const classNames = mergeStyleSets({
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: '16px',
  },
  fileIconCell: {
    textAlign: 'center',
    selectors: {
      '&:before': {
        content: '.',
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '100%',
        width: '0px',
        visibility: 'hidden',
      },
    },
  },
  fileIconImg: {
    verticalAlign: 'middle',
    maxHeight: '16px',
    maxWidth: '16px',
  },
  controlWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  exampleToggle: {
    display: 'inline-block',
    marginBottom: '10px',
    marginRight: '30px',
  },
  selectionDetails: {
    marginBottom: '20px',
  },
});
const controlStyles = {
  root: {
    margin: '0 30px 20px 0',
    maxWidth: '300px',
  },
};

export class FluentUIDetailsList extends React.Component {
  _selection;
  _allItems;

  constructor(props) {
    super(props);

    this._allItems = _generateDocuments();

    const columns = [
      {
        key: 'column1',
        name: 'File Type',
        className: classNames.fileIconCell,
        iconClassName: classNames.fileIconHeaderIcon,
        ariaLabel:
          'Column operations for File type, Press to sort on File type',
        iconName: 'Page',
        isIconOnly: true,
        fieldName: 'name',
        minWidth: 16,
        maxWidth: 50,
        onColumnClick: this._onColumnClick,
        onRender: item => {
          return (
            <div className="list-task-icon">
              <FontIcon iconName="penWorkspace" />
            </div>
          );
        },
      },
      {
        key: 'column2',
        name: 'Name',
        fieldName: 'name',
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
      },
      {
        key: 'column3',
        name: 'Date Modified',
        fieldName: 'dateModifiedValue',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: 'number',
        onRender: item => {
          return <span>{item.dateModified}</span>;
        },
        isPadded: true,
      },
      {
        key: 'column4',
        name: 'Modified By',
        fieldName: 'modifiedBy',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: 'string',
        onColumnClick: this._onColumnClick,
        onRender: item => {
          return <span>{item.modifiedBy}</span>;
        },
        isPadded: true,
      },
      {
        key: 'column5',
        name: 'File Size',
        fieldName: 'fileSizeRaw',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: 'number',
        onColumnClick: this._onColumnClick,
        onRender: item => {
          return <span>{item.fileSize}</span>;
        },
      },
    ];

    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({
          selectionDetails: this._getSelectionDetails(),
        });
      },
    });

    this.state = {
      items: this._allItems,
      columns: columns,
      selectionDetails: this._getSelectionDetails(),
      isModalSelection: false,
      isCompactMode: false,
      announcedMessage: undefined,
    };
  }

  render() {
    const {
      columns,
      isCompactMode,
      items,
      selectionDetails,
      isModalSelection,
      announcedMessage,
    } = this.state;

    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg12 ">
          <div className="fluenttitle divpadt10">
            <div className="fluentDivTitle">
              <span className="titleLine" />
              <span>
                <h5>DataList</h5>
              </span>
            </div>
          </div>
          <div className="divpadt10">
            <Fabric>
              <div className={classNames.controlWrapper}>
                <Toggle
                  label="Enable compact mode"
                  checked={isCompactMode}
                  onChange={this._onChangeCompactMode}
                  onText="Compact"
                  offText="Normal"
                  styles={controlStyles}
                />
                <Toggle
                  label="Enable modal selection"
                  checked={isModalSelection}
                  onChange={this._onChangeModalSelection}
                  onText="Modal"
                  offText="Normal"
                  styles={controlStyles}
                />
                <TextField
                  label="Filter by name:"
                  onChange={this._onChangeText}
                  styles={controlStyles}
                />
                <Announced
                  message={`Number of items after filter applied: ${items.length}.`}
                />
              </div>
              <div className={classNames.selectionDetails}>
                {selectionDetails}
              </div>
              <Announced message={selectionDetails} />
              {announcedMessage ? (
                <Announced message={announcedMessage} />
              ) : undefined}
              {isModalSelection ? (
                <MarqueeSelection selection={this._selection}>
                  <DetailsList
                    items={items}
                    compact={isCompactMode}
                    columns={columns}
                    selectionMode={SelectionMode.multiple}
                    getKey={this._getKey}
                    setKey="multiple"
                    layoutMode={DetailsListLayoutMode.justified}
                    isHeaderVisible={true}
                    selection={this._selection}
                    selectionPreservedOnEmptyClick={true}
                    onItemInvoked={this._onItemInvoked}
                    enterModalSelectionOnTouch={true}
                    ariaLabelForSelectionColumn="Toggle selection"
                    ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                    checkButtonAriaLabel="Row checkbox"
                  />
                </MarqueeSelection>
              ) : (
                <div>
                  <Pivot
                    className="customTableWithPivot"
                    aria-label="Basic Pivot Example">
                    <PivotItem
                      headerText="My Files"
                      headerButtonProps={{
                        'data-order': 1,
                        'data-title': 'My Files Title',
                      }}>
                      {/* Please insert here the tabel */}
                    </PivotItem>
                    <PivotItem headerText="Recent">
                      {/* Please insert here the tabel */}
                    </PivotItem>
                    <PivotItem headerText="Shared with me">
                      {/* Please insert here the tabel */}
                    </PivotItem>
                  </Pivot>
                  <DetailsList
                    items={items}
                    compact={isCompactMode}
                    columns={columns}
                    selectionMode={SelectionMode.none}
                    getKey={this._getKey}
                    setKey="none"
                    layoutMode={DetailsListLayoutMode.justified}
                    isHeaderVisible={true}
                    onItemInvoked={this._onItemInvoked}
                  />
                </div>
              )}
            </Fabric>
          </div>
        </div>

        <div className="ms-Grid-col ms-lg12 ">
          <div className="fluenttitle divpadt10">
            <div className="fluentDivTitle">
              <span className="titleLine" />
              <span>
                <h5>DataList - Customize</h5>
              </span>
            </div>
          </div>
          <div className="divpadt10">
            <Fabric>
              <DetailsList
                items={items}
                compact={isCompactMode}
                columns={columns}
                selectionMode={SelectionMode.none}
                getKey={this._getKey}
                setKey="none"
                layoutMode={DetailsListLayoutMode.justified}
                isHeaderVisible={true}
                onItemInvoked={this._onItemInvoked}
              />
            </Fabric>
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(previousProps, previousState) {
    if (
      previousState.isModalSelection !== this.state.isModalSelection &&
      !this.state.isModalSelection
    ) {
      this._selection.setAllSelected(false);
    }
  }

  _getKey(item, index) {
    return item.key;
  }

  _onChangeCompactMode = (ev, checked) => {
    this.setState({ isCompactMode: checked });
  };

  _onChangeModalSelection = (ev, checked) => {
    this.setState({ isModalSelection: checked });
  };

  _onChangeText = (ev, text) => {
    this.setState({
      items: text
        ? this._allItems.filter(i => i.name.toLowerCase().indexOf(text) > -1)
        : this._allItems,
    });
  };

  _onItemInvoked(item) {
    alert(`Item invoked: ${item.name}`);
  }

  _getSelectionDetails() {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + this._selection.getSelection()[0].name;
      default:
        return `${selectionCount} items selected`;
    }
  }

  _onColumnClick = (ev, column) => {
    const { columns, items } = this.state;
    const newColumns = columns.slice();
    const currColumn = newColumns.filter(
      currCol => column.key === currCol.key,
    )[0];
    newColumns.forEach(newCol => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        this.setState({
          announcedMessage: `${currColumn.name} is sorted ${
            currColumn.isSortedDescending ? 'descending' : 'ascending'
          }`,
        });
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = _copyAndSort(
      items,
      currColumn.fieldName,
      currColumn.isSortedDescending,
    );
    this.setState({
      columns: newColumns,
      items: newItems,
    });
  };
}

function _copyAndSort(items, columnKey, isSortedDescending) {
  const key = columnKey;
  return items
    .slice(0)
    .sort((a, b) =>
      (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1,
    );
}

function _generateDocuments() {
  const items = [];
  for (let i = 0; i < 5; i++) {
    const randomDate = _randomDate(new Date(2012, 0, 1), new Date());
    const randomFileSize = _randomFileSize();
    const randomFileType = _randomFileIcon();
    let fileName = _lorem(2);
    fileName =
      fileName.charAt(0).toUpperCase() +
      fileName.slice(1).concat(`.${randomFileType.docType}`);
    let userName = _lorem(2);
    userName = userName
      .split(' ')
      .map(name => name.charAt(0).toUpperCase() + name.slice(1))
      .join(' ');
    items.push({
      key: i.toString(),
      name: fileName,
      value: fileName,
      iconName: randomFileType.url,
      fileType: randomFileType.docType,
      modifiedBy: userName,
      dateModified: randomDate.dateFormatted,
      dateModifiedValue: randomDate.value,
      fileSize: randomFileSize.value,
      fileSizeRaw: randomFileSize.rawSize,
    });
  }
  return items;
}

function _randomDate(start, end) {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
  return {
    value: date.valueOf(),
    dateFormatted: date.toLocaleDateString(),
  };
}

const FILE_ICONS = [
  { name: 'accdb' },
  { name: 'audio' },
  { name: 'code' },
  { name: 'csv' },
  { name: 'docx' },
  { name: 'dotx' },
  { name: 'mpp' },
  { name: 'mpt' },
  { name: 'model' },
  { name: 'one' },
  { name: 'onetoc' },
  { name: 'potx' },
  { name: 'ppsx' },
  { name: 'pdf' },
  { name: 'photo' },
  { name: 'pptx' },
  { name: 'presentation' },
  { name: 'potx' },
  { name: 'pub' },
  { name: 'rtf' },
  { name: 'spreadsheet' },
  { name: 'txt' },
  { name: 'vector' },
  { name: 'vsdx' },
  { name: 'vssx' },
  { name: 'vstx' },
  { name: 'xlsx' },
  { name: 'xltx' },
  { name: 'xsn' },
];

function _randomFileIcon() {
  const docType =
    FILE_ICONS[Math.floor(Math.random() * FILE_ICONS.length)].name;
  return {
    docType,
    url: `https://static2.sharepointonline.com/files/fabric/assets/item-types/16/${docType}.svg`,
  };
}

function _randomFileSize() {
  const fileSize = Math.floor(Math.random() * 100) + 30;
  return {
    value: `${fileSize} KB`,
    rawSize: fileSize,
  };
}

const LOREM_IPSUM = (
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut ' +
  'labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut ' +
  'aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ' +
  'eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt '
).split(' ');
let loremIndex = 0;
function _lorem(wordCount) {
  const startIndex =
    loremIndex + wordCount > LOREM_IPSUM.length ? 0 : loremIndex;
  loremIndex = startIndex + wordCount;
  return LOREM_IPSUM.slice(startIndex, loremIndex).join(' ');
}

export default FluentUIDetailsList;
