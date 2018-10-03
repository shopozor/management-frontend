export const storeFormatsOfProduct = (state, { formats }) => {
  state.formats[formats.formatId] = formats
}
