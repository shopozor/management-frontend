import { setServer, getUser, getFormats } from './serverAccess'
import { createUser, authorize } from './users/manageUsers'
import { createProduct } from './products/manageProducts'
import { updateFormatsOfProduct } from './formats/manageFormats'
import types from '../../../types'
import { orderFormats } from './orders/manageOrders'

export const initFakeServer = () => {
  setServer({
    server: {
      users: {},
      products: {},
      formats: {},
      orders: {}
    }
  })

  createUser({ email: 'client@budzons.ch', password: 'Budzonnerie1' })
  createUser({ email: 'producteur@budzons.ch', password: 'Budzonnerie1' })
  createUser({ email: 'gerant@budzons.ch', password: 'Budzonnerie1' })
  createUser({ email: 'manager@budzons.ch', password: 'Budzonnerie1' })
  createUser({ email: 'softozor@budzons.ch', password: 'Budzonnerie1' })
  createUser({ email: 'producteur-gerant@budzons.ch', password: 'Budzonnerie1' })

  authorize({ email: 'producteur@budzons.ch', authorization: types.auth.PRODUCER })
  authorize({ email: 'gerant@budzons.ch', authorization: types.auth.SHOP_MANAGER })
  authorize({ email: 'manager@budzons.ch', authorization: types.auth.TOP_MANAGER })
  authorize({ email: 'softozor@budzons.ch', authorization: types.auth.PRODUCER })
  authorize({ email: 'softozor@budzons.ch', authorization: types.auth.SHOP_MANAGER })
  authorize({ email: 'softozor@budzons.ch', authorization: types.auth.TOP_MANAGER })
  authorize({ email: 'softozor@budzons.ch', authorization: types.auth.SOFTOZOR })
  authorize({ email: 'producteur-gerant@budzons.ch', authorization: types.auth.PRODUCER })
  authorize({ email: 'producteur-gerant@budzons.ch', authorization: types.auth.SHOP_MANAGER })

  createProduct({
    email: 'producteur@budzons.ch',
    newProduct: {
      title: 'Lait de Budzon',
      description: 'Ben t\'imagines pas le prix de la trayeuse',
      state: types.productState.VISIBLE,
      categories: [types.categories.DAIRY],
      conservationMethod: types.conservation.FRIDGE,
      conservationDays: 7,
      defaultFormatUI: types.formatUI.AUTO_UNIT,
      defaultUnit: types.units.volume.DL,
      defaultCustomerPrice: 100
    }
  })

  wait()

  createProduct({
    email: 'producteur@budzons.ch',
    newProduct: {
      title: 'Ragoût de Budzon',
      description: 'Si c\'est bon !',
      state: types.productState.VISIBLE,
      categories: [types.categories.MEAT],
      conservationMethod: types.conservation.FRIDGE,
      conservationDays: 7,
      defaultFormatUI: types.formatUI.AUTO_PRICE,
      defaultUnit: types.units.mass.HG,
      defaultCustomerPrice: 350
    }
  })

  wait()

  createProduct({
    email: 'producteur@budzons.ch',
    newProduct: {
      title: 'Miel de Budzon',
      description: 'Et pourtant elles ne butinent pas !',
      state: types.productState.VISIBLE,
      categories: [types.categories.GROCERY],
      conservationMethod: types.conservation.BASEMENT,
      conservationDays: 365,
      defaultFormatUI: types.formatUI.FREE
    }
  })

  const productsIds = getUser({ email: 'producteur@budzons.ch' }).productsIds

  updateFormatsOfProduct({
    productId: productsIds[0],
    formats: {
      tempId1: {
        size: 5,
        sizeUnit: types.units.volume.DL,
        customerPrice: 500,
        formatUI: types.formatUI.AUTO_UNIT,
        state: types.formatState.VISIBLE,
        amount: 12
      },
      tempId2: {
        size: 8,
        sizeUnit: types.units.volume.DL,
        customerPrice: 700,
        formatUI: types.formatUI.AUTO_UNIT,
        state: types.formatState.VISIBLE,
        amount: 9
      }
    }
  })

  updateFormatsOfProduct({
    productId: productsIds[1],
    formats: {
      tempId1: {
        size: 300,
        sizeUnit: types.units.mass.GR,
        customerPrice: 1050,
        formatUI: types.formatUI.AUTO_PRICE,
        state: types.formatState.VISIBLE,
        amount: 8
      },
      tempId2: {
        size: 500,
        sizeUnit: types.units.mass.GR,
        customerPrice: 1750,
        formatUI: types.formatUI.AUTO_UNIT,
        state: types.formatState.VISIBLE,
        amount: 4
      },
      tempId3: {
        description: 'petite barquette',
        customerPrice: 1050,
        formatUI: types.formatUI.FREE,
        state: types.formatState.VISIBLE,
        amount: 8
      },
      tempId4: {
        customerPrice: 350,
        customerPriceUnit: types.units.mass.HG,
        formatUI: types.formatUI.BULK,
        state: types.formatState.VISIBLE,
        amount: 4,
        amountUnit: types.units.mass.KG
      }
    }
  })

  updateFormatsOfProduct({
    productId: productsIds[2],
    formats: {
      tempId1: {
        size: 300,
        sizeUnit: types.units.mass.GR,
        customerPrice: 1000,
        formatUI: types.formatUI.AUTO_UNIT,
        state: types.formatState.VISIBLE,
        amount: 20
      }
    }
  })

  const formatIds = Object.keys(getFormats())
  const customerId = getUser({ email: 'client@budzons.ch' }).userId

  orderFormats({
    customerId,
    formatsAmounts: {
      [formatIds[0]]: 1,
      [formatIds[1]]: 3
    }
  })
}

const wait = () => {
  const now = Date.now()
  while (Date.now() === now) {
    console.log(`waiting at ${now} before creating new product`)
  }
}
