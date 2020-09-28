import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';

import ListItemIcon from "@material-ui/core/ListItemIcon";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4SharpIcon from '@material-ui/icons/Brightness4Sharp';

import HomeIcon from '@material-ui/icons/Home';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import ListIcon from '@material-ui/icons/List';

const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    drawer: {
        borderRadius: '15px'
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        height: '8%',
        backgroundColor: theme.palette.background.paper,
        // background: 'radial-gradient(circle at 82% 0, transparent 32px, #344955 0) 0 0',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: '79%',
    },
}));

export default function Navigation(props) {
    const classes = useStyles();
    const history = useHistory();

    const { isLoggedin } = props;

    const storedTheme = sessionStorage.getItem('theme') === 'true';
    const [open, setOpen] = React.useState(false);
    const [theme, setTheme] = React.useState(storedTheme);

    const handleChange = (event) => {
        setTheme(prevState => {
            prevState ? setTheme(false) : setTheme(true);
        });
        props.toggleTheme(theme);
    };

    const toggleDrawer = (isOpen) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setOpen(isOpen);
    };

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List dense>
                <ListItem button>
                    <ListItemIcon>
                        {theme ? <Brightness4SharpIcon /> : <Brightness7Icon />}
                    </ListItemIcon>
                    <FormControlLabel
                        control={<Switch
                            checked={theme}
                            onClick={handleChange}
                            name="theme"
                        />}
                        label={<Typography variant='subtitle2'>Dark Mode</Typography>}
                        labelPlacement="start"
                        style={{
                            marginLeft: '-2px'
                        }}
                    />
                </ListItem>
                <ListItem button onClick={() => history.push('/dashboard')}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={() => history.push('/stats')}>
                    <ListItemIcon>
                        <ShowChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Stats" />
                </ListItem>
                <ListItem button onClick={() => history.push('/transactions')}>
                    <ListItemIcon>
                        <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Transactions" />
                </ListItem>
            </List>
            <List dense>

            </List>
        </div>
    );

    if (!isLoggedin) {
        return null;

    } else return (
        isLoggedin ? (
            <div>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" aria-label="open drawer"
                            onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Link to='/add'>
                            <Fab color="secondary" aria-label="add" className={classes.fabButton}>
                                <AddIcon />
                            </Fab>
                        </Link>
                        <div className={classes.grow} />

                    </Toolbar>
                </AppBar>

                <SwipeableDrawer
                    anchor={"bottom"}
                    open={open}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    className={classes.drawer}
                    PaperProps={{ square: false }, { style: { borderRadius: '15px 15px 0 0' } }}
                >
                    {list()}
                </SwipeableDrawer>

            </div>
        ) : null
    )
}
