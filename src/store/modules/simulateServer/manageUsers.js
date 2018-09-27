import { readServer, updateServer } from './serverAccess'
import * as auth from '../../../types/authorization'

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

export const getId = ({ email }) => {
  const user = getUser({ email })
  return user.userId
}

export const getAuthorizations = ({ email, userId }) =>
  getUser({ email, userId }).authorizations

export const changeUserEmail = ({ userId, oldEmail, newEmail }) => {
  updateUser({ userId, email: oldEmail, newProps: { email: newEmail } })
}

export const changeUserPassword = ({ email, userId, newPassword }) => {
  updateUser({ email, userId, newProps: { password: newPassword } })
}

export const createUser = ({ email, password }) => {
  const hash = `user:${window.btoa(email)}`
  const newUser = {
    userId: hash,
    email,
    password,
    authorizations: [auth.CONSUMER],
    productIds: []
  }
  updateUsers({ newUsers: { [hash]: { ...newUser } } })
}

export const authorize = ({ email, userId, authorization }) => {
  const authorizations = getUser({ email, userId }).authorizations
  authorizations.push(authorization)
  updateUser({ email, userId, newProps: { authorizations } })
}

export const updateUser = ({ email, userId, newProps }) => {
  const user = getUser({ email, userId })
  updateUsers({ newUsers: { [user.userId]: { ...user, ...newProps } } })
}

export const removeUser = ({ email, userId }) => {
  const user = getUser({ email, userId })
  const users = readServer().users
  delete users[user.userId]
  updateServer({ newProps: { users } })
}

export const getUser = ({ email, userId }) => {
  const users = readServer().users
  if (userId) return users[userId]
  else if (email) return Object.values(users).find(user => user.email === email)
  else return undefined
}

export const updateUsers = ({ newUsers }) => {
  const users = { ...readServer().users, ...newUsers }
  updateServer({ newProps: { users } })
}
