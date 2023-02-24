import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function getBudget(token, month) {
  return (dispatch) => {
    let url = `${API_BASE_URL}/api/transactions/getBudget/${month}`;
    axios
      .get(url, {
        headers: {
          authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(getBudgetAction(res.data));
      })
      .catch((err) => {
        if (err.response) {
          dispatch(budgetError(err.response.data.msg));
        } else {
          dispatch(budgetError(err.message));
        }
      });
  };
}

export function addBudget(token, data) {
  return (dispatch) => {
    let url = `${API_BASE_URL}/api/transactions/setBudget`;
    axios
      .post(url, data, {
        headers: {
          authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(setBudget(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(budgetError(err.response.data.message));
      });
  };
}

export const getBudgetAction = (data) => {
  return {
    type: "GET_BUDGET",
    payload: data,
  };
};

export const setBudget = (data) => {
  return {
    type: "SET_BUDGET",
    payload: data,
  };
};

export const budgetError = (error) => {
  return {
    type: "BUDGET_ERROR",
    payload: error,
  };
};
