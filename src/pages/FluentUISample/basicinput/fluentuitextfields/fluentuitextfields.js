import * as React from 'react';
import {
  TextField,
  MaskedTextField,
} from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

const iconProps = { iconName: 'Calendar' };

const columnProps = {
  tokens: { childrenGap: 15 },
};

export const FluentUITextFields = () => {
  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">Text Fields</div>
        <div className="divpadt10">
          <Stack {...columnProps}>
            <TextField label="Standard" />
            <TextField label="Disabled" disabled defaultValue="I am disabled" />
            <TextField
              label="Read-only"
              className="readonly-textfield"
              readOnly
              defaultValue="I am read-only"
            />
            <TextField label="Required " required />
            <TextField ariaLabel="Required without visible label" required />
            <TextField
              label="With error message"
              errorMessage="Error message"
            />
            <TextField label="Optional " className="optional-textfield" />
          </Stack>
          <Stack {...columnProps}>
            <MaskedTextField
              label="With input mask"
              mask="m\ask: (999) 999 - 9999"
            />
            <TextField label="With an icon" iconProps={iconProps} />
            <TextField
              label="With placeholder"
              placeholder="Please enter text here"
            />
            <TextField
              label="Disabled with placeholder"
              disabled
              placeholder="I am disabled"
            />
            <TextField
              label="Password with Reveal Button"
              type="password"
              canRevealPassword={true}
            />
          </Stack>

          <Stack {...columnProps}>
            <div className="">
              <TextField
                label="Underlined Textfield:"
                className="underlined-textfield"
              />
            </div>
            <div className="">
              <TextField
                label="Underlined with placeholder:"
                placeholder="Input here"
                className="underlined-label-textfield"
              />
            </div>
          </Stack>

          <Stack {...columnProps}>
            <TextField
              label="Borderless single-line"
              className="borderless-textfield"
              placeholder="No borders here, folks"
            />
            <TextField
              label="Borderless multi-line"
              multiline
              rows={2}
              className="borderless-textfield"
              placeholder="No borders here, folks"
            />
          </Stack>
          <Stack>
            <div className="horizontal-textfield">
              <Label style={{ width: '200px' }} htmlFor="sample">
                Horizontal Textfield 1
              </Label>
              <TextField id="sample" placeholder="Give the label a width" />
            </div>
            <div className="horizontal-textfield">
              <Label style={{ width: '200px' }} htmlFor="sample1">
                Horizontal Textfield 2
              </Label>
              <TextField id="sample1" placeholder="Give the label a width" />
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default FluentUITextFields;
