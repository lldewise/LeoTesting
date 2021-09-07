import * as React from 'react';
import logger from 'loglevel';

import { TagPicker } from 'office-ui-fabric-react/lib/Pickers';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { useBoolean } from '@uifabric/react-hooks';

const rootClass = mergeStyles({
  maxWidth: 500,
});

const toggleStyles = { root: { margin: '10px 0' } };

const inputProps = {
  onBlur: ev => logger.log('onBlur called'),
  onFocus: ev => logger.log('onFocus called'),
  'aria-label': 'Tag picker',
};

const pickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested tags',
  noResultsFoundText: 'No color tags found',
};

const testTags = [
  'black',
  'blue',
  'brown',
  'cyan',
  'green',
  'magenta',
  'mauve',
  'orange',
  'pink',
  'purple',
  'red',
  'rose',
  'violet',
  'white',
  'yellow',
].map(item => ({ key: item, name: item }));

const listContainsTagList = (tag, tagList) => {
  if (!tagList || !tagList.length || tagList.length === 0) {
    return false;
  }
  return tagList.some(compareTag => compareTag.key === tag.key);
};

const filterSuggestedTags = (filterText, tagList) => {
  return filterText
    ? testTags.filter(
        tag =>
        tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0 &&
          !listContainsTagList(tag, tagList),
      )
    : [];
};

const filterSelectedTags = (filterText, tagList) => {
  return filterText
    ? testTags.filter(
      tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0,
    )
    : [];
};

const getTextFromItem = item => item.name;

export const FluentUIPicker = () => {
  // All pickers extend from BasePicker specifying the item type.
  const picker = React.useRef(null);
  const [tagPicker, { toggle: toggleIsTagPickerVisible }] = useBoolean(false);

  const onItemSelected = React.useCallback(item => {
    if (picker.current && listContainsTagList(item, picker.current.items)) {
      return null;
    }
    return item;
  }, []);

  return (
    <div className={rootClass}>
      <Toggle
        styles={toggleStyles}
        label="Disable tag picker"
        checked={tagPicker}
        onChange={toggleIsTagPickerVisible}
      />
      Filter items in suggestions: This picker will filter added items from the
      search suggestions.
      <TagPicker
        removeButtonAriaLabel="Remove"
        onResolveSuggestions={filterSuggestedTags}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={pickerSuggestionsProps}
        itemLimit={2}
        disabled={tagPicker}
        inputProps={inputProps}
      />
      <br />
      Filter items on selected: This picker will show already-added suggestions
      but will not add duplicate tags.
      <TagPicker
        removeButtonAriaLabel="Remove"
        componentRef={picker}
        onResolveSuggestions={filterSelectedTags}
        onItemSelected={onItemSelected}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={pickerSuggestionsProps}
        itemLimit={2}
        disabled={tagPicker}
        inputProps={inputProps}
      />
    </div>
  );
};

export default FluentUIPicker;
