import React from 'react';
import NavBasicExample from './basicnavwithsamplelinks/basicnavwithsamplelinks';
//import NavFabricDemoAppExample from './navsimilartotheoneinthisdemoapp/navsimilartotheoneinthisdemoapp';
//import NavCustomGroupHeadersExample from './navwithcustomgroupheader/navwithcustomgroupheader';
//import NavNestedExample from './navwithnestedlinks/navwithnestedlinks';

const Nav = () => {
  return (
    <div className="ms-Grid-row">
      <NavBasicExample />
      {/* <NavFabricDemoAppExample/>
            <NavNestedExample/>
            <NavCustomGroupHeadersExample/> */}
    </div>
  );
};

export default Nav;
