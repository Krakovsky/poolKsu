import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import './LoginModal.scss';
import { FormField, Loader } from '../../components';
import validate from '../../helpers/validate';
import { signUp as signUpAction, signIn as signInAction } from '../../redux/modules/auth';

let LoginModal = ({ visible, setVisible, handleSubmit, signUp, signIn, loading, reset }) => {
  const [isSignUp, setSignUp] = useState(false);

  const onSubmit = async ({ email, password, firstName, lastName, phone }) => {
    if (isSignUp) {
      const isSignUpSuccess = await signUp({
        firstName,
        lastName,
        password,
        phoneNumber: phone,
        email
      });

      if (isSignUpSuccess) setSignUp(false);

      return;
    }

    const isSignInSuccess = await signIn({
      client_id: 'PoolSPA',
      username: phone,
      password,
      grant_type: 'password'
    });

    if (isSignInSuccess) {
      setVisible(false);
      reset();
    }
  }

  const setForm = () => isSignUp ? setSignUp(false) : setSignUp(true);

  return (
    <Modal
      title={`${isSignUp ? 'Реєстрація' : 'Авторизація'}`}
      visible={visible}
      className="LoginModal"
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <Loader loading={loading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isSignUp
            ? (
              <>
                <div className="LoginModal__wrap">
                  <div className="LoginModal__label">ІМ'Я</div>
                  <Field name="firstName" className="ant-input" placeholder="Ваше ім'я" component={FormField} />
                </div>
                <div className="LoginModal__wrap">
                  <div className="LoginModal__label">ПРIЗВИЩЕ</div>
                  <Field name="lastName" className="ant-input" placeholder="Ваше прiзвище" component={FormField} />
                </div>
                <div className="LoginModal__wrap">
                  <div className="LoginModal__label">E-MAIL</div>
                  <Field name="email" className="ant-input" placeholder="Ваш e-mail" component={FormField} />
                </div>
              </>
            )
            : null
          }
          <div className="LoginModal__wrap">
            <div className="LoginModal__label">ТЕЛЕФОН</div>
            <Field name="phone" className="ant-input" placeholder="+380 99 99-99-999" fieldType="phone" component={FormField} />
          </div>
          <div className="LoginModal__wrap">
            <div className="LoginModal__label">Пароль</div>
            <Field name="password" className="ant-input" placeholder="Ваш пароль" type="password" component={FormField} />
          </div>
          <div className="LoginModal__btns">
            <Button key="signup" onClick={setForm}>{isSignUp ? "Авторизація" : "Реєстрація"}</Button>
            <Button key="signin" htmlType="submit" type="primary">{isSignUp ? "Зареєструватися" : "Увійти"}</Button>
          </div>
        </form>
      </Loader>
    </Modal>
  );
};

LoginModal = reduxForm({
  form: 'LoginModal',
  validate: validate('LoginModal'),
  enableReinitialize: true,
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  keepDirtyOnReinitialize: false,
})(LoginModal);

export default connect(
  ({ auth }) => ({ loading: auth.isAuthenticating }),
  {
    signUp: signUpAction,
    signIn: signInAction,
  }
)(LoginModal);
