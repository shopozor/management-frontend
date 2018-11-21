import types from '../../../types'

export const myOrdersToReceive = state => state.myOrdersToReceive
export const myOrdersToDeliver = state => state.myOrdersToDeliver

// returns an object of orders with the specified props, filtered by filterKey: filterValue
export const ordersPropsOfFilterPropValue = state => ({arrayOfPropsKeys, filterKey, filterValue}) => {
  return Object.entries(state.myOrdersToDeliver).reduce((filteredOrders, entry) => {
    if (entry[1][filterKey] === filterValue) {
      filteredOrders[entry[0]] = arrayOfPropsKeys.reduce((orderProps, key) => {
        orderProps[key] = entry[1][key]
        return orderProps
      }, {})
    }
    return filteredOrders
  }, {})
}

export const ordersOfFormat = (state, getters) => ({ formatId }) => {
  const ordersIds = getters.formats[formatId].ordersIds
  return ordersIds.reduce((orders, orderId) => {
    orders[orderId] = getters.myOrdersToDeliver[orderId]
    return orders
  }, {})
}

export const ordersOfFormatByState = (state, getters) => ({ formatId, orderState }) => {
  const ordersOfFormat = getters.ordersOfFormat({ formatId })
  return Object.entries(ordersOfFormat).reduce((filteredOrders, order) => {
    if (order[1].state === orderState) {
      filteredOrders[order[0]] = order[1]
    }
    return filteredOrders
  }, {})
}

const summarizeOrders = (orders) => {
  return Object.values(orders).reduce((summary, order) => {
    summary.amount = summary.amount + order.amount
    summary.customerPrice += order.customerPrice
    summary.ordersIds.push(order.orderId)
    return summary
  }, {
    amount: 0,
    customerPrice: 0,
    ordersIds: []
  })
}

export const pendingOrdersOfFormatSummary = (state, getters) => ({ formatId }) => {
  const paidOrders = getters.ordersOfFormatByState({ formatId, orderState: types.orderState.PENDING_PAID })
  const paid = summarizeOrders(paidOrders)
  const notPaidOrders = getters.ordersOfFormatByState({ formatId, orderState: types.orderState.PENDING_NOT_PAID })
  const notPaid = summarizeOrders(notPaidOrders)
  return {
    paid,
    notPaid
  }
}
