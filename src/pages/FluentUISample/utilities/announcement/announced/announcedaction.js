import * as React from 'react';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn,
} from 'office-ui-fabric-react/lib/DetailsList';
import { IconButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { createArray } from 'office-ui-fabric-react/lib/Utilities';
import { useConst } from '@uifabric/react-hooks';

const iconButtonStyles = { root: { float: 'right', height: 'inherit' } };

const AnnouncedQuickActionsExample = () => {
  const detailsList = React.useRef(null);
  const textField = React.useRef(null);
  const selection = useConst(() => new Selection());
  const [items, setItems] = React.useState(() =>
    createArray(20, i => ({
      key: i,
      name: 'Item ' + i,
    })),
  );

  const [dialogContent, setDialogContent] = React.useState(undefined);
  const [announced, setAnnounced] = React.useState(undefined);

  const deleteItem = React.useCallback(index => {
    setItems(prevItems => prevItems.filter((item, i) => i !== index));
    setAnnounced(<Announced message="Item deleted" aria-live="assertive" />);
  }, []);

  const renameItem = React.useCallback((item, index) => {
    const updateItemName = () => {
      if (textField && textField.current) {
        setItems(prevItems => {
          const renamedItems = [...prevItems];
          renamedItems[index] = {
            ...prevItems[index],
            name: textField.current?.value || renamedItems[index].name,
          };
          return renamedItems;
        });
        setDialogContent(undefined);
        setAnnounced(
          <Announced message="Item renamed" aria-live="assertive" />,
        );
      }
    };

    setDialogContent(
      <>
        <TextField
          componentRef={textField}
          label="Rename"
          defaultValue={item.name}
        />
        <DialogFooter>
          <PrimaryButton
            // eslint-disable-next-line react/jsx-no-bind
            onClick={updateItemName}
            text="Save"
          />
        </DialogFooter>
      </>,
    );
  }, []);

  const columns = useConst(() => [
    {
      name: 'Name',
      fieldName: 'name',
      key: 'name',
      minWidth: 100,
      maxWidth: 200,
      onRender: (item, index) => (
        <div>
          {item.name}
          <IconButton
            menuIconProps={{ iconName: 'MoreVertical' }}
            role="button"
            aria-haspopup
            aria-label="Show actions"
            styles={iconButtonStyles}
            menuProps={{
              items: [
                {
                  key: 'delete',
                  text: 'Delete',
                  onClick: () => deleteItem(index),
                },
                {
                  key: 'rename',
                  text: 'Rename',
                  onClick: () => renameItem(item, index),
                },
              ],
            }}
          />
        </div>
      ),
    },
  ]);

  const closeRenameDialog = React.useCallback(() => {
    setDialogContent(undefined);
  }, []);

  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">Announced - Quick Actions</div>
        <div className="divpadt10">
          {announced}
          <DetailsList
            componentRef={detailsList}
            items={items}
            columns={columns}
            layoutMode={DetailsListLayoutMode.fixedColumns}
            selection={selection}
            selectionPreservedOnEmptyClick
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          />
          <Dialog
            hidden={!dialogContent}
            onDismiss={closeRenameDialog}
            closeButtonAriaLabel="Close">
            {dialogContent}
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AnnouncedQuickActionsExample;
