import * as React from 'react';
import {
  ColorPicker,
  ChoiceGroup,
  Toggle,
  getColorFromString,
  updateA,
} from 'office-ui-fabric-react/lib/index';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const white = getColorFromString('#ffffff');

const FluentUIColorPicker = () => {
  const [color, setColor] = React.useState(white);
  const [showPreview, setShowPreview] = React.useState(true);
  const [alphaType, setAlphaType] = React.useState('alpha');

  const updateColor = React.useCallback(
    (ev, colorObj) => setColor(colorObj),
    [],
  );
  const onShowPreviewClick = React.useCallback(
    (ev, checked) => setShowPreview(!!checked),
    [],
  );
  const onAlphaTypeChange = React.useCallback(
    (ev, option = alphaOptions[0]) => {
      if (option.key === 'none') {
        // If hiding the alpha slider, remove transparency from the color
        setColor(updateA(color, 100));
      }
      setAlphaType(option.key);
    },
    [color],
  );

  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">Color Picker</div>
        <div className="divpadt10">
          <div className={classNames.wrapper}>
            <ColorPicker
              color={color}
              onChange={updateColor}
              alphaType={alphaType}
              showPreview={showPreview}
              styles={colorPickerStyles}
              // The ColorPicker provides default English strings for visible text.
              // If your app is localized, you MUST provide the `strings` prop with localized strings.
              strings={{
                // By default, the sliders will use the text field labels as their aria labels.
                // If you'd like to provide more detailed instructions, you can use these props.
                alphaAriaLabel:
                  'Alpha slider: Use left and right arrow keys to change value, hold shift for a larger jump',
                transparencyAriaLabel:
                  'Transparency slider: Use left and right arrow keys to change value, hold shift for a larger jump',
                hueAriaLabel:
                  'Hue slider: Use left and right arrow keys to change value, hold shift for a larger jump',
              }}
            />

            <div className={classNames.column2}>
              <Toggle
                label="Show preview box"
                onChange={onShowPreviewClick}
                checked={showPreview}
              />
              <ChoiceGroup
                label="Alpha slider type"
                options={alphaOptions}
                defaultSelectedKey={alphaOptions[0].key}
                onChange={onAlphaTypeChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const alphaOptions = [
  { key: 'alpha', text: 'Alpha' },
  { key: 'transparency', text: 'Transparency' },
  { key: 'none', text: 'None' },
];

const classNames = mergeStyleSets({
  wrapper: { display: 'flex' },
  column2: { marginLeft: 10 },
});

const colorPickerStyles = {
  panel: { padding: 12 },
  root: {
    maxWidth: 352,
    minWidth: 352,
  },
  colorRectangle: { height: 268 },
};

export default FluentUIColorPicker;
