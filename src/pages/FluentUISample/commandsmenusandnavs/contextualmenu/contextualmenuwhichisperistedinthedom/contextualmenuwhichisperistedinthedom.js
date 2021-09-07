import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { useConst } from '@uifabric/react-hooks';
import logger from 'loglevel';

export const ContextualMenuPersistedExample = () => {
  const menuProps = useConst(() => ({
    shouldFocusOnMount: true,
    shouldFocusOnContainer: true,
    items: [
      {
        key: 'rename',
        text: 'Rename',
        onClick: () => logger.log('Rename clicked'),
      },
      { key: 'edit', text: 'Edit', onClick: () => logger.log('Edit clicked') },
      {
        key: 'properties',
        text: 'Properties',
        onClick: () => logger.log('Properties clicked'),
      },
      {
        key: 'linkNoTarget',
        text: 'Link same window',
        href: 'http://bing.com',
      },
      {
        key: 'linkWithTarget',
        text: 'Link new window',
        href: 'http://bing.com',
        target: '_blank',
      },
      { key: 'disabled', text: 'Disabled item', disabled: true },
    ],
  }));

  return (
    <div>
      ContextualMenuPersistedExample{' '}
      <DefaultButton
        text="Click for ContextualMenu"
        persistMenu
        menuProps={menuProps}
      />
    </div>
  );
};

export default ContextualMenuPersistedExample;
