import React, { Fragment } from 'react';
import { Callout } from 'office-ui-fabric-react';
import {
  DetailsList,
  SelectionMode,
} from 'office-ui-fabric-react/lib/DetailsList';

type NewsDraftProps = {
  isCalloutVisible: any;
  toggleIsCalloutVisible: any;
  calloutdiv: any;
  menucss: any;
  itemlist: any;
  _columns: any;
};

const NewsDraft:React.FC<NewsDraftProps> = props => {
  return (
    <>
      {props.isCalloutVisible ? (
        <Callout
          onDismiss={props.toggleIsCalloutVisible}
          role="alertdialog"
          className={props.menucss}
          isBeakVisible={false}
          gapSpace={0}
          setInitialFocus>
          {props.calloutdiv}
        </Callout>
      ) : null}

      <div className="ms-Grid-row">
        <div className="ms-Grid-col  ms-lg12 DetailListHeader">
          <DetailsList
            items={props.itemlist}
            columns={props._columns}
            setKey="single"
            isHeaderVisible={true}
            selectionMode={SelectionMode.none}
          />
        </div>
      </div>
    </>
  );
};

export default NewsDraft;
