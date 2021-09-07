import * as React from 'react';
import { DetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import { Link } from 'office-ui-fabric-react/lib/Link';

class FluentUIDetailsListNavigatingFocus extends React.Component {
  state = {
    items: generateItems(''),
    key: 0,
  };

  _columns = [
    {
      key: 'filepath',
      name: 'File path',
      onRender: item => (
        // eslint-disable-next-line react/jsx-no-bind
        <Link key={item} onClick={() => this._navigate(item)}>
          {item}
        </Link>
      ),
    },
    {
      key: 'size',
      name: 'Size',
      onRender: item => '4 KB',
    },
  ];

  render() {
    // By default, when the list is re-rendered on navigation or some other event,
    // focus goes to the list container and the user has to tab back into the list body.
    // Setting initialFocusedIndex makes focus go directly to a particular item instead.
    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg12 ">
          <div className="fluenttitle divpadt10">
            Detailslist Inner Navigation
          </div>
          <div className="fluenttitle divpadt10">
            <DetailsList
              key={this.state.key}
              items={this.state.items}
              columns={this._columns}
              onItemInvoked={this._navigate}
              initialFocusedIndex={this.state.initialFocusedIndex}
              ariaLabelForSelectionColumn="Toggle selection"
              ariaLabelForSelectAllCheckbox="Toggle selection for all items"
              checkButtonAriaLabel="Row checkbox"
            />
          </div>
        </div>
      </div>
    );
  }

  _navigate = name => {
    this.setState({
      items: generateItems(name + ' / '),
      initialFocusedIndex: 0,
      // Simulate navigation by updating the list's key, which causes it to re-render
      key: this.state.key + 1,
    });
  };
}

function generateItems(parent) {
  return Array.prototype.map.call(
    'ABCDEFGHI',
    name => parent + 'Folder ' + name,
  );
}

export default FluentUIDetailsListNavigatingFocus;
