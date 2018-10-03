import * as manageUsers from './manageUsers'
import * as rejectIf from '../rejectIf'
import types from '../../../../types'

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

// TODO: utiliser ce pattern pour toutes les requêtes (vérifier auprès de L et C si c'est une bonne pratique)
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
      rejectIf.tokenIsInvalid('getAuthorizations', reject, { userId, token })

      resolve({
        message: `[getAuthorizations] Your token is valid.`,
        email: manageUsers.getEmail({ userId }),
        authorizations: getAuthorizations({ userId })
      })
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
