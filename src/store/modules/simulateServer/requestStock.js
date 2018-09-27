import * as validate from './validate'
import { updateStock, getStock } from './manageStock'

const delayInMs = 200

export const updateProductStock = ({ userId, token, productId, newStock }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (validate.tokenIsValid({ userId, token }) && validate.userOwnsProduct({ userId, productId })) {
        const balanceSheet = updateStock({ productId, newStock })
        if (Object.keys(balanceSheet.notUpdated).length === 0) {
          resolve({
            message: `[updateProductStock()] stock successfully updated`,
            stock: getStock({ productId })
          })
        } else {
          reject(new Error(`[updateProductStock()] some formats could not be updated: ${JSON.stringify(balanceSheet)}`))
        }
      } else {
        reject(new Error('[updateProductStock()] not authorized'))
      }
    }, delayInMs)
  })
}
