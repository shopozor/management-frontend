import { getUser, updateUser, setProduct } from '../serverAccess'
import types from '../../../../types'

export const createProduct = ({ userId, email, newProduct }) => {
  const user = getUser({ userId, email })
  const productId = generateProductId({ userId: user.userId })
  const product = {
    productId,
    state: types.productState.INVISIBLE,
    producerId: user.userId,
    formatsIds: [],
    ordersSummary: {
      amount: 0,
      customerPrice: 0
    },
    ...newProduct
  }
  setProduct({ productId, product })
  giveProductAccessToUser({ userId, email, productId })
}

export const giveProductAccessToUser = ({ userId, email, productId }) => {
  const productsIds = getUser({ userId, email }).productsIds
  productsIds.push(productId)
  updateUser({ userId, email, newProps: { productsIds } })
}

const generateProductId = ({ userId }) => `${userId}/product:${Date.now()}`
