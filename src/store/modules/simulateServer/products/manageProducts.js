import * as server from '../serverAccess'
import { filterUpdatableProps } from '../validate'
import types from 'src/types'

export const updateProduct = ({ productId, newProps }) => {
  const filteredProps = filterUpdatableProps({ object: newProps, type: 'product' })
  server.updateProduct({ productId, newProps: filteredProps })
}

export const createProduct = ({ userId, email, newProduct }) => {
  const filteredProps = filterUpdatableProps({ object: newProduct, type: 'product' })
  const user = server.getUser({ userId, email })
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
    ...filteredProps
  }
  server.setProduct({ productId, product })
  giveProductAccessToUser({ userId, email, productId })
}

export const giveProductAccessToUser = ({ userId, email, productId }) => {
  const productsIds = server.getUser({ userId, email }).productsIds
  productsIds.push(productId)
  server.updateUser({ userId, email, newProps: { productsIds } })
}

const generateProductId = ({ userId }) => `${userId}/product:${Date.now()}`
