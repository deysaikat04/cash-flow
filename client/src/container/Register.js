import React, { useEffect, useState } from 'react';
import { useHistory, Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { registerUser, resetAuthError } from '../actions/userAction';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PinInput from "react-pin-input";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
    return (
        <Typography variant="body2" align="center">
            Crafted with Love by Saikat Dey {" "}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        height: '100vh',
        background: '#444444',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden'
    },
    content: {
        marginTop: theme.spacing(8),
    },
    imgCenter: {
        margin: theme.spacing(2)
    },
    title: {
        color: '#ffffff',
        letterSpacing: '2px'
    },
    subTitle: {
        color: '#b7b7b7',
        padding: theme.spacing(0, 2),
        margin: theme.spacing(1, 4)
    },
    input: {
        color: '#ffffff'
    },
    infoText: {
        color: '#8c8c8c',
        padding: theme.spacing(0, 2),
        margin: theme.spacing(1, 4)
    },
    footer: {
        bottom: 0,
        position: 'absolute',
        width: '100%',
        margin: 'auto',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: '#8c8c8c'
    },
    form: {
        marginBottom: theme.spacing(1),
        alignItems: 'center',
        margin: 'auto',

        [theme.breakpoints.down('sm')]: {
            width: '80%',
        },
        [theme.breakpoints.up('md')]: {
            width: '60%',
        },
        [theme.breakpoints.up('lg')]: {
            width: '70%',
        },
    },
    linkText: {
        color: '#ffffff'
    }

}));

export default function Register(props) {
    const classes = useStyles();

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const [dbError, setDbError] = useState('');
    const [dbErrorMsg, setDbErrorMsg] = useState('');
    const [dbAlert, setDbAlert] = useState(false);

    const [formAlert, setFormAlert] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState({ name: false, email: false, pin: false });
    const [errorMsg, setErrorMsg] = useState({ name: '', email: '', pin: '' });
    const [showMsg, setShowMsg] = useState(false);

    const handleDbAlert = () => {
        setDbAlert(true);
    };

    const handleDbAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setDbAlert(false);
    };

    const handleFormAlert = () => {
        setFormAlert(true);
    };

    const handleFormAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setFormAlert(false);
    };

    const handleChange = event => {
        const { name, value } = event.target;
        validate(name, value);
    };

    const validate = (name, value) => {
        switch (name) {
            case 'name':
                setName(value);
                if (value === '') {
                    setError({
                        ...error,
                        name: true
                    })
                    setErrorMsg({ ...errorMsg, name: 'Field is required!' });

                } else if (!value.match(/^[a-zA-z ]*$/)) {
                    setError({
                        ...error,
                        name: true
                    });
                    setErrorMsg({ ...errorMsg, name: 'Name should not have any digits!' });
                } else {
                    setError({
                        ...error,
                        name: false
                    });
                    setErrorMsg({ ...errorMsg, name: '' });
                }
                break;

            case 'email':
                setEmail(value);
                if (value === '') {
                    setError({
                        ...error,
                        email: true
                    });
                    setErrorMsg({ ...errorMsg, email: 'Field is required!' });
                }
                else if (!value.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
                    setError({
                        ...error,
                        email: true
                    });
                    setErrorMsg({ ...errorMsg, email: 'Invalid Email id!' });
                }
                else {
                    setError({
                        ...error,
                        email: false
                    });
                    setErrorMsg({ ...errorMsg, email: '' });
                }
                break;
            case 'pincode':
                setPin(value);
                if (value === '') {
                    setError({
                        ...error,
                        pin: true
                    });
                    setErrorMsg({ ...errorMsg, pin: 'Field is required!' });
                } else if (value.length < 4 || value.length > 4) {
                    setError({
                        ...error,
                        pin: true
                    });
                    setErrorMsg({ ...errorMsg, pin: 'PIN must be of 4 digits!' });
                } else {
                    setError({
                        ...error,
                        pin: false
                    });
                    setErrorMsg({ ...errorMsg, pin: '' });
                }
                break;
            default: break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let errors = !error.name && !error.email && !error.pin;
        let data = name && email && pin;

        if (errors && data) {
            let userObj = {
                name,
                email,
                pin
            };
            setShowMsg(false);
            setName('');
            setEmail('');
            setPin('');
            dispatch(registerUser(userObj));

        } else {
            setShowMsg(true);
        }
        handleFormAlert();
    }

    useEffect(() => {
        if (user.error) {
            setDbError(user.error);
            setDbErrorMsg(user.errorMsg);
            handleDbAlert();
            dispatch(resetAuthError());
        }


    }, [user]);

    if (user.isLoggedin) {
        return <Redirect to='/dashboard' />
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <main className={classes.content}>

                <Grid item xs={12} md={12} lg={12}>
                    <Grid container>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant="h5" className={classes.title}>
                                CASHFLOW
                             </Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.subTitle}>
                            <Typography variant="body1">
                                SIGN UP
                        </Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.imgCenter}>
                            <form className={classes.form} onSubmit={handleSubmit}>

                                <TextField
                                    autoFocus
                                    variant="filled"
                                    color="secondary"
                                    margin="normal"
                                    InputProps={{
                                        className: classes.input
                                    }}
                                    fullWidth
                                    name="name"
                                    label="Name"
                                    id="name"
                                    placeholder='John Doe'
                                    onChange={handleChange}
                                    value={name}
                                    {...(error.name && { error: true, helperText: errorMsg.name })}
                                />

                                <TextField
                                    variant="filled"
                                    color="secondary"
                                    margin="normal"
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    id="email"
                                    InputProps={{
                                        className: classes.input
                                    }}
                                    placeholder='ex. johndoe@domain.com'
                                    onChange={handleChange}
                                    value={email}
                                    {...(error.email && { error: true, helperText: errorMsg.email })}
                                />

                                <TextField
                                    variant="filled"
                                    color="secondary"
                                    margin="normal"
                                    fullWidth
                                    type="number"
                                    name="pincode"
                                    label="Pin"
                                    id="pincode"
                                    InputProps={{
                                        className: classes.input
                                    }}
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 4)
                                    }}
                                    placeholder='ex. 1234'
                                    helperText="This pin will help you to login."
                                    onChange={handleChange}
                                    value={pin}
                                    {...(error.pin && { error: true, helperText: errorMsg.pin })}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    style={{ marginTop: '24px' }}
                                >
                                    Sign up
                                </Button>
                            </form>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.infoText}>
                            <Typography variant="caption">
                                I already have an account.
                                <Link to='/login' className={classes.linkText}>
                                    Take me to Login.
                                </Link>
                            </Typography>
                        </Grid>

                        {
                            dbError ? (
                                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.imgCenter}>
                                    <Snackbar open={dbAlert} autoHideDuration={2000} onClose={handleDbAlertClose} style={{ marginBottom: '30px' }}>
                                        <Alert onClose={handleDbAlertClose} severity='error'>
                                            {dbErrorMsg ? dbErrorMsg : 'Sorry for the inconvenience. Please try again later.'}
                                        </Alert>
                                    </Snackbar>
                                </Grid>
                            ) : null
                        }

                        {
                            user && user.id ? (
                                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.imgCenter}>
                                    <Snackbar open={alert} autoHideDuration={2000} onClose={handleDbAlertClose} style={{ marginBottom: '30px' }}>
                                        <Alert onClose={handleDbAlertClose} severity='success'>
                                            Registered successfully!
                                    </Alert>
                                    </Snackbar>
                                </Grid>
                            ) : null
                        }

                        {
                            showMsg ? (
                                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.imgCenter}>
                                    <Snackbar open={formAlert} autoHideDuration={2000} onClose={handleFormAlertClose} style={{ marginBottom: '30px' }}>
                                        <Alert onClose={handleFormAlertClose} severity='error'>
                                            Please fll all the fields properly to continue.
                                        </Alert>
                                    </Snackbar>
                                </Grid>
                            ) : <></>
                        }



                    </Grid>
                    <Box pt={4} className={classes.footer}>
                        <Copyright />
                    </Box>
                </Grid>




            </main>


        </div >
    );
}
