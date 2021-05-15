import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dashboard from "./Dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AddData from "../container/AddData";
import BottomNavigation from "../components/BottomNavigation";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import TransactionView from "./TransactionView";
import BudgetForm from "./BudgetForm";
import Login from "./Login";
import Cookies from "js-cookie";

import { savedUser } from "../actions/userAction";
import Register from "./Register";

export const light = {
  palette: {
    type: "light",
    primary: {
      main: "#344955",
      dark: "#202e35",
    },
    secondary: {
      main: "#f9aa33",
    },
  },
  typography: {
    color: "#000000",
  },
};

export const dark = {
  palette: {
    type: "dark",
    primary: {
      main: "#7d888e",
      dark: "#212121",
    },
    secondary: {
      main: "#c5882c",
    },
  },
};

function App() {
  const storedTheme = sessionStorage.getItem("theme") === "true";
  const userid = Cookies.get("userid");
  const authed = userid !== undefined;
  const [theme, setTheme] = useState(storedTheme ? false : true);

  const [isloggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({
    user: state.user,
  }));

  useEffect(() => {
    if (authed) {
      setIsLoggedIn(true);
      dispatch(savedUser(userid));
    }
  }, [authed]);

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const appliedTheme = createMuiTheme(theme ? light : dark);

  const toggleTheme = (flag) => {
    setTheme(flag);
    sessionStorage.setItem("theme", theme);
  };

  const checkIfLoggedIn = (flag) => {
    setIsLoggedIn(flag);
  };
  return (
    <Fragment>
      <ThemeProvider theme={appliedTheme}>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                isloggedIn ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />

            <Route
              exact
              path="/register"
              render={(props) => (
                <Register
                  {...props}
                  theme={theme}
                  checkIfLoggedIn={checkIfLoggedIn}
                />
              )}
            />

            <Route
              exact
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  theme={theme}
                  checkIfLoggedIn={checkIfLoggedIn}
                />
              )}
            />

            <Route
              exact
              path="/dashboard"
              render={(props) => (
                <Dashboard
                  {...props}
                  theme={theme}
                  month={month}
                  userid={userid}
                  isloggedIn={isloggedIn}
                />
              )}
            />

            <Route
              exact
              path="/add"
              render={(props) => (
                <AddData
                  {...props}
                  theme={theme}
                  month={month}
                  userid={userid}
                  isLoggedin={user.isLoggedin}
                />
              )}
            />

            <Route
              exact
              path="/transactions"
              userid={userid}
              component={TransactionView}
              isLoggedin={user.isLoggedin}
            />

            <Route
              exact
              path="/budget"
              render={() => (
                <BudgetForm
                  theme={theme}
                  month={month}
                  userid={userid}
                  isLoggedin={user.isLoggedin}
                />
              )}
            />
          </Switch>
          <BottomNavigation
            toggleTheme={toggleTheme}
            isloggedIn={user.isLoggedin}
          />
        </Router>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
