import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import { AdminForm } from '../../containers';
import { AdminSidebar, AdminHeader } from '../../components';
import './Admin.scss';
import Orders from '../Orders/Orders';
import AdminTimetable from '../AdminTimetable/AdminTimetable';
import AdminAbout from '../AdminAbout/AdminAbout';
import AdminContacts from '../AdminContacts/AdminContacts';

const Admin = ({ isA }) => (
  <div className="Admin">
    {isA
      ? (
        <>
          <AdminSidebar />
          <AdminHeader />
          <div className="Admin__container">
            <Orders />
          </div>
        </>
      )
      : <AdminForm />
    }
  </div>
);

export default connect(
  ({ pool }) => ({ isA: pool.isA })
)(Admin);
