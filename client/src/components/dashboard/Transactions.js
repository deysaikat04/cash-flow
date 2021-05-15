import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";
import TransactionList from "./TransactionList";

const useStyles = makeStyles((theme) => ({
  itemExpense: {
    marginBottom: theme.spacing(1),
    background: "#ef53501f",
    borderRadius: "5px",
    borderLeft: "4px solid #ef5350",
    boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.2)",
  },
  itemIncome: {
    marginBottom: theme.spacing(1),
    background: "#8bc34a38",
    borderRadius: "5px",
    borderLeft: "4px solid #66bb6a",
    boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.2)",
  },
  avatarExpense: {
    background: "#ef9a9a94",
  },
  avatarIncome: {
    background: "#a5d6a794",
  },
  center: {
    textAlign: "center",
  },
  img: {
    width: 100,
    height: 100,
  },
}));

export default function Transactions(props) {
  const classes = useStyles();
  const { userid, showAll, monthName } = props;

  const { data } = props;

  return (
    <React.Fragment>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container spacing={1}>
          {!showAll ? (
            <Fragment>
              <Grid item xs={9} sm={9} md={9} lg={9}>
                <Title>List of Transactions</Title>
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3}>
                <Link to="/transactions">
                  <Typography
                    variant="caption"
                    style={{
                      color: "#a2a2a2",
                      float: "right",
                    }}
                  >
                    View all
                  </Typography>
                </Link>
              </Grid>
            </Fragment>
          ) : null}
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} sm={12}>
            <div className={classes.demo}>
              <List dense>
                {data.length !== 0 ? (
                  data.map((item, index) => {
                    return (
                      <TransactionList
                        key={index}
                        userid={userid}
                        id={item._id}
                        amount={item.amount}
                        createdAt={item.createdAt}
                        description={item.description}
                        transactionMode={item.transactionMode}
                        transactionType={item.transactionType}
                        category={item.category}
                        monthName={monthName}
                      />
                    );
                  })
                ) : (
                  <Fragment>
                    <div className={classes.center}>
                      <img
                        src="/img/empty.svg"
                        alt="blank_budget"
                        className={classes.img}
                      />
                    </div>
                  </Fragment>
                )}
              </List>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
