import {
  userDoesExist,
  passwordIsValid,
  tokenIsValid,
  userIsActive,
  userHasAuthorizations,
  productIsValid,
  userOwnsProduct,
  productHasNoPendingOrders,
  productWillNotDisappear,
  formatBelongsToProduct,
  objectPropIsUpdatable,
  formatAmountDoesNotFallBelowPendingOrders,
  pendingOrdersAmountDoesNotExceedFormatAmount,
  formatWillNotDisappear,
  formatHasNoPendingOrder
} from './validate'
import types from '../../../types'
import { getUser } from './serverAccess'

export const userAlreadyExists = (method, reject, { email }) => {
  if (userDoesExist({ email })) {
    reject(new Error(`[${method}] User ${email} already exists.`))
  }
}

export const passwordIsInvalid = (method, reject, { userId, email, password }) => {
  if (!passwordIsValid({ userId, email, password })) {
    reject(new Error(`[${method}] Your email and your password do not match.`))
  }
}

export const tokenIsInvalid = (method, reject, { userId, token }) => {
  if (!token || !userId || !tokenIsValid({ userId, token })) {
    reject(new Error(`[${method}] Your token is invalid. Please login.`))
  }
}

export const userIsNotActivated = (method, reject, { userId, email }) => {
  if (!userIsActive({ userId, email })) {
    const user = getUser({ userId, email })
    reject(new Error(`[${method}] Account of ${user.email} has not been activated yet.`))
  }
}

export const userHasNotAuthorizations = (method, reject, { userId, email, authorizations }) => {
  if (!userHasAuthorizations({ userId, email, authorizations })) {
    reject(new Error(`[${method}] You are not authorized. Authorizations needed: ${authorizations.join(', ')}`))
  }
}

export const productIsNotValid = (method, reject, { product }) => {
  if (!productIsValid({ product })) {
    reject(new Error(`[${method}] This product is not valid.`))
  }
}

export const userDoesNotOwnProduct = (method, reject, { userId, productId }) => {
  if (!userOwnsProduct({ userId, productId })) {
    reject(new Error(`[${method}] You do not own that product.`))
  }
}

export const productWillDisappearAndHasPendingOrders = (method, reject, { productId, newProps }) => {
  const newState = newProps.state
  const force = newProps.force && newState === types.productState.INVISIBLE
  if (!force && !productWillNotDisappear({ productId, newState }) && !productHasNoPendingOrders({ productId })) {
    reject(new Error(`[${method}] The product state can not be set to ${newState} while having pending orders.`))
  }
}

export const somePropInSomeObjectIsNotUpdatable = (method, reject, { objects, objectType }) => {
  Object.keys(objects).map(id =>
    someObjectPropIsNotUpdatable(method, reject, { prop: objects[id], id, objectType }))
}

export const someObjectPropIsNotUpdatable = (method, reject, { object, id, objectType }) => {
  Object.keys(object).map(prop => objectPropIsNotUpdatable(method, reject, { prop, id, objectType }))
}

export const objectPropIsNotUpdatable = (method, reject, { prop, id, objectType }) => {
  if (!objectPropIsUpdatable({ prop, objectType })) {
    reject(new Error(`[${method}] The prop ${prop} in ${objectType} ${id} is not valid.`))
  }
}

export const someFormatsDoNotBelongToProduct = (method, reject, { formats, productId }) => {
  Object.keys(formats).map(formatId => formatDoesNotBelongToProduct(method, reject, { formatId, productId }))
}

export const formatDoesNotBelongToProduct = (method, reject, { formatId, productId }) => {
  if (!formatBelongsToProduct({ formatId, productId })) {
    reject(new Error(`[${method}] Format ${formatId} does not belong to product ${productId}.`))
  }
}

export const someFormatAmountFallsBelowPendingOrders = (method, reject, { formatsToUpdate }) => {
  Object.keys(formatsToUpdate).map(formatId => {
    const newFormatAmount = formatsToUpdate[formatId].amount
    const force = formatsToUpdate[formatId].force
    formatAmountFallsBelowPendingOrders(method, reject, { formatId, newFormatAmount, force })
  })
}

export const formatAmountFallsBelowPendingOrders = (method, reject, { formatId, newFormatAmount, force }) => {
  if (!force && !formatAmountDoesNotFallBelowPendingOrders({ formatId, newFormatAmount })) {
    reject(new Error(`[${method}] Format amount of ${formatId} will fall below its pending orders amount.`))
  }
}

export const someFormatWillDisappearAndHasPendingOrders = (method, reject, { formatsToUpdate }) => {
  Object.keys(formatsToUpdate).map(formatId => {
    const newProps = formatsToUpdate[formatId]
    formatWillDisappearAndHasPendingOrders(method, reject, { formatId, newProps })
  })
}

export const formatWillDisappearAndHasPendingOrders = (method, reject, { formatId, newProps }) => {
  const newState = newProps.state
  const force = newProps.force && newState === types.formatState.INVISIBLE
  if (!force && !formatWillNotDisappear({ formatId, newState }) && !formatHasNoPendingOrder({ formatId })) {
    reject(new Error(`[${method}] The format state can not be set to ${newState} while having pending orders.`))
  }
}

export const somePendingOrdersAmountExceedsFormatAmount = (method, reject, { orders }) => {
  Object.keys(orders).map(formatId => {
    pendingOrdersAmountExceedsFormatAmount(method, reject, { addedOrdersAmount: orders[formatId].amount, formatId })
  })
}

export const pendingOrdersAmountExceedsFormatAmount = (method, reject, { addedOrdersAmount, formatId }) => {
  if (!pendingOrdersAmountDoesNotExceedFormatAmount({ formatId, addedOrdersAmount })) {
    reject(new Error(`[${method}] The format ${formatId} is not available any more.`))
  }
}
