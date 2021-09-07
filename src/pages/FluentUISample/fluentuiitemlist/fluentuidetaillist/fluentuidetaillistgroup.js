import * as React from 'react';
import {
  DefaultButton,
  DetailsHeader,
  DetailsList,
  mergeStyles,
  Toggle,
} from 'office-ui-fabric-react';

const margin = '0 20px 20px 0';
const controlWrapperClass = mergeStyles({
  display: 'flex',
  flexWrap: 'wrap',
});
const toggleStyles = {
  root: { margin: margin },
  label: { marginLeft: 10 },
};
const addItemButtonStyles = { root: { margin: margin } };

const _blueGroupIndex = 2;

class FluentUIDetailsListGrouped extends React.Component {
  _root = React.createRef();
  _columns;

  constructor(props) {
    super(props);

    this.state = {
      items: [
        { key: 'a', name: 'a', color: 'red' },
        { key: 'b', name: 'b', color: 'red' },
        { key: 'c', name: 'c', color: 'blue' },
        { key: 'd', name: 'd', color: 'blue' },
        { key: 'e', name: 'e', color: 'blue' },
      ],
      // This is based on the definition of items
      groups: [
        {
          key: 'groupred0',
          name: 'Color: "red"',
          startIndex: 0,
          count: 2,
          level: 0,
        },
        {
          key: 'groupgreen2',
          name: 'Color: "green"',
          startIndex: 2,
          count: 0,
          level: 0,
        },
        {
          key: 'groupblue2',
          name: 'Color: "blue"',
          startIndex: 2,
          count: 3,
          level: 0,
        },
      ],
      showItemIndexInView: false,
      isCompactMode: false,
    };

    this._columns = [
      {
        key: 'name',
        name: 'Name',
        fieldName: 'name',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
      },
      {
        key: 'color',
        name: 'Color',
        fieldName: 'color',
        minWidth: 100,
        maxWidth: 200,
      },
    ];
  }

  componentWillUnmount() {
    if (this.state.showItemIndexInView) {
      const itemIndexInView = this._root.current.getStartItemIndexInView();
      alert('first item index that was in view: ' + itemIndexInView);
    }
  }

  render() {
    const { items, groups, isCompactMode } = this.state;

    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg12 ">
          <div className="fluenttitle divpadt10">Detailslist Grouped</div>
          <div className="fluenttitle divpadt10">
            <div>
              <div className={controlWrapperClass}>
                <DefaultButton
                  onClick={this._addItem}
                  text="Add an item"
                  styles={addItemButtonStyles}
                />
                <Toggle
                  label="Compact mode"
                  inlineLabel
                  checked={isCompactMode}
                  onChange={this._onChangeCompactMode}
                  styles={toggleStyles}
                />
                <Toggle
                  label="Show index of first item in view when unmounting"
                  inlineLabel
                  checked={this.state.showItemIndexInView}
                  onChange={this._onShowItemIndexInViewChanged}
                  styles={toggleStyles}
                />
              </div>
              <DetailsList
                componentRef={this._root}
                items={items}
                groups={groups}
                columns={this._columns}
                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                ariaLabelForSelectionColumn="Toggle selection"
                checkButtonAriaLabel="Row checkbox"
                onRenderDetailsHeader={this._onRenderDetailsHeader}
                groupProps={{
                  showEmptyGroups: true,
                }}
                onRenderItemColumn={this._onRenderColumn}
                compact={isCompactMode}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  _addItem = () => {
    const items = this.state.items;
    const groups = [...this.state.groups];
    groups[_blueGroupIndex].count++;

    this.setState(
      {
        items: items.concat([
          {
            key: 'item-' + items.length,
            name: 'New item ' + items.length,
            color: 'blue',
          },
        ]),
        groups,
      },
      () => {
        if (this._root.current) {
          this._root.current.focusIndex(items.length, true);
        }
      },
    );
  };

  _onRenderDetailsHeader(props, _defaultRender) {
    return (
      <DetailsHeader
        {...props}
        ariaLabelForToggleAllGroupsButton={'Expand collapse groups'}
      />
    );
  }

  _onRenderColumn(item, index, column) {
    const value =
      item && column && column.fieldName ? item[column.fieldName] : '';

    return <div data-is-focusable={true}>{value}</div>;
  }

  _onShowItemIndexInViewChanged = (event, checked) => {
    this.setState({ showItemIndexInView: checked });
  };

  _onChangeCompactMode = (ev, checked) => {
    this.setState({ isCompactMode: checked });
  };
}

export default FluentUIDetailsListGrouped;
