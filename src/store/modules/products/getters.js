import types from '../../../types'
import NO_IMAGE from '../../../assets/no_image.png'

export const products = state => state.products

export const myProducts = state => state.myProducts

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
export const editedProductImage = state => {
  const image = state.editedProduct.image
  if (image) return image
  else return NO_IMAGE
}
export const editedProductTitle = state => state.editedProduct.title
export const editedProductDescription = state => state.editedProduct.description
export const editedProductcategories = state => state.editedProduct.categories
export const editedProductConservationMethod = state => state.editedProduct.conservationMathod
export const editedProductConservationDays = state => state.editedProduct.conservationDays
export const editedProductDefaultFormatUI = state => state.editedProduct.defaultFormatUI
export const editedProductDefaultCustomerPrice = state => state.editedProduct.defaultCustomerPrice
export const editedProductDefaultUnit = state => state.editedProduct.defaultCustomerUnit

export const formats = state => state.formats
export const formatsOfProduct = (state, getters) => productId => {
  const formatIds = getters.productsInInventory[productId].formatsIds
  const formats = state.formats
  return formatIds.reduce((filteredFormats, formatId) => {
    filteredFormats[formatId] = formats[formatId]
    return filteredFormats
  }, {})
}
export const editedFormats = state => state.editedFormats
export const editedFormat = state => ({formatId, propName}) => state.editedFormats[formatId][propName]
