import { readServer, updateServer } from './serverAccess'
import { getUser, updateUser } from './manageUsers'
import { getProducts } from './manageProducts'
import { updateStock } from './manageStock'

export const orderProducts = ({ email, userId, productIds }) => {

}

export const orderProduct = ({ customerId, productId, formatId }) => {
  const orderId = recordOrderReference({ customerId, productId, formatId })
  recordOrderInCustomerData({ customerId, orderId })
  recordOrderInProductStock({ productId, formatId, orderId })
}

export const recordOrderInCustomerData = ({ customerId, orderId }) => {
  const customerOrders = getUser({ userId: customerId }).orders
  customerOrders.push(orderId)
  updateUser({ userId: customerId, newProps: { orders: customerOrders } })
}

export const recordOrderInProductStock = ({ productId, formatId, orderId }) => {

}

export const recordOrderReference = ({ customerId, productId, formatId }) => {
  const orderId = createOrderId({ customerId, productId, formatId })
  updateOrders({ newOrders: { [orderId]: { customerId, productId, formatId } } })
  return orderId
}

export const createOrderId = ({ customerId, productId, formatId }) => `${customerId}/${productId}/${formatId}/order:${Date.now()}`

export const getProducerOrders = ({ userId, email }) => {
  const producerOrdersIds = getProducerOrders({ userId, email })
  return getOrdersFromIds({ idsArray: producerOrdersIds })
}

export const getProducerOrdersIds = ({ userId, email }) => getUser({ userId, email }).getProducerOrdersIds

export const getCustomerOrders = ({ userId, email }) => {
  const customerOrdersIds = getCustomerOrdersIds({ userId, email })
  return getOrdersFromIds({ idsArray: customerOrdersIds })
}

export const getCustomerOrdersIds = ({ userId, email }) => getUser({ userId, email }).customerOrdersIds

export const getOrdersFromIds = ({ idsArray }) => {
  return idsArray.reduce((orders, id) => {
    orders[id] = getOrders()[id]
    return orders
  }, {})
}

export const updateOrders = ({ newOrders }) => {
  updateServer({ ...getOrders, ...newOrders })
}

export const getOrders = () => readServer().orders
