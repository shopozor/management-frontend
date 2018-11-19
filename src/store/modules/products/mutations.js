export const storeProducts = (state, products) => { state.products = products }
export const storeMyProducts = (state, myProducts) => { state.myProducts = myProducts }
export const setEditedProduct = (state, product) => {
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
  // TODO: importer depuis state. Problème: Ce sont les getters et setters qui sont importés.
}
export const updateEditedProduct = (state, newProps) => {
  Object.entries(newProps).forEach(entry => {
    state.editedProduct[entry[0]] = entry[1]
  })
}
