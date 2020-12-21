import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import calendar from './calendar';
import reservations from './reservations';

export default {
  form: formReducer,
  auth,
  calendar,
  reservations,
};
