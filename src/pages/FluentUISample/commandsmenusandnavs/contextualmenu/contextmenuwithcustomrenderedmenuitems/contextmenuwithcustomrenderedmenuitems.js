import * as React from 'react';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { useConst } from '@uifabric/react-hooks';

export const ContextualMenuWithCustomMenuItemExample = () => {
  const menuProps = useConst(() => ({
    shouldFocusOnMount: true,
    contextualMenuItemAs: props => <div>Custom rendered {props.item.text}</div>,
    items: [
      { key: 'newItem', text: 'New' },
      { key: 'divider_1', itemType: ContextualMenuItemType.Divider },
      { key: 'rename', text: 'Rename' },
      { key: 'edit', text: 'Edit' },
      { key: 'properties', text: 'Properties' },
      { key: 'disabled', text: 'Disabled item', disabled: true },
    ],
  }));

  return (
    <div>
      ContextualMenuWithCustomMenuItemExample{' '}
      <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />{' '}
    </div>
  );
};

export default ContextualMenuWithCustomMenuItemExample;
