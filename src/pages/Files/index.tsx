import React, { Fragment, useState, useRef, useEffect } from 'react';
import { ActionButton, FontIcon, Nav } from 'office-ui-fabric-react';
import styles from './Files.module.scss';

const navStyles = {
  root: {
    width: 208,
    height: 350,
    boxSizing: 'border-box',
    border: '1px solid #eee',
    overflowY: 'auto',
  },
};

const FilesNav = [
  {
    links: [
      {
        name: 'My Files',
        key: '1',
        icon: 'Inbox',
        disabled: false,
      },
      {
        name: 'Class Files',
        key: '2',
        icon: 'Dictionary',
        disabled: false,
      },
      {
        name: 'Student Files',
        key: '3',
        icon: 'ContactCard',
        disabled: false,
      },
    ],
  },
];

const Files: React.FC = () => {
  const [navLink, setNavLink] = useState<any[]>(FilesNav);
  const [selectedMenu, setSelectedMenu] = useState<string>('1');
  const selectedMenuRef = useRef<any | undefined>();
  const [container, setContainer] = useState<JSX.Element>();

  const _onLinkClick = (ev: any, item: any) => {
    selectedMenuRef.current = item.key.toString();
    setSelectedMenu(item.key.toString());
    selectedNavigation(item.key);
  };

  const selectedNavigation = (key: any) => {
    switch (Number(key)) {
      case 1:
        return setContainer(<div>Test My Files</div>);
      case 2:
        return setContainer(<div>Test Class Files</div>);
      case 3:
        return setContainer(<div>Test Student Files</div>);
      default:
    }
  };

  useEffect(() => {
    selectedNavigation('1');
  }, []);

  return (
    <Fragment>
      <div className="ms-Grid-row ">
        <div className="ms-Grid-col ms-lg12 container ">
          <div className={'ms-Grid-col ' + styles.headerContainer}>
            <div className="ms-Grid-row ">
              <div className="ms-Grid-col ms-lg12 ">
                <div className={'ms-Grid-row '}>
                  <div className={'ms-Grid-col ms-lg12 ' + styles.header}>
                    <div className={'ms-Grid-col ms-lg1 ' + styles.iconWidth}>
                      <FontIcon iconName="FabricFolder" />
                    </div>
                    <div className={'ms-Grid-col ms-lg1 ' + styles.headerTitle}>
                      Files
                    </div>
                    <div className={'AttendanceHeader ' + styles.printIcon}>
                      <ActionButton
                        iconProps={{ iconName: 'Print' }}
                        className={styles.actionButton}>
                        Print
                      </ActionButton>
                    </div>
                  </div>
                </div>
                <div className="ms-Grid-row ">
                  <div className="ms-Grid-col ms-lg12 ">
                    <div className={styles.container}>
                      <div className={styles.sideNav}>
                        <div className={'navProfileContainer '}>
                          <Nav
                            onLinkClick={_onLinkClick}
                            selectedKey={selectedMenu}
                            ariaLabel="Nav basic example"
                            styles={navStyles}
                            groups={navLink}
                          />
                        </div>
                      </div>
                      <div className={styles.content}>{container}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Files;
