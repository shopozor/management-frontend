import * as rejectIf from '../rejectIf'
import * as server from '../serverAccess'
import * as manageFormats from './manageFormats'

const delayInMs = 200

export const getFormatsOfProduct = ({ userId, token, productId }) => {
  return new Promise((resolve, reject) => {
    rejectIf.tokenIsInvalid('getFormatsOfProduct', reject, { userId, token })

    resolve({
      message: `[getFormatsOfProduct] formats successfully received`,
      formats: server.getFormatsOfProduct({ productId })
    })
  })
}

export const updateFormatsOfProduct = ({ userId, token, productId, formatsToCreate, formatsToUpdate }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      rejectIf.tokenIsInvalid('updateFormatsOfProduct', reject, { userId, token })
      rejectIf.userDoesNotOwnProduct('updateFormatsOfProduct', reject, { userId, productId })
      rejectIf.someFormatsDoNotBelongToProduct('updateFormatsOfProduct', reject, { formats: formatsToUpdate })
      rejectIf.somePropInSomeObjectIsNotUpdatable('updateFormatsOfProduct', reject, { objects: formatsToCreate, objectType: 'format' })
      rejectIf.somePropInSomeObjectIsNotUpdatable('updateFormatsOfProduct', reject, { objects: formatsToUpdate, objectType: 'format' })
      rejectIf.someFormatAmountFallsBelowPendingOrders('updateFormatsOfProduct', reject, { formatsToUpdate })
      // TODO: pouvoir planifier le retrait d'un format
      rejectIf.someFormatWillDisappearAndHasPendingOrders('updateFormatsOfProduct', reject, formatsToUpdate)

      manageFormats.updateFormatsOfProduct({ productId, formatsToCreate, formatsToUpdate })
      resolve({
        message: `[updateFormatsOfProduct] The formats of the product ${productId} were successfully updated.`,
        formats: server.getFormatsOfProduct({ productId })
      })
    }, delayInMs)
  })
}
