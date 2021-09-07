import React, { Fragment, useEffect, useState } from "react";
import {
  ShimmeredDetailsList,
  Selection,
  StickyPositionType,
  Sticky,
  ConstrainMode,
  MarqueeSelection
} from "office-ui-fabric-react";
import classes from "./EmailOneDriveList.module.scss";

type EmailOneDriveListProps = {
  itemlist: any;
  _columns: any;
  shimmer: any;
  selectedFile: any;
};

const EmailOneDriveList: React.FC<EmailOneDriveListProps> = (props) => {
  const _selection = new Selection({
    onSelectionChanged: () => {
      props.selectedFile(_selection.getSelection());
    }
  })


  return (
    <Fragment>
      <div className={classes.container}>
        <div className="oneDriveDetailList">
          <MarqueeSelection selection={_selection}>
            <ShimmeredDetailsList
              items={props.itemlist}
              columns={props._columns}
              isHeaderVisible={true}
              selection={_selection}
              setKey="set"
              constrainMode={ConstrainMode.unconstrained}
              onRenderDetailsHeader={(headerProps:any, defaultRender:any) => {
                return (
                  <Sticky
                    stickyPosition={StickyPositionType.Header}
                    isScrollSynced={true}
                    stickyBackgroundColor="transparent">
                    <div>{defaultRender(headerProps)}</div>
                  </Sticky>
                );
              }}
              enableShimmer={props.shimmer}
            />
          </MarqueeSelection>
        </div>
      </div>

    </Fragment>
  );
};

export default EmailOneDriveList;
