import React, { Fragment, useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Title from '../components/dashboard/Title';
import Paper from '@material-ui/core/Paper';
import WarningIcon from '@material-ui/icons/Warning';



const useStyles = makeStyles((theme) => ({
    expenseDesc: {
        textAlign: 'left',
        display: 'block',
        color: '#9a9a9a',
    },
    plannedBar: {
        height: '15px',
        padding: '8px',
        borderRadius: '25px',
        color: '#ffffff',
        textAlign: 'center',
        marginTop: theme.spacing(2)
    },
    bar: {
        width: '100%',
        borderRadius: '25px',
        color: '#ffffff',
        textAlign: 'center',
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
    },
    paper: {
        padding: theme.spacing(2),
        width: '100%',
        height: 180
    },
    caption: {
        color: '#a2a2a2',
        float: 'right',
    },
    icon: {
        width: 15,
        height: 15,
    },
    balanceMsg: {
        padding: theme.spacing(0, 2)
    },
    center: {
        textAlign: 'center'
    },
    img: {
        width: 100,
        height: 100
    }

}));

export default function Budget(props) {
    const classes = useStyles();
    // const { transactions, budgetAmount } = props;

    const { expenses, budget } = useSelector(state => ({
        expenses: state.expenses,
        budget: state.budget
    }), shallowEqual);

    const [hasBudget, setHasBudget] = useState(false);
    const [alert, setAlert] = useState('');
    const [progressColor, setProgressColor] = useState('#eeeeee');
    const [totalAmount, setTotalAmount] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [balanceLeftMsg, setBalanceLeftMsg] = useState('');
    // const history = useHistory()


    const getColor = (value) => {

        if (value < 40) {
            setProgressColor('#8bc34a');
            setAlert('You are going good!');
        }
        else if (value >= 40 && value < 60) {
            setProgressColor('#c0ca33');
            setAlert('You need to be carefull from now on!')
        }
        else if (value >= 60 && value < 80) {
            setProgressColor('#ff9800');
            setAlert('You have almost reached your budget limit.')
        }
        else if (value >= 80 && value < 100) {
            setProgressColor('#ff5d06');
            setAlert('You are too close to your budget limit.')
        } else {
            setProgressColor('#ef5350');
            setAlert('You have crossed your budget limit.')
        }
    };

    const createBalanceLeftMsg = (value) => {
        value > 0 ? (
            setBalanceLeftMsg(`You are ₹${value} away from your budget limit.`)
        ) : setBalanceLeftMsg(`You have spent ₹${value * -1} more than your budget limit.`)
    };

    const calculateBudget = () => {
        var spentAmount = 0;
        expenses.monthlyItems.map(items => {
            if (items.transactionType === 'Expense') {
                spentAmount += items.amount;
            }
        });
        setTotalAmount(spentAmount);

        var calculatedPercentage = Math.floor((spentAmount / budget.amount) * 100);
        calculatedPercentage > 100 ? setPercentage(100) : setPercentage(calculatedPercentage);

        getColor(calculatedPercentage);
        createBalanceLeftMsg(budget.amount - spentAmount);

    }

    useEffect(() => {
        if (budget.amount) {
            setHasBudget(true);
            calculateBudget();
        }

    }, [expenses, budget]);


    return (
        <Fragment>
            <Grid item xs={12} md={12} lg={12}>
                <Grid container spacing={1}>
                    <Grid item xs={9} sm={9} md={9} lg={9}>
                        <Title> My Budget </Title>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}
                    >
                        {
                            !hasBudget ? <Link to='/budget'>
                                <Typography variant="caption" className={classes.caption}>
                                    Add
                                </Typography>
                            </Link> : <Link to='/budget'>
                                    <Typography variant="caption" className={classes.caption}>
                                        Edit
                                </Typography>
                                </Link>
                        }
                    </Grid>
                </Grid>
            </Grid>

            {
                hasBudget ? (
                    <Grid item sm={12} xs={12} md={12} lg={12}>
                        <Paper elevation={3} className={classes.paper}>
                            <div className={classes.bar}>
                                <div className={classes.plannedBar}
                                    style={{
                                        backgroundColor: progressColor,
                                        width: percentage + '%',
                                    }}>
                                </div>
                            </div>
                            <div style={{ width: '100%' }}>
                                <Typography variant='caption'
                                    style={{ float: 'right' }}>₹{budget.amount}</Typography>
                            </div>
                            {
                                percentage !== 100 ? (
                                    <div style={{ width: percentage === 0 ? '5%' : percentage + '%', }}>
                                        <Typography variant='caption'
                                            style={{
                                                float: 'right'
                                            }}
                                        >₹{totalAmount}</Typography>
                                    </div>
                                ) : null
                            }
                            <Typography component="div" variant='body1'
                                style={{
                                    marginTop: '32px'
                                }}>
                                <WarningIcon className={classes.icon} color="secondary" />{alert}
                            </Typography>
                            <Typography component="div" variant='body2' className={classes.balanceMsg}>
                                {balanceLeftMsg}
                            </Typography>

                        </Paper>
                    </Grid>
                ) : (
                        <Grid item sm={12} xs={12} md={12} lg={12}>
                            <div className={classes.center}>
                                <img src="/img/empty.svg" alt="blank_budget" className={classes.img} />
                            </div>
                        </Grid>
                    )
            }





        </Fragment>
    );
}