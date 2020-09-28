import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
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
        // color: '#344955',
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

    const { expenses, user } = useSelector(state => ({
        expenses: state.expenses.items,
        user: state.user
    }), shallowEqual);


    if (!user.isLoggedin) {
        return <Redirect to="/login" />;
    } else return (

        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                        onClick={() => history.push('/')}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Transactions
                    </Typography>

                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                {/* <div className={classes.appBarSpacer} /> */}
                {/* <Header title='"Beware of little expenses. A small leak will sink a great ship.  – Benjamin Franklin"' /> */}
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>

                        <Grid item xs={12} md={12} lg={12}>
                            <Grid container>
                                <Transactions showAll={true} data={expenses} />
                            </Grid>
                        </Grid>

                    </Grid>

                </Container>

            </main>
        </div>
    );
}