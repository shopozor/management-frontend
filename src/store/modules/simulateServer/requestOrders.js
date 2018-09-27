import * as manageOrders from './manageOrders'
import * as validate from './validate'
import types from '../../../types'

const delayInMs = 200

export const orderProducts = ({ userId, token, productsIds }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        validate.tokenIsValid({ userId, token }) &&
        validate.userHasAuthorizations({ userId, authorizations: [types.auth.CONSUMER] })
      ) {
        resolve(manageOrders.orderProducts({ userId, productsIds }))
      } else {
        reject(new Error('[ORDER_PRODUCTS] you are not authorized to submit an order'))
      }
    }, delayInMs)
  })
}
