import React from 'react';
import { Link, Text } from 'office-ui-fabric-react';

const FluentUILink = () => {
  return (
    <div>
      <div className="fluenttitle divpadt10">
        <div className="fluentDivTitle">
          <span className="titleLine" />
          <span>
            <h5>Link</h5>
          </span>
        </div>
      </div>
      <div className="divpadt10">
        <div>
          <Text>
            <Link
              href="https://developer.microsoft.com/en-us/fluentui#/controls/web/link"
              className="link">
              I am a Link
            </Link>
          </Text>
        </div>

        <div>
          <Text>
            <Link
              href="https://developer.microsoft.com/en-us/fluentui#/controls/web/link"
              className="linkDisabled">
              Disabled Link
            </Link>
          </Text>
        </div>
        <div>
          <Text>
            <Link
              href="https://developer.microsoft.com/en-us/fluentui#/controls/web/link"
              className="btnLinkDark">
              btnLinkDark
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default FluentUILink;
