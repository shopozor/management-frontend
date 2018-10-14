export const storeFormats = (state, { formats }) => {
  state.formats = formats
}

export const storeFormatsOfProduct = (state, { formats }) => {
  Object.keys(formats).map(formatId => {
    state.formats[formatId] = formats[formatId]
  })
}

export const setEditedFormats = (state, { formats }) => {
  state.editedFormats = { ...formats }
  Object.keys(formats).map(formatId => {
    state.editedFormats[formatId] = { ...formats[formatId] }
  })
}
