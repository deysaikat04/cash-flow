import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { getAllTransactions, deleteTransaction, updateTransaction, getTransactionsByGrouped, getMonthsTransactions } from '../../actions/expenseAction';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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


const useStyles = makeStyles((theme) => ({
    itemExpense: {
        marginBottom: theme.spacing(1),
        background: '#ef53501f',
        borderRadius: '5px',
        borderLeft: '4px solid #ef5350',
        boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.2)',
        cursor: 'pointer',
    },
    itemIncome: {
        marginBottom: theme.spacing(1),
        background: '#8bc34a38',
        borderRadius: '5px',
        borderLeft: '4px solid #66bb6a',
        boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.2)',
        cursor: 'pointer',
    },
    avatarExpense: {
        background: '#ef9a9a94'
    },
    avatarIncome: {
        background: '#a5d6a794'
    },
    image: {
        width: 30,
        opacity: '0.6'
    },
    formControl: {
        margin: theme.spacing(2, 0),
        width: '100%',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

export default function TransactionList(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { id, transactionType, amount, category, description, transactionMode, createdAt, monthName } = props;

    const [open, setOpen] = useState(false);
    const [select, setSelect] = useState(false);
    const [updatedAmount, setUpdatedAmount] = useState(amount.toString());
    const [updatedCategory, setUpdatedCategory] = useState(category);
    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [updatedTransactionMode, setUpdatedTransactionMode] = useState(transactionMode);
    const [error, setError] = useState({ amount: false, category: false });

    const handleDialogOpen = () => {
        setOpen(true);
        setSelect(false);
        setUpdatedAmount(amount.toString());
        setUpdatedCategory(category);
        setUpdatedDescription(description);
        setUpdatedTransactionMode(transactionMode);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };
    const handleSelectClose = () => {
        setSelect(false);
    };

    const handleSelectOpen = () => {
        setSelect(true);
    };

    const handleTransactionMode = (type) => {
        setUpdatedTransactionMode(type);
    }

    const handleChange = event => {
        const { name, value } = event.target;
        validate(name, value);
    };

    const validate = (name, value) => {
        switch (name) {
            case 'amount':
                setUpdatedAmount(value);
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
                setUpdatedCategory(value);
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

            case 'description':
                setUpdatedDescription(value);
                break;
            default: break;
        }
    }

    const updatetransaction = () => {
        if (!updatedAmount == '' && !updatedCategory == '') {
            let token = sessionStorage.getItem('token');
            const data = {
                year: Number(createdAt.slice(-4)),
                amount: Number(updatedAmount),
                description: updatedDescription,
                category: updatedCategory,
                transactionMode: updatedTransactionMode,
                monthName,
                transactionType,
                createdAt,
                id
            };
            dispatch(updateTransaction(token, data));
            dispatch(getTransactionsByGrouped(token));
            dispatch(getMonthsTransactions(token, monthName));

        } else {
            amount === '' ? (
                setError({
                    ...error,
                    amount: true,
                })
            ) : setError({
                ...error,
                category: true,
            })
        }
        handleDialogClose();
    }

    const deleteItem = () => {
        let token = sessionStorage.getItem('token');
        const data = {
            year: Number(createdAt.slice(-4)),
            monthName,
            id
        };
        dispatch(deleteTransaction(token, data));
        handleDialogClose();

        dispatch(getAllTransactions(token));
        dispatch(getTransactionsByGrouped(token));
        dispatch(getMonthsTransactions(token, monthName));

    }

    return (
        <React.Fragment>
            <ListItem className={
                transactionType === 'Income' ? classes.itemIncome : classes.itemExpense
            } onClick={handleDialogOpen}>
                <ListItemAvatar>
                    {
                        transactionMode === 'Card' ? (
                            <img src='./img/credit-card.svg' className={classes.image} alt="card" />
                        ) : (
                                transactionMode === 'Cash' ? (
                                    <img src='./img/money.svg' className={classes.image} alt="cash" />
                                ) : <img src='./img/upi-icon.svg' className={classes.image} alt="upi" />
                            )
                    }
                </ListItemAvatar>
                <ListItemText
                    primary={'₹' + amount}
                    secondary={description}
                />
                <ListItemSecondaryAction>
                    <Typography variant="caption" style={{ display: 'block' }}>
                        {category}
                    </Typography>
                    <Typography variant="caption" style={{ display: 'block' }}>
                        {createdAt}
                    </Typography>
                </ListItemSecondaryAction>
            </ListItem>

            <Dialog
                open={open}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Edit
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleDialogClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={1}>

                            <Grid item xs={12} md={12} lg={12}>
                                <Typography variant="body1">
                                    {/* {createdAt}  */}
                                    {id}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={12} lg={12}>
                                <DialogContentText id="alert-dialog-description">
                                    {transactionType}
                                </DialogContentText>
                            </Grid>

                            {
                                transactionType === 'Expense' ? (
                                    <Grid item xs={12} md={12} lg={12}>
                                        <Chip
                                            variant="outlined"
                                            size="small"
                                            label="Cash"
                                            name="Cash"
                                            onClick={() => handleTransactionMode('Cash')}
                                            style={{
                                                backgroundColor: updatedTransactionMode === 'Cash' ? '#f9aa33' : null,
                                                marginRight: '8px',
                                                padding: '10px'
                                            }}
                                        />
                                        <Chip
                                            variant="outlined"
                                            style={{
                                                backgroundColor: updatedTransactionMode === 'Card' ? '#f9aa33' : null,
                                                marginRight: '16px',
                                                padding: '10px'
                                            }}
                                            size="small"
                                            label="Card"
                                            name="Card"
                                            onClick={() => handleTransactionMode('Card')}
                                        />
                                        <Chip
                                            variant="outlined"
                                            style={{
                                                backgroundColor: updatedTransactionMode === 'UPI' ? '#f9aa33' : null,
                                                marginRight: '16px',
                                                padding: '10px'
                                            }}
                                            size="small"
                                            label="UPI"
                                            name="UPI"
                                            onClick={() => handleTransactionMode('UPI')}
                                        />
                                    </Grid>

                                ) : null
                            }

                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    autoFocus
                                    color="secondary"
                                    variant="outlined"
                                    margin="dense"
                                    id="amount"
                                    name="amount"
                                    label="Amount*"
                                    value={updatedAmount}
                                    onChange={handleChange}
                                    fullWidth
                                    {...(error.amount && { error: true, helperText: 'This field is required.' })}
                                />
                            </Grid>

                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    autoFocus
                                    color="secondary"
                                    variant="outlined"
                                    margin="dense"
                                    id="description"
                                    name="description"
                                    label="Description"
                                    value={updatedDescription}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} md={12} lg={12}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel
                                        htmlFor="outlined-category"
                                        color="secondary">
                                        Category*
                                        </InputLabel>
                                    <Select
                                        margin="dense"
                                        open={select}
                                        onClose={handleSelectClose}
                                        onOpen={handleSelectOpen}
                                        value={updatedCategory}
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
                            </Grid>

                        </Grid>
                    </Container>



                </DialogContent>
                <DialogActions>
                    <Button color="secondary" autoFocus onClick={updatetransaction}>
                        Update
                                    </Button>
                    <Button onClick={deleteItem} autoFocus>
                        Delete
                                </Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}

TransactionList.propTypes = {
    transactionType: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
}
