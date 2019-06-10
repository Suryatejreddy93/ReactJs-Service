// Reward.js
import React, { Component } from 'react';
import { sampleRequest } from '../data/CustomerData.js'
import { calculateRewardPoints } from '../utils/utils'

const texStyle = {
  padding: '0px 30px',
  width: '50%',
};

const texStyleColor = {
  fontWeight: 'bold',
  color: 'green',
  padding: '0px 30px',
  width: '50%',
};

const rowStyle = {
}
const rowHeading = {
  color: "blue",
  fontWeight: 'bold',
  fontSize: '20px',
  padding: '10px'
}
const total = {
  color: 'green',
  fontWeight: 'bold',
  fontSize: '20px',
  borderBottom: '1px solid',
  padding: '10px'
}

class Rewards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: []
    }
  }

componentDidMount(){
 let response = calculateRewardPoints(sampleRequest)
 this.setState({ customers: response })
}
  render() {
    const customers = this.state.customers || []
    return (
      <div>
        {
          customers.map((customer) =>
          <div>
            <div style = {rowHeading}> {`CustomerId : ${customer.customerId}`} </div>
            <div> {customer.retailTransaction && customer.retailTransaction.map(transaction => {
              return (<div style={rowStyle}>
                 <p>
                   <span style={texStyle}>
                    {`Month : ${transaction.period.substr(0, transaction.period.indexOf('T'))}`}
                   </span>
                   <span style={texStyle}>
                    {`Amount Spent : ${transaction.amountSpent}`}
                   </span>
                   <span style={texStyleColor}>
                    {`Points Earned : ${transaction.totalEarnedPoints}`}
                   </span>
                 </p>
                </div>)

            })}
            <div>
              {customer.monthlyEarnedPoints && customer.monthlyEarnedPoints.map(monthRecord => {
                return (<div style={rowStyle}>
                   <p>
                     <span style={texStyle}>
                      {`Reward points earned in ${monthRecord.month} : `}
                     </span>
                     <span style={texStyleColor}>
                      {` ${monthRecord.monthlyEarnedPoints}`}
                     </span>
                   </p>
                  </div>)

              })}
             </div>
            <div style={total}> {`Total Points Earned : ${customer.totalPoints}`}</div>
            </div>
          </div>
        )}
      </div>
    )}
  }

export default Rewards;
