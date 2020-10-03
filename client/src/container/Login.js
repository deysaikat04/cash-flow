import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { GoogleLogin } from 'react-google-login';
import Box from '@material-ui/core/Box';
import Carousel from 'react-material-ui-carousel';
import { registerUser } from '../actions/userAction';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


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

const items = [
    { src: "./img/wallet.svg", name: 'image1' },
    { src: "./img/login2.svg", name: 'image2' },
    { src: "./img/savings.svg", name: 'image3' },
];

function Image(props) {
    return (
        <img src={props.item.src} width='200px' height='200px' alt={props.item.name} />
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
        position: 'absolute',
        width: '100%',
        margin: 'auto',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: '#8c8c8c'
    }

}));

export default function Login(props) {
    const classes = useStyles();

    const history = useHistory();

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const [error, setError] = useState('');
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

    const responseGoogle = (response) => {

        if (response) {
            let userObj = {
                email: response.profileObj.email,
                name: response.profileObj.name,
                imageUrl: response.profileObj.imageUrl,
                googleId: response.profileObj.googleId
            };
            dispatch(registerUser(userObj));
        }
    }

    useEffect(() => {
        if (user.error) {
            setError(user.error);
            handleAlert();
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
                                indicators="false"
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
                            <GoogleLogin
                                clientId="1005662878144-7c2nuc6vs5ercrued6cpbja03rp3k7kf.apps.googleusercontent.com"

                                buttonText={
                                    <Typography variant="button">Sign In </Typography>
                                }
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                // isSignedIn={true}
                                cookiePolicy={'single_host_origin'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.infoText}>
                            <Typography variant="caption">
                                Sign In using your Google account and explore the features.
                        </Typography>

                        </Grid>

                        {
                            error ? (
                                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.imgCenter}
                                    style={{ marginBottom: '32px' }}>

                                    <Snackbar open={alert} autoHideDuration={3000} onClose={handleAlertClose}>
                                        <Alert onClose={handleAlertClose} severity='error'>
                                            {error}
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
