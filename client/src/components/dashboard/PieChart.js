import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Title from './Title';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Doughnut } from 'react-chartjs-2';


const useStyles = makeStyles((theme) => ({
    subheader: {
        color: '#9a9a9a',
    }
}));
export default function PieChart(props) {
    const classes = useStyles();

    // const { transactions } = props;
    var transactions = [];

    const { expenses } = useSelector(state => ({
        expenses: state.expenses.monthlyItems
    }), shallowEqual);

    const [labels] = useState([]);
    const [data] = useState([]);

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: ["#4073f4", "#01f6bf", "#5336df", "#ff8151"],
                hoverBackgroundColor: [
                    "#2660f9",
                    "#05d8ae",
                    "#4021d2",
                    "#f9723d"
                ]
            }
        ]
    })

    // Accepts the array and key
    const groupBy = (array, key) => {
        // Return the end result
        return array.reduce((result, currentValue) => {
            // If an array already present for key, push it to the array. Else create an array and push the object
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
            return result;
        }, {}); // empty object is the initial value for result object
    };

    const remove = (item) => {
        let i = labels.indexOf(item);
        if (i > -1) {
            labels.splice(i, 1);
            data.splice(i, 1);
        }
        return null;
    }
    useEffect(() => {
        if (expenses) {
            transactions = expenses;

            if (transactions.length === expenses.length) {
                const transactionTypesObj = groupBy(expenses, 'transactionType');
                if (transactionTypesObj.Expense) {

                    var expensesObj = groupBy(transactionTypesObj.Expense, 'category');

                }

                for (var item in expensesObj) {
                    var grand = 0;
                    expensesObj[item].map(innerItem => {
                        if (innerItem.transactionType === 'Expense') {
                            grand += innerItem.amount
                        }
                    })

                    remove(item);
                    data.push(grand);
                    labels.push(item)
                }
            }

            setChartData({
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: ["#4073f4", "#01f6bf", "#5336df", "#ff8151"],
                        hoverBackgroundColor: [
                            "#2660f9",
                            "#05d8ae",
                            "#4021d2",
                            "#f9723d"
                        ]
                    }
                ]
            })

        }
    }, [expenses]);

    const month = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];



    const chart = () => {
        return (
            <Doughnut
                width={300}
                height={150}
                data={
                    chartData
                }
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            boxWidth: 20,
                        }
                    },
                }} />
        )
    }

    return (
        <Fragment>
            <Title>Spending</Title>
            <Typography variant="body1" gutterBottom className={classes.subheader}>
                {month[new Date().getMonth()]} {" "}
                {new Date().getFullYear()}
            </Typography>
            {/* <Typography>sdfdsfsdf</Typography>
            {
                labels.map((item, i) => {
                    return <Typography>{item} - {data[i]}</Typography>
                })
            } */}
            { expenses ? (
                chart()
            ) : <div></div>}

        </Fragment>
    );
}
