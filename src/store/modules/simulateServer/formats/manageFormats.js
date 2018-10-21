import { getProduct, updateProduct, setFormat, updateFormat, delayedUpdateFormat } from '../serverAccess'
import { formatHasNoPendingOrder, filterUpdatableProps } from '../validate'

export const updateFormatsOfProduct = ({ productId, formats }) => {
  Object.keys(formats).map(formatId => {
    const filteredFormat = filterUpdatableProps({ object: formats[formatId], type: 'format' })
    const formatAlreadyExists = getProduct({ productId }).formatsIds.some(id => formatId === id)
    if (formatAlreadyExists) updateFormatCarefully({ formatId, newProps: filteredFormat })
    else createFormat({ productId, formatTempId: formatId, newFormat: filteredFormat })
  })
}

// create format
const createFormat = ({ productId, formatTempId, newFormat }) => {
  const formatId = createFormatId({ productId, formatTempId })
  giveFormatAccessToProduct({ productId, formatId })
  const format = {
    ...newFormat,
    formatId,
    productId,
    ordersIds: [],
    ordersSummary: {
      amount: 0,
      customerPrice: 0
    }
  }
  setFormat({ formatId, format })
}

const createFormatId = ({ productId, formatTempId }) => {
  const ownerId = getProduct({ productId }).producerId
  return `${ownerId}/${productId}/format:${Date.now()}-${formatTempId}`
}

const giveFormatAccessToProduct = ({ productId, formatId }) => {
  const formatsIds = getProduct({ productId }).formatsIds
  formatsIds.push(formatId)
  updateProduct({ productId, newProps: { formatsIds } })
}

// update format
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
  if (formatHasNoPendingOrder({ formatId })) updateFormat({ formatId, newProps })
  else delayedUpdateFormat({ formatId, newNextChanges: newProps })
}
