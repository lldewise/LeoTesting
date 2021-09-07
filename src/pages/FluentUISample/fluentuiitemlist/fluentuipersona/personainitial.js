import * as React from 'react';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

const examplePersona = {
  secondaryText: 'Designer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm',
};

// const personaWithInitials = {
//     ...examplePersona,
//     text: 'Maor Sharett',
//     imageInitials: 'MS',
// };

const PersonaInitialsExample = () => {
  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">Persona with initials</div>
        <div className=" divpadt10">
          <Stack tokens={{ childrenGap: 10 }}>
            <Persona
              {...examplePersona}
              text="Kat Larrson"
              size={PersonaSize.size24}
            />
            <Persona
              {...examplePersona}
              text="Annie"
              size={PersonaSize.size24}
            />
            <Persona
              {...examplePersona}
              text="Annie Lind"
              size={PersonaSize.size32}
            />
            <Persona
              {...examplePersona}
              text="Annie Boyl Lind"
              size={PersonaSize.size32}
            />
            <Persona
              {...examplePersona}
              text="Annie Boyl Carrie Lindqvist"
              size={PersonaSize.size40}
            />
            <Persona
              {...examplePersona}
              text="+1 (111) 123-4567 X4567"
              size={PersonaSize.size40}
            />
            <Persona
              {...examplePersona}
              text="+1 (555) 123-4567 X4567"
              size={PersonaSize.size48}
              allowPhoneInitials={true}
            />
            <Persona
              {...examplePersona}
              text="宋智洋"
              size={PersonaSize.size48}
            />
            {/* <Persona {...examplePersona} text="남궁 성종" size={PersonaSize.size56} />
                        <Persona {...examplePersona} text="خسرو رحیمی" size={PersonaSize.size56} />
                        <Persona {...personaWithInitials} initialsColor={PersonaInitialsColor.lightBlue} size={PersonaSize.size72} />
                        <Persona {...personaWithInitials} initialsColor={PersonaInitialsColor.magenta} size={PersonaSize.size100} />
                        <Persona {...personaWithInitials} initialsColor={PersonaInitialsColor.teal} coinSize={150} /> */}
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default PersonaInitialsExample;
