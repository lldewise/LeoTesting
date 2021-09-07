import * as React from 'react';
import {
  Persona,
  PersonaSize,
  PersonaPresence,
} from 'office-ui-fabric-react/lib/Persona';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { TestImages } from '@uifabric/example-data';

const PersonaBasicExample = () => {
  const [renderDetails] = React.useState(true);

  const examplePersona = {
    imageUrl: TestImages.personaFemale,
    imageInitials: 'AL',
    text: 'Annie Lindqvist',
    secondaryText: 'Software Engineer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
  };

  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">Persona in various sizes</div>
        <div className=" divpadt10">
          <Stack tokens={{ childrenGap: 10 }}>
            <Label>Size 24 Persona</Label>
            <Persona
              {...examplePersona}
              size={PersonaSize.size24}
              presence={PersonaPresence.online}
              hidePersonaDetails={!renderDetails}
              imageAlt="Annie Lindqvist, status is online"
            />
            <Label>Size 32 Persona</Label>
            <Persona
              {...examplePersona}
              size={PersonaSize.size32}
              presence={PersonaPresence.online}
              hidePersonaDetails={!renderDetails}
              imageAlt="Annie Lindqvist, status is online"
            />

            <Label>Size 40 Persona</Label>
            <Persona
              {...examplePersona}
              size={PersonaSize.size40}
              presence={PersonaPresence.away}
              hidePersonaDetails={!renderDetails}
              imageAlt="Annie Lindqvist, status is away"
            />

            <Label>Size 48 Persona (default) </Label>
            <Persona
              {...examplePersona}
              hidePersonaDetails={!renderDetails}
              presence={PersonaPresence.busy}
              imageAlt="Annie Lindqvist, status is busy"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default PersonaBasicExample;
