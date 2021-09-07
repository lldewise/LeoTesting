import * as React from 'react';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { ResizeGroup } from 'office-ui-fabric-react/lib/ResizeGroup';

const leftRightBoxClassName = mergeStyles({
  display: 'flex',
  justifyContent: 'space-between',
  whiteSpace: 'nowrap',
});

const getNumberedBoxClassName = memoizeFunction(backgroundColor => {
  return mergeStyles({
    display: 'inline-block',
    textAlign: 'center',
    fontSize: '20px',
    lineHeight: '50px',
    height: '50px',
    width: '50px',
    marginLeft: '10px',
    marginRight: '10px',
    backgroundColor,
  });
});

const BoxWithLabel = props => (
  <div className={getNumberedBoxClassName(props.backgroundColor)}>
    {props.label}
  </div>
);

function renderBoxWithLabels(count, backgroundColor) {
  const result = [];
  for (let i = 1; i <= count; i += 1) {
    result.push(
      <BoxWithLabel
        label={`${i}`}
        backgroundColor={backgroundColor}
        key={`${backgroundColor}-${i}`}
      />,
    );
  }
  return result;
}

const LeftRightBoxSet = props => (
  <div className={leftRightBoxClassName}>
    <div>{renderBoxWithLabels(props.leftCount, 'orange')}</div>
    <div>{renderBoxWithLabels(props.rightCount, 'green')}</div>
  </div>
);

function onReduceData(props) {
  if (props.leftCount === 0 && props.rightCount === 0) {
    return undefined;
  }

  let result;
  if (props.leftCount > props.rightCount) {
    result = { ...props, leftCount: props.leftCount - 1 };
  } else {
    result = { ...props, rightCount: props.rightCount - 1 };
  }

  // Update the cache key
  return { ...result, cacheKey: `${result.leftCount + result.rightCount}` };
}

export const FlexBoxResizeGroupExample = () => {
  const data = { leftCount: 5, rightCount: 5, cacheKey: '10' };
  return (
    <div>
      FlexBoxResizeGroupExample
      <ResizeGroup
        data={data}
        // eslint-disable-next-line react/jsx-no-bind
        onRenderData={scaledData => <LeftRightBoxSet {...scaledData} />}
        onReduceData={onReduceData}
      />
    </div>
  );
};

export default FlexBoxResizeGroupExample;
