import { getUser, updateUser, setUser } from '../serverAccess'
import types from '../../../../types'

export const getToken = ({ userId, email }) => {
  return getUser({ userId, email }).token
}

export const generateToken = ({ userId, email }) => {
  const user = getUser({ userId, email })
  const token = `${user.userId}/token/${Date.now()}`
  updateUser({ userId, email, newProps: { token } })
  return token
}

export const removeToken = ({ email, userId }) => {
  updateUser({ email, userId, newProps: { token: undefined } })
}

export const getAuthorizations = ({ userId }) =>
  getUser({ userId }).authorizations

export const changeUserEmail = ({ userId, newEmail }) => {
  updateUser({ userId, newProps: { email: newEmail } })
}

export const changeUserPassword = ({ userId, newPassword }) => {
  updateUser({ userId, newProps: { password: newPassword } })
}

export const createUser = ({ email, password }) => {
  const userId = `user:${window.btoa(email)}`
  const user = {
    userId,
    email,
    password,
    productIds: [],
    authorizations: [types.auth.CONSUMER],
    state: types.userState.ACTIVE
  }
  setUser({ userId, user })
}

export const authorize = ({ userId, authorization }) => {
  const authorizations = getUser({ userId }).authorizations
  authorizations.push(authorization)
  updateUser({ userId, newProps: { authorizations } })
}

export const removeOtherUser = ({ userId }) => {
  updateUser({ userId, newProps: { state: types.userState.DELETED } })
}

export const getUserId = ({ email }) => getUser({ email }).userId

export const getEmail = ({ userId }) => getUser({ userId }).email
