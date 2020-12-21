import Api from '../../services/Api';
import { openNotification } from '../../helpers/openNotification';

const moduleName = 'auth';

const SIGN_IN_START = `${moduleName}/SIGN_IN_START`;
const SIGN_IN_SUCCESS = `${moduleName}/SIGN_IN_SUCCESS`;
const SIGN_IN_ERROR = `${moduleName}/SIGN_IN_ERROR`;

const SIGN_UP_START = `${moduleName}/SIGN_UP_START`;
const SIGN_UP_SUCCESS = `${moduleName}/SIGN_UP_SUCCESS`;
const SIGN_UP_ERROR = `${moduleName}/SIGN_UP_ERROR`;

const VALIDATE_TOKEN_START = `${moduleName}/VALIDATE_TOKEN_START`;
const VALIDATE_TOKEN_SUCCESS = `${moduleName}/VALIDATE_TOKEN_SUCCESS`;
const VALIDATE_TOKEN_ERROR = `${moduleName}/VALIDATE_TOKEN_ERROR`;

const EDIT_ME_START = `${moduleName}/EDIT_ME_START`;
const EDIT_ME_SUCCESS = `${moduleName}/EDIT_ME_SUCCESS`;
const EDIT_ME_ERROR = `${moduleName}/EDIT_ME_ERROR`;

const SIGN_OUT = `${moduleName}/SIGN_OUT`;

const defaultState = {
  isAuthenticated: false,
  isAuthenticating: false,
  loading: false,
  token: '',
  error: '',
  me: {},
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case SIGN_IN_START:
      return { ...state, isAuthenticating: true };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isAuthenticating: false,
        token: `Bearer: ${payload.token}`,
        me: payload.me,
      };
    case SIGN_IN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticating: false,
        error: `Authentication error: ${payload.error}`,
      };
    case EDIT_ME_START:
      return { ...state, loading: true };
    case EDIT_ME_SUCCESS:
      return {
        ...state,
        loading: false,
        me: payload.data,
      };
    case EDIT_ME_ERROR:
      return {
        ...state,
        loading: false,
        error: `Authentication error: ${payload.error}`,
      };
    case VALIDATE_TOKEN_START:
      return { ...state, isAuthenticating: true };
    case VALIDATE_TOKEN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isAuthenticating: false,
        me: payload.me,
      };
    case VALIDATE_TOKEN_ERROR:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: false,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticating: false,
        me: {}
      };
    case SIGN_UP_START:
      return { ...state, isAuthenticating: true };
    case SIGN_UP_SUCCESS:
      return { ...state, isAuthenticating: false };
    case SIGN_UP_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticating: false,
        error: `Authentication error: ${payload.error}`,
      };
    default:
      return state;
  }
};

export const signOut = () => {
  window.localStorage.removeItem('accessToken');

  return { type: SIGN_OUT };
};

export const signIn = credentials => async (dispatch) => {
  dispatch({ type: SIGN_IN_START });

  try {
    const response = await Api.checkToken(credentials);
    const { access_token: token } = response.data;
    window.localStorage.setItem('accessToken', token);

    const me = await Api.get('api/v1/users/me');
    dispatch({ type: SIGN_IN_SUCCESS, payload: { token, me: me.data } });
    openNotification('success', 'Авторизацiя прошла успiшно!', 'Ви можете перейти до свого кабiнету');

    return true;
  } catch (error) {
    dispatch({ type: SIGN_IN_ERROR, payload: { error: error.message || error } });
    openNotification('error', 'Сталася помилка', 'Вхід не виконано!');

    return false;
  }
};

export const validateToken = () => async (dispatch) => {
  dispatch({ type: VALIDATE_TOKEN_START });

  try {
    const me = await Api.get('api/v1/users/me');

    dispatch({ type: VALIDATE_TOKEN_SUCCESS, payload: { me: me.data } });
  } catch (error) {
    dispatch({ type: VALIDATE_TOKEN_ERROR, payload: { error: error.message || error } });
  }
};

export const signUp = credentials => async (dispatch) => {
  dispatch({ type: SIGN_UP_START });

  try {
    await Api.authPost('api/v1/users/register', credentials);

    dispatch({ type: SIGN_UP_SUCCESS });
    openNotification('success', 'Реєстрація прошла успiшно!', 'Ви можете авторизуватись');

    return true;
  } catch (error) {
    dispatch({ type: SIGN_UP_ERROR, payload: { error: error.message || error } });
    openNotification('error', 'Сталася помилка', 'Регiстрацiю не виконано!')

    return false;
  }
};

export const editMe = credentials => async (dispatch) => {
  dispatch({ type: EDIT_ME_START });

  try {
    const { data } = await Api.put('api/v1/users/me', credentials);

    dispatch({ type: EDIT_ME_SUCCESS, payload: { data } });
    openNotification('success', 'Редагування було виконано!');

    return true;
  } catch (error) {
    dispatch({ type: EDIT_ME_ERROR, payload: { error: error.message || error } });
    openNotification('error', 'Сталася помилка', 'Редагування не виконано!');

    return false;
  }
};
