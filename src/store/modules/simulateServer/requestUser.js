import * as manageUsers from './manageUsers'
import * as validate from './validate'
import types from '../../../types'

const delayInMs = 200

export const signup = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!validate.userDoesExist({ email })) {
        manageUsers.createUser({ email, password })
        resolve(`[CREATE_USER] ${email} is now a recognized user`)
      } else {
        reject(new Error('[CREATE_USER] user already exists'))
      }
    }, delayInMs)
  })
}

export const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (validate.passwordIsValid({ email, password })) {
        resolve({
          message: `[LOGIN] ${email} successfully logged in`,
          token: manageUsers.generateToken({ email }),
          userId: manageUsers.getId({ email }),
          authorizations: manageUsers.getAuthorizations({ email })
        })
      } else {
        reject(new Error('[LOGIN] email and password do not match'))
      }
    }, delayInMs)
  })
}

export const getAuthorizations = ({ userId, token }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (validate.tokenIsValid({ userId, token })) {
        resolve({
          message: `[GET_AUTHORIZATIONS] token is valid`,
          email: manageUsers.getUser({ userId }).email,
          authorizations: manageUsers.getAuthorizations({ userId })
        })
      } else {
        resolve({
          message: '[GET_AUTHORIZATION] token is not valid',
          authorizations: [types.auth.NOT_CONNECTED]
        })
      }
    }, delayInMs)
  })
}

export const logout = ({ userId, token }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (validate.tokenIsValid({ userId, token })) {
        manageUsers.removeToken({ userId })
        resolve({
          message: `[LOGOUT] User ${userId} has been logged off. Token ${token} isn't valid any more.`
        })
      } else {
        reject(new Error('[LOGOUT] token is not valid'))
      }
    }, delayInMs)
  })
}

export const changeUserEmail = ({ userId, token, newEmail, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        validate.tokenIsValid({ userId, token }) &&
        validate.passwordIsValid({ userId, password })
      ) {
        manageUsers.changeUserEmail({ userId, newEmail })
        resolve('[CHANGE_USER_EMAIL] user email successfully changed')
      } else {
        reject(new Error('[CHANGE_USER_EMAIL] email and password do not match'))
      }
    }, delayInMs)
  })
}

export const changeUserPassword = ({
  userId,
  token,
  newPassword,
  oldPassword
}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        validate.tokenIsValid({ userId, token }) &&
        validate.passwordIsValid({ userId, password: oldPassword })
      ) {
        manageUsers.changeUserPassword({ userId, newPassword })
        resolve('[CHANGE_USER_PASSWORD] user password successfully changed')
      } else {
        reject(
          new Error('[CHANGE_USER_PASSWORD] email and password do not match')
        )
      }
    }, delayInMs)
  })
}

export const removeOtherUser = ({ userId, token, toRemoveUserId }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        validate.tokenIsValid({ userId, token }) &&
        validate.userHasAuthorizations({ userId, authorizations: [types.auth.SOFTOZOR] })
      ) {
        manageUsers.removeUser({ userId: toRemoveUserId })
        resolve({ message: `[REMOVE_USER] ${toRemoveUserId} successfully removed` })
      } else {
        reject(new Error('[REMOVE_USER] you are not allowed to remove a user'))
      }
    }, delayInMs)
  })
}
