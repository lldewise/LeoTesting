import React,{ useEffect, useState } from 'react'
import { Persona ,PersonaSize } from 'office-ui-fabric-react'
import { getEmailSenderPersona } from "../../../../services/msgraph/email";
import { useStore } from '../../../../store/store';

const dpPerson = {
    root: {
      fontSize: "18px !important",
    },
  };

  type PersonaAvatarProps = {
    address: any;
    name: any;
    size: any;
  };

const PersonaAvatar: React.FC<PersonaAvatarProps> = props => {
    const [photoUrl, setPhotoUrl] = useState();
    const [dataStore] = useStore();
    async function getProfileImage(emailAddress: any) {
        if (dataStore.userPreferences.emailDomain !== '' && emailAddress.includes(dataStore.userPreferences.emailDomain)) {
          getEmailSenderPersona(emailAddress)
            .then((res:any) => {
              setPhotoUrl(res);
            })
            .catch((err) => {
              return "";
            });
        } else {
          return null;
        }
      }
    useEffect(() => {
         getProfileImage(props.address);
    }, [props.address]);
    return (
    <Persona
        imageUrl={photoUrl}
        hidePersonaDetails={true}
        text={props.name}
        size={props.size}
        styles={dpPerson}
      />
    )
} 

export default PersonaAvatar