import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './AdminSidebar.scss';
import adminLogo from '../../media/logo-admin.svg';
import { menuOfCms } from '../../constants';
import { ReactSVG } from 'react-svg';

const AdminSidebar = () => (
  <aside className="AdminSidebar">
    <Link to="/" target="_blank" className="AdminSidebar__logo"><img src={adminLogo} alt="admin-pic" /></Link>
    <div className="AdminSidebar__container">
      <div className="Admin__label AdminSidebar__label">МЕНЮ</div>
      <nav>
        {menuOfCms.map((item, key) => (
          <NavLink key={key} className="AdminSidebar__item" to={item.path} activeClassName="active">
            <ReactSVG src={item.icon} />
            {item.title}
          </NavLink>
        ))}
      </nav>
    </div>
  </aside>
);

export default AdminSidebar;
