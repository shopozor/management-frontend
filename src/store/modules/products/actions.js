// import * as request from '../simulateServer/products/requestProducts'

export const getProducts = ({ commit, getters }) => {
  // request.getProducts({
  //   userId: getters.userId,
  //   token: getters.token
  // })
  //   .then(response => { commit('storeProducts', response.products) })
  //   .catch(error => { console.log(error) })
}

export const getMyProducts = ({ commit, getters }) => {
  // request.getMyProducts({
  //   userId: getters.userId,
  //   token: getters.token
  // })
  //   .then(response => { commit('storeMyProducts', response.myProducts) })
  //   .catch(error => { console.log(error) })
}

export const createProduct = ({ commit, getters }, { newProduct }) => {
  // request.createProduct({
  //   userId: getters.userId,
  //   token: getters.token,
  //   newProduct
  // })
  //   .then(response => { commit('storeMyProducts', response.myProducts) })
  //   .catch(error => { console.log(error) })
}

export const updateProduct = ({ commit, getters }, { productId, newProps }) => {
  // request.updateProduct({
  //   userId: getters.userId,
  //   token: getters.token,
  //   productId,
  //   newProps
  // })
  //   .then(response => { commit('storeMyProducts', response.myProducts) })
  //   .catch(error => console.log(error))
}

export const setEditedProduct = ({ commit, getters }, { productId }) => {
  // const localProduct = getters.productsInInventory[productId]
  // if (localProduct) commit('setEditedProduct', localProduct)
  // else {
  //   request.getMyProducts({
  //     userId: getters.userId,
  //     token: getters.token
  //   })
  //     .then(response => commit('setEditedProduct', response.myProducts[productId]))
  //     .catch(error => console.log(error))
  // }
}
