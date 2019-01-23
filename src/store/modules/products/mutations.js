import types from 'src/types'

export const storeProducts = (state, products) => {
  state.products = { ...state.products, ...products }
}

export const setEditedProduct = (state, { product }) => {
  state.editedProduct = {
    productId: '',
    title: '',
    description: '',
    image: '',
    categories: [],
    conservationMethod: '',
    conservationDaysAfterSale: 0,
    defaultFormatUI: '',
    defaultCustomerPrice: 0,
    defaultUnit: '',
    ...product,
    allowNonTrivialChanges: false
  }
}

export const updateEditedProduct = (state, { newProps }) => {
  Object.entries(newProps).forEach(entry => {
    state.editedProduct[entry[0]] = entry[1]
  })
}

export const storeFormats = (state, { formats }) => {
  state.formats = { ...state.formats, ...formats }
}

export const updateEditedFormat = (state, { formatId, newProps }) => {
  const newFormat = { ...state.editedFormats[formatId], ...newProps }
  updateEditedFormats(state, { newFormats: { [formatId]: newFormat } })
}

export const updateEditedFormats = (state, { newFormats }) => {
  state.editedFormats = { ...state.editedFormats, ...newFormats }
}

export const clearEdition = (state) => {
  state.editedProduct = {}
  state.editedFormats = {}
}

export const setEditedFormats = (state, { formats }) => {
  state.editedFormats = formats
}

export const createEditedFormat = (state) => {
  const defaultFormatUI = state.editedProduct.defaultFormatUI
  const defaultUnit = state.editedProduct.defaultUnit
  const formatId = Date.now().toString()
  const productId = state.editedProduct.productId
  const newFormat = {
    isNew: true,
    formatId,
    productId,
    description: '',
    size: 0,
    sizeUnit: defaultUnit,
    customerPrice: 0,
    customerPriceUnit: defaultUnit,
    formatUI: defaultFormatUI,
    state: types.formatState.VISIBLE,
    amount: 0,
    stockUnit: defaultUnit
  }
  updateEditedFormats(state, { newFormats: { [formatId]: newFormat } })

  const formatsIds = [...state.editedProduct.formatsIds, formatId]
  updateEditedProduct(state, { newProps: { formatsIds } })
}
