import orderIcon from './media/order-icon.svg';
import swimmingIcon from './media/swimming.svg';
import calendarIcon from './media/calendar.svg';
import contactsIcon from './media/contact.svg';

export const API_URL = 'http://poolksu-env.eba-mhqkrqsp.us-east-1.elasticbeanstalk.com';

export const menu = [
  {
    title: 'ГОЛОВНА',
    path: '/'
  },
  {
    title: 'ПРО БАСЕЙН',
    path: '/about'
  },
  {
    title: 'РОЗКЛАД',
    path: '/timetable'
  },
  {
    title: 'ГАЛЕРЕЯ',
    path: '/gallery'
  },
  {
    title: 'КОНТАКТИ',
    path: '/contacts'
  }
];

export const menuOfCms = [
  {
    title: 'Замовлення',
    path: '/admin/orders',
    icon: orderIcon
  },
  {
    title: 'Розклад',
    path: '/admin/timetable',
    icon: calendarIcon
  },
  {
    title: 'Про басейн',
    path: '/admin/about',
    icon: swimmingIcon
  },
  {
    title: 'Контакти',
    path: '/admin/contacts',
    icon: contactsIcon
  }
];
