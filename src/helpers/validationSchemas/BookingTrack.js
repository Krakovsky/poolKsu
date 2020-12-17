import * as Yup from 'yup';

const BookingTrack = Yup.object().shape({
  date: Yup
    .string()
    .trim()
    .required('Оберіть дату'),
  fullName: Yup
    .string()
    .trim()
    .required(`Введіть ім'я`),
  phone: Yup
    .string()
    .typeError('Введіть телефон')
    .test("len", "Введіть коректний номер", val => parseInt(val, 10).toString().length === 12),
});

export default BookingTrack;
