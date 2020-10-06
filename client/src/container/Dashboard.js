import React, { Fragment, useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from "@material-ui/core/Divider";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PieChart from '../components/dashboard/PieChart';
import Budget from '../container/Budget';
import Header from '../components/dashboard/Header';
import SummaryCard from '../components/dashboard/SummaryCard';
import Transactions from '../components/dashboard/Transactions';
import LinearProgress from '@material-ui/core/LinearProgress';
import { getAllTransactions, getMonthsTransactions, getTransactionsByGrouped } from '../actions/expenseAction';
import { getBudget } from '../actions/budgetAction';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {/* {'Copyright ©'}
            <Link color="inherit" href="https://material-ui.com/">
                Saikat Dey
            </Link>{' '} */}
            Crafted with Love by Saikat Dey {" "}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        "&$selected": {
            color: "#f9aa33"
        }
    },
    selected: {},
    marginTop: {
        marginTop: '24px',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
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
    overlap: {
        margin: '-80px 10px',
    },
}));

export default function Dashboard(props) {
    const classes = useStyles();
    const { theme, month, isloggedIn } = props;
    const dispatch = useDispatch();
    const history = useHistory();

    const [currentMonth] = useState(month[new Date().getMonth()]);
    const [token, setToken] = useState('');


    const { expenses, budget, user } = useSelector(state => ({
        expenses: state.expenses,
        budget: state.budget,
        user: state.user
    }));

    useEffect(() => {
        setTimeout(() => {
            setToken(localStorage.getItem('token'));
        }, 500);
        if (token) {
            dispatch(getAllTransactions(token));
            dispatch(getTransactionsByGrouped(token));
            dispatch(getMonthsTransactions(token, month[new Date().getMonth()]));
            dispatch(getBudget(token, currentMonth));
        }

    }, [token]);



    if (!isloggedIn) {
        return <Redirect to='/login' />
    } else {
        window.history.pushState(null, document.title, window.location.href);
    }

    return (
        <div className={classes.root}>

            <CssBaseline />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {
                    expenses && expenses.loading ? (
                        <LinearProgress color="secondary" />
                    ) : (
                            <Fragment>

                                <Header {...props} />
                                <Container maxWidth="lg" className={classes.container}>
                                    <Grid container spacing={3}>

                                        <Grid item xs={12} md={12} lg={12} className={classes.overlap}
                                            style={{
                                                padding: 0,
                                            }}
                                        >
                                            <Grid container>
                                                <SummaryCard theme={theme} data={expenses.monthlyItems} />
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} md={12} lg={12} className={classes.marginTop}>
                                            {/* <Divider /> */}
                                        </Grid>

                                        <Grid item xs={12} md={12} lg={12}>
                                            <Grid container>
                                                <Transactions showAll={false} data={expenses.items.slice(0, 4)} />
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} md={12} lg={12}>
                                            <Divider />
                                        </Grid>

                                        <Grid item xs={12} md={12} lg={12}>
                                            <PieChart transactions={expenses.monthlyItems} />
                                        </Grid>

                                        <Grid item xs={12} md={12} lg={12}>
                                            <Divider />
                                        </Grid>

                                        {/* Budget */}
                                        <Grid item xs={12} md={12} lg={12}>
                                            <Grid container spacing={1}>

                                                <Budget transactions={expenses.items} budgetAmount={budget.amount} />

                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} md={12} lg={12}>
                                            <Divider />
                                        </Grid>


                                    </Grid>
                                    <Box pt={4}>
                                        <Copyright />
                                    </Box>
                                </Container>

                            </Fragment>
                        )
                }
            </main>


        </div>
    );

}
