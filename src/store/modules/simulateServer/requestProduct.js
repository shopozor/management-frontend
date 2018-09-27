import * as manageProducts from './manageProducts'
import * as validate from './validate'
import types from '../../../types'

const delayInMs = 200

export const createProduct = ({ userId, token, newProduct }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        validate.tokenIsValid({ userId, token }) &&
        validate.userHasAuthorizations({
          userId,
          authorizations: [types.auth.PRODUCER]
        }) &&
        validate.productIsValid({ product: newProduct })
      ) {
        manageProducts.createProduct({ userId, newProduct })
        resolve({
          message: `[createProduct()] new product successfully created`,
          products: manageProducts.getProducts({ userId })
        })
      } else {
        reject(new Error(`[createProduct()] could not create product`))
      }
    }, delayInMs)
  })
}

export const getProductsOf = ({ userId, token }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (validate.tokenIsValid({ userId, token })) {
        resolve({
          message: `[getProducts()] products successfully received`,
          products: manageProducts.getProductsOf({ userId })
        })
      } else {
        reject(new Error('[getProducts()] not authorized'))
      }
    }, delayInMs)
  })
}

// limiter les droits de modifications aux seules variables pertinentes
export const updateProduct = ({
  userId,
  token,
  productId,
  title,
  description,
  image,
  conservationDaysAfterSale,
  conservationMethod,
  aisle
}) => {
  const newProps = { title, description, image, conservationDaysAfterSale, conservationMethod, aisle }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (validate.tokenIsValid({ userId, token }) && validate.userOwnsProduct({ userId, productId })) {
        manageProducts.updateProduct({ productId, newProps })
        resolve({
          message: `[updateProduct()] product successfully updated`,
          products: manageProducts.getProducts({ userId })
        })
      } else {
        reject(new Error(`[updateProduct()] not authorized`))
      }
    }, delayInMs)
  })
}

export const removeProduct = ({ userId, token, productId }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (validate.tokenIsValid({ userId, token })) {
        manageProducts.removeProduct({ userId, productId })
        resolve({
          message: `[removeProduct()] product successfully removed`,
          products: manageProducts.getProducts({ userId })
        })
      } else {
        reject(new Error(`[removeProduct()] not authorized`))
      }
    }, delayInMs)
  })
}
