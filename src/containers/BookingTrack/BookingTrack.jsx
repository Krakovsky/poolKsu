import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

import { FormField } from '../../components';
import { getRoads as getRoadsAction } from '../../redux/modules/pool';
import validate from '../../helpers/validate';

let BookingTrack = ({ handleSubmit, track, setTrack, setBooked, initialValues }) => {
  const onSubmit = async ({ fullName, phone, date }) => {
    const data = {
      fullName,
      phone,
      track,
      date: moment(date).format('DD.MM.YYYY h:m')
    }

    setTrack(null);
    setBooked(true);
  };

  console.log(initialValues)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="Booking__form">
      <div className="Booking__form-container">
        <div className="Booking__form-wrap">
          <div className="Booking__form-label">ДАТА</div>
          <Field name="date" placeholder="Оберіть дату" fieldType="datePicker" component={FormField} />
        </div>
        <div className="Booking__form-wrap">
          <div className="Booking__form-label">ФІО</div>
          <Field name="fullName" placeholder="Ім’я та прізвище" component={FormField} />
        </div>
        <div className="Booking__form-wrap">
          <div className="Booking__form-label">ТЕЛЕФОН</div>
          <Field
            name="phone"
            className="ant-input"
            placeholder="+380 99 99-99-999"
            fieldType="phone"
            component={FormField}
          />
        </div>
        <div className="Booking__form-wrap">
          <div className="Booking__form-label">ДОРІЖКА</div>
          <div className="Booking__form-value">{track}</div>
        </div>
      </div>
      <Button className="btn" htmlType="submit">ЗАБРОНЮВАТИ</Button>
    </form>
  );
};

BookingTrack = reduxForm({
  form: 'BookingTrack',
  enableReinitialize: true,
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  keepDirtyOnReinitialize: false,
  validate: validate('BookingTrack'),
})(BookingTrack);

export default connect(
  ({ auth }) => ({
    initialValues: {
      fullName: Object.keys(auth.me).length ? `${auth.me.firstName} ${auth.me.lastName}` : undefined,
      phone: auth.me.phoneNumber
    }
  }),
  {

  }
)(BookingTrack);
