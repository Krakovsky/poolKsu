import Api from '../../services/Api';
import { openNotification } from '../../helpers/openNotification';

const moduleName = 'pool';

const GET_ROADS_START = `${moduleName}/GET_ROADS_START`;
const GET_ROADS_SUCCESS = `${moduleName}/GET_ROADS_SUCCESS`;
const GET_ROADS_ERROR = `${moduleName}/GET_ROADS_ERROR`;
const SET_A = `${moduleName}/SET_A`;

const defaultState = {
  error: '',
  roads: [
    {
      number: 1,
      isBusy: true,
    },
    {
      number: 2,
      isBusy: false,
    },
    {
      number: 3,
      isBusy: false,
    },
    {
      number: 4,
      isBusy: false,
    },
    {
      number: 5,
      isBusy: false,
    },
    {
      number: 6,
      isBusy: false,
    },
  ],
  loading: false,
  isA: false,
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case GET_ROADS_START:
      return { ...state, loading: true };
    case GET_ROADS_SUCCESS:
      return {
        ...state,
        roads: payload.data,
        loading: false,
      };
    case GET_ROADS_ERROR:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };
    case SET_A:
      return {
        ...state,
        isA: true,
      };
    default:
      return state;
  }
};

export const getRoads = () => async (dispatch) => {
  dispatch({ type: GET_ROADS_START });

  try {
    const { data } = await Api.get('api/v1/pools');

    dispatch({ type: GET_ROADS_SUCCESS, payload: { data: data[0].tracks } });
  } catch (error) {
    dispatch({ type: GET_ROADS_ERROR, payload: { error: error.message || error } });
    openNotification('error', 'Сталась помилка', 'Не вдалось отримати вільні доріжки')
  }
};

export const setA = () => async (dispatch) => {
  dispatch({ type: SET_A });
};
