import React from 'react';

import './Orders.scss';
import { OrderItem } from '../../components';

const data = [
  {
    id: '1',
    name: 'Олександр Краковський',
    status: 'approved',
    startDate: '24.02.2020, 15:00',
    endDate: '25.02.2020, 15:00',
    phone: '0991234567',
    email: 'testmail@gmail.com',
  },
  {
    id: '2',
    name: 'Олег Савін',
    status: 'rejected',
    startDate: '24.02.2020, 15:00',
    endDate: '25.02.2020, 15:00',
    phone: '0991234567',
    email: 'testmail@gmail.com',
  },
  {
    id: '3',
    name: 'Антон Картохін',
    status: 'waiting',
    startDate: '24.02.2020, 15:00',
    endDate: '25.02.2020, 15:00',
    phone: '0991234567',
    email: 'testmail@gmail.com',
  },
  {
    id: '4',
    name: 'Манки Кинг',
    status: 'waiting',
    startDate: '24.02.2020, 15:00',
    endDate: '25.02.2020, 15:00',
    phone: '0991234567',
    email: 'testmail@gmail.com',
  },
  {
    id: '5',
    name: 'Шадов Шаман',
    status: 'approved',
    startDate: '24.02.2020, 15:00',
    endDate: '25.02.2020, 15:00',
    phone: '0991234567',
    email: 'testmail@gmail.com',
  },
  {
    id: '6',
    name: 'Андер Лорд',
    status: 'rejected',
    startDate: '24.02.2020, 15:00',
    endDate: '25.02.2020, 15:00',
    phone: '0991234567',
    email: 'testmail@gmail.com',
  },
];

const Orders = () => (
  <div className="Orders">
    <div className="Title Admin__title">Замовлення</div>
    <div className="Orders__labels">
      <div className="Admin__label Orders__name">Ім’я</div>
      <div className="Admin__label Orders__status">статус</div>
      <div className="Admin__label Orders__start">Дата початку</div>
      <div className="Admin__label Orders__end">Дата закінчення</div>
      <div className="Admin__label Orders__phone">телефон</div>
      <div className="Admin__label Orders__email">email</div>
      <div className="Admin__label Orders__actions">дії</div>
    </div>
    <div className="Orders__items">
      {data.map(item => <OrderItem key={item.id} {...item} />)}
    </div>
  </div>
);

export default Orders;
