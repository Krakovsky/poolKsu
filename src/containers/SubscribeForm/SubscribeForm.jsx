import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Select } from 'antd';
import { connect } from 'react-redux';

import { FormField } from '../../components';
import validate from '../../helpers/validate';

const { Option } = Select;

let SubscribeForm = ({ handleSubmit, me }) => {
  const onSubmit = async ({ fullName, phone, subscription }) => {
    const data = {
      fullName,
      phone,
      subscription
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="Booking__form">
      <div className="Booking__form-container">
        <div className="Booking__form-wrap">
          <div className="Booking__form-label">IМ'Я ТА ПРIЗВИЩЕ</div>
          <div className="Booking__form-value">{`${me?.firstName} ${me?.lastName}`}</div>
        </div>
        <div className="Booking__form-wrap">
          <div className="Booking__form-label">ТЕЛЕФОН</div>
          <div className="Booking__form-value">{me?.phoneNumber}</div>
        </div>
        <div className="Booking__select">
          <div className="Booking__form-label">АБОНЕМЕНТ</div>
          <Field defaultValue="month8" name="subscription" fieldType="select" component={FormField}>
            <Option value="month8">за 1 місяць (8 відвідувань) - 600 грн. 00 к.</Option>
            <Option value="month12">за 1 місяць (12 відвідувань) - 900 грн. 00 к.</Option>
            <Option value="year101">за 1 рік (101 відвідування) - 4600 грн. 00 к.</Option>
            <Option value="year152">за 1 рік (152 відвідування) - 6 900 грн. 00 к.</Option>
            <Option value="year354">за 1 рік (354 відвідування) - 15 600 грн. 00 к.</Option>
          </Field>
        </div>
      </div>
      <Button className="btn" htmlType="submit">ЗАБРОНЮВАТИ</Button>
    </form>
  );
};

SubscribeForm = reduxForm({
  form: 'SubscribeForm',
  enableReinitialize: true,
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  keepDirtyOnReinitialize: false,
  validate: validate('SubscribeForm'),
})(SubscribeForm);

export default connect(
  ({ auth }) => ({
    me: auth.me
  }),
)(SubscribeForm);
