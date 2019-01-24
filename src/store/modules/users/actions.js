import * as request from '../simulateServer/users/requestUsers'
import { apolloClient } from '../../../plugins/apollo'

import LogIn from './graphql/login.graphql'

export function signup ({ commit }, { email, password }) {
  request
    .signup({ email, password })
    .then(response => {
      this.$router.push({ path: '/ConfirmationEmailSent' })
    })
    .catch(error => commit('error', error))
}

export function login ({ commit }, { email, password, stayLoggedIn }) {
  apolloClient
    .mutate({
      mutation: LogIn,
      variables: {
        email,
        password
      }
    })
    .then(response => {
      console.log('login response = ', response)
      const content = response.data.tokenCreate
      const token = content.token
      const userId = content.user.id
      const permissions = content.user.permissions
      commit('storeAuthorizations', {
        email,
        token,
        userId,
        authorizations: permissions
      })
      stayLoggedIn ? saveToken(userId, token) : removeToken()
      this.$router.back()
    })
    .catch(error => commit('error', error))
}

export function getAuthorizations ({ commit, getters }) {
  request
    .getAuthorizations({
      userId: localStorage.getItem('userId'),
      token: localStorage.getItem('token')
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
