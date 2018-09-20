import { writeServer } from './serverAccess'
import { createUser, authorize } from './manageUsers'
import { createProduct } from './manageProducts'
import * as auth from '../../../types/authorization'

export const initFakeServer = () => {
  writeServer({
    users: {}
  })

  createUser({ email: 'client@budzons.ch', password: 'Budzonnerie1' })
  createUser({ email: 'producteur@budzons.ch', password: 'Budzonnerie1' })
  createUser({ email: 'gerant@budzons.ch', password: 'Budzonnerie1' })
  createUser({ email: 'manager@budzons.ch', password: 'Budzonnerie1' })
  createUser({ email: 'softozor@budzons.ch', password: 'Budzonnerie1' })
  createUser({ email: 'producteur-gerant@budzons.ch', password: 'Budzonnerie1' })

  authorize({ email: 'producteur@budzons.ch', authorization: auth.PRODUCER })
  authorize({ email: 'gerant@budzons.ch', authorization: auth.SHOP_MANAGER })
  authorize({ email: 'manager@budzons.ch', authorization: auth.TOP_MANAGER })
  authorize({ email: 'softozor@budzons.ch', authorization: auth.PRODUCER })
  authorize({ email: 'softozor@budzons.ch', authorization: auth.SHOP_MANAGER })
  authorize({ email: 'softozor@budzons.ch', authorization: auth.TOP_MANAGER })
  authorize({ email: 'softozor@budzons.ch', authorization: auth.SOFTOZOR })
  authorize({ email: 'producteur-gerant@budzons.ch', authorization: auth.PRODUCER })
  authorize({ email: 'producteur-gerant@budzons.ch', authorization: auth.SHOP_MANAGER })

  createProduct({
    email: 'producteur@budzons.ch',
    newProduct: {
      name: 'Ragoût de Budzon',
      description: 'de délicieuses fourmis en ragoût',
      stock: [
        {
          measure: 500,
          unit: 'gr',
          amount: 5
        },
        {
          measure: 250,
          unit: 'gr',
          amount: 4
        }
      ]
    }
  })
}
