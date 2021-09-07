import React from 'react';
import ShimmerBasicExample from './shimmerwithbasicelements/shimmerwithbasicelements';
import ShimmerCustomElementsExample from './shimmerwithcustomelements/shimmerwithcustomeelements';
import ShimmerLoadDataExample from './shimmerswappingwithcontentinreplaces/shimmerswappingwithcontentinreplaces';
import ShimmerApplicationExample from './shimmerdetailslistsimulatingloading/shimmerdetailslistsimulatingloading';
import ShimmerStylingExample from './shimmerstylecustomizations/shimmerstylecustomizations';

const Shimmer = () => {
  return (
    <div className="ms-Grid-row">
      <ShimmerBasicExample />
      <ShimmerCustomElementsExample />
      <ShimmerLoadDataExample />
      <ShimmerApplicationExample />
      <ShimmerStylingExample />
    </div>
  );
};

export default Shimmer;
