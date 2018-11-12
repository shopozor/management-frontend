import types from '../../../types'

export const storeFormats = (state, { formats }) => {
  state.formats = {...state.formats, ...formats}
}

export const updateEditedFormat = (state, { formatId, newProps }) => {
  const newFormat = { ...state.editedFormats[formatId], ...newProps }
  updateEditedFormats(state, { newFormats: { [formatId]: newFormat } })
}

export const createEditedFormat = (state, { props }) => {
  const defaultFormatUI = state.editedProduct.defaultFormatUI
  const defaultUnit = state.editedProduct.defaultUnit
  const formatId = Date.now()
  const newFormat = {
    formatId,
    description: '',
    size: 0,
    sizeUnit: defaultUnit,
    customerPrice: 0,
    customerPriceUnit: defaultUnit,
    formatUI: defaultFormatUI,
    state: types.formatState.VISIBLE,
    amount: 0,
    stockUnit: defaultUnit,
    ...props
  }
  updateEditedFormats(state, { newFormats: { [formatId]: newFormat } })
}

export const updateEditedFormats = (state, { newFormats }) => {
  state.editedFormats = { ...state.editedFormats, ...newFormats }
}

export const clearEditedFormats = (state) => {
  state.editedFormats = {}
}

export const setEditedFormats = (state, { formats }) => {
  state.editedFormats = formats
}
