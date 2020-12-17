import schemas from './validationSchemas';

const validate = formName => values => {
  let errors = {};

  try {
    schemas[formName].validateSync(values, { abortEarly: false });
  } catch (err) {
    if (!err.inner || !err.inner.length) { return errors; }

    err.inner.forEach(error => {
      const { path: errorPath } = error;

      errors[errorPath] = error.message;
    });
  }

  return errors;
};

export default validate;
