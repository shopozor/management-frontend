import { readServer, updateServer } from './serverAccess'
import { getUser, updateUser } from './manageUsers'

export const createProduct = ({ email, userId, newProduct }) => {
  const user = getUser({ email, userId })
  const productId = generateProductId({ userId: user.userId })
  const newProducts = { [productId]: { ...newProduct, productId, owner: user.userId } }
  updateProducts({ newProducts })
  giveProductAccessToUser({ userId, email, productId })
}

export const giveProductAccessToUser = ({ email, userId, productId }) => {
  const productIds = getProductIdsOfUser({ userId, email })
  productIds.push(productId)
  updateUser({ userId, email, newProps: { productIds } })
}

const generateProductId = ({ userId }) => `${userId}/product:${Date.now()}`

export const updateProduct = ({ productId, newProps }) => {
  const newProduct = { ...getProducts()[productId], ...newProps }
  const newProducts = { [productId]: newProduct }
  updateProducts({ newProducts })
}

export const removeProduct = ({ productId }) => {
  removeProductAccess({ productId })
  const products = getProducts()
  delete products[productId]
  updateServer({ newProps: { products } })
}

export const removeProductAccess = ({ productId }) => {
  const userId = getOwnerOfProduct({ productId })
  const productIds = getUser({ userId }).productIds.filter(id => id !== productId)
  updateUser({ userId, newProps: { productIds } })
}

export const getProductsOf = ({ userId, email }) => {
  const productIds = getProductIdsOfUser({ userId, email })
  const products = getProducts()
  const productsOfUser = {}
  productIds.forEach(id => { productsOfUser[id] = products[id] })
  return productsOfUser
}

export const getOwnerOfProduct = ({ productId }) => getProducts()[productId].owner

export const getProductIdsOfUser = ({ userId, email }) => getUser({ userId, email }).productIds

export const updateProducts = ({ newProducts }) => {
  const products = { ...getProducts(), ...newProducts }
  updateServer({ newProps: { products } })
}

export const getProducts = () => readServer().products
