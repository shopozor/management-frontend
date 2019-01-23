import types from '../../../types'
import { filterObjectOfObjects } from '../../helpers'

export const productsTrashIsEmpty = (state, getters) => {
  return Object.keys(getters.productsInTrash).length === 0
}

export const productsInTrash = (state, getters) => {
  const baseObjectOfObjects = getters.myProducts
  const acceptedValuesOfMandatoryProperties = { state: [types.productState.DELETED] }
  return filterObjectOfObjects({ baseObjectOfObjects, acceptedValuesOfMandatoryProperties })
}

export const productsInInventory = (state, getters) => {
  const baseObjectOfObjects = getters.myProducts
  const acceptedValuesOfMandatoryProperties = { state: [types.productState.VISIBLE, types.productState.INVISIBLE] }
  return filterObjectOfObjects({ baseObjectOfObjects, acceptedValuesOfMandatoryProperties })
}

export const myProducts = (state, getters) => {
  const baseObjectOfObjects = { ...getters.products }
  const acceptedValuesOfMandatoryProperties = { producerId: [getters.userId] }
  return filterObjectOfObjects({ baseObjectOfObjects, acceptedValuesOfMandatoryProperties })
}

export const products = state => state.products

export const editedProduct = state => state.editedProduct

export const formatsOfProduct = (state, getters) => productId => {
  const baseObjectOfObjects = getters.formats
  const acceptedValuesOfMandatoryProperties = { productId: [productId] }
  return filterObjectOfObjects({ baseObjectOfObjects, acceptedValuesOfMandatoryProperties })
}

export const formats = state => state.formats

export const editedFormats = state => state.editedFormats
