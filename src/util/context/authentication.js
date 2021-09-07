import React from 'react';
import { useSessionStorage } from 'react-use';
import ateduSSO from '../../atedusso/services';
import { Literal } from '../../util/constant';
//import i18n from "../../i18n/i18n";
//import { signOut } from '../msgraph/authHandler';
//import axios from "../../services/api";
//import { handleError } from '../commonFunction';

const defaultValues = Object.freeze({
  isAuthenticated: false,
  principal:{ id: null, accessToken: null, logging_level:null} ,
  login: () => {},
  logout: () => {},
});

export const AuthenticationContext = React.createContext(defaultValues);

export function AuthenticationProvider({ children }) {
  const [authentication, setAuthentication] = useSessionStorage(
    Literal.AUTH_STOREGE_KEY,
    defaultValues,
  );

  const login = async principal => {
    await setAuthentication({ isAuthenticated: true, principal });
  };

  const logout = async () => {
    await ateduSSO.logout();
    await setAuthentication(defaultValues);
  };

  const values = { ...authentication, login, logout };

  return (
    <AuthenticationContext.Provider value={values}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  return React.useContext(AuthenticationContext);
}
