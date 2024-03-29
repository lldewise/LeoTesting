import * as React from 'react';
import { css, createArray } from 'office-ui-fabric-react/lib/Utilities';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import {
  MarqueeSelection,
  Selection,
} from 'office-ui-fabric-react/lib/MarqueeSelection';
import { getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { useBoolean, useConst, useForceUpdate } from '@uifabric/react-hooks';

const PHOTOS = createArray(250, index => {
  const randomWidth = 50 + Math.floor(Math.random() * 150);
  return {
    key: index,
    url: `http://placehold.it/${randomWidth}x100`,
    width: randomWidth,
    height: 100,
  };
});

const theme = getTheme();
const styles = mergeStyleSets({
  photoList: {
    display: 'inline-block',
    border: '1px solid ' + theme.palette.neutralTertiary,
    margin: 0,
    padding: 10,
    overflow: 'hidden',
    userSelect: 'none',
  },

  photoCell: {
    position: 'relative',
    display: 'inline-block',
    margin: 2,
    boxSizing: 'border-box',
    background: theme.palette.neutralLighter,
    lineHeight: 100,
    verticalAlign: 'middle',
    textAlign: 'center',
    selectors: {
      '&.is-selected': {
        background: theme.palette.themeLighter,
        border: '1px solid ' + theme.palette.themePrimary,
      },
    },
  },
  checkbox: {
    margin: '10px 0',
  },
});

export const MarqueeSelectionBasicExample = () => {
  const [isMarqueeEnabled, { toggle: toggleIsMarqueeEnabled }] =
    useBoolean(true);
  const forceUpdate = useForceUpdate();

  const selection = useConst(
    () =>
      new Selection({
        items: PHOTOS,
        onSelectionChanged: forceUpdate,
      }),
  );

  return (
    <div>
      MarqueeSelectionBasicExample
      <MarqueeSelection selection={selection} isEnabled={isMarqueeEnabled}>
        <Checkbox
          className={styles.checkbox}
          label="Is marquee enabled"
          defaultChecked
          onChange={toggleIsMarqueeEnabled}
        />
        <p>Drag a rectangle around the items below to select them:</p>
        <ul className={styles.photoList}>
          {PHOTOS.map((photo, index) => (
            <div
              key={index}
              className={css(
                styles.photoCell,
                selection.isIndexSelected(index) && 'is-selected',
              )}
              data-is-focusable
              data-selection-index={index}
              style={{ width: photo.width, height: photo.height }}>
              {index}
            </div>
          ))}
        </ul>
      </MarqueeSelection>
    </div>
  );
};

export default MarqueeSelectionBasicExample;
