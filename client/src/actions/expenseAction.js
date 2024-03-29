import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function getMonthsTransactions(token, month) {
  return (dispatch) => {
    let url = `${API_BASE_URL}/api/transactions/monthly/${month}`;
    axios
      .get(url, {
        headers: {
          authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(monthExpenses(res.data));
      })
      .catch((err) => {
        if (err.response) {
          dispatch(expensesError(err.response.data.message));
        } else {
          dispatch(expensesError(err.message));
        }
      });
  };
}

export function getAllTransactions(token) {
  return (dispatch) => {
    let url = `${API_BASE_URL}/api/transactions/all`;
    axios
      .get(url, {
        headers: {
          authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(allExpenses(res.data));
      })
      .catch((err) => {
        if (err.response) {
          dispatch(expensesError(err.response.data.message));
        } else {
          dispatch(expensesError(err.message));
        }
      });
  };
}

export function updateTransaction(token, data) {
  return (dispatch) => {
    let url = `${API_BASE_URL}/api/transactions/update`;
    axios
      .post(url, data, {
        headers: {
          authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(allExpenses(res.data));
      })
      .catch((err) => {
        if (err.response) {
          dispatch(expensesError(err.response.data.message));
        } else {
          dispatch(expensesError(err.message));
        }
      });
  };
}

export function getTransactionsByGrouped(token) {
  return (dispatch) => {
    let url = `${API_BASE_URL}/api/transactions/grouped`;
    axios
      .get(url, {
        headers: {
          authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(groupedExpenses(res.data));
      })
      .catch((err) => {
        if (err.response) {
          dispatch(expensesError(err.response.data.message));
        } else {
          dispatch(expensesError(err.message));
        }
      });
  };
}

export function addTransactions(token, data) {
  return (dispatch) => {
    let url = `${API_BASE_URL}/api/transactions/add`;
    axios
      .post(url, data, {
        headers: {
          authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(setExpenses(res.data));
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          dispatch(expensesError(error.response.data.message));
        } else {
          dispatch(expensesError(error.message));
        }
      });
  };
}

export function deleteTransaction(token, data) {
  return (dispatch) => {
    let url = `${API_BASE_URL}/api/transactions/remove/${data.id}/${data.monthName}/${data.year}`;
    axios
      .delete(url, {
        headers: {
          authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(allExpenses(res.data));
      })
      .catch((err) => {
        if (err.response) {
          dispatch(expensesError(err.response.data.message));
        } else {
          dispatch(expensesError(err.message));
        }
      });
  };
}

export const allExpenses = (data) => {
  return {
    type: "GET_EXPENSES",
    payload: data,
  };
};

export const groupedExpenses = (data) => {
  return {
    type: "GROUPED_EXPENSES",
    payload: data,
  };
};

export const monthExpenses = (data) => {
  return {
    type: "SET_EXPENSES_MONTH",
    payload: data,
  };
};

export const setExpenses = (data) => {
  return {
    type: "SET_EXPENSES",
    payload: data,
  };
};

export const expensesError = (data) => {
  return {
    type: "EXPENSES_ERROR",
    payload: data,
  };
};
