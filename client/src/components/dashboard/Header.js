import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { logOut } from '../../actions/userAction';

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: theme.palette.primary.dark,
        padding: theme.spacing(2),
        color: '#fafafa',
        textAlign: 'center',
        borderBottomLeftRadius: '5% 5%',
        borderBottomRightRadius: '5% 5%',
        boxShadow: '0px 4px 10px 0px rgba(0,0,0,0.36)',

    },
    title: {
        color: '#ccc',
        fontStyle: 'italic'
    },
    leftAlign: {
        textAlign: 'left'
    },
    avatar: {
        textAlign: 'right',
        cursor: 'pointer'
    },
}));

export default function Header(props) {
    const classes = useStyles();
    const history = useHistory();

    const dispatch = useDispatch();

    const { title } = props;

    const { user } = useSelector(state => ({
        user: state.user
    }));

    const [greeting, setGreeting] = useState('');

    useEffect(() => {

        var d = new Date();
        var time = d.getHours();
        if (time < 12 && time >= 1) {
            setGreeting("Good Morning!");
        }
        if (time > 12 && time <= 18) {
            setGreeting("Good Afternoon!");
        }
        if (time > 18 && time < 24) {
            setGreeting("Good Evening!");
        }
    }, []);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const logout = (response) => {
        sessionStorage.clear();
        localStorage.clear();
        dispatch(logOut());
        history.push('/login');

    }
    const handleLogoutFailure = (response) => {
        alert('Failed to log out')
    }

    return (
        <div className={classes.header}
            style={{
                height: 100,
            }}>
            {
                title ? (
                    <Fragment>
                        <Typography variant='body2' className={classes.title}>
                            {title}
                        </Typography>
                    </Fragment>
                ) : (
                        <Fragment>
                            <Grid container spacing={3}>
                                <Grid item xs={10} sm={10} md={10} lg={10} className={classes.leftAlign}>
                                    <Typography variant='caption'>
                                        Hey {user.name}, {greeting}
                                    </Typography>
                                </Grid>

                                <Grid item xs={2} sm={2} md={2} lg={2} className={classes.avatar}
                                    onClick={handleClickOpen}>
                                    <Avatar alt="user" src='./img/user.png' />
                                </Grid>
                            </Grid>

                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Hey {user.name}. Want to Logout?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={logout} color="secondary" autoFocus>
                                        Yes
                                    </Button>
                                    <Button onClick={handleClose} autoFocus>
                                        No
                                </Button>
                                </DialogActions>
                            </Dialog>
                        </Fragment>
                    )
            }
        </div>
    );
}