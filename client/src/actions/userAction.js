import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const registerUser = (data) => {
  return (dispatch) => {
    axios
      .post(`${API_BASE_URL}/api/auth/register`, data)
      .then((res) => {
        dispatch(logIn(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(authError(error.response.data.message));
        } else {
          dispatch(authError(error.message));
        }
      });
  };
};

export const loginUser = (data) => {
  return (dispatch) => {
    axios
      .post(`${API_BASE_URL}/api/auth/login`, data)
      .then((res) => {
        dispatch(logIn(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(authError(error.response.data.message));
        } else {
          dispatch(authError(error.message));
        }
      });
  };
};

export const savedUser = (token) => {
  return (dispatch) => {
    axios
      .get(`${API_BASE_URL}/api/auth/getUser`, {
        headers: {
          authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(logIn(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(authError(error.response.data.message));
        } else {
          dispatch(authError(error.message));
        }
      });
  };
};

export const logIn = (data) => {
  return {
    type: "SET_USER",
    payload: data,
  };
};

export const logOut = () => {
  return {
    type: "LOGOUT_USER",
  };
};

export const authError = (error) => {
  return {
    type: "AUTH_ERROR",
    payload: error,
  };
};

export const resetAuthError = () => {
  return {
    type: "RESET_AUTH_ERROR",
  };
};
