import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const useStyles = makeStyles((theme) => ({
    itemExpense: {
        marginBottom: theme.spacing(1),
        background: '#ef53501f',
        borderRadius: '5px',
        borderLeft: '4px solid #ef5350',
        boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.2)',
    },
    itemIncome: {
        marginBottom: theme.spacing(1),
        background: '#8bc34a38',
        borderRadius: '5px',
        borderLeft: '4px solid #66bb6a',
        boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.2)',
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
}));

export default function TransactionList(props) {
    const classes = useStyles();
    const { transactionType, amount, category, transactionMode, createdAt } = props;



    return (
        <React.Fragment>
            <ListItem className={
                transactionType === 'Income' ? classes.itemIncome : classes.itemExpense
            }>
                <ListItemAvatar>
                    {transactionMode === 'Card' ? (
                        <img src='./img/credit-card.svg' className={classes.image} alt="card" />
                    ) : <img src='./img/money.svg' className={classes.image} alt="cash" />
                    }
                </ListItemAvatar>
                <ListItemText
                    primary={'₹' + amount}
                    secondary={category}
                />
                <ListItemSecondaryAction>
                    <Typography variant="caption" style={{ display: 'block' }}>
                        {createdAt}
                    </Typography>
                </ListItemSecondaryAction>
            </ListItem>

        </React.Fragment>
    );
}

TransactionList.propTypes = {
    transactionType: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
}
