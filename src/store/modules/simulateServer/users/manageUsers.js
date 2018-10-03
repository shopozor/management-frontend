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

export const removeToken = ({ userId, email }) => {
  updateUser({ email, userId, newProps: { token: undefined } })
}

export const getAuthorizations = ({ userId, email }) =>
  getUser({ userId, email }).authorizations

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
    ordersToReceive: [],
    ordersToDeliver: [],
    products: [],
    authorizations: [types.auth.CONSUMER],
    state: types.userState.ACTIVE
  }
  setUser({ userId, user })
}

export const authorize = ({ userId, email, authorization }) => {
  const user = getUser({ userId, email })
  const authorizations = user.authorizations
  authorizations.push(authorization)
  updateUser({ userId: user.userId, newProps: { authorizations } })
}

export const removeOtherUser = ({ userId }) => {
  updateUser({ userId, newProps: { state: types.userState.DELETED } })
}

export const getUserId = ({ email }) => getUser({ email }).userId

export const getEmail = ({ userId }) => getUser({ userId }).email
