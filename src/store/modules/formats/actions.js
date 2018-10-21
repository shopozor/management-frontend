import * as request from '../simulateServer/formats/requestFormats'

export const getFormats = ({ commit, getters }) => {
  request.getFormats({
    userId: getters.userId,
    token: getters.token
  })
    .then(response => commit('storeFormats', { formats: response.formats }))
    .catch(error => console.log(error))
}

export const getFormatsOfProduct = ({ commit, getters }, { productId }) => {
  request.getFormatsOfProduct({
    userId: getters.userId,
    token: getters.token,
    productId
  })
    .then(response => commit('storeFormats', { formats: response.formats }))
    .catch(error => console.log(error))
}

export const updateFormatsOfProduct = ({ commit, getters }, { productId, formats }) => {
  return new Promise((resolve, reject) => {
    request.updateFormatsOfProduct({
      userId: getters.userId,
      token: getters.token,
      productId,
      formats
    })
      .then(response => {
        commit('storeFormats', { formats: response.formats })
        commit('clearEditedFormats')
        resolve()
      })
      .catch(error => console.log(error))
  })
}

export const setEditedFormats = ({ commit, getters }, { productId }) => {
  const localFormats = getters.formatsOfProduct(productId)
  if (localFormats) commit('setEditedFormats', { formats: localFormats })
  else {
    request.getFormatsOfProduct({
      userId: getters.userId,
      token: getters.token,
      productId
    })
      .then(response => commit('setEditedFormats', { formats: response.formats }))
      .catch(error => console.log(error))
  }
}
