import React, { Fragment } from 'react';
import { Callout, ActionButton } from 'office-ui-fabric-react';
import { DetailsList, Selection } from 'office-ui-fabric-react/lib/DetailsList';

export const MediaList = props => {
  const _selection = new Selection({
    onSelectionChanged: () => _getSelectionDetails(),
  });

  const _getSelectionDetails = value => {
    const item = _selection._exemptedIndices;
    props.showHorizontal(item);
  };

  return (
    <>
      {props.isCalloutVisible === true ? (
        <Callout
          role="alertdialog"
          className={props.menucss}
          isBeakVisible={false}
          gapSpace={0}
          setInitialFocus>
          <div>
            <ActionButton allowDisabledFocus>Download</ActionButton>
          </div>
          <div>
            <ActionButton allowDisabledFocus>Delete</ActionButton>
          </div>
          <div>
            <ActionButton allowDisabledFocus>Shared</ActionButton>
          </div>
        </Callout>
      ) : (
        ''
      )}

      <div className="ms-Grid-row">
        <div className="ms-Grid-col  ms-lg12  DetailLisContainer">
          <DetailsList
            items={props.itemlist}
            columns={props._columns}
            selection={_selection}
            selectionPreservedOnEmptyClick={true}
            setKey="set"
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="select row"
            isHeaderVisible={false}
          />
        </div>
      </div>
    </>
  );
};

export default MediaList;
