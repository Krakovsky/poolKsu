import React, { useCallback } from 'react';
import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ReactSVG } from 'react-svg';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './Cabinet.scss';
import uah from '../../media/uah.svg';
import { signOut as signOutAction } from '../../redux/modules/auth';
import history from '../../utils/history';

const Cabinet = ({ signOut, email, phone, name, isAuthenticated }) => {
  const signOutWithRedirect = useCallback(() => {
    signOut();

    return history.push('/');
  }, []);

  if (!isAuthenticated) return <Redirect to='/' />;

  return (
    <div className="Cabinet Page">
      <div className="Title">Кабінет</div>
      <div className="Container">
        <div className="Cabinet__user">
          <div className="Cabinet__container">
            <Avatar size={120} style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
            <div className="Cabinet__info">
              <div className="Cabinet__title">{name}</div>
              <div className="Cabinet__subscribe">{phone} • 12 занять на місяць</div>
              <div className="Cabinet__subscribe">{email}</div>
              <div><Button className="Cabinet__link" type="link">Змінити абонемент</Button></div>
              <div><Button className="Cabinet__link" type="link">Редагувати профіль</Button></div>
            </div>
          </div>
          <div className="Cabinet__wrap">
            <div className="Cabinet__title">Баланс:</div>
            <div className="Cabinet__count"><ReactSVG src={uah} /> 280 грн.</div>
            <Button className="Cabinet__link" type="link">Поповнити рахунок</Button>
          </div>
          <Button onClick={signOutWithRedirect} className="Cabinet__logout" type="primary">Вийти</Button>
        </div>
      </div>
    </div>
  );
};

export default connect(
  ({ auth }) => ({
    email: auth.me.email,
    phone: auth.me.phoneNumber,
    name: `${auth.me.firstName} ${auth.me.lastName}`,
    isAuthenticated: auth.isAuthenticated
  }),
  { signOut: signOutAction }
)(Cabinet);
