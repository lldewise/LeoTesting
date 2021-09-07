import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import logger from 'loglevel';

/* eslint-disable react/jsx-no-bind */
const FluentUISearchBox = () => {
  return (
    <div>
      <div className="fluenttitle divpadt10">
        <div className="fluentDivTitle">
          <span className="titleLine" />
          <span>
            <h5>Searchbox</h5>
          </span>
        </div>
      </div>
      <div className="divpadt10">
        <div className="divpadt10 demoSearch">
          <SearchBox
            placeholder="Search"
            onSearch={newValue => logger.log('value is ' + newValue)}
          />
        </div>
        <div className="divpadt10 demoSearch">
          <SearchBox
            placeholder="Search with no animation"
            onSearch={newValue => logger.log('value is ' + newValue)}
            disableAnimation
          />
        </div>
        <div className="divpadt10 demoSearch">
          <SearchBox
            placeholder="Disabled Search"
            onSearch={newValue => logger.log('value is ' + newValue)}
            disableAnimation
            disabled
          />
        </div>
        <div className="divpadt10 demoSearch">
          <SearchBox
            className="underlinedSearch"
            placeholder="Underlined Search"
            onSearch={newValue => logger.log('value is ' + newValue)}
          />
        </div>
      </div>
    </div>
  );
};

export default FluentUISearchBox;
