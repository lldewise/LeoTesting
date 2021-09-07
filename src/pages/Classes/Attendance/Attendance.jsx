import React, { Fragment, useEffect, useState } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom';

import { useLocation, matchPath } from 'react-router-dom';
function Attendance(props) {
  const { pathname } = useLocation();
  const { classId, lessonId } = useParams();
  return (
    <>
      <div className="ms-Grid-row">
        <div className={'ms-Grid-col ms-lg12 '}>
          <div className="ms-Grid-col ms-lg8">
            Testwerwerewr -swrwer {classId}
            {lessonId}
          </div>
        </div>
      </div>
    </>
  );
}

export default Attendance;
