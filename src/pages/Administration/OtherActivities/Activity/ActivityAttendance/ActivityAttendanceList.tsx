import React, { Fragment, useState, useEffect } from 'react';
import {
  ShimmeredDetailsList,
  SelectionMode,
  Selection,
  Callout,
  DirectionalHint,
} from 'office-ui-fabric-react';
import classes from './ActivityAttendance.module.scss';
import { useBoolean } from '@uifabric/react-hooks';
import { useStore } from '../../../../../store/store';
import Pagination from '../../../../../components/userInterface/Pagination/Pagination';

type ActivitiesListProps = {
  itemlist: any;
  _columns: any;
  shimmer: any;
  targetId: any;
  toggleIsCalloutVisible: any;
  calloutdiv: any;
  isCalloutVisible: any;
};

const ActivitiesList: React.FC<ActivitiesListProps> = props => {
  // eslint-disable-next-line
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);
  // eslint-disable-next-line
  const [data, dispatch] = useStore();
  const [perPage] = useState(15); //display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [calloutDiv, setCalloutDiv] = useState<JSX.Element>();

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
      <div className={'customScroll ' + classes.dataContainer}>
        <div>
          <ShimmeredDetailsList
            items={currentDataPage}
            columns={props._columns}
            selectionMode={SelectionMode.none}
            isHeaderVisible={true}
            enableShimmer={props.shimmer}
          />
        </div>
      </div>
      <div className={classes.paginationContainer}>
        <Pagination
          perPage={perPage}
          totalPages={props.itemlist?.length}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default ActivitiesList;
