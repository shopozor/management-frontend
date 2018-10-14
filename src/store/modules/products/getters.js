import types from '../../../types'

export const products = state => state.products

export const productsInInventory = state => {
  const myProducts = state.myProducts
  return Object.keys(myProducts).reduce((inventory, productId) => {
    const product = myProducts[productId]
    if (product.state !== types.productState.DELETED) inventory[productId] = product
    return inventory
  }, {})
}

export const productsInTrash = state => {
  const myProducts = state.myProducts
  return Object.keys(myProducts).reduce((trash, productId) => {
    const product = myProducts[productId]
    if (product.state === types.productState.DELETED) trash[productId] = product
    return trash
  }, {})
}
export const productsTrashIsEmpty = state => {
  return Object.keys(state.myProducts).every(productId => {
    return state.myProducts[productId].state !== types.productState.DELETED
  })
}

export const editedProduct = state => state.editedProduct
