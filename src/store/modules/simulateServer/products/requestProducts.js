import * as server from '../serverAccess'
import * as manageProducts from './manageProducts'
import * as rejectIf from '../rejectIf'
import types from '../../../../../common/src/types'

const delayInMs = 200

export const createProduct = ({ userId, token, newProduct }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      rejectIf.tokenIsInvalid('createProduct', reject, { userId, token })
      rejectIf.userHasNotAuthorizations('createProduct', reject, { userId, authorizations: [types.auth.PRODUCER] })
      rejectIf.productIsNotValid('createProduct', reject, { product: newProduct })
      rejectIf.someObjectPropIsNotUpdatable('createProduct', reject, { object: newProduct, objectType: 'product', id: 'newProduct' })

      manageProducts.createProduct({ userId, newProduct })
      resolve({
        message: `[createProduct] The product was successfully created.`,
        myProducts: server.getProductsOfProducer({ userId })
      })
    }, delayInMs)
  })
}

export const getMyProducts = ({ userId, token }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      rejectIf.tokenIsInvalid('getMyProducts', reject, { userId, token })
      rejectIf.userHasNotAuthorizations('getMyProducts', reject, { userId, authorizations: [types.auth.PRODUCER] })

      resolve({
        message: `[getMyProducts] Your own products were successfully received.`,
        myProducts: server.getProductsOfProducer({ userId })
      })
    }, delayInMs)
  })
}

export const getProducts = ({ userId, token }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      rejectIf.tokenIsInvalid('getProducts', reject, { userId, token })
      rejectIf.userHasNotAuthorizations('getProducts', reject, { userId, authorizations: [types.auth.CUSTOMER] })

      resolve({
        message: `[getProducts] The products successfully received.`,
        products: server.getProducts()
      })
    }, delayInMs)
  })
}

export const updateProduct = ({ userId, token, productId, newProps }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      rejectIf.tokenIsInvalid('updateProduct', reject, { userId, token })
      rejectIf.userDoesNotOwnProduct('updateProduct', reject, { userId, productId })
      rejectIf.userHasNotAuthorizations('updateProduct', reject, { userId, authorizations: [types.auth.PRODUCER] })
      // rejectIf.someObjectPropIsNotUpdatable('updateProduct', reject, { object: newProps, objectType: 'product', id: productId })
      // TODO: pouvoir planifier le retrait d'un produit
      rejectIf.productWillDisappearAndHasPendingOrders('updateProduct', reject, { productId, newProps })

      manageProducts.updateProduct({ productId, newProps })
      resolve({
        message: `[updateProduct] Your product was successfully updated.`,
        myProducts: server.getProductsOfProducer({ userId })
      })
    }, delayInMs)
  })
}
