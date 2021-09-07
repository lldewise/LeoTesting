import * as React from 'react';
import { Nav } from 'office-ui-fabric-react/lib/Nav';

const navStyles = {
  root: {
    width: 208,
    height: 350,
    boxSizing: 'border-box',
    border: '1px solid #eee',
    overflowY: 'auto',
  },
};

const navLinkGroups = [
  {
    links: [
      {
        name: 'Home',
        url: 'http://example.com',
        expandAriaLabel: 'Expand Home section',
        collapseAriaLabel: 'Collapse Home section',

        links: [
          {
            name: 'Activity',
            url: 'http://msn.com',
            key: 'key1',
            target: '_blank',
            icon: 'News',
          },
          {
            name: 'MSN',
            url: 'http://msn.com',
            disabled: true,
            key: 'key2',
            target: '_blank',
            icon: 'News',
          },
        ],
        isExpanded: true,
      },
      {
        name: 'Documents',
        url: 'http://example.com',
        key: 'key3',
        isExpanded: true,
        target: '_blank',
        icon: 'News',
      },
      {
        name: 'Pages',
        url: 'http://msn.com',
        key: 'key4',
        target: '_blank',
        icon: 'News',
      },
      {
        name: 'Notebook',
        url: 'http://msn.com',
        key: 'key5',
        disabled: true,
        icon: 'News',
      },
      {
        name: 'Communication and Media',
        url: 'http://msn.com',
        key: 'key6',
        target: '_blank',
        icon: 'News',
      },
      {
        name: 'News',
        url: 'http://cnn.com',
        key: 'key7',
        target: '_blank',
        icon: 'News',
      },
    ],
  },
];

export const NavBasicExample = () => {
  return (
    <div>
      NavBasicExample
      <Nav
        className="navCustom"
        onLinkClick={_onLinkClick}
        selectedKey="key1"
        ariaLabel="Nav basic example"
        styles={navStyles}
        groups={navLinkGroups}
      />
    </div>
  );
};

function _onLinkClick(ev, item) {
  if (item && item.name === 'News') {
    alert('News link clicked');
  }
}

export default NavBasicExample;
