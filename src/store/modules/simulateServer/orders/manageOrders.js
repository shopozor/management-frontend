import { setOrder, getUser, updateUser, getFormat, updateFormat } from '../serverAccess'
import { amountDoesNotFallBelowPendingOrders } from '../validate'

export const orderFormatsAndSummarize = ({ customerId, formatsAmounts }) => {
  return Object.keys(formatsAmounts).reduce((summary, formatId) => {
    summary[formatId] = orderFormatAndSummarize({ customerId, formatId, amount: formatsAmounts[formatId] })
    return summary
  })
}

export const orderFormatAndSummarize = ({ customerId, formatId, amount }) => {
  if (amountDoesNotFallBelowPendingOrders({ formatId, addedOrdersAmount: amount })) {
    const orderId = createOrderId({ customerId, formatId })
    createOrder({ orderId, customerId, formatId, amount })
    recordOrderInCustomerData({ customerId, orderId })
    recordOrderInFormatData({ formatId, orderId })
  }
}

export const recordOrderInCustomerData = ({ customerId, orderId }) => {
  const orders = getUser({ userId: customerId }).orders
  orders.push(orderId)
  updateUser({ userId: customerId, newProps: { orders } })
}

export const recordOrderInFormatData = ({ formatId, orderId }) => {
  const orders = getFormat({ formatId }).orders
  orders.push(orderId)
  updateFormat({ formatId, newProps: { orders } })
}

export const createOrder = ({ orderId, customerId, formatId, amount }) => {
  const order = { customerId, formatId, amount }
  setOrder({ orderId, order })
}

export const createOrderId = ({ customerId, productId, formatId }) => `${customerId}/${productId}/${formatId}/order:${Date.now()}`
