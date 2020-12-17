import * as Yup from 'yup';

const SubscribeForm = Yup.object().shape({
  fullName: Yup
    .string()
    .trim()
    .required(`Введіть ім'я`),
  phone: Yup
    .string()
    .typeError('Введіть телефон')
    .test("len", "Введіть коректний номер", val => parseInt(val, 10).toString().length === 12),
  subscription: Yup
    .string()
    .required(`Оберіть абонемент`),
});

export default SubscribeForm;
