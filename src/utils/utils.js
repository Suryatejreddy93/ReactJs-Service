import _ from 'lodash'
import moment from 'moment'

const REWARD_POINTS_50 = 50
const REWARD_POINTS_100 = 100

export function calculateRewardPoints(data) {
_.map(data.retailCustomers, (retailCustomer) => {
  let retailTransactions = _.get(retailCustomer, 'retailTransaction')
  let totalEarnedPoints = 0
  let totalPoints = 0
  let trasactionRecordsMonths = []
  _.map(retailTransactions, (transaction) => {
    let pointsEarned = 0
    const amountSpent = _.get(transaction, 'amountSpent')
    if(amountSpent > REWARD_POINTS_100) {
      pointsEarned = (amountSpent - REWARD_POINTS_100)*2 + REWARD_POINTS_50
    } else if ((amountSpent > REWARD_POINTS_50) && (amountSpent <= REWARD_POINTS_100)) {
      pointsEarned = amountSpent - REWARD_POINTS_50
    }
    totalEarnedPoints = pointsEarned
    _.assign(transaction, {'totalEarnedPoints' : totalEarnedPoints})
    totalPoints += totalEarnedPoints

    let timeStamp = _.get(transaction, 'period')
    let date = moment(timeStamp, 'YYYY-MM-DD')
    let monthIndex = date.month()
    let monthName = date.format('MMMM')
    let monthAlreadyFound = _.find(trasactionRecordsMonths, (record) => {
      return record.index === monthIndex
    })
    if(!_.isNil(monthAlreadyFound)){
      monthAlreadyFound.monthlyEarnedPoints += pointsEarned
    } else {
      trasactionRecordsMonths.push({'month': monthName , 'index': monthIndex, 'monthlyEarnedPoints': pointsEarned })
    }
  })
  _.assign(retailCustomer, {'totalPoints': totalPoints})
  _.assign(retailCustomer, {'monthlyEarnedPoints': trasactionRecordsMonths})
})
return data.retailCustomers
}
