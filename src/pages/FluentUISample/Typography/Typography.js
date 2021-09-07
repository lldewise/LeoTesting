import * as React from 'react';
import { Stack } from '@fluentui/react';
import './Typography.scss';

export const Typography = () => (
  <Stack>
    <div className="fluentDivTitle">
      <span className="titleLine" />
      <span>
        <h5>Typography</h5>
      </span>
    </div>
    <h1>$h1 - 68px</h1>
    <h2>$h2 - 42px </h2>
    <h3>$h1 - 32px</h3>
    <h4>$h4 - 28px</h4>
    <h5>$h5 - 20px</h5>
    <h6>$h6 - 18px</h6>
    <p className="text-normal">$text-normal - default for text body</p>
    <p className="text-small">$text-small - captions</p>
    <p className="text-xsmall">$text-xsmall - secondary caption</p>
    <p className="text-medium">$text-medium - for labels that need emphasis</p>
  </Stack>
);
export default Typography;
