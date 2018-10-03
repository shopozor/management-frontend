import * as request from '../simulateServer/formats/requestFormats'

export const getFormatsOfProduct = ({ commit, getters }, { productId }) => {
  request.getFormatsOfProduct({
    userId: getters.userId,
    token: getters.token,
    productId
  })
    .then(response => commit('storeFormatsOfProduct', { formats: response.formats }))
    .catch(error => console.log(error))
}

export const updateFormatsOfProduct = ({ commit, getters }, { productId, formatsToCreate, formatsToUpdate }) => {
  request.updateFormatsOfProduct({
    userId: getters.userId,
    token: getters.token,
    productId,
    formatsToCreate,
    formatsToUpdate
  })
    .then(response => commit('storeFormatsOfProduct', { formats: response.formats }))
    .catch(error => console.log(error))
}
