import * as React from 'react';
import { IconButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';

const noOp = () => undefined;

const onRenderItem = item => {
  return (
    <Link
      role="menuitem"
      styles={{ root: { marginRight: 10 } }}
      onClick={item.onClick}>
      {item.name}
    </Link>
  );
};

const onRenderOverflowButton = overflowItems => {
  const buttonStyles = {
    root: {
      minWidth: 0,
      padding: '0 4px',
      alignSelf: 'stretch',
      height: 'auto',
    },
  };
  return (
    <div>
      OverflowSetBasicExample
      <IconButton
        role="menuitem"
        title="More options"
        styles={buttonStyles}
        menuIconProps={{ iconName: 'More' }}
        menuProps={{ items: overflowItems }}
      />
    </div>
  );
};

export const OverflowSetBasicExample = () => (
  <OverflowSet
    aria-label="Basic Menu Example"
    role="menubar"
    items={[
      {
        key: 'item1',
        name: 'Link 1',
        onClick: noOp,
      },
      {
        key: 'item2',
        name: 'Link 2',
        onClick: noOp,
      },
      {
        key: 'item3',
        name: 'Link 3',
        onClick: noOp,
      },
    ]}
    overflowItems={[
      {
        key: 'item4',
        name: 'Overflow Link 1',
        onClick: noOp,
      },
      {
        key: 'item5',
        name: 'Overflow Link 2',
        onClick: noOp,
      },
    ]}
    onRenderOverflowButton={onRenderOverflowButton}
    onRenderItem={onRenderItem}
  />
);

export default OverflowSetBasicExample;
