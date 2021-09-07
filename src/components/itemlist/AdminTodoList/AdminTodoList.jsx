import React, { Fragment } from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import styles from './AdminTodoList.module.scss';
import moment from 'moment';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import type from '../../../assets/ui-kit/_variables.scss';

class AdminTodoList extends React.Component {
  constructor(props) {
    super(props);

    this._selection = new Selection({
      onSelectionChanged: () =>
        this.setState({ selectionDetails: this._getSelectionDetails() }),
    });

    const dpStyle = {
      fontSize: '16px',
      marginRight: '5px',
      position: 'relative',
      top: '3px',
      color: '#6c35d4',
    };

    const favStyle = {
      fontSize: '16px',
      marginTop: '5px',
      position: 'relative',
      top: '15px',
    };

    const favStyleCheck = {
      fontSize: '16px',
      marginTop: '5px',
      position: 'relative',
      top: '15px',
      color: 'yellow',
    };

    this._columns = [
      {
        key: 'column1',
        name: '',
        fieldName: '',
        minWidth: 160,
        maxWidth: 160,
        onRender: item => {
          let color = null;
          if (item.groupId === 'personalTask') {
            color = type.privateEventBorder;
          } else if (item.groupId === 'ateduTask') {
            color = type.classScheduleBorder;
          } else {
            color = type.schoolEventBorder;
          }
          const updatedStyle = { ...dpStyle, color: color };
          return (
            <>
              <div className={styles.title}>{item.title}</div>
              <br />
              <div>
                <i className="custom-icon-event-check" style={updatedStyle} />
                <span className={styles.date}>
                  {moment(item.start).format('ddd,')}
                </span>
                &nbsp;
                <span className={styles.date}>
                  {moment(item.start).format('MMM DD,')}
                </span>
                &nbsp;
                <span className={styles.date}>
                  {moment(item.start).format('hh:MM A')}
                </span>
              </div>
            </>
          );
        },
      },
      {
        key: 'column2',
        name: '',
        fieldName: '',
        minWidth: 20,
        maxWidth: 20,
        onRender: item => {
          let wrapper = '';
          {
            item.isFavorite
              ? (wrapper = (
                  <FontIcon iconName="FavoriteStarFill" style={favStyleCheck} />
                ))
              : (wrapper = (
                  <FontIcon iconName="FavoriteStar" style={favStyle} />
                ));
          }
          return wrapper;
        },
      },
    ];

    this.state = {
      items: props.itemlist,
      allTasks: props.itemlist,
      selectionDetails: this._getSelectionDetails(),
    };
  }

  handleFilterTask = item => {
    if (item === 'allTask') {
      this.setState({ items: this.state.allTasks });
    } else {
      const selectedTask = this.state.allTasks.filter(a => a.groupId === item);
      this.setState({ items: selectedTask });
    }
  };

  render() {
    return (
      <Fabric>
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            items={this.state.items}
            columns={this._columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.fixedColumns}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={this._onItemInvoked}
          />
        </MarqueeSelection>
      </Fabric>
    );
  }

  _getSelectionDetails() {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + this._selection.getSelection()[0].name;
      default:
        return '${selectionCount} items selected';
    }
  }

  _onFilter = (ev, text) => {
    this.setState({
      items: text
        ? this._allItems.filter(i => i.name.toLowerCase().indexOf(text) > -1)
        : this._allItems,
    });
  };

  _onItemInvoked = item => {
    alert('Item invoked: ${item.name}');
  };
}

export default AdminTodoList;
