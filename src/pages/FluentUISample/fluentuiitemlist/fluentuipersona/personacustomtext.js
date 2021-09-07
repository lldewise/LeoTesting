import * as React from 'react';
import {
  Persona,
  PersonaSize,
  PersonaPresence,
} from 'office-ui-fabric-react/lib/Persona';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { TestImages } from '@uifabric/example-data';

const personaStyles = { root: { margin: '0 0 10px 0' } };
const iconStyles = { root: { marginRight: 5 } };

const PersonaCustomRenderExample = () => {
  const examplePersona = {
    imageUrl: TestImages.personaFemale,
    imageInitials: 'AL',
    text: 'Annie Lindqvist',
    secondaryText: 'Software Engineer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
  };

  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <div>Custom icon in secondary text</div>
      <Persona
        {...examplePersona}
        size={PersonaSize.size72}
        presence={PersonaPresence.offline}
        onRenderSecondaryText={_onRenderSecondaryText}
        styles={personaStyles}
        imageAlt="Annie Lindqvist, status is offline."
      />
    </Stack>
  );
};

function _onRenderSecondaryText(props) {
  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">
          <div className="fluentDivTitle">
            <span className="titleLine" />
            <span>
              <h5>Persona Avatar</h5>
            </span>
          </div>
        </div>
        <div className=" divpadt10">
          <Icon iconName="Suitcase" styles={iconStyles} />
          {props.secondaryText}
        </div>
      </div>
    </div>
  );
}

export default PersonaCustomRenderExample;
