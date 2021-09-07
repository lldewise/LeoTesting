import * as React from 'react';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import { TagPicker } from 'office-ui-fabric-react/lib/Pickers';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

const inputProps = {
  'aria-label': 'Tag Picker',
};
const pickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested tags',
  noResultsFoundText: 'No color tags found',
};
const _testTags = [
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

const stackTokens = { childrenGap: 10 };

const getTextFromItem = item => {
  return item.name;
};

const listContainsDocument = (tag, tagList) => {
  if (!tagList || !tagList.length || tagList.length === 0) {
    return false;
  }
  return tagList.filter(compareTag => compareTag.key === tag.key).length > 0;
};

const AnnouncedSearchResultsExample = () => {
  const [hasFilterText, setHasFilterText] = React.useState(false);
  const [suggestionCount, setSuggestionCount] = React.useState(0);

  const onFilterChanged = React.useCallback((filterText, tagList) => {
    setHasFilterText(!!filterText);
    const filteredTags = filterText
      ? _testTags
          .filter(
            tag =>
              tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0,
          )
          .filter(tag => !listContainsDocument(tag, tagList))
      : [];
    setSuggestionCount(filteredTags.length);
    return filteredTags;
  }, []);

  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">Announced - Search Results</div>
        <div className="divpadt10">
          <Stack tokens={stackTokens}>
            <Text>
              Turn on Narrator and type a letter or two into the TagPicker. This
              picker will filter added items from the search suggestions.
            </Text>
            {hasFilterText && (
              <Announced
                message={`${suggestionCount} color tag${
                  suggestionCount === 1 ? '' : 's'
                } found`}
              />
            )}
            <TagPicker
              onResolveSuggestions={onFilterChanged}
              getTextFromItem={getTextFromItem}
              pickerSuggestionsProps={pickerSuggestionsProps}
              inputProps={inputProps}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default AnnouncedSearchResultsExample;
