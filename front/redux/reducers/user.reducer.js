import { event } from '../actions/user.action';

const initialState = {};

export default (state = initialState, { type, item }) => {
  switch (type) {
    case event.USER_LOGIN_ACTION:
      return { ...state, user: item.user };
    case event.USER_LOGOUT_ACTION:
      return initialState;

    default:
      return state;
  }
};
