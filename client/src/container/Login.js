import React, { useEffect, useState, Fragment } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Carousel from 'react-material-ui-carousel';
import { loginUser, resetAuthError } from '../actions/userAction';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Footer from '../components/Footer';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const items = [
    { src: "./img/wallet.svg", name: 'image1' },
    { src: "./img/login2.svg", name: 'image2' },
    { src: "./img/savings.svg", name: 'image3' },
];

function Image(props) {
    return (
        <img src={props.item.src} width='100px' height='100px' alt={props.item.name} />
    )
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
    infoText: {
        color: '#8c8c8c',
        padding: theme.spacing(0, 2),
        margin: theme.spacing(1, 4)
    },
    footer: {
        bottom: 0,
        position: 'relative',
        width: '100%',
        margin: 'auto',
        padding: theme.spacing(2),
        marginTop: theme.spacing(4),
        textAlign: 'center',
        color: '#8c8c8c'
    },
    linkText: {
        color: '#ffffff'
    },
    input: {
        color: '#ffffff'
    },
    form: {
        alignItems: 'center',
        margin: 'auto',

        [theme.breakpoints.down('sm')]: {
            width: '80%',
        },
        [theme.breakpoints.up('md')]: {
            width: '40%',
        },
    }

}));

export default function Login(props) {
    const classes = useStyles();

    const history = useHistory();

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const [dbError, setDbError] = useState('');
    const [dbErrorMsg, setDbErrorMsg] = useState('');
    const [dbAlert, setDbAlert] = useState(false);

    const [formAlert, setFormAlert] = useState(false);
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState({ email: false, pin: false });
    const [errorMsg, setErrorMsg] = useState({ email: '', pin: '' });
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
                } else if (!value.match(/^[0-9]+$/)) {
                    setError({
                        ...error,
                        pin: true
                    });
                    setErrorMsg({ ...errorMsg, pin: 'PIN must be of 4 digits!' });
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
        let errors = !error.email && !error.pin;
        let data = email && pin;

        if (errors && data) {
            let userObj = {
                email,
                pin
            };
            setShowMsg(false);
            dispatch(loginUser(userObj));
        } else {
            setShowMsg(true);

        }
        handleFormAlert();
    }

    useEffect(() => {
        if (user.error) {
            setDbError(user.error);
            setDbErrorMsg(user.errorMsg);
            dispatch(resetAuthError());
            handleDbAlert();
        }
        if (user.isLoggedin) {
            props.checkIfLoggedIn(true);
            history.push('/dashboard');
        }
    }, [user]);


    return (
        <div className={classes.root}>
            <CssBaseline />
            <main className={classes.content}>

                <Grid item xs={12} md={12} lg={12}>
                    <Grid container>

                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.imgCenter}>
                            <Carousel
                                autoPlay={true}
                                timer={500}
                                animation="fade"
                            >
                                {
                                    items.map((item, i) => <Image key={i} item={item} />)
                                }
                            </Carousel>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant="h5" className={classes.title}>
                                CASHFLOW
                        </Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.subTitle}>
                            <Typography variant="body2">
                                Manage your transactions and budgets. Save money.
                        </Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.imgCenter}>

                            <form className={classes.form} onSubmit={handleSubmit}>

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
                                    type="password"
                                    name="pincode"
                                    label="Pin"
                                    id="pincode"
                                    InputProps={{
                                        className: classes.input,
                                    }}
                                    // onInput={(e) => {
                                    //     e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 4)
                                    // }}
                                    placeholder='ex. 1234'
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
                                    Log in
                                </Button>
                            </form>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.infoText}>
                            <Typography variant="caption">
                                I don't have an account.
                                <Link to='/register' className={classes.linkText}>
                                    Take me to Signup.
                                </Link>
                            </Typography>
                        </Grid>

                        {
                            dbError ? (
                                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.imgCenter}>
                                    <Snackbar open={dbAlert} autoHideDuration={3000} onClose={handleDbAlertClose} style={{ marginBottom: '30px' }}>
                                        <Alert onClose={handleDbAlertClose} severity='error'>
                                            {dbErrorMsg ? dbErrorMsg : 'Oops! An error occured on our side.'}
                                        </Alert>
                                    </Snackbar>
                                </Grid>
                            ) : null
                        }

                        {
                            showMsg ? (
                                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.imgCenter}>
                                    <Snackbar open={formAlert} autoHideDuration={3000} onClose={handleFormAlertClose} style={{ marginBottom: '30px' }}>
                                        <Alert onClose={handleFormAlertClose} severity='error'>
                                            Please fll all the fields properly to continue.
                                        </Alert>
                                    </Snackbar>
                                </Grid>
                            ) : <></>
                        }



                    </Grid>
                    <Box pt={4} className={classes.footer}>
                        <Footer />
                    </Box>
                </Grid>




            </main>


        </div >
    );
}