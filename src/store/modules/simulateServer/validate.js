import { getServer, getUser, getFormat, getProduct, getOrdersAmountsOfFormat } from './serverAccess'
import types from '../../../types'

export const userDoesExist = ({ email, userId }) => {
  const users = getServer().users
  const userIdExists = userId && Object.keys(users).some(key => key === userId)
  const emailExists = email && Object.values(users).some(user => user.email === email)
  return userIdExists || emailExists
}

export const passwordIsValid = ({ email, userId, password }) => {
  const user = getUser({ email, userId })
  return password === user.password
}

export const userIsActive = ({ email, userId }) => getUser({ email, userId }).state === types.userState.ACTIVE

export const tokenIsValid = ({ email, userId, token }) => {
  const user = getUser({ email, userId })
  return token && user && token === user.token
}

export const userHasAuthorizations = ({ userId, email, authorizations }) => {
  const user = getUser({ userId, email })
  return authorizations.every(required => user.authorizations.some(available => available === required))
}

export const userOwnsFormat = ({ userId, email, formatId }) => {
  const productId = getFormat({ formatId }).product
  return userOwnsProduct({ userId, email, productId })
}

export const userOwnsProduct = ({ userId, email, productId }) => {
  const ownedProducts = getUser({ userId, email }).productIds
  return ownedProducts.some(id => id === productId)
}

export const productIsValid = ({ product }) => {
  return product.name !== undefined
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

export const amountDoesNotFallBelowPendingOrders = ({
  formatId,
  newAmount = getFormat({ formatId }).amount,
  addedOrdersAmount = 0
}) => {
  const oldOrdersAmount = getOrdersAmountsOfFormat({
    formatId,
    requiredStates: [
      types.orderState.PENDING_NOT_PAID,
      types.orderState.PENDING_PAID
    ]
  })
  return newAmount >= oldOrdersAmount + addedOrdersAmount
}
