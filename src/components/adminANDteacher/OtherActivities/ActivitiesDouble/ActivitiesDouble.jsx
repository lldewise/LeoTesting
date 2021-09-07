import React, { Fragment } from "react";
import {
  DetailsList,
  Selection,
  // CheckboxVisibility,
  Checkbox,
  SelectionMode
} from "office-ui-fabric-react";

export const ActivitiesDouble = (props) => {
  const _selection = new Selection({
    onSelectionChanged: () => _getSelectionDetails(),
  });

  const _getSelectionDetails = (value) => {
    //eslint-disable-next-line
    var item = _selection._exemptedIndices;
  };

  // const onRenderCheckbox = (props) => {
  //   return (
  //     <div style={{ pointerEvents: "none" }}>
  //       <Checkbox checked={props.checked} />
  //     </div>
  //   );
  // };

  return (
    <Fragment>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col  ms-lg12 ActivityDetailList">
          {props.itemlist.length > 0 && (
            <DetailsList
              items={props.itemlist}
              columns={props._columns}
              // selection={_selection}
              selectionPreservedOnEmptyClick={true}
              isHeaderVisible={true}
              selectionMode={SelectionMode.none}
              // checkboxVisibility={CheckboxVisibility.always}
             // onRenderCheckbox={onRenderCheckbox}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ActivitiesDouble;
