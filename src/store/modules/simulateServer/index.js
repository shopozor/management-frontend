import { setServer, getUser, getFormats } from './serverAccess'
import { createUser, authorize } from './users/manageUsers'
import { createProduct } from './products/manageProducts'
import { createSeveralFormats } from './formats/manageFormats'
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
      aisle: types.aisle.DAIRY,
      conservationMethod: types.conservation.FRIDGE,
      conservationDays: 7,
      defaultFormatMode: types.formatMode.AUTO_UNIT,
      defaultUnit: types.units.volume.DL,
      defaultCustomerPrice: 1
    }
  })

  wait()

  createProduct({
    email: 'producteur@budzons.ch',
    newProduct: {
      title: 'Ragoût de Budzon',
      description: 'Si c\'est bon !',
      state: types.productState.VISIBLE,
      aisle: types.aisle.MEAT,
      conservationMethod: types.conservation.FRIDGE,
      conservationDays: 7,
      defaultFormatMode: types.formatMode.AUTO_PRICE,
      defaultUnit: types.units.mass.HG,
      defaultCustomerPrice: 3.50
    }
  })

  wait()

  createProduct({
    email: 'producteur@budzons.ch',
    newProduct: {
      title: 'Miel de Budzon',
      description: 'Et pourtant elles ne butinent pas !',
      state: types.productState.VISIBLE,
      aisle: types.aisle.GROCERY,
      conservationMethod: types.conservation.BASEMENT,
      conservationDays: 365,
      defaultFormatMode: types.formatMode.FREE,
      defaultUnit: types.units.PIECE,
      defaultCustomerPrice: 20
    }
  })

  const productsIds = getUser({ email: 'producteur@budzons.ch' }).productsIds

  createSeveralFormats({
    productId: productsIds[0],
    formatsToCreate: {
      tempId1: {
        size: 5,
        unit: types.units.volume.DL,
        customerPrice: 5,
        mode: types.formatMode.AUTO_UNIT,
        state: types.formatState.VISIBLE,
        amount: 12
      },
      tempId2: {
        size: 8,
        unit: types.units.volume.DL,
        customerPrice: 7,
        mode: types.formatMode.AUTO_UNIT,
        state: types.formatState.VISIBLE,
        amount: 9
      }
    }
  })

  createSeveralFormats({
    productId: productsIds[1],
    formatsToCreate: {
      tempId1: {
        size: 300,
        unit: types.units.mass.GR,
        customerPrice: 10.50,
        mode: types.formatMode.AUTO_PRICE,
        state: types.formatState.VISIBLE,
        amount: 8
      },
      tempId2: {
        size: 500,
        unit: types.units.mass.GR,
        customerPrice: 17.50,
        mode: types.formatMode.AUTO_UNIT,
        state: types.formatState.VISIBLE,
        amount: 4
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
