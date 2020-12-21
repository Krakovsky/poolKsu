import * as Yup from 'yup';

const Cabinet = Yup.object().shape({
  firstName: Yup
    .string()
    .trim()
    .required(`Введіть ім'я`),
  lastName: Yup
    .string()
    .trim()
    .required(`Введіть прiзвище`),
  email: Yup
    .string()
    .email('Введіть коректний e-mail')
    .required(`Введіть e-mail`),
});

export default Cabinet;
