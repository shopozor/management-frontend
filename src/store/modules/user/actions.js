import * as request from '../simulateServer/users/requestUsers'

export function signup ({ commit }, { email, password }) {
  request
    .signup({ email, password })
    .then(response => {
      this.$router.push({ path: '/ConfirmationEmailSent' })
    })
    .catch(error => commit('error', error))
}

export function login ({ commit }, { email, password, stayLoggedIn }) {
  request
    .login({ email, password })
    .then(response => {
      commit('storeAuthorizations', {
        email,
        token: response.token,
        userId: response.userId,
        authorizations: response.authorizations
      })
      stayLoggedIn ? saveToken(response.userId, response.token) : removeToken()
      this.$router.back()
    })
    .catch(error => commit('error', error))
}

export function getAuthorizations ({ commit, getters }) {
  console.log('[actions/getAuthorizations]')
  request
    .getAuthorizations({
      userId: getters.userId,
      token: getters.token
    })
    .then(response => {
      commit('storeAuthorizations', {
        email: response.email,
        token: response.token,
        userId: response.userId,
        authorizations: response.authorizations
      })
    })
    .catch(error => {
      commit('error', error)
    })
}

export function logout ({ commit, getters }) {
  request
    .logout({
      userId: getters.userId,
      token: getters.token
    })
    .then(response => {
      commit('logout')
      removeToken()
    })
    .catch(error => {
      commit('error', error)
    })
}

function saveToken (userId, token) {
  localStorage.setItem('userId', userId)
  localStorage.setItem('token', token)
}

function removeToken () {
  localStorage.removeItem('userId')
  localStorage.removeItem('token')
}
