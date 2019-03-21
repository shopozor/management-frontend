import * as manageOrders from './manageOrders'
import * as server from '../serverAccess'
import * as rejectIf from '../rejectIf'
import types from '../../../../../common/src/types'

const delayInMs = 200

export const orderFormats = ({ userId, token, orders }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      rejectIf.tokenIsInvalid('orderFormats', reject, { userId, token })
      rejectIf.userHasNotAuthorizations('orderFormats', reject, { userId, authorizations: [types.auth.CUSTOMER] })
      rejectIf.somePendingOrdersAmountExceedsFormatAmount('orderFormats', reject, { orders })

      manageOrders.orderFormats({ customerId: userId, orders })
      resolve({
        message: `[orderFormats] Orders may have been submitted. Check balance sheet.`,
        myOrdersToReceive: server.getOrdersToReceiveOfCustomer({ userId })
      })
    }, delayInMs)
  })
}

export const getMyOrdersToReceive = ({ userId, token }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      rejectIf.tokenIsInvalid('getMyOrdersToReceive', reject, { userId, token })
      resolve({
        message: `[getMyOrdersToReceive] Your orders to receive have been successfully sent.`,
        myOrdersToReceive: server.getOrdersToReceiveOfCustomer({ userId })
      })
    }, delayInMs)
  })
}

export const getMyOrdersToDeliver = ({ userId, token }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      rejectIf.tokenIsInvalid('getMyOrdersToDeliver', reject, { userId, token })
      resolve({
        message: `[getMyOrdersToDeliver] Your orders to deliver have been successfully sent.`,
        myOrdersToDeliver: server.getOrdersToDeliverOfProducer({ userId })
      })
    }, delayInMs)
  })
}
