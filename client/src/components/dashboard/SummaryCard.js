import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  marginTop: {
    marginTop: theme.spacing(1),
  },
  paperExpense: {
    background: theme.palette.type === "light" ? "#c82b3d" : "#9e312f",
    height: 80,
    textAlign: "center",
    color: "#ffffff",
    borderRadius: "0 10px 10px 0",
    boxShadow:
      theme.palette.type === "light"
        ? "0 3px 5px 0 #c55b67"
        : "2px 4px 4px 0 #382a1c",
  },
  paperIncome: {
    background: theme.palette.type === "light" ? "#4caf50" : "#47824a",
    height: 80,
    textAlign: "center",
    color: "#ffffff",
    borderRadius: "10px 0 0 10px",
    boxShadow:
      theme.palette.type === "light"
        ? "0 3px 5px 0 #6eab7191"
        : "2px 4px 4px 0 #382a1c",
  },
  paperBalance: {
    background: theme.palette.type === "light" ? "#f3aa3c" : "#ce8133",
    height: 85,
    textAlign: "center",
    color: "#ffffff",
    marginTop: "-3px",
    borderRadius: "5px",
    boxShadow:
      theme.palette.type === "light"
        ? "0 3px 5px 0 #ffbd5abf"
        : "2px 4px 4px 0 #382a1c",
  },
  arrow: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    width: 40,
    height: 40,
    backgroundColor: "#00000033",
    borderRadius: "25px",
  },
  fadeText: {
    color: "#fbfafa8c",
  },

  balance: {
    marginTop: theme.spacing(1),
    padding: "8px 5px",
  },
  monthHeader: {
    color: "#cccccc",
    margin: "4px auto",
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.dark,
    width: "50%",
    height: "30px",
    borderRadius: "25px 25px 0 0",
    boxShadow: "0px 4px 10px 0px rgba(0, 0, 0,0.4)",
    paddingTop: "3px",
  },
}));

export default function SummaryCard(props) {
  const classes = useStyles();

  const state = useSelector((state) => ({
    expenses: state.expenses,
  }));

  const [data, setData] = useState([]);

  const [expenses, setExpenses] = useState(0);
  const [income, setIncome] = useState(0);
  const [balance, setBalance] = useState(0);

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const calculate = () => {
    var expense = 0;
    var income = 0;
    data.map((elem) => {
      if (elem.transactionType === "Expense") {
        expense += elem.amount;
      } else {
        income += elem.amount;
      }
    });

    setExpenses(expense);
    setIncome(income);
    setBalance(income - expenses);
    return null;
  };

  useEffect(() => {
    setData(state.expenses.monthlyItems);
    calculate();
  }, [state]);

  return (
    <React.Fragment>
      <div className={classes.monthHeader}>
        <Typography variant="body2">{month[new Date().getMonth()]}</Typography>
      </div>
      <Grid item sm={12} xs={12} md={12} lg={12}>
        <Grid container spacing={1}>
          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            lg={4}
            className={classes.paperIncome}
          >
            <div className={classes.marginTop}>
              <Typography
                variant="caption"
                gutterBottom
                className={classes.fadeText}
              >
                Income
              </Typography>
              <Typography variant="body1" gutterBottom>
                ₹{income}
              </Typography>
            </div>
          </Grid>

          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            lg={4}
            className={classes.paperBalance}
          >
            <div className={classes.marginTop}>
              <Typography
                variant="caption"
                gutterBottom
                className={classes.fadeText}
              >
                Balance
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                style={{ fontSize: "20px" }}
              >
                ₹{balance}
              </Typography>
            </div>
          </Grid>

          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            lg={4}
            className={classes.paperExpense}
          >
            <div className={classes.marginTop}>
              <Typography
                variant="caption"
                gutterBottom
                className={classes.fadeText}
              >
                Spending
              </Typography>
              <Typography variant="body1" gutterBottom>
                ₹{expenses}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
