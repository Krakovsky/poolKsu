import Api from '../../services/Api';
import { openNotification } from '../../helpers/openNotification';
import sortBy from 'lodash/sortBy';

const moduleName = 'reservation';

const GET_MY_RESERVATIONS_START = `${moduleName}/GET_MY_RESERVATIONS_START`;
const GET_MY_RESERVATIONS_SUCCESS = `${moduleName}/GET_MY_RESERVATIONS_SUCCESS`;
const GET_MY_RESERVATIONS_ERROR = `${moduleName}/GET_MY_RESERVATIONS_ERROR`;

const UNBOOK_TRACK_START = `${moduleName}/UNBOOK_TRACK_START`;
const UNBOOK_TRACK_SUCCESS = `${moduleName}/UNBOOK_TRACK_SUCCESS`;
const UNBOOK_TRACK_ERROR = `${moduleName}/UNBOOK_TRACK_ERROR`;

const defaultState = {
  myReservations: [],
  error: '',
  loading: false,
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case GET_MY_RESERVATIONS_START:
      return { ...state, loading: true };
    case GET_MY_RESERVATIONS_SUCCESS:
      return {
        ...state,
        myReservations: payload.data,
        loading: false,
      };
    case GET_MY_RESERVATIONS_ERROR:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };
    case UNBOOK_TRACK_START:
      return { ...state, loading: true };
    case UNBOOK_TRACK_SUCCESS:
      return {
        ...state,
        myReservations: state.myReservations.map(item => payload.id === item.calendarRecordId ? { ...item, status: 4 } : item),
        loading: false,
      };
    case UNBOOK_TRACK_ERROR:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };
    default:
      return state;
  }
};

export const getMyReservations = () => async (dispatch) => {
  dispatch({ type: GET_MY_RESERVATIONS_START });

  try {
    const { data } = await Api.get('api/v1/reservations/byUser/me');

    dispatch({ type: GET_MY_RESERVATIONS_SUCCESS, payload: { data: sortBy(data, 'dateStart') } });
  } catch (error) {
    dispatch({ type: GET_MY_RESERVATIONS_ERROR, payload: { error: error.message || error } });
    openNotification('error', 'Сталась помилка', 'Не вдалось отримати ваши заброньованi дорiжки')
  }
};

export const unBookTrack = (id) => async (dispatch) => {
  dispatch({ type: UNBOOK_TRACK_START });

  try {
    await Api.put(`api/v1/calendars/${id}/cancel`);

    dispatch({ type: UNBOOK_TRACK_SUCCESS, payload: { id } });
  } catch (error) {
    dispatch({ type: UNBOOK_TRACK_ERROR, payload: { error: error.message || error } });
    openNotification('error', 'Сталась помилка', 'Не вдалось вiдмiнити бронювання')
  }
};