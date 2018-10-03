import { getUser, updateUser, setProduct } from '../serverAccess'
import types from '../../../../types'

export const createProduct = ({ userId, email, newProduct }) => {
  const user = getUser({ userId, email })
  const productId = generateProductId({ userId: user.userId })
  const product = {
    productId,
    state: types.productState.INVISIBLE,
    producer: user.userId,
    formats: [],
    ...newProduct
  }
  setProduct({ productId, product })
  giveProductAccessToUser({ userId, email, productId })
}

export const giveProductAccessToUser = ({ userId, email, productId }) => {
  const products = getUser({ userId, email }).products
  products.push(productId)
  updateUser({ userId, email, newProps: { products } })
}

const generateProductId = ({ userId }) => `${userId}/product:${Date.now()}`
