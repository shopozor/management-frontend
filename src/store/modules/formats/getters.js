export const formats = state => state.formats
export const formatsOfProduct = state => productId => {
  const formatIds = state.myProducts[productId].formats
  const formats = state.formats
  return formatIds.reduce((filteredFormats, formatId) => {
    filteredFormats[formatId] = formats[formatId]
    return filteredFormats
  }, {})
}
