import { event } from '../actions/user.action';

const initialState = {};

export default (state = initialState, { type, item }) => {
  switch (type) {
    case event.USER_LOGIN_ACTION:
      return { ...state, user: item.user };
    case event.USER_LOGOUT_ACTION:
      return initialState;

    case event.USER_ADD_LIBRARY_ACTION:
      return {
        ...state,
        user: {
          ...state.user,
          book: [...state.user.book, item.book]
        }
      };

    case event.USER_REMOVE_LIBRARY_ACTION:
      return {
        ...state,
        user: {
          ...state.user,
          book: state.user.book.filter(b => b._id !== item.bookId)
        }
      };

    default:
      return state;
  }
};
