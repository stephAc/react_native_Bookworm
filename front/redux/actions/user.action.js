export const event = {
  USER_LOGIN_ACTION: 'USER_LOGIN_ACTION',
};

export const user_login = (user) => {
  return {
    type: 'USER_LOGIN_ACTION',
    item: {
      user,
    },
  };
};
