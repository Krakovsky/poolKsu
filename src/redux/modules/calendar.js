import Api from '../../services/Api';
import { openNotification } from '../../helpers/openNotification';

const moduleName = 'calendar';

const GET_ROADS_START = `${moduleName}/GET_ROADS_START`;
const GET_ROADS_SUCCESS = `${moduleName}/GET_ROADS_SUCCESS`;
const GET_ROADS_ERROR = `${moduleName}/GET_ROADS_ERROR`;

const GET_ROADS_BY_OBJECT_START = `${moduleName}/GET_ROADS_START`;
const GET_ROADS_BY_OBJECT_SUCCESS = `${moduleName}/GET_ROADS_BY_OBJECT_SUCCESS`;
const GET_ROADS_BY_OBJECT_ERROR = `${moduleName}/GET_ROADS_BY_OBJECT_ERROR`;

const BOOK_TRACK_START = `${moduleName}/BOOK_TRACK_START`;
const BOOK_TRACK_SUCCESS = `${moduleName}/BOOK_TRACK_SUCCESS`;
const BOOK_TRACK_ERROR = `${moduleName}/BOOK_TRACK_ERROR`;

const defaultState = {
  error: '',
  roads: [],
  groupedRoads: [],
  loading: false,
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
    case BOOK_TRACK_START:
      return { ...state, loading: true };
    case BOOK_TRACK_SUCCESS:
      return {
        ...state,
        groupedRoads: {
          ...state.groupedRoads,
          [payload.roadId]: state.groupedRoads[payload.roadId].map(item => item.id === payload.id ? { ...item, status: 3 } : item)
        },
        loading: false,
      };
    case BOOK_TRACK_ERROR:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };
    case GET_ROADS_BY_OBJECT_START:
      return { ...state, loading: true };
    case GET_ROADS_BY_OBJECT_SUCCESS:
      return {
        ...state,
        groupedRoads: payload.data,
        loading: false,
      };
    case GET_ROADS_BY_OBJECT_ERROR:
      return {
        ...state,
        error: payload.error,
        loading: false,
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

export const bookTrack = (id, roadId) => async (dispatch) => {
  dispatch({ type: BOOK_TRACK_START });

  try {
    await Api.put(`api/v1/calendars/${id}/book`);

    dispatch({ type: BOOK_TRACK_SUCCESS, payload: { id, roadId } });
    openNotification('success', 'Дорiжку було заброньовано');
  } catch (error) {
    dispatch({ type: BOOK_TRACK_ERROR, payload: { error: error.message || error } });
    openNotification('error', 'Сталась помилка', 'Не вдалось забронювати');
  }
};

export const getRoadsByObject = (date) => async (dispatch) => {
  dispatch({ type: GET_ROADS_BY_OBJECT_START });

  try {
    const { data } = await Api.get('api/v1/calendars/groupByObject', date);

    dispatch({ type: GET_ROADS_BY_OBJECT_SUCCESS, payload: { data } });
  } catch (error) {
    dispatch({ type: GET_ROADS_BY_OBJECT_ERROR, payload: { error: error.message || error } });
    openNotification('error', 'Сталась помилка', 'Не вдалось отримати вільні доріжки')
  }
};
