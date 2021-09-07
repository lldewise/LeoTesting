import React from 'react';
import { Route } from 'react-router-dom';
import { useAuthentication } from '../context/authentication';
//import i18n from "../../i18n/i18n";

export default function AuthorizedRoute({
  id,
  path,
  exact,
  strict,
  isPublic,
  children,
  ...rest
}) {
  const { isAuthenticated, principal } = useAuthentication();
  const authorized =
    isPublic ||
    (isAuthenticated &&
      typeof principal !== undefined &&
      typeof principal.accessToken !== undefined);
  //const language = i18n.language;
  return (
    <Route
      {...rest}
      key={id}
      path={path}
      exact={exact}
      strict={strict}
      render={() => authorized && children}
    />
  );
}
