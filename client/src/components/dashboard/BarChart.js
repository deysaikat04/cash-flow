import React, { Fragment } from 'react';
import Chart from "react-google-charts";
import Title from './Title';

export default function LineChart() {
    return (
        <Fragment>
            <Title>Last 4 Months</Title>
            <Chart
                width={"450px"}
                height={"250px"}
                style={{
                    textAlign: "center",
                    margin: "auto"
                }}
                chartType="Bar"
                loader={<div>Loading Chart...</div>}
                data={[
                    ["Month", "Income", "Expenses", "Savings", "Others"],
                    ["Jan", 14000, 8000, 2000, 100],
                    ["Feb", 14000, 7500, 2500, 200],
                    ["Mar", 20000, 15520, 3000, 300],
                    ["Apr", 20000, 5040, 3500, 445]
                ]}
                // For tests
                rootProps={{ "data-testid": "2" }}
            />
        </Fragment>
    );
}
