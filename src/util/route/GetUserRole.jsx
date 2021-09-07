//import React from 'react';
import { useSessionStorage } from 'react-use';

const GetUserRole = () => {
  const value = useSessionStorage()?.principal;

  function getRole() {
    if (value !== null && value.role === 'Administrator') {
      return true;
    } else {
      return false;
    }
  }

  return { getRole };
};

export default GetUserRole;
