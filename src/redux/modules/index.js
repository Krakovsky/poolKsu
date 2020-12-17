import { reducer as formReducer } from 'redux-form';

import pool from './pool';
import auth from './auth';

export default {
  form: formReducer,
  pool,
  auth,
};
