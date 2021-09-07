import { Text } from 'office-ui-fabric-react/lib/Text';
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  DetailsRow,
} from 'office-ui-fabric-react/lib/DetailsList';
import * as React from 'react';

const testText = 'The quick brown fox jumped over the lazy dog.';

const variants = [
  { name: 'tiny' },
  { name: 'xSmall' },
  { name: 'small' },
  { name: 'smallPlus' },
  { name: 'medium' },
  { name: 'mediumPlus' },
  { name: 'large' },
  { name: 'xLarge' },
  { name: 'xxLarge' },
  { name: 'mega' },
];

const renderDetailsRowStyles = { root: { color: 'inherit' } };
const renderDetailsRow = props => (
  <DetailsRow {...props} styles={renderDetailsRowStyles} />
);

const allItems = [];

variants.forEach((setting, index) =>
  allItems.push({
    key: setting.name + index,
    variant: setting.name,
    example: (
      <Text
        key={setting.name + 'text' + index}
        variant={setting.name}
        nowrap
        block>
        {testText}
      </Text>
    ),
  }),
);

const columns = [
  {
    key: 'column1',
    name: 'Variant',
    fieldName: 'variant',
    minWidth: 100,
    maxWidth: 150,
    isResizable: true,
  },
  {
    key: 'column2',
    name: 'Example',
    fieldName: 'example',
    minWidth: 200,
    maxWidth: 1600,
    isResizable: true,
  },
];

export const TextRampExample = () => (
  <div>
    TextRampExample
    <DetailsList
      items={allItems}
      columns={columns}
      setKey="set"
      selectionMode={SelectionMode.none}
      layoutMode={DetailsListLayoutMode.fixedColumns}
      onRenderRow={renderDetailsRow}
    />
  </div>
);

export default TextRampExample;
