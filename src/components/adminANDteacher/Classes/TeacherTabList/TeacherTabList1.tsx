import React, { Fragment, useEffect, useState } from 'react';
import {
  ShimmeredDetailsList,
  SelectionMode,
  Selection,
  DirectionalHint,
  ScrollablePane,
  ScrollbarVisibility,
  StickyPositionType,
  Sticky,
  ConstrainMode,
  DetailsListLayoutMode,
} from 'office-ui-fabric-react';
import classes from './TeacherTabList.module.scss';
import { FontIcon } from '@fluentui/react';

type TeacherTabListProps = {
  renderDetailsHeader: any;
  shimmer: any;
  itemlist: any;
  _columns: any;
};

const TeacherTabList: React.FC<TeacherTabListProps> = props => {
  const _selection: any = new Selection({
    onSelectionChanged: () => _getSelectionDetails(),
  });

  const _getSelectionDetails: any = (value: any) => {
    //eslint-disable-next-line
    var item = _selection._exemptedIndices;
  };

  return (
    <>
      <div className={'ms-Grid-col ms-lg12  '}>
        <div className={'contentDataDoubleColumn '}>
          <ShimmeredDetailsList
            items={props.itemlist}
            columns={props._columns}
            selectionMode={SelectionMode.none}
            isHeaderVisible={true}
            constrainMode={ConstrainMode.unconstrained}
            onRenderDetailsHeader={props.renderDetailsHeader}
            enableShimmer={props.shimmer}
            // layoutMode={DetailsListLayoutMode.fixedColumns}
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
    </>
  );
};

export default TeacherTabList;
