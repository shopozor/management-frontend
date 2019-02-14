import * as request from '../simulateServer/users/requestUsers'
import { apolloClient } from '../../../plugins/apollo'
import * as cookie from '../../cookie'

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
  return new Promise((resolve, reject) => {
    apolloClient
      .mutate({
        mutation: LogIn,
        variables: {
          email,
          password
        }
      })
      .then(response => {
        const content = response.data.login
        const errors = content.errors
        if (errors.length > 0) {
          reject(errors)
        } else {
          const token = content.token
          const userId = content.user.id
          commit('storeAuthorizations', {
            email,
            token,
            userId,
            authorizations: content.user.permissions // permissionsAdapter(content.user)
          })
          stayLoggedIn ? saveUser({ email, userId, token }) : saveToken({ token })
          resolve(response)
        }
      })
      .catch(error => {
        commit('error', error)
        reject(error)
      })
  })
}

export function getAuthorizations ({ commit }) {
  // request
  //   .getAuthorizations({
  //     userId: cookie.get({ cookieId: 'userId' }),
  //     token: cookie.get({ cookieId: 'token' })
  //   })
  //   .then(response => {
  //     commit('storeAuthorizations', {
  //       email: response.email,
  //       token: response.token,
  //       userId: response.userId,
  //       authorizations: response.authorizations
  //     })
  //   })
  //   .catch(error => {
  //     commit('error', error)
  //   })
  const token = cookie.get({ cookieId: 'token' })
  const userId = cookie.get({ cookieId: 'userId' })
  const email = cookie.get({ cookieId: 'email' })
  if (token && userId && email) {
    commit('storeAuthorizations', {
      email,
      userId,
      token,
      authorizations: []
    })
  } else {
    commit('logout')
    removeToken()
  }
}

export function logout ({ commit, getters }) {
  // request
  //   .logout({
  //     userId: getters.userId,
  //     token: getters.token
  //   })
  //   .then(response => {
  //     commit('logout')
  //     removeToken()
  //   })
  //   .catch(error => {
  //     commit('error', error)
  //   })
  commit('logout')
  removeToken()
}

function saveUser ({ email, userId, token }) {
  console.log('save user')
  cookie.set({ cookieId: 'email', cookieValue: email, cookieDuration: 30 })
  cookie.set({ cookieId: 'userId', cookieValue: userId, cookieDuration: 30 })
  cookie.set({ cookieId: 'token', cookieValue: token, cookieDuration: 30 })
}

function saveToken ({ token }) {
  console.log('save token')
  cookie.del({ cookieId: 'email' })
  cookie.del({ cookieId: 'userId' })
  cookie.set({ cookieId: 'token', cookieValue: token, cookieDuration: 30 })
}

function removeToken () {
  cookie.del({ cookieId: 'email' })
  cookie.del({ cookieId: 'userId' })
  cookie.del({ cookieId: 'token' })
}
