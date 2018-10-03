import { setOrder, getUser, updateUser, getFormat, updateFormat } from '../serverAccess'
import types from '../../../../types'

export const orderFormats = ({ customerId, formatsAmounts }) => {
  Object.keys(formatsAmounts).map(formatId => {
    orderFormat({ customerId, formatId, amount: formatsAmounts[formatId] })
  })
}

export const orderFormat = ({ customerId, formatId, amount }) => {
  const orderId = createOrderId({ customerId, formatId })
  createOrder({ orderId, customerId, formatId, amount })
  recordOrderInCustomerData({ customerId, orderId })
  recordOrderInFormatData({ formatId, orderId })
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
  const order = {
    orderId,
    customerId,
    formatId,
    amount,
    cost: getFormat({ formatId }).customerPrice * amount,
    state: types.orderState.PENDING_NOT_PAID
  }
  setOrder({ orderId, order })
}

export const createOrderId = ({ customerId, productId, formatId }) => `${customerId}/${productId}/${formatId}/order:${Date.now()}`
