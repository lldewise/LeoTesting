import React from 'react';
//import ScrollablePaneDefaultExample from './defaultscrollablepane/defaultscrollablepane'
import ScrollablePaneDetailsListExample from './detailslistlockedheader/detailslistlockedheader';

const Panel = () => {
  return (
    <div className="ms-Grid-row">
      {/* <ScrollablePaneDefaultExample/> */}
      <ScrollablePaneDetailsListExample />
    </div>
  );
};

export default Panel;
