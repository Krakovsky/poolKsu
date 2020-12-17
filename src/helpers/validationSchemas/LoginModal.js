import * as Yup from 'yup';

const LoginModal = Yup.object().shape({
  firstName: Yup
    .string()
    .trim()
    .required(`Введіть ім'я`),
  lastName: Yup
    .string()
    .trim()
    .required('Введіть прізвище'),
  password: Yup
    .string()
    .trim()
    .required('Введіть пароль'),
  email: Yup
    .string()
    .trim()
    .email()
    .required('Введіть email'),
  phone: Yup
    .string()
    .typeError('Введіть телефон')
    .test("len", "Введіть коректний номер", val => parseInt(val, 10).toString().length === 12),
});

export default LoginModal;
