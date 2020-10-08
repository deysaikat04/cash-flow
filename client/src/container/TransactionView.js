import React, { useEffect, useState, Fragment } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Transactions from '../components/dashboard/Transactions';

import { getTransactionsByGrouped } from '../actions/expenseAction';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        "&$selected": {
            color: "#f9aa33"
        },
        marginBottom: theme.spacing(4),
        flexDirection: 'column',
    },
    selected: {},
    appbar: {
        background: 'transparent',
        boxShadow: 'none',
        color: theme.palette.type === 'light' ? '#4a4a4a' : '#ffffff'
    },
    content: {
        flexGrow: 1,
        height: '100vh',
    },
    container: {
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 280,
    },
    expenseText: {
        color: '#ff8151',
        fontWeight: '600',
        float: 'right'
    },
    incomeText: {
        fontWeight: '600',
        float: 'right'
    },
    stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
    },
}));

export default function TransactionView() {
    const classes = useStyles();
    const history = useHistory();

    const dispatch = useDispatch();

    const [hasData, setHasData] = useState(false);

    const { expenses, user } = useSelector(state => ({
        expenses: state.expenses,
        user: state.user
    }), shallowEqual);

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            dispatch(getTransactionsByGrouped(sessionStorage.getItem('token')));
        }
    }, []);

    useEffect(() => {
        if (expenses.groupedItems) {
            setHasData(true);
        }
    }, [expenses]);


    const dataCards = () => {
        let rows = [];
        if (expenses.groupedItems) {
            var list = Object.entries(expenses.groupedItems).map(([key, value]) => {
                return (
                    <Fragment key={key}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography>{key}</Typography>
                        </Grid>

                        <Grid item xs={12} md={12} lg={12}>
                            <Grid container>
                                <Transactions showAll={true} data={value} />
                            </Grid>
                        </Grid>
                    </Fragment>
                );
            });
            rows.push(list);
        }
        return rows;
    }


    if (!user.isLoggedin) {
        return <Redirect to="/login" />;
    } else return (

        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                        onClick={() => history.push('/dashboard')}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Transactions
                    </Typography>

                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>

                        {
                            hasData ? (
                                dataCards()
                            ) : null
                        }

                    </Grid>
                </Container>

            </main>
        </div>
    );
}