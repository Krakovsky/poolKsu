import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Avatar, Button, Table, Tag, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { Field, reduxForm } from 'redux-form';

import './Cabinet.scss';
import { signOut as signOutAction, editMe as editMeAction } from '../../redux/modules/auth';
import { getMyReservations as getMyReservationsAction, unBookTrack as unBookTrackAction } from '../../redux/modules/reservations';
import history from '../../utils/history';
import { FormField, Loader } from '../../components';
import validate from '../../helpers/validate';

let Cabinet = ({
  signOut,
  email,
  phone,
  name,
  isAuthenticated,
  getMyReservations,
  myReservations,
  unBookTrack,
  loading,
  handleSubmit,
  authLoading,
  editMe
}) => {
  const [visible, setVisible] = useState(false);

  const signOutWithRedirect = useCallback(() => {
    signOut();

    return history.push('/');
  }, []);

  useEffect(() => {
    getMyReservations();
  }, []);

  const unBook = (id) => unBookTrack(id);

  const renderColumns = useMemo(() => ([
    {
      title: 'ДАТА',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'ЧАС',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'ДОРIЖКА',
      dataIndex: 'track',
      key: 'track',
      render: track => <strong>{track}</strong>
    },
    {
      title: 'СТАТУС',
      key: 'tags',
      dataIndex: 'tags',
      render: (tag, item) => <Tag color={item.status === 4 ? 'volcano' : '#74b145'} key={tag}>{tag}</Tag>
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {record.status === 4 ? '' : <Button onClick={() => unBook(record.calendarRecordId)} type="danger">Вiдмiнити</Button>}
        </div>
      ),
    },
  ]), []);

  if (!isAuthenticated) return <Redirect to='/' />;

  const renderReservations = () => {
    const data = myReservations.map(item => ({
      key: item.id,
      status: item.status,
      track: item.poolTrackNumber,
      calendarRecordId: item.calendarRecordId,
      date: moment(item.dateStart).format('DD.MM.YYYY'),
      time: `${item.dateStartDummyString} - ${item.dateEndDummyString}`,
      tags: item.status === 3 ? 'ЗАБРОНЬОВАНО' : 'ВIДМIНЕНО',
    }));

    return data;
  }

  const onSubmit = async ({ firstName, email, lastName }) => {
    const data = {
      firstName,
      email,
      lastName
    };

    const isSuccess = await editMe(data);

    if (isSuccess) return setVisible(false);
  }

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
              <div><Button onClick={() => setVisible(true)} className="Cabinet__link" type="link">Редагувати профіль</Button></div>
            </div>
          </div>
          <div className="Cabinet__wrap">
            <Table loading={loading} columns={renderColumns} dataSource={renderReservations()} />
          </div>
          <Button onClick={signOutWithRedirect} className="Cabinet__logout" type="danger">Вийти</Button>
        </div>
      </div>
      <Modal
        maskStyle={{ transition: 'none' }}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        title={null}
        width={623}
        getContainer=".Cabinet"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="Booking__form">
          <Loader loading={authLoading}>
            <div className="Booking__form-container" style={{ paddingTop: '25px' }}>
              <div className="Booking__form-wrap">
                <div className="Booking__form-label">IМ’Я</div>
                <Field name="firstName" placeholder="Ваше iм’я" component={FormField} />
              </div>
              <div className="Booking__form-wrap">
                <div className="Booking__form-label">ПРIЗВИЩЕ</div>
                <Field name="lastName" placeholder="Ваше прізвище" component={FormField} />
              </div>
              <div className="Booking__form-wrap">
                <div className="Booking__form-label">E-MAIL</div>
                <Field name="email" placeholder="Ваш email" component={FormField} />
              </div>
            </div>
            <Button className="btn" htmlType="submit">ЗМIНИТИ</Button>
          </Loader>
        </form>
      </Modal>
    </div>
  );
};

Cabinet = reduxForm({
  form: 'Cabinet',
  enableReinitialize: true,
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  keepDirtyOnReinitialize: false,
  validate: validate('Cabinet'),
})(Cabinet);


export default connect(
  ({ auth, reservations }) => ({
    email: auth.me.email,
    phone: auth.me.phoneNumber,
    name: `${auth.me.firstName} ${auth.me.lastName}`,
    isAuthenticated: auth.isAuthenticated,
    myReservations: reservations.myReservations,
    loading: reservations.loading,
    authLoading: auth.loading,
    initialValues: {
      firstName: auth.me.firstName,
      lastName: auth.me.lastName,
      email: auth.me.email
    }
  }),
  {
    signOut: signOutAction,
    getMyReservations: getMyReservationsAction,
    unBookTrack: unBookTrackAction,
    editMe: editMeAction,
  }
)(Cabinet);
