// import types from '../../../types'
import { getUser, updateUser } from './manageUsers'

export const createProduct = ({ email, userId, newProduct }) => {
  const user = getUser({ email, userId })
  const productId = generateProductId({ userId: user.userId })
  const newProducts = { ...user.products, [productId]: { ...newProduct, productId } }
  updateUser({ email, userId, newProps: { products: newProducts } })
}

const generateProductId = ({ userId }) => `${userId}/product/${Date.now()}`

export const updateProduct = ({ email, userId, productId, newProps }) => {
  const product = getProducts({ email, userId })[productId]
  const newProducts = { [productId]: { ...product, ...newProps } }
  updateProducts({ userId, email, newProducts })
}

export const removeProduct = ({ email, userId, productId }) => {
  const products = getProducts({ email, userId })
  delete products[productId]
  updateUser({ userId, email, newProps: { products } })
}

export const getProducts = ({ userId, email }) => {
  const user = getUser({ email, userId })
  return user.products
}

export const updateProducts = ({ userId, email, newProducts }) => {
  const products = { ...getUser({ email, userId }).products, ...newProducts }
  updateUser({ userId, email, newProps: { products } })
}
