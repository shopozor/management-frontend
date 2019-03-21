// import * as request from '../simulateServer/users/requestUsers'
import { apolloClient } from '../../../plugins/apollo'
import * as cookie from '../../../../common/src/store/cookie'
import types from '../../../../common/src/types'

import LogIn from './graphql/login.graphql'

export function signup ({ commit }, { email, password }) {
  // request
  //   .signup({ email, password })
  //   .then(response => {
  //     this.$router.push({ path: '/ConfirmationEmailSent' })
  //   })
  //   .catch(error => commit('error', error))
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
          commit('storePermissions', {
            email,
            token,
            userId,
            permissions: content.user.permissions
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

export function getPermissions ({ commit }) {
  // request
  //   .getAuthorizations({
  //     userId: cookie.get({ cookieId: 'userId' }),
  //     token: cookie.get({ cookieId: 'token' })
  //   })
  //   .then(response => {
  //     commit('storePermissions', {
  //       email: response.email,
  //       token: response.token,
  //       userId: response.userId,
  //       permissions: response.permissions
  //     })
  //   })
  //   .catch(error => {
  //     commit('error', error)
  //   })
  const token = cookie.get({ cookieId: types.cookies.TOKEN })
  const userId = cookie.get({ cookieId: types.cookies.USER_ID })
  const email = cookie.get({ cookieId: types.cookies.EMAIL })
  if (token && userId && email) {
    commit('storePermissions', {
      email,
      userId,
      token,
      permissions: []
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
  cookie.set({ cookieId: types.cookies.EMAIL, cookieValue: email, cookieDuration: 30 })
  cookie.set({ cookieId: types.cookies.USER_ID, cookieValue: userId, cookieDuration: 30 })
  cookie.set({ cookieId: types.cookies.TOKEN, cookieValue: token, cookieDuration: 30 })
}

function saveToken ({ token }) {
  console.log('save token')
  cookie.del({ cookieId: types.cookies.EMAIL })
  cookie.del({ cookieId: types.cookies.USER_ID })
  cookie.set({ cookieId: types.cookies.TOKEN, cookieValue: token, cookieDuration: 30 })
}

function removeToken () {
  cookie.del({ cookieId: types.cookies.EMAIL })
  cookie.del({ cookieId: types.cookies.USER_ID })
  cookie.del({ cookieId: types.cookies.TOKEN })
}
