import * as manageUsers from './manageUsers'
import { userDoesExist, passwordIsValid, tokenIsValid, userHasAuthorizations, userIsActive } from '../validate'
import types from '../../../../types'

const delayInMs = 200

export const signup = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userDoesExist({ email })) {
        manageUsers.createUser({ email, password })
        resolve({ message: `[createUser()] ${email} is now a recognized user` })
      } else {
        reject(new Error('[createUser()] user already exists'))
      }
    }, delayInMs)
  })
}

export const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (passwordIsValid({ email, password }) && userIsActive({ email })) {
        resolve({
          message: `[login()] ${email} successfully logged in`,
          token: manageUsers.generateToken({ email }),
          userId: manageUsers.getUserId({ email }),
          authorizations: getAuthorizations({ email })
        })
      } else {
        reject(new Error('[login()] email and password do not match'))
      }
    }, delayInMs)
  })
}

export const getAuthorizations = ({ userId, token }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (tokenIsValid({ userId, token })) {
        resolve({
          message: `[getAuthorizations()] token is valid`,
          email: manageUsers.getEmail({ userId }),
          authorizations: getAuthorizations({ userId })
        })
      } else {
        resolve({
          message: '[getAuthorizations()] token is not valid',
          authorizations: [types.auth.NOT_CONNECTED]
        })
      }
    }, delayInMs)
  })
}

export const logout = ({ userId, token }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (tokenIsValid({ userId, token })) {
        manageUsers.removeToken({ userId })
        resolve({
          message: `[logout()] User ${userId} has been logged off. Token ${token} isn't valid any more.`
        })
      } else {
        reject(new Error('[logout()] token is not valid'))
      }
    }, delayInMs)
  })
}

export const changeUserEmail = ({ userId, token, newEmail, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        tokenIsValid({ userId, token }) &&
        passwordIsValid({ userId, password })
      ) {
        manageUsers.changeUserEmail({ userId, newEmail })
        resolve({
          message: '[changeUserEmail()] user email successfully changed',
          newEmail
        })
      } else {
        reject(new Error('[changeUserEmail()] email and password do not match'))
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
        tokenIsValid({ userId, token }) &&
        passwordIsValid({ userId, password: oldPassword })
      ) {
        manageUsers.changeUserPassword({ userId, newPassword })
        resolve({
          message: '[changeUserPassword()] user password successfully changed'
        })
      } else {
        reject(
          new Error('[changeUserPassword()] email and password do not match')
        )
      }
    }, delayInMs)
  })
}

export const removeOtherUser = ({ userId, token, toRemoveUserId }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        tokenIsValid({ userId, token }) &&
        userHasAuthorizations({ userId, authorizations: [types.auth.SOFTOZOR] })
      ) {
        manageUsers.removeOtherUser({ userId: toRemoveUserId })
        resolve({
          message: `[removeUser()] ${toRemoveUserId} successfully removed`
        })
      } else {
        reject(new Error('[removeUser()] you are not allowed to remove a user'))
      }
    }, delayInMs)
  })
}
