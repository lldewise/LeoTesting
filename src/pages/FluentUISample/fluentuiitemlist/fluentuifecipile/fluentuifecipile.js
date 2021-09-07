import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Facepile } from 'office-ui-fabric-react/lib/Facepile';
import {
  PersonaSize,
  PersonaPresence,
} from 'office-ui-fabric-react/lib/Persona';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { facepilePersonas } from '@uifabric/example-data';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { useBoolean } from '@uifabric/react-hooks';

const styles = mergeStyleSets({
  container: {
    maxWidth: 300,
  },
  control: {
    paddingTop: 20,
  },
  slider: {
    margin: '10px 0',
  },
  checkbox: {
    paddingTop: 15,
  },
  dropdown: {
    paddingTop: 0,
    margin: '10px 0',
  },
});

const dropdownOptions = [
  { key: PersonaSize.size8, text: PersonaSize[PersonaSize.size8] },
  { key: PersonaSize.size24, text: PersonaSize[PersonaSize.size24] },
  { key: PersonaSize.size32, text: PersonaSize[PersonaSize.size32] },
  { key: PersonaSize.size40, text: PersonaSize[PersonaSize.size40] },
  { key: PersonaSize.size48, text: PersonaSize[PersonaSize.size48] },
];

const checkboxStyles = { root: { margin: '10px 0' } };

const getPersonaPresence = personaName => {
  const presences = [
    PersonaPresence.away,
    PersonaPresence.busy,
    PersonaPresence.online,
    PersonaPresence.offline,
    PersonaPresence.offline,
  ];
  return presences[personaName.charCodeAt(1) % 5];
};

const FluentUIFacepileBasic = () => {
  const [imagesFadeIn, { toggle: toggleImagesFadeIn }] = useBoolean(true);
  const [numberOfFaces, setNumberOfFaces] = React.useState(3);
  const [personaSize, setPersonaSize] = React.useState(PersonaSize.size32);

  const personas = React.useMemo(
    () => facepilePersonas.slice(0, numberOfFaces),
    [numberOfFaces],
  );
  const overflowPersonas = React.useMemo(
    () => facepilePersonas.slice(numberOfFaces),
    [numberOfFaces],
  );

  const getPersonaProps = React.useCallback(
    persona => ({
      imageShouldFadeIn: imagesFadeIn,
      presence: getPersonaPresence(persona.personaName),
    }),
    [imagesFadeIn],
  );

  const onChangePersonaSize = (event, value) => {
    setPersonaSize(value.key);
  };

  const onChangePersonaNumber = value => {
    setNumberOfFaces(value);
  };

  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">
          Facepile with size, presence, and fade in options
        </div>
        <div className=" divpadt10">
          <div className={styles.container}>
            <Facepile
              personaSize={personaSize}
              personas={personas}
              overflowPersonas={overflowPersonas}
              getPersonaProps={getPersonaProps}
              ariaDescription="To move through the items use left and right arrow keys."
              ariaLabel="Example list of Facepile personas"
            />
            <div className={styles.control}>
              <Slider
                label="Number of Personas:"
                className={styles.slider}
                min={1}
                max={5}
                step={1}
                showValue
                value={numberOfFaces}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={onChangePersonaNumber}
              />
              <Dropdown
                label="Persona Size:"
                selectedKey={personaSize}
                className={styles.dropdown}
                options={dropdownOptions}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={onChangePersonaSize}
              />
              <Checkbox
                className={styles.checkbox}
                styles={checkboxStyles}
                label="Fade In"
                checked={imagesFadeIn}
                onChange={toggleImagesFadeIn}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FluentUIFacepileBasic;
