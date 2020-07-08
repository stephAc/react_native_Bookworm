export const event = {
  USER_LOGIN_ACTION: 'USER_LOGIN_ACTION',
  USER_LOGOUT_ACTION: 'USER_LOGOUT_ACTION',
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
