import * as React from 'react';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { TestImages } from '@uifabric/example-data';

const UnknownPersonaExample = () => {
  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">
          Rendering unknown persona coin
        </div>
        <div className=" divpadt10">
          <Stack tokens={{ childrenGap: 10 }}>
            <Persona
              showUnknownPersonaCoin={true}
              text="Maor Sharett"
              secondaryText="Designer"
              size={PersonaSize.size40}
              imageAlt="Maor Sharett, status unknown"
            />

            <Persona
              showUnknownPersonaCoin={true}
              text="Kat Larrson"
              secondaryText="Designer"
              tertiaryText="Unverified sender"
              size={PersonaSize.size72}
              imageUrl={TestImages.personaFemale}
              imageAlt="Kat Larrson, status unknown"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default UnknownPersonaExample;
