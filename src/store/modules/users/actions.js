import * as request from '../simulateServer/users/requestUsers'
import { apolloClient } from '../../../plugins/apollo'

import gql from 'graphql-tag'

export function signup ({ commit }, { email, password }) {
  request
    .signup({ email, password })
    .then(response => {
      this.$router.push({ path: '/ConfirmationEmailSent' })
    })
    .catch(error => commit('error', error))
}

export function login ({ commit }, { email, password, stayLoggedIn }) {
  // if this doesn't work, follow https://markus.oberlehner.net/blog/combining-graphql-and-vuex/
  // this follows https://akryum.github.io/vue-apollo/api/
  // TODO: the mutation needs to go to a separate file!
  apolloClient
    .mutate({
      mutation: gql`
        mutation LogIn($email: String!, $password: String!) {
          tokenCreate(email: $email, password: $password) {
            id
            token
          }
        }
      `,
      variables: {
        email,
        password
      }
    })
    .then(response => {
      console.log('login response = ', response)
      commit('storeAuthorizations', {
        email,
        token: response.token,
        userId: response.id,
        authorizations: response.authorizations
      })
      stayLoggedIn ? saveToken(response.userId, response.token) : removeToken()
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
