import { tokenIsValid, userOwnsProduct } from '../validate'
import * as server from '../serverAccess'
import * as manageFormats from './manageFormats'

const delayInMs = 200

export const getFormatsOfProduct = ({ userId, token, productId }) => {
  return new Promise((resolve, reject) => {
    if (tokenIsValid({ userId, token })) {
      resolve({
        message: `[getFormatsOfProduct()] formats successfully received`,
        formats: server.getFormatsOfProduct({ productId })
      })
    } else {
      reject(new Error(`[getFormatsOfProduct()] not authorized`))
    }
  })
}

export const updateFormatsOfProduct = ({ userId, token, productId, formatsToCreate, formatsToUpdate }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (tokenIsValid({ userId, token }) && userOwnsProduct({ userId, productId })) {
        const balanceSheet = manageFormats.updateFormatsOfProductAndSummarize({ productId, formatsToCreate, formatsToUpdate })
        if (Object.keys(balanceSheet.notUpdated).length === 0) {
          resolve({
            message: `[updateProductStock()] stock successfully updated`,
            formats: server.getFormatsOfProduct({ productId })
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
