import types from '../../../types'

export function storeAuthorizations (state, payload) {
  state.email = payload.email
  state.userId = payload.userId
  state.token = payload.token
  state.authorizations = payload.authorizations
}

export function logout (state) {
  state.userId = ''
  state.token = ''
  state.email = ''
  state.authorizations = [types.auth.NOT_CONNECTED]

  this.$router.push({ path: '/' })
}

export function error (state, error) {
  console.log(error)
}
