import * as manageUsers from './manageUsers'
import * as rejectIf from '../rejectIf'
import { tokenIsValid } from '../validate'
import types from '../../../../../common/src/types'

const delayInMs = 200

export const signup = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      rejectIf.userAlreadyExists('signup', reject, { email })

      manageUsers.createUser({ email, password })
      resolve({ message: `[signup] ${email} is now a recognized user.` })
    }, delayInMs)
  })
}

export const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      rejectIf.passwordIsInvalid('login', reject, { email, password })
      rejectIf.userIsNotActivated('login', reject, { email })

      resolve({
        message: `[login] ${email} has successfully logged in.`,
        token: manageUsers.generateToken({ email }),
        userId: manageUsers.getUserId({ email }),
        email,
        authorizations: manageUsers.getAuthorizations({ email })
      })
    }, delayInMs)
  })
}

export const getAuthorizations = ({ userId, token }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (tokenIsValid({ userId, token })) {
        resolve({
          message: `[getAuthorizations] Your token is valid.`,
          email: manageUsers.getEmail({ userId }),
          userId,
          token,
          authorizations: manageUsers.getAuthorizations({ userId })
        })
      } else {
        resolve({
          message: `[getAuthorizations] Your token is invalid.`,
          authorizations: [types.auth.NOT_CONNECTED]
        })
      }
    }, delayInMs)
  })
}

export const logout = ({ userId, token }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      rejectIf.tokenIsInvalid('logout', reject, { userId, token })

      manageUsers.removeToken({ userId })
      resolve({
        message: `[logout] User ${manageUsers.getEmail({ userId })} has been logged off. Token ${token} isn't valid any more.`
      })
    }, delayInMs)
  })
}

export const changeUserEmail = ({ userId, token, newEmail, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      rejectIf.tokenIsInvalid('changeUserEmail', reject, { userId, token })
      rejectIf.passwordIsInvalid('changeUserEmail', reject, { userId, password })

      manageUsers.changeUserEmail({ userId, newEmail })
      resolve({
        message: '[changeUserEmail] Your email has been successfully changed.',
        newEmail
      })
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
      rejectIf.tokenIsInvalid('changeUserPassword', reject, { userId, token })
      rejectIf.passwordIsInvalid('changeUserPassword', reject, { userId, password: oldPassword })

      manageUsers.changeUserPassword({ userId, newPassword })
      resolve({
        message: '[changeUserPassword] Your password has been successfully changed.'
      })
    }, delayInMs)
  })
}

export const removeOtherUser = ({ userId, token, userToRemoveId }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      rejectIf.tokenIsInvalid('removeOtherUser', reject, { userId, token })
      rejectIf.userHasNotAuthorizations('removeOtherUser', reject, { userId, authorizations: [types.auth.SOFTOZOR] })

      manageUsers.removeOtherUser({ userId: userToRemoveId })
      resolve({
        message: `[removeOtherUser] ${userToRemoveId} has been successfully removed.`
      })
    }, delayInMs)
  })
}
