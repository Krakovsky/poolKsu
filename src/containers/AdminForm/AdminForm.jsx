import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from 'antd';

import './AdminForm.scss';
import { FormField } from '../../components';
import adminLogo from '../../media/logo-admin.svg';

let AdminForm = ({ handleSubmit }) => {
  const onSubmitForm = async ({ login, password }) => {

  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="AdminForm">
      <img className="AdminForm__logo" src={adminLogo} alt="admin-logo" />
      <div className="AdminForm__wrap">
        <div className="AdminForm__label">Логін</div>
        <Field placeholder="Логін..." name="login" component={FormField} />
      </div>
      <div className="AdminForm__wrap">
        <div className="AdminForm__label">Пароль</div>
        <Field placeholder="Пароль..." name="password" type="password" component={FormField} />
      </div>
      <Button className="AdminForm__btn" htmlType="submit">Увійти</Button>
    </form>
  )
};

AdminForm = reduxForm({
  form: 'AdminForm',
})(AdminForm);

export default connect(
  null,
)(AdminForm);
