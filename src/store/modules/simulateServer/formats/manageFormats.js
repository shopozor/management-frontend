import { getProduct, updateProduct, getFormats, setFormat, updateFormat, getOrdersOfFormat } from '../serverAccess'
import { newFormatIsValid, productOwnsFormat, formatHasNoPendingOrder, amountDoesNotFallBelowPendingOrders } from '../validate'
import types from '../../../../types'

export const updateFormatsOfProductAndSummarize = ({ productId, formatsToCreate, formatsToUpdate }) => {
  const summary = {
    create: createSeveralFormatsAndSummarize({ productId, formatsToCreate }),
    update: updateSeveralFormatsAndSummarize({ productId, formatsToUpdate })
  }
  return summary
}

// create format
const createSeveralFormatsAndSummarize = ({ productId, formatsToCreate }) => {
  return Object.keys(formatsToCreate).reduce((summary, formatTempId) => {
    const newFormat = formatsToCreate[formatTempId]
    const formatId = createFormatId({ productId })
    summary[newFormat.formatId] = createFormatAndSummarize({ productId, formatId, newFormat })
  }, {})
}

const createFormatId = ({ productId, formatTempId }) => {
  const ownerId = getProduct({ productId }).ownerId
  return `${ownerId}/${productId}/format:${Date.now()}-${formatTempId}`
}

const createFormatAndSummarize = ({ productId, formatId, newFormat }) => {
  if (newFormatIsValid({ newFormat })) {
    createFormat({ productId, formatId, newFormat })
    return summarizeFormatCreation({ productId, formatId, newFormat })
  } else {
    return { error: 'Invalid format.', formatThatCouldNotBeCreated: newFormat }
  }
}

const summarizeFormatCreation = ({ productId, formatId, newFormat }) => {
  const message = 'Success.'
  const createdFormat = getFormats({ productId })[formatId]
  return { message, createdFormat }
}

const createFormat = ({ productId, formatId, newFormat }) => {
  giveFormatAccessToProduct({ productId, formatId })
  const format = { ...newFormat, formatId, product: productId }
  setFormat({ formatId, format })
}

const giveFormatAccessToProduct = ({ productId, formatId }) => {
  const formats = getProduct({ productId })
  formats.push(formatId)
  updateProduct({ productId, newProps: { formats } })
}

// update format
const updateSeveralFormatsAndSummarize = ({ productId, formatsToUpdate }) => {
  return Object.keys(formatsToUpdate).reduce((summary, formatId) => {
    const newProps = formatsToUpdate[formatId]
    if (productOwnsFormat({ productId, formatId })) {
      summary[formatId] = updateFormatAndSummarize({ formatId, newProps })
    } else {
      summary[formatId] = {
        error: `Format ${formatId} does not belong to product ${productId}.`,
        propsThatCouldNotBeUpdated: newProps
      }
    }
  }, {})
}

const updateFormatAndSummarize = ({ formatId, newProps, force }) => {
  return {
    formatData: updateFormatDataAndSummarize({ formatId, ...newProps }),
    amount: updateAmountAndSummarize({ formatId, amount: newProps.amount, force }),
    invalidKeys: Object.keys(newProps).filter(key => !['size', 'unit', 'customerPrice', 'amount', 'mode', 'state'].includes(key))
  }
}

const updateFormatDataAndSummarize = ({ formatId, size, unit, customerPrice, mode, state }) => {
  if (formatHasNoPendingOrder({ formatId })) {
    updateFormat({ formatId, newProps: { size, unit, customerPrice, mode, state } })
    return {
      message: 'Success.',
      size,
      unit,
      customerPrice,
      mode,
      state
    }
  } else {
    updateFormat({ formatId, newProps: { next: { size, unit, customerPrice, mode, state } } })
    return {
      warning: 'Format not changed yet. Changes will apply as soon as possible.',
      size,
      unit,
      customerPrice,
      mode,
      state
    }
  }
}

const updateAmountAndSummarize = ({ formatId, amount, force }) => {
  if (amount && amountDoesNotFallBelowPendingOrders({ formatId, newAmount: amount })) {
    updateFormat({ formatId, newProps: { amount } })
    return {
      message: 'Success.',
      amount
    }
  } else if (amount && force) {
    updateFormat({ formatId, newProps: { amount } })
    return {
      warning: 'Format amount is now below orders amount. Contact customers !',
      amount,
      orders: getOrdersOfFormat({
        formatId,
        requiredStates: [
          types.orderState.PENDING_NOT_PAID,
          types.orderState.PENDING_PAID]
      })
    }
  }
}
