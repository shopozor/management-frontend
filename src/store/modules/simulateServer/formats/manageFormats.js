import { getProduct, updateProduct, setFormat, updateFormat, delayedUpdateFormat } from '../serverAccess'
import { formatHasNoPendingOrder } from '../validate'

export const updateFormatsOfProduct = ({ productId, formatsToCreate, formatsToUpdate }) => {
  const summary = {
    create: createSeveralFormats({ productId, formatsToCreate }),
    update: updateSeveralFormats({ productId, formatsToUpdate })
  }
  return summary
}

// create format
export const createSeveralFormats = ({ productId, formatsToCreate }) => {
  Object.keys(formatsToCreate).map(formatTempId => {
    const newFormat = formatsToCreate[formatTempId]
    const formatId = createFormatId({ productId, formatTempId })
    createFormat({ productId, formatId, newFormat })
  }, {})
}

const createFormatId = ({ productId, formatTempId }) => {
  const ownerId = getProduct({ productId }).producer
  return `${ownerId}/${productId}/format:${Date.now()}-${formatTempId}`
}

const createFormat = ({ productId, formatId, newFormat }) => {
  giveFormatAccessToProduct({ productId, formatId })
  const format = { ...newFormat, formatId, product: productId }
  setFormat({ formatId, format })
}

const giveFormatAccessToProduct = ({ productId, formatId }) => {
  const formats = getProduct({ productId }).formats
  formats.push(formatId)
  updateProduct({ productId, newProps: { formats } })
}

// update format
const updateSeveralFormats = ({ formatsToUpdate }) => {
  Object.keys(formatsToUpdate).map(formatId => {
    const newProps = formatsToUpdate[formatId]
    updateFormatCarefully({ formatId, newProps })
  })
}

const updateFormatCarefully = ({ formatId, newProps }) => {
  updateFormatAccessibilityIfNotRejected({ formatId, newProps })
  updateCarefullyFormatDescription({ formatId, newProps })
}

const updateFormatAccessibilityIfNotRejected = ({ formatId, newProps }) => {
  const filteredProps = {
    amount: newProps.amount,
    state: newProps.state
  }
  updateFormat({ formatId, newProps: filteredProps })
}

const updateCarefullyFormatDescription = ({ formatId, newProps }) => {
  const filteredProps = {
    size: newProps.size,
    unit: newProps.unit,
    customerPrice: newProps.customerPrice,
    mode: newProps.mode
  }
  if (formatHasNoPendingOrder({ formatId })) updateFormat({ formatId, newProps: filteredProps })
  else delayedUpdateFormat({ formatId, newNextChanges: filteredProps })
}
