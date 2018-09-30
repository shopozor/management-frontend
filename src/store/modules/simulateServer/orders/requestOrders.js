import * as manageOrders from './manageOrders'
import {tokenIsValid, userHasAuthorizations} from '../validate'
import types from '../../../types'

const delayInMs = 200

export const orderFormats = ({ userId, token, formatsAmounts }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        tokenIsValid({ userId, token }) &&
        userHasAuthorizations({ userId, authorizations: [types.auth.CONSUMER] })
      ) {
        const balanceSheet = manageOrders.orderFormats({ customerId: userId, formatsAmounts })
        resolve(balanceSheet)
      } else {
        reject(new Error('[orderProducts] You are not authorized to submit an order.'))
      }
    }, delayInMs)
  })
}
