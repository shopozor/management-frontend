export const storeFormats = (state, { formats }) => {
  state.formats = formats
}

export const storeFormatsOfProduct = (state, { formats }) => {
  Object.keys(formats).map(formatId => {
    state.formats[formatId] = formats[formatId]
  })
}
