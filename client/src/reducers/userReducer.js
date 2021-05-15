const initState = {
  isLoggedin: false,
  name: "",
  token: "",
  error: false,
  errorMsg: "",
};

export default function userReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_USER":
      let d = new Date();
      d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
      document.cookie =
        "userid=" + payload.token + ";expires=" + d.toUTCString() + ";path=/";
      return {
        ...state,
        ...payload,
        isLoggedin: true,
        error: false,
        errorMsg: "",
      };

    case "GET_USER":
      return {
        ...state,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        isLoggedin: false,
        id: "",
        name: "",
        token: false,
        errorMsg: "",
      };
    case "AUTH_ERROR":
      return {
        ...state,
        isLoggedin: false,
        error: true,
        errorMsg: payload,
      };
    case "RESET_AUTH_ERROR":
      return {
        ...state,
        error: false,
        errorMsg: "",
      };

    default:
      return {
        ...state,
      };
  }
}
