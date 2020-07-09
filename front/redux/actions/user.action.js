export const event = {
  USER_LOGIN_ACTION: 'USER_LOGIN_ACTION',
  USER_LOGOUT_ACTION: 'USER_LOGOUT_ACTION',
  USER_ADD_LIBRARY_ACTION: 'USER_ADD_LIBRARY_ACTION',
  USER_REMOVE_LIBRARY_ACTION: 'USER_REMOVE_LIBRARY_ACTION',
};

export const user_login = (user) => {
  return {
    type: event.USER_LOGIN_ACTION,
    item: {
      user,
    },
  };
};

export const user_logout = () => {
  return {
    type: event.USER_LOGOUT_ACTION,
    item: {},
  };
};

export const user_add_library = (book) => {
  return {
    type: 'USER_ADD_LIBRARY_ACTION',
    item: {
      book
    }
  };
};

export const user_remove_library = (bookId) => {
  return {
    type: 'USER_REMOVE_LIBRARY_ACTION',
    item: {
      bookId
    }
  };
};
