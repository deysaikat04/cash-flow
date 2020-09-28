import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Chip from '@material-ui/core/Chip';

import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { addTransactions } from '../actions/expenseAction';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
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

const expenseCategoryArray = [
    "Others",
    "Groceries",
    "Shopping",
    "Medical",
    "Bill",
    "Food",
    "Travel"
];

const incomeCategoryArray = [
    "Others",
    "Salary"
];

const GreenCheckbox = withStyles({
    root: {
        color: '#a2a2a2',
        '&$checked': {
            color: '#f9aa33',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} size="small" />);

export default function AddData(props) {
    const classes = useStyles();
    const history = useHistory();

    const dispatch = useDispatch();
    // const state = dispatch(getExpenses());

    const { user } = useSelector(state => ({
        user: state.user
    }));

    const { month } = props;
    const { theme } = props;

    const [transactionType, setTransactionType] = useState('Expense');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [open, setOpen] = useState(false);
    const [error, setError] = useState({ amount: false, category: false });
    const [formMsg, setFormMsg] = useState({ type: '', msg: '' });
    const [multiple, setMultiple] = useState(false);
    const [multipleAmount, setMultipleAmount] = useState();
    const [transactionMode, setTransactionMode] = useState('Cash');
    const [alert, setAlert] = useState(false);

    const [voicePressed, setVoicePressed] = useState(false);

    const { transcript, resetTranscript } = useSpeechRecognition();
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        alert('Not working in this browser');
    }


    const handleMultiple = () => {
        setMultiple(!multiple);
    };

    const handleAlert = () => {
        setAlert(true);
    };

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert(false);
    };

    const handleTypeChange = (e) => {
        setTransactionType(e.target.value);
        reset();
    }

    const handleChange = event => {
        const { name, value } = event.target;
        validate(name, value);
    };

    const handleDescChange = event => {
        const { value } = event.target;
        if (transcript) {
            setDescription(transcript);
            resetTranscript();
        }
        else setDescription(value);
    };

    const validate = (name, value) => {
        switch (name) {
            case 'amount':
                setAmount(value);
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

            case 'category':
                setCategory(value);
                if (value === '') {
                    setError({
                        ...error,
                        category: true
                    })
                } else {
                    setError({
                        ...error,
                        category: false
                    })
                }
                break;
            default: break;
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!amount == '' && !category == '') {
            const data = {
                year: new Date().getFullYear(),
                monthName: month[new Date().getMonth()],
                transactionType,
                amount: Number(amount),
                description: description ? description : 'None',
                category,
                transactionMode,
                createdAt: new Date().toDateString(),
                userId: user.id
            }
            // console.log(data);
            dispatch(addTransactions(data));

            setFormMsg({
                ...formMsg,
                type: 'success',
                msg: 'Transaction is successfully saved.'
            });
        } else {
            setFormMsg({
                ...formMsg,
                type: 'error',
                msg: 'Error while saving!'
            });
        }

        handleAlert();
        reset();

    }

    const addMultiple = e => {
        var code = (e.keyCode ? e.keyCode : e.which);
        var amountArr = [];
        if (code === 13 || code === 32) { //Enter or Space keycode
            var toSplit = code === 13 ? '\n' : ' ';
            amountArr = multipleAmount.split(toSplit);
            var sum = amountArr.reduce(function (a, b) {
                return Number(a) + Number(b);
            }, 0);

            setAmount(sum);
        }
    }

    const reset = () => {
        setAmount('');
        setDescription('');
        setCategory('');
        setMultipleAmount();
        setError({ amount: false, category: false });
        setMultiple(false);
        setMultipleAmount();
        resetTranscript();
        setVoicePressed(false);
    };

    const handleClick = (type) => {
        setTransactionMode(type);
    };

    const handleVoiceToDescription = () => {
        !voicePressed ? SpeechRecognition.startListening() : SpeechRecognition.stopListening();
        setDescription(transcript);
        setVoicePressed(!voicePressed);
    }

    if (!user.isLoggedin) {
        return <Redirect to="/login" />

    } else return (
        <div className={classes.root}
            style={{
                background: transactionType === 'Income' ? (
                    theme ? 'linear-gradient( #dcedc8 60%, #fafafa)' : 'linear-gradient(#4f6f2938 60%, #303030)') : (
                        theme ? 'linear-gradient( #ffdcdc 60%, #fafafa)' : 'linear-gradient(#ef53501f 60%, #303030)'),
                marginBottom: multiple ? '48px' : '0px',
            }}>
            <CssBaseline />
            <AppBar position="static"
                style={{
                    background: 'transparent', boxShadow: 'none',
                    color: theme ? '#4a4a4a' : '#ffffff'
                }}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                        onClick={() => history.push('/')}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Add Transaction
                    </Typography>

                </Toolbar>
            </AppBar>
            <main>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12} sm={12} >
                            <Typography variant="body1">Type: </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="position" name="position" defaultValue="top"
                                    value={transactionType}
                                    onChange={handleTypeChange}
                                >
                                    <FormControlLabel
                                        value="Expense"
                                        control={<Radio color="secondary" selected />}
                                        label="Expense"
                                    />
                                    <FormControlLabel
                                        value="Income"
                                        control={<Radio color="secondary" />}
                                        label="Income"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        {
                            transactionType === 'Expense' ? (
                                <Fragment>
                                    <Grid item xs={6} sm={6} md={6} lg={6}>
                                        <FormControlLabel
                                            control={
                                                <GreenCheckbox
                                                    checked={multiple}
                                                    onChange={handleMultiple}
                                                    name="isMultiple" />
                                            }
                                            label="Multiple amount"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12} sm={12} >
                                        <Chip
                                            variant="outlined"
                                            size="small"
                                            label="Cash"
                                            name="Cash"
                                            onClick={() => handleClick('Cash')}
                                            style={{
                                                backgroundColor: transactionMode === 'Cash' ? '#f9aa33' : null,
                                                marginRight: '8px',
                                                padding: '10px'
                                            }}
                                        />
                                        <Chip
                                            variant="outlined"
                                            style={{
                                                backgroundColor: transactionMode === 'Card' ? '#f9aa33' : null,
                                                marginRight: '16px',
                                                padding: '10px'
                                            }}
                                            size="small"
                                            label="Card"
                                            name="Card"
                                            onClick={() => handleClick('Card')}
                                        />
                                    </Grid>
                                </Fragment>
                            ) : <div></div>
                        }

                        <Grid item xs={12} md={12} sm={12} >

                            <form className={classes.form} onSubmit={handleSubmit}>

                                <TextField
                                    variant="outlined"
                                    color="secondary"
                                    margin="normal"
                                    fullWidth
                                    name="date"
                                    label="Date"
                                    id="date"
                                    defaultValue={new Date().toDateString()}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                {multiple && transactionType === 'Expense' ? (
                                    <TextField
                                        variant="outlined"
                                        color="secondary"
                                        margin="normal"
                                        fullWidth
                                        name="amount"
                                        label="Multiple Amount"
                                        type="number"
                                        id="amount"
                                        autoComplete="amount"
                                        placeholder="0"
                                        multiline
                                        rows={2}
                                        value={multipleAmount}
                                        onChange={(e) => setMultipleAmount(e.target.value)}
                                        onKeyDown={addMultiple}
                                        helperText="Press enter after each amounts."
                                    />
                                ) : <></>}
                                <TextField
                                    variant="outlined"
                                    color="secondary"
                                    margin="normal"
                                    fullWidth
                                    name="amount"
                                    label="Amount"
                                    type="number"
                                    id="amount"
                                    autoComplete="amount"
                                    placeholder="0"

                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                        readOnly: multiple ? true : false,
                                    }}
                                    value={amount}
                                    onChange={handleChange}
                                    {...(error.amount && { error: true, helperText: 'This field is required.' })}

                                />

                                <TextField
                                    variant="outlined"
                                    color="secondary"
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="Description"
                                    name="description"
                                    InputProps={{
                                        endAdornment: (
                                            < InputAdornment position="end" >
                                                <IconButton
                                                    aria-label="toggle voice to text"
                                                    onClick={handleVoiceToDescription}
                                                // onMouseDown={handleMouseDownVoiceToText}
                                                >
                                                    {voicePressed ? (
                                                        <SettingsVoiceIcon color="secondary" />
                                                    ) : <SettingsVoiceIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    value={voicePressed ? transcript : description}
                                    onChange={handleDescChange}
                                    helperText={
                                        voicePressed ? "Listening..." : "Click on audio icon for voice input."
                                    }
                                />
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel
                                        htmlFor="outlined-category"
                                        color="secondary">
                                        Category
                                        </InputLabel>
                                    <Select
                                        open={open}
                                        onClose={handleClose}
                                        onOpen={handleOpen}
                                        value={category}
                                        onChange={handleChange}
                                        label="Category"
                                        color="secondary"
                                        inputProps={{
                                            name: 'category',
                                            id: 'outlined-category',
                                        }}
                                        {...(error.category && { error: true, helperText: 'This field is required.' })}
                                    >
                                        {
                                            transactionType === 'Expense' ? (
                                                expenseCategoryArray.map(name => {
                                                    return (
                                                        <MenuItem value={name} key={name}>{name}</MenuItem>
                                                    )
                                                })
                                            ) : (
                                                    incomeCategoryArray.map(name => {
                                                        return (
                                                            <MenuItem value={name} key={name}>{name}</MenuItem >
                                                        )
                                                    })
                                                )
                                        }

                                    </Select>
                                </FormControl>

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
                formMsg.type ? (
                    <Snackbar open={alert} autoHideDuration={2000} onClose={handleAlertClose}
                        style={{ marginBottom: '32px' }}>
                        <Alert onClose={handleAlertClose} severity={formMsg.type === 'error' ? 'error' : 'success'}>
                            {formMsg.msg}
                        </Alert>
                    </Snackbar>
                ) : <Snackbar open={alert} autoHideDuration={2000} onClose={handleAlertClose}
                    style={{ marginBottom: '32px' }}>
                        <Alert onClose={handleAlertClose} severity='error'>
                            Please fill the fields first!
                        </Alert>
                    </Snackbar>
            }
        </div>
    )
}