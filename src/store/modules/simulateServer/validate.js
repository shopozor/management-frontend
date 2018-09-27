import { getUser } from './manageUsers'
import { readServer } from './serverAccess'

export const userDoesExist = ({ email, userId }) => {
  const users = readServer().users
  const userIdExists = userId && Object.keys(users).some(key => key === userId)
  const emailExists = email && Object.values(users).some(user => user.email === email)
  return userIdExists || emailExists
}

export const passwordIsValid = ({ email, userId, password }) => {
  const user = getUser({ email, userId })
  return password === user.password
}

export const tokenIsValid = ({ email, userId, token }) => {
  const user = getUser({ email, userId })
  return token && user && token === user.token
}

export const userOwnsProduct = ({ userId, email, productId }) => {
  const ownedProducts = getUser({ userId, email }).productIds
  return ownedProducts.some(id => id === productId)
}

export const userHasAuthorizations = ({ userId, email, authorizations }) => {
  const user = getUser({ userId, email })
  return authorizations.every(required => user.authorizations.some(available => available === required))
}

export const productIsValid = ({ product }) => {
  return product.name !== undefined
}
