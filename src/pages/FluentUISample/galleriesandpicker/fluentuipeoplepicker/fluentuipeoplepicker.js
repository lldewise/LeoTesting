import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import {
  NormalPeoplePicker,
  ValidationState,
} from 'office-ui-fabric-react/lib/Pickers';
import { people, mru } from '@uifabric/example-data';
import logger from 'loglevel';

const suggestionProps = {
  suggestionsHeaderText: 'Suggested People',
  mostRecentlyUsedHeaderText: 'Suggested Contacts',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading',
  showRemoveButtons: true,
  suggestionsAvailableAlertText: 'People Picker Suggestions available',
  suggestionsContainerAriaLabel: 'Suggested contacts',
};

const checkboxStyles = {
  root: {
    marginTop: 10,
  },
};

export const FluentUIPeoplePicker = () => {
  const [delayResults, setDelayResults] = React.useState(false);
  const [isPickerDisabled, setIsPickerDisabled] = React.useState(false);
  const [mostRecentlyUsed, setMostRecentlyUsed] = React.useState(mru);
  const [peopleList, setPeopleList] = React.useState(people);

  const picker = React.useRef(null);

  const onFilterChanged = (filterText, currentPersonas, limitResults) => {
    if (filterText) {
      let filteredPersonas = filterPersonasByText(filterText);

      filteredPersonas = removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults
        ? filteredPersonas.slice(0, limitResults)
        : filteredPersonas;
      return filterPromise(filteredPersonas);
    } else {
      return [];
    }
  };

  const filterPersonasByText = filterText => {
    return peopleList.filter(item => doesTextStartWith(item.text, filterText));
  };

  const filterPromise = personasToReturn => {
    if (delayResults) {
      return convertResultsToPromise(personasToReturn);
    } else {
      return personasToReturn;
    }
  };

  const returnMostRecentlyUsed = currentPersonas => {
    return filterPromise(removeDuplicates(mostRecentlyUsed, currentPersonas));
  };

  const onRemoveSuggestion = item => {
    const indexPeopleList = peopleList.indexOf(item);
    const indexMostRecentlyUsed = mostRecentlyUsed.indexOf(item);

    if (indexPeopleList >= 0) {
      const newPeople = peopleList
        .slice(0, indexPeopleList)
        .concat(peopleList.slice(indexPeopleList + 1));
      setPeopleList(newPeople);
    }

    if (indexMostRecentlyUsed >= 0) {
      const newSuggestedPeople = mostRecentlyUsed
        .slice(0, indexMostRecentlyUsed)
        .concat(mostRecentlyUsed.slice(indexMostRecentlyUsed + 1));
      setMostRecentlyUsed(newSuggestedPeople);
    }
  };

  const onDisabledButtonClick = () => {
    setIsPickerDisabled(!isPickerDisabled);
  };

  const onToggleDelayResultsChange = () => {
    setDelayResults(!delayResults);
  };

  return (
    <div>
      <div className="fluentDivTitle">
        <span className="titleLine" />
        <span>
          <h5>People Picker</h5>
        </span>
      </div>
      <NormalPeoplePicker
        // eslint-disable-next-line react/jsx-no-bind
        onResolveSuggestions={onFilterChanged}
        // eslint-disable-next-line react/jsx-no-bind
        onEmptyInputFocus={returnMostRecentlyUsed}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={suggestionProps}
        className={'ms-PeoplePicker'}
        key={'normal'}
        // eslint-disable-next-line react/jsx-no-bind
        onRemoveSuggestion={onRemoveSuggestion}
        onValidateInput={validateInput}
        removeButtonAriaLabel={'Remove'}
        inputProps={{
          onBlur: ev => logger.log('onBlur called'),
          onFocus: ev => logger.log('onFocus called'),
          'aria-label': 'People Picker',
        }}
        componentRef={picker}
        onInputChange={onInputChange}
        resolveDelay={300}
        disabled={isPickerDisabled}
      />
      <Checkbox
        label="Disable People Picker"
        checked={isPickerDisabled}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onDisabledButtonClick}
        styles={checkboxStyles}
      />
      <Checkbox
        label="Delay Suggestion Results"
        defaultChecked={delayResults}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onToggleDelayResultsChange}
        styles={checkboxStyles}
      />
    </div>
  );
};

function doesTextStartWith(text, filterText) {
  return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
}

function removeDuplicates(personas, possibleDupes) {
  return personas.filter(
    persona => !listContainsPersona(persona, possibleDupes),
  );
}

function listContainsPersona(persona, personas) {
  if (!personas || !personas.length || personas.length === 0) {
    return false;
  }
  return personas.filter(item => item.text === persona.text).length > 0;
}

function convertResultsToPromise(results) {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(results), 2000),
  );
}

function getTextFromItem(persona) {
  return persona.text;
}

function validateInput(input) {
  if (input.indexOf('@') !== -1) {
    return ValidationState.valid;
  } else if (input.length > 1) {
    return ValidationState.warning;
  } else {
    return ValidationState.invalid;
  }
}

/**
 * Takes in the picker input and modifies it in whichever way
 * the caller wants, i.e. parsing entries copied from Outlook (sample
 * input: "Aaron Reid <aaron>").
 *
 * @param input The text entered into the picker.
 */
function onInputChange(input) {
  const outlookRegEx = /<.*>/g;
  const emailAddress = outlookRegEx.exec(input);

  if (emailAddress && emailAddress[0]) {
    return emailAddress[0].substring(1, emailAddress[0].length - 1);
  }

  return input;
}

export default FluentUIPeoplePicker;
