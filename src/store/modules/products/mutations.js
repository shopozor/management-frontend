export const storeProducts = (state, products) => { state.products = products }
export const storeMyProducts = (state, myProducts) => { state.myProducts = myProducts }
export const setEditedProduct = (state, product) => { state.editedProduct = { ...product, allowNonTrivialChanges: false } }
export const updateEditedProduct = (state, newProps) => {
  Object.entries(newProps).forEach(entry => {
    state.editedProduct[entry[0]] = entry[1]
  })
}
