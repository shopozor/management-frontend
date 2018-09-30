import * as server from '../serverAccess'
import * as manageProducts from './manageProducts'
import { tokenIsValid, userHasAuthorizations, productIsValid, userOwnsProduct } from '../validate'
import types from '../../../../types'

const delayInMs = 200

export const createProduct = ({ userId, token, newProduct }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        tokenIsValid({ userId, token }) &&
        userHasAuthorizations({
          userId,
          authorizations: [types.auth.PRODUCER]
        }) &&
        productIsValid({ product: newProduct })
      ) {
        manageProducts.createProduct({ userId, newProduct })
        resolve({
          message: `[createProduct()] new product successfully created`,
          products: server.getProductsOfProducer({ userId })
        })
      } else {
        reject(new Error(`[createProduct()] could not create product`))
      }
    }, delayInMs)
  })
}

export const getMyProducts = ({ userId, token }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (tokenIsValid({ userId, token })) {
        resolve({
          message: `[getMyProducts()] products successfully received`,
          products: server.getProductsOfProducer({ userId })
        })
      } else {
        reject(new Error('[getProducts()] not authorized'))
      }
    }, delayInMs)
  })
}

export const getProducts = ({ userId, token }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        tokenIsValid({ userId, token }) &&
        userHasAuthorizations({
          userId,
          authorizations: [types.auth.CONSUMER]
        })) {
        resolve({
          message: `[getProducts()] products successfully received`,
          products: server.getProducts()
        })
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
  aisle,
  state
}) => {
  const newProps = { title, description, image, conservationDaysAfterSale, conservationMethod, aisle, state }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (tokenIsValid({ userId, token }) && userOwnsProduct({ userId, productId })) {
        server.updateProduct({ productId, newProps })
        resolve({
          message: `[updateProduct()] product successfully updated`,
          products: server.getProductsOfProducer({ userId })
        })
      } else {
        reject(new Error(`[updateProduct()] not authorized`))
      }
    }, delayInMs)
  })
}
