import React from 'react';
import { ReactSVG } from 'react-svg';
import { Input } from 'antd';

import './AdminHeader.scss';
import searchIcon from '../../media/search.svg';
import PhotoPlaceholder from '../PhotoPlaceholder/PhotoPlaceholder';

const AdminHeader = () => (
  <div className="AdminHeader">
    <div className="AdminHeader__search">
      <ReactSVG src={searchIcon} />
      <Input placeholder="Пошук по ПІБ..." />
    </div>
    <div className="AdminHeader__user">
      <span>Alex Krakovsky</span>
      <PhotoPlaceholder name={'Alex'} />
    </div>
  </div>
);

export default AdminHeader;
