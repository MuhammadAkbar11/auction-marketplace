export const setErrorAction = (type, error) => dispatch => {
  dispatch({
    type: type,
    payload: {
      error: error,
      loading: false,
    },
  });
};

export const setResetAction = type => dispatch => {
  return dispatch({
    type,
  });
};
