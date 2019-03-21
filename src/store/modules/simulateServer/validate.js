import { getServer, getUser, getFormat, getProduct, getOrdersAmountsOfFormat } from './serverAccess'
import types from '../../../../common/src/types'

const objectsUpdatableProps = {
  format:
    [
      'description',
      'size',
      'sizeUnit',
      'customerPrice',
      'customerPriceUnit',
      'formatUI',
      'state',
      'amount',
      'stockUnit',
      'densities'
    ],
  product:
    [
      'title',
      'description',
      'image',
      'conservationDays',
      'conservationMethod',
      'categories',
      'state',
      'force',
      'defaultFormatUI',
      'defaultCustomerPrice',
      'defaultUnit'
    ]
}

export const userDoesExist = ({ userId, email }) => {
  const users = getServer().users
  const userIdExists = userId && Object.keys(users).some(key => key === userId)
  const emailExists = email && Object.values(users).some(user => user.email === email)
  return userIdExists || emailExists
}

export const passwordIsValid = ({ userId, email, password }) => {
  const user = getUser({ userId, email })
  return password === user.password
}

export const userIsActive = ({ userId, email }) => getUser({ userId, email }).state === types.userState.ACTIVE

export const tokenIsValid = ({ userId, email, token }) => {
  const user = getUser({ userId, email })
  return token && user && token === user.token
}

export const userHasAuthorizations = ({ userId, email, authorizations }) => {
  const user = getUser({ userId, email })
  return authorizations.every(required => user.authorizations.some(available => available === required))
}

export const userOwnsFormat = ({ userId, email, formatId }) => {
  const productId = getFormat({ formatId }).productId
  return userOwnsProduct({ userId, email, productId })
}

export const userOwnsProduct = ({ userId, email, productId }) => {
  const ownedProducts = getUser({ userId, email }).productsIds
  return ownedProducts.some(id => id === productId)
}

export const productIsValid = ({ product }) => {
  return product.title !== undefined
}

export const productWillNotDisappear = ({ productId, newState }) => {
  const oldState = getProduct({ productId }).state
  return oldState !== types.productState.VISIBLE || newState === types.productState.VISIBLE
}

export const productHasNoPendingOrders = ({ productId }) => {
  const formatsIds = getProduct({ productId }).formatsIds
  return formatsIds.every(formatId => formatHasNoPendingOrder({ formatId }))
}

export const productOwnsFormat = ({ productId, formatId }) => getProduct({ productId }).formats.includes(formatId)

export const newFormatIsValid = ({ newFormat }) => {
  return newFormat.size && newFormat.unit && newFormat.price && newFormat.amount && newFormat.interface
}

export const formatsHaveNoPendingOrder = ({ formatsIds }) => {
  return formatsIds.every(formatId => formatHasNoPendingOrder({ formatId }))
}

export const formatHasNoPendingOrder = ({ formatId }) => {
  const amount = getOrdersAmountsOfFormat({
    formatId,
    requiredStates: [
      types.orderState.PENDING_NOT_PAID,
      types.orderState.PENDING_PAID
    ]
  })
  return amount === 0
}

export const formatWillNotDisappear = ({ formatId, newState }) => {
  const oldState = getFormat({ formatId }).state
  return oldState !== types.formatState.VISIBLE || newState === types.formatState.VISIBLE
}

export const formatAmountDoesNotFallBelowPendingOrders = ({ formatId, newFormatAmount }) => {
  const pendingOrdersAmount = getOrdersAmountsOfFormat({
    formatId,
    requiredStates: [
      types.orderState.PENDING_NOT_PAID,
      types.orderState.PENDING_PAID
    ]
  })
  return newFormatAmount >= pendingOrdersAmount
}

export const pendingOrdersAmountDoesNotExceedFormatAmount = ({ formatId, addedOrdersAmount }) => {
  const oldPendingOrdersAmount = getOrdersAmountsOfFormat({
    formatId,
    requiredStates: [
      types.orderState.PENDING_NOT_PAID,
      types.orderState.PENDING_PAID
    ]
  })
  const formatAmount = getFormat({ formatId }).amount
  return formatAmount >= oldPendingOrdersAmount + addedOrdersAmount
}

export const formatBelongsToProduct = ({ formatId, productId }) => {
  return getProduct({ productId }).formatsIds.some(id => formatId === id)
}

export const objectPropIsUpdatable = ({ prop, objectType }) => {
  return objectsUpdatableProps[objectType].includes(prop)
}

export const filterUpdatableProps = ({ object, type }) => {
  return Object.keys(object).reduce((filteredObject, propName) => {
    if (objectsUpdatableProps[type].some(validProp => propName === validProp)) {
      filteredObject[propName] = object[propName]
    }
    return filteredObject
  }, {})
}
