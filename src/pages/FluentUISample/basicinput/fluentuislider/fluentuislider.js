import * as React from 'react';
import { Slider } from 'office-ui-fabric-react/lib/Slider';

//const sliderAriaValueText = (value) => `${value} percent`;
//const sliderValueFormat = (value) => `${value}%`;

const FluentUISlider = () => {
  //const [sliderValue, setSliderValue] = React.useState(0);
  //const sliderOnChange = (value) => setSliderValue(value);
  return (
    <div className="ms-Grid-col ms-lg4">
      <div className="fluenttitle divpadt10">
        <div className="fluentDivTitle">
          <span className="titleLine" />
          <span>
            <h5>Slider</h5>
          </span>
        </div>
      </div>
      <div className="divpadt10">
        <Slider />
      </div>
    </div>
  );
};

export default FluentUISlider;
