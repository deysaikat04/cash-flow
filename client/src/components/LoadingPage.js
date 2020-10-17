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
import Header from '../components/dashboard/Header';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        },
    },
    selected: {},
    marginTop: {
        marginTop: '24px',
    },
    content: {
        flexGrow: 1,
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        alignItem: 'center',
        margin: 'auto',
        textAlign: 'center',

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


    return (
        <div className={classes.root}>

            <CssBaseline />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Fragment>

                    <Header {...props} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container >

                            <Grid item xs={12} md={12} lg={12} className={classes.marginTop}>
                                <CircularProgress />

                            </Grid>
                            <Grid item xs={12} md={12} lg={12} className={classes.marginTop}>

                                Your content is loading...
                            </Grid>


                        </Grid>

                    </Container>

                </Fragment>

            </main>


        </div>
    );

}
