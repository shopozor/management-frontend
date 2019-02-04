import types from 'src/types'

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
  const format = getters.formats[formatId]
  if (format) {
    const ordersIds = format.ordersIds
    return ordersIds.reduce((orders, orderId) => {
      orders[orderId] = getters.myOrdersToDeliver[orderId]
      return orders
    }, {})
  } else return {}
}

export const ordersOfFormatByState = (state, getters) => ({ formatId, orderState }) => {
  const ordersOfFormat = getters.ordersOfFormat({ formatId })
  return Object.entries(ordersOfFormat).reduce((filteredOrders, order) => {
    if (order[1] && order[1].state === orderState) {
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

export const pendingOrdersOfProductSummary = (state, getters) => ({ productId }) => {
  const product = getters.myProducts[productId]
  const formatsIds = product.formatsIds
  const formatsSummaries = formatsIds.map(formatId => {
    const summary = getters.pendingOrdersOfFormatSummary({ formatId })
    const format = getters.formats[formatId]
    if (format) summary.formatUI = format.formatUI
    else summary.formatUI = product.defaultFormatUI
    return summary
  })
  const productSummary = formatsSummaries.reduce((summary, formatSummary) => {
    summary.paid.hasAutoPrice = summary.paid.hasAutoPrice ||
      (formatSummary.formatUI === types.formatUI.AUTO_PRICE &&
      formatSummary.paid.amount > 0)
    summary.paid.amount += formatSummary.paid.amount
    summary.paid.customerPrice += formatSummary.paid.customerPrice
    summary.paid.ordersIds.push(formatSummary.paid.ordersIds)

    summary.notPaid.hasAutoPrice = summary.notPaid.hasAutoPrice ||
      (formatSummary.formatUI === types.formatUI.AUTO_PRICE &&
      formatSummary.notPaid.amount > 0)
    summary.notPaid.amount += formatSummary.notPaid.amount
    summary.notPaid.customerPrice += formatSummary.notPaid.customerPrice
    summary.notPaid.ordersIds.push(formatSummary.notPaid.ordersIds)
    return summary
  }, {
    paid: {
      hasAutoPrice: false,
      amount: 0,
      customerPrice: 0,
      ordersIds: []
    },
    notPaid: {
      hasAutoPrice: false,
      amount: 0,
      customerPrice: 0,
      ordersIds: []
    }
  })
  return productSummary
}
