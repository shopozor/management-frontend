import * as rejectIf from '../rejectIf'
import * as server from '../serverAccess'
import * as manageFormats from './manageFormats'

const delayInMs = 200

export const getFormats = ({ userId, token }) => {
  return new Promise((resolve, reject) => {
    rejectIf.tokenIsInvalid('getFormats', reject, { userId, token })

    resolve({
      message: `[getFormats] The formats were successfully sent.`,
      formats: server.getFormats()
    })
  })
}

export const getFormatsOfProduct = ({ userId, token, productId }) => {
  return new Promise((resolve, reject) => {
    rejectIf.tokenIsInvalid('getFormatsOfProduct', reject, { userId, token })

    resolve({
      message: `[getFormatsOfProduct] The formats of product ${productId} were successfully sent.`,
      formats: server.getFormatsOfProduct({ productId })
    })
  })
}

export const updateFormatsOfProduct = ({ userId, token, productId, formats }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      rejectIf.tokenIsInvalid('updateFormatsOfProduct', reject, { userId, token })
      rejectIf.userDoesNotOwnProduct('updateFormatsOfProduct', reject, { userId, productId })
      rejectIf.someFormatsDoNotBelongToProduct('updateFormatsOfProduct', reject, { formats, productId })
      // rejectIf.somePropInSomeObjectIsNotUpdatable('updateFormatsOfProduct', reject, { objects: formatsToCreate, objectType: 'format' })
      // rejectIf.somePropInSomeObjectIsNotUpdatable('updateFormatsOfProduct', reject, { objects: formatsToUpdate, objectType: 'format' })
      rejectIf.someFormatAmountFallsBelowPendingOrders('updateFormatsOfProduct', reject, { formats })
      // TODO: pouvoir planifier le retrait d'un format
      rejectIf.someFormatWillDisappearAndHasPendingOrders('updateFormatsOfProduct', reject, { formats })

      manageFormats.updateFormatsOfProduct({ productId, formats })
      resolve({
        message: `[updateFormatsOfProduct] The formats of the product ${productId} were successfully updated.`,
        formats: server.getFormatsOfProduct({ productId })
      })
    }, delayInMs)
  })
}
