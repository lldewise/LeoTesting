import React, { useState } from 'react';
import { useSessionStorage } from 'react-use';

export default function StoragePOC() {
  const [value, setValue] = useSessionStorage('my-key', 'foo');
  const [localstorage, setlocalstorage] = useState('');

  const locaStorageHandler = value => {
    localStorage.setItem('myLocalStorage', value);
    setlocalstorage(localStorage.getItem('myLocalStorage'));
  };

  return (
    <div className="ms-Grid-row ">
      <div className="ms-Grid-col ms-lg12 container">
        <div>Value: {value}</div>
        <div>locastorage: {localstorage}</div>
        <button onClick={() => setValue('bar')}>bar</button>
        <button onClick={() => setValue('baz')}>baz</button>
        <button onClick={() => locaStorageHandler('mylolcal')}>mylocal</button>
        <button onClick={() => locaStorageHandler('newlocal')}>newlocal</button>
      </div>
    </div>
  );
}
