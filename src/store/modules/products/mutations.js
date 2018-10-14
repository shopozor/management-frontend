export const storeProducts = (state, products) => { state.products = products }
export const storeMyProducts = (state, myProducts) => { state.myProducts = myProducts }
export const setEditedProduct = (state, product) => { state.editedProduct = {...product} }
