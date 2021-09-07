import React, { useState, useEffect } from 'react';

export default function EventSourcePOC() {
  const [value, setValue] = useState('');
  useEffect(() => {
    const eventSource = new EventSource(
      'http://localhost:5000/api/user/GetEvent/student%2fstudent01',
      { authorizationHeader: 'Bearer ...' },
    );
    eventSource.onmessage = e => {
      setValue(e.data);
    };
  }, []);
  return <div className="ms-Grid-row ">{value}</div>;
}
