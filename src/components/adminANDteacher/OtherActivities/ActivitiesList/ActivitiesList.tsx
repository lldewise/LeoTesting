import React, { Fragment, useEffect, useState } from 'react';
import {
  ShimmeredDetailsList,
  SelectionMode,
  Selection,
  Callout,
  DirectionalHint,
  ScrollablePane,
  ScrollbarVisibility,
  StickyPositionType,
  Sticky,
  ConstrainMode,
} from 'office-ui-fabric-react';
import classes from './ActivitiesList.module.scss';
import Pagination from '../../../userInterface/Pagination/Pagination';

type ActivitiesListProps = {
  itemlist: any;
  _columns: any;
  shimmer: any;
  isCalloutVisible: any;
  toggleIsCalloutVisible: any;
  calloutdiv: any;
  targetId: any;
};

const ActivitiesList: React.FC<ActivitiesListProps> = props => {
  const [perPage] = useState(15); //display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [calloutDiv, setCalloutDiv] = useState<JSX.Element>();
  // const _selection = new Selection({
  //   onSelectionChanged: () => _getSelectionDetails(),
  // });

  // const _getSelectionDetails = () => {
  //   //eslint-disable-next-line
  //   var item = _selection!._exemptedIndices;
  // };

  const indexOfLastPage = currentPage * perPage;
  const indexOfFirstPage = indexOfLastPage - perPage;
  const currentDataPage = props.itemlist?.slice(
    indexOfFirstPage,
    indexOfLastPage,
  );

  const paginate = (item: any) => {
    setCurrentPage(item);
  };
  useEffect(() => {
    setCalloutDiv(
      <Callout
        ariaLabelledBy={'labelId'}
        ariaDescribedBy={'descriptionId'}
        role="alertdialog"
        gapSpace={10}
        target={`#` + props.targetId}
        setInitialFocus
        directionalHint={DirectionalHint.rightCenter}
        beakWidth={15}
        onDismiss={props.toggleIsCalloutVisible}>
        <div className={classes.calloutDiv}>{props.calloutdiv}</div>
      </Callout>,
    );
  }, [props]);

  return (
    <>
      {props.isCalloutVisible ? calloutDiv : null}
      <div
        className={'ms-Grid-col ms-lg12 customScroll ' + classes.dataContainer}>
        <div className="contentDataAccount">
          <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
            <ShimmeredDetailsList
              items={currentDataPage}
              columns={props._columns}
              selectionMode={SelectionMode.none}
              isHeaderVisible={true}
              constrainMode={ConstrainMode.unconstrained}
              onRenderDetailsHeader={(headerProps, defaultRender: any) => {
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
            <div className="paginationContainer">
              <Pagination
                perPage={perPage}
                totalPages={props.itemlist?.length}
                paginate={paginate}
              />
            </div>
          </ScrollablePane>
        </div>
      </div>
    </>
  );
};

export default ActivitiesList;
