import React from 'react';
import { ReactSVG } from 'react-svg';
import { Popconfirm } from 'antd';

import './OrderItem.scss';
import editIcon from '../../media/edit.svg';
import deleteIcon from '../../media/delete.svg';

const OrderItem = ({ name, status, startDate, endDate, phone, email }) => (
  <div className="OrderItem">
    <div className="OrderItem__name">
      {name}
      <span>1 годину тому</span>
    </div>
    <div className="OrderItem__wrap-status">
      <div
        className={
          `OrderItem__status
      ${status === 'approved' ? 'approved' : ''}
      ${status === 'rejected' ? 'rejected' : ''}
      ${status === 'waiting' ? 'waiting' : ''}
      `}
      >
        {status === 'approved' ? 'затверджено' : null}
        {status === 'rejected' ? 'відхилено' : null}
        {status === 'waiting' ? 'очікує' : null}
      </div>
    </div>
    <div className="OrderItem__start-date">{startDate}</div>
    <div className="OrderItem__end-date">{endDate}</div>
    <div className="OrderItem__phone">{phone}</div>
    <div className="OrderItem__email">{email}</div>
    <div className="OrderItem__actions">
      <ReactSVG src={editIcon} />
      <Popconfirm title="Видалити?" okText="Так" cancelText="Ні">
        <ReactSVG src={deleteIcon} />
      </Popconfirm>
    </div>
  </div>
);

export default OrderItem;
