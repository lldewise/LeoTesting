import * as React from 'react';
import {
  Shimmer,
  ShimmerElementsGroup,
  ShimmerElementType,
} from 'office-ui-fabric-react/lib/Shimmer';
import {
  Persona,
  PersonaSize,
  PersonaPresence,
} from 'office-ui-fabric-react/lib/Persona';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { useBoolean } from '@uifabric/react-hooks';

const wrapperClass = mergeStyles({
  padding: 2,
  selectors: {
    '& > .ms-Shimmer-container': {
      margin: '10px 0',
    },
  },
});
const wrapperStyles = { display: 'flex' };

const getCustomElements = () => {
  return (
    <div style={wrapperStyles}>
      <ShimmerElementsGroup
        shimmerElements={[
          { type: ShimmerElementType.circle, height: 40 },
          { type: ShimmerElementType.gap, width: 16, height: 40 },
        ]}
      />
      <ShimmerElementsGroup
        flexWrap
        width="100%"
        shimmerElements={[
          {
            type: ShimmerElementType.line,
            width: '100%',
            height: 10,
            verticalAlign: 'bottom',
          },
          { type: ShimmerElementType.line, width: '90%', height: 8 },
          { type: ShimmerElementType.gap, width: '10%', height: 20 },
        ]}
      />
    </div>
  );
};

const ShimmerLoadDataExample = () => {
  const [examplePersona, setExamplePersona] = React.useState({});
  const [contentOne, setContentOne] = React.useState('');
  const [isDataLoadedOne, { toggle: toggleIsDataLoadedOne }] =
    useBoolean(false);
  const [isDataLoadedTwo, { toggle: toggleIsDataLoadedTwo }] =
    useBoolean(false);

  const getContentOne = (ev, checked) => {
    toggleIsDataLoadedOne();
    setContentOne(
      !isDataLoadedOne
        ? 'Congratulations!!! You have successfully loaded the content. '
        : '',
    );
  };

  const getContentTwo = (ev, checked) => {
    toggleIsDataLoadedTwo();
    setExamplePersona(
      !isDataLoadedTwo
        ? {
            imageUrl:
              'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png',
            imageInitials: 'AL',
            primaryText: 'Annie Lindqvist',
            secondaryText: 'Software Engineer',
          }
        : {},
    );
  };

  return (
    <>
      <div className="fluenttitle divpadt10">
        Shimmer swapping with the content it replaces
      </div>
      <div className={wrapperClass}>
        <Toggle
          checked={isDataLoadedOne}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={getContentOne}
          onText="Toggle to show shimmer"
          offText="Toggle to load content"
        />
        <Shimmer isDataLoaded={isDataLoadedOne} ariaLabel="Loading content">
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              lineHeight: '1',
              minHeight: '16px',
            }}>
            {contentOne}
            {contentOne}
            {contentOne}
          </div>
        </Shimmer>
        <Toggle
          checked={isDataLoadedTwo}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={getContentTwo}
          onText="Toggle to show shimmer"
          offText="Toggle to load content"
        />
        <Shimmer
          customElementsGroup={getCustomElements()}
          width="300"
          isDataLoaded={isDataLoadedTwo}>
          <Persona
            {...examplePersona}
            size={PersonaSize.size40}
            presence={PersonaPresence.away}
          />
        </Shimmer>
      </div>
    </>
  );
};

export default ShimmerLoadDataExample;
