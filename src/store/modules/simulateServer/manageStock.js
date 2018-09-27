import { getProducts } from './manageProducts'

export const updateStockAndSummarize = ({ productId, arrayOfFormatsToCreate, arrayOfFormatsToChange, arrayOfFormatsToDelete }) => {
  const summary = {
    create: createSeveralFormatsAndSummarize(),
    change: changeSeveralFormatsAndSummarize(),
    delete: deleteSeveralFormatsAndSummarize()
  }
  return summary
}

const createSeveralFormatsAndSummarize = ({ productId, arrayOfFormatsToCreate }) => {
  return arrayOfFormatsToCreate.reduce((summary, format, index) => {
    const formatId = createFormatId({ productId })
    arrayOfFormatsToCreate[index].formatId = formatId
    summary[formatId] = createFormatAndSummarize({ productId, formatToCreate: arrayOfFormatsToCreate[index] })
  }, {})
}

const createFormatId = ({ productId }) => {
  const ownerId = getProducts()[productId].ownerId
  return `${ownerId}/${productId}/${Date.now()}`
}

const createFormatAndSummarize = ({ productId, formatToCreate }) => {

}

const changeSeveralFormatsAndSummarize = ({ productId, arrayOfFormatsToUpdate }) => {
  return arrayOfFormatsToUpdate.reduce((summary, format, index) => {
    const formatId = format[index].formatId
    summary[formatId] = changeFormatAndSummarize({ productId, formatId, newProps: format })
  }, {})
}

const changeFormatAndSummarize = ({ productId, formatId, newProps }) => {
  return {
    size: changeSizeAndSummarize({ productId, formatId, newSize: newProps.size }),
    unit: changeUnitAndSummarize({ productId, formatId, newUnit: newProps.unit }),
    price: changePriceAndSummarize({ productId, formatId, newCustomerPrice: newProps.newCustomerPrice }),
    amount: changeAmountAndSummarize({ productId, formatId, newAmount: newProps.newAmount }),
    interface: changeInterfaceAndSummarize({ productId, formatId, newInterface: newProps.newInterface })
  }
}

const deleteSeveralFormatsAndSummarize = ({ productId, arrayOfFormatsToDelete }) => {
  return arrayOfFormatsToDelete.reduce((summary, format) => {
    summary[formatId] = deleteFormatAndSummarize({ productId, formatId })
  }, {})
}

const deleteFormatAndSummarize = ({ productId, formatId }) => {
  // met la quantité à 0 et archive le format
}

// voir les specs pour faire ça correctement
const changeSizeAndSummarize = ({ productId, formatId, newSize }) => { }

const changeUnitAndSummarize = ({ productId, formatId, newUnit }) => { }

const changePriceAndSummarize = ({ productId, formatId, newCustomerPrice }) => { }

const changeAmountAndSummarize = ({ productId, formatId, newAmount }) => { }

const changeInterfaceAndSummarize = ({ productId, formatId, newInterface }) => { }

export const addOrders = ({ productId, formatId, newOrders }) => {
  // const orders = [...getStock({ productId })[formatId].orders, ...newOrders]
  // changeFormatAndSummarize({ productId, formatId, newProps: { orders } })
}

// const stockDoesNotFallBelowOrders = ({ oldFormat, newProps }) => {

// }

export const getStock = ({ productId }) => getProducts()[productId].stock
