import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AddData from '../container/AddData';
import BottomNavigation from '../components/BottomNavigation';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import TransactionView from './TransactionView';
import BudgetForm from './BudgetForm';
import Login from './Login';

import { savedUser } from '../actions/userAction';

export const light = {
  palette: {
    type: 'light',
    // type: 'dark',
    primary: {
      main: '#344955',
      dark: '#202e35'
    },
    secondary: {
      main: '#f9aa33',
    },
  },
  typography: {
    color: '#000000'
  }
}

export const dark = {
  palette: {
    type: 'dark',
    // type: 'dark',
    primary: {
      main: '#344955',
      dark: '#212121',
    },
    secondary: {
      main: '#c5882c',
    },
  },
}

function App() {
  const storedTheme = sessionStorage.getItem('theme') === 'true';
  const [theme, setTheme] = useState(storedTheme ? false : true);

  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [token] = useState(localStorage.getItem('token'));
  const dispatch = useDispatch();

  const { user } = useSelector(state => ({
    user: state.user
  }));

  useEffect(() => {
    if (token && token != 'undefined') {
      dispatch(savedUser(token));
    }
  }, [token]);

  const month = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

  const appliedTheme = createMuiTheme(theme ? light : dark);

  const toggleTheme = (flag) => {
    setTheme(flag);
    sessionStorage.setItem('theme', theme);
  };

  const checkIfLoggedIn = (flag) => {
    setIsLoggedIn(flag);
  }
  // isloggedIn ? <Dashboard theme={theme} month={month} /> :
  return (
    <Fragment>
      <ThemeProvider theme={appliedTheme}>
        <Router>
          <Switch>
            <Route exact path='/' render={() => isloggedIn ? <Redirect to='/dashboard' /> : <Redirect to='/login' />}
            />

            <Route exact path='/login' render={(props) => <Login
              {...props}
              theme={theme}
              checkIfLoggedIn={checkIfLoggedIn}
            />} />
            <Route exact path='/dashboard' render={(props) => <Dashboard {...props}
              theme={theme} month={month} isloggedIn={isloggedIn} />} />

            <Route exact path='/add' render={(props) => <AddData
              {...props}
              theme={theme}
              month={month}
              isLoggedin={user.isLoggedin} />
            } />

            <Route exact path='/transactions' component={TransactionView} isLoggedin={user.isLoggedin} />

            <Route exact path='/budget'
              render={() =>
                <BudgetForm
                  theme={theme}
                  month={month}
                  isLoggedin={user.isLoggedin}
                />}
            />


          </Switch>
          <BottomNavigation toggleTheme={toggleTheme} isloggedIn={isloggedIn} />
        </Router>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
