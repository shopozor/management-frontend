import { setOrder, getUser, updateUser, getProduct, getFormat, updateFormat, updateProduct } from '../serverAccess'
import types from '../../../../../common/src/types'

export const orderFormats = ({ customerId, formatsAmounts }) => {
  Object.keys(formatsAmounts).map(formatId => {
    orderFormat({ customerId, formatId, amount: formatsAmounts[formatId] })
  })
}

export const orderFormat = ({ customerId, formatId, amount }) => {
  const productId = getFormat({ formatId }).productId
  const producerId = getProduct({ productId }).producerId
  const orderId = createOrderId({ customerId, productId, formatId })
  const customerPrice = calculatePrice({ formatId, amount })
  createOrder({ orderId, customerId, producerId, formatId, amount, customerPrice })
  recordOrderInCustomerData({ customerId, orderId })
  recordOrderInProducerData({ producerId, orderId })
  recordAndSummarizeOrderInFormatData({ formatId, orderId, customerPrice })
  summarizeOrdersInProductData({ productId, customerPrice })
}

const calculatePrice = ({ formatId, amount }) => getFormat({ formatId }).customerPrice * amount

export const recordOrderInCustomerData = ({ customerId, orderId }) => {
  const ordersToReceiveIds = getUser({ userId: customerId }).ordersToReceiveIds
  ordersToReceiveIds.push(orderId)
  updateUser({ userId: customerId, newProps: { ordersToReceiveIds } })
}

export const recordOrderInProducerData = ({ producerId, orderId }) => {
  const producer = getUser({ userId: producerId })
  const ordersToDeliverIds = producer.ordersToDeliverIds
  ordersToDeliverIds.push(orderId)
  updateUser({ userId: producerId, newProps: { ordersToDeliverIds } })
}

export const recordAndSummarizeOrderInFormatData = ({ formatId, orderId, customerPrice }) => {
  const format = getFormat({ formatId })
  const ordersIds = format.ordersIds
  ordersIds.push(orderId)
  const ordersSummary = format.ordersSummary
  ordersSummary.amount += 1
  ordersSummary.customerPrice += customerPrice
  updateFormat({ formatId, newProps: { ordersIds, ordersSummary } })
}

export const summarizeOrdersInProductData = ({ productId, customerPrice }) => {
  const ordersSummary = getProduct({ productId }).ordersSummary
  ordersSummary.amount += 1
  ordersSummary.customerPrice += customerPrice
  updateProduct({ productId, newProps: { ordersSummary } })
}

export const createOrder = ({ orderId, customerId, producerId, formatId, amount, customerPrice }) => {
  const order = {
    orderId,
    customerId,
    producerId,
    formatId,
    amount,
    customerPrice,
    state: types.orderState.PENDING_NOT_PAID
  }
  setOrder({ orderId, order })
}

export const createOrderId = ({ customerId, productId, formatId }) => `${customerId}/${productId}/${formatId}/order:${Date.now()}`
