
import React,{ useEffect, useState } from 'react'
import { Persona ,PersonaSize } from 'office-ui-fabric-react'
import { getEmailSenderPersona } from "../../../../services/msgraph/email";
import { useStore } from '../../../../store/store';

const dpPerson = {
    root: {
      fontSize: "18px !important",
    },
  };
export default function PersonaAvatar({address,name,size}) {
    const [photoUrl, setPhotoUrl] = useState();
    const [dataStore] = useStore();
    async function getProfileImage(emailAddress) {
        if (dataStore.userPreferences.emailDomain !== '' && emailAddress.includes(dataStore.userPreferences.emailDomain)) {
          getEmailSenderPersona(emailAddress)
            .then((res) => {
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
         getProfileImage(address);
    }, [address]);
    return (
    <Persona
        imageUrl={photoUrl}
        hidePersonaDetails={true}
        text={name}
        size={size}
        styles={dpPerson}
      />
    )

} 