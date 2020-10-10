import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SaveIcon from '@material-ui/icons/Save';
import MuiAlert from '@material-ui/lab/Alert';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';

import { addBudget } from '../actions/budgetAction';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        // height: '120vh'
    },
    appBarSpacer: {
        marginTop: '15%',
    },
    content: {
        flexGrow: 1,
    },
    container: {
        paddingBottom: theme.spacing(4),
        alignContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    form: {
        marginBottom: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(2, 0),
        width: '100%',
    },
    header: {
        textAlign: 'center'
    },

}));


export default function BudgetForm(props) {
    const classes = useStyles();
    const history = useHistory();
    const { theme, month } = props;

    const dispatch = useDispatch();

    const { user, budget } = useSelector(state => ({
        user: state.user,
        budget: state.budget
    }));

    const [dbError, setDbError] = useState(false);
    const [dbSuccess, setDbSuccess] = useState(false);
    const [amount, setAmount] = useState('');
    const [error, setError] = useState({ amount: false });
    const [alert, setAlert] = useState(false);

    const handleAlert = () => {
        setAlert(true);
    };

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert(false);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setAmount(value);
        validate(name, value);
    }

    const validate = (name, value) => {
        switch (name) {
            case 'amount':
                if (value === '') {
                    setError({
                        ...error,
                        amount: true
                    })
                } else {
                    setError({
                        ...error,
                        amount: false
                    })
                }
                break;

            default: break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        validate('amount', amount);
        if (amount !== '') {
            var data = {
                userId: user.id,
                amount: Number(amount),
                month: month[new Date().getMonth()],
                year: new Date().getFullYear(),
            }
            dispatch(addBudget(sessionStorage.getItem('token'), data));
            handleAlert();
            reset();
        }

    }

    const reset = () => {
        setAmount('');
        setError({ amount: false });
    }

    useEffect(() => {
        if (budget.error) setDbError(true);
        if (budget.amount) setDbSuccess(true)
    }, [budget])

    if (!user.isLoggedin) {
        return <Redirect to="/login" />;
    } else return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="static"
                style={{
                    background: 'transparent', boxShadow: 'none',
                    color: theme ? '#4a4a4a' : '#ffffff'
                }}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                        onClick={() => history.push('/dashboard')}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        My Budget
                    </Typography>

                </Toolbar>
            </AppBar>
            <main>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={1}>

                        <Grid item xs={12} md={12} sm={12} >

                            <form className={classes.form} onSubmit={handleSubmit}>

                                <TextField
                                    variant="outlined"
                                    color="secondary"
                                    margin="normal"
                                    fullWidth
                                    name="month"
                                    label="Month"
                                    id="month"
                                    defaultValue={month[new Date().getMonth()]}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />

                                <TextField
                                    variant="outlined"
                                    color="secondary"
                                    margin="normal"
                                    fullWidth
                                    type="number"
                                    name="amount"
                                    label="Amount"
                                    id="amount"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                    }}
                                    placeholder='0'
                                    onChange={handleChange}
                                    value={amount}
                                    {...(error.amount && { error: true, helperText: 'This field is required.' })}
                                />


                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<SaveIcon />}
                                >
                                    Save
                                </Button>
                            </form>
                        </Grid>


                    </Grid>
                </Container>
            </main>
            {
                dbError ? (
                    <Snackbar open={alert} autoHideDuration={2000} onClose={handleAlertClose}
                        style={{ marginBottom: '32px' }}>
                        <Alert onClose={handleAlertClose} severity={'error'}>
                            Oops! Some error occured.
                </Alert>
                    </Snackbar>
                ) : null
            }
            {
                dbSuccess ? (
                    <Snackbar open={alert} autoHideDuration={2000} onClose={handleAlertClose}
                        style={{ marginBottom: '32px' }}>
                        <Alert onClose={handleAlertClose} severity={'success'}>
                            Budget is saved successfully!
                        </Alert>
                    </Snackbar>
                ) : null
            }
        </div>
    )
}
