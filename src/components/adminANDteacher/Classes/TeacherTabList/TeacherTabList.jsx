import React, { Fragment } from "react";
import {
  ShimmeredDetailsList,
  SelectionMode,
  Selection,
  ConstrainMode,
  DetailsListLayoutMode,
} from "office-ui-fabric-react";
import classes from "./TeacherTabList.module.scss";
import { FontIcon } from "@fluentui/react";
import "./TeacherTabList.scss";

export const TeacherTabList = (props) => {
  const _selection = new Selection({
    onSelectionChanged: () => _getSelectionDetails(),
  });

  const _getSelectionDetails = (value) => {
    //eslint-disable-next-line
    var item = _selection._exemptedIndices;
  };

  return (
    <Fragment>
      <div className={"ms-Grid-col ms-lg12  "}>
        <div className={"contentDataDoubleColumn"}>
          <div>
            <ShimmeredDetailsList
              items={props.itemlist}
              columns={props._columns}
              selectionMode={SelectionMode.none}
              isHeaderVisible={true}
              constrainMode={ConstrainMode.unconstrained}
              onRenderDetailsHeader={props.renderDetailsHeader}
              enableShimmer={props.shimmer}
              layoutMode={DetailsListLayoutMode.layoutMode}
            />
            {props.itemlist.length === 0 && (
              <div className={classes.emptyDiv}>
                <div>
                  <FontIcon
                    className={classes.subtitleIcon}
                    iconName="AccountManagement"
                  />
                </div>
                <div className={classes.subtitle}>
                  Add teacher by searching thier name
                </div>
                <div className={classes.subtitle1}>
                  We will display the teachers' information here
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TeacherTabList;
