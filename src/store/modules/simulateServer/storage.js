import types from '../../../types'

const fakeServerData = {
  users: [
    {
      email: 'client@budzons.ch',
      password: 'Budzonnerie1',
      userId: 'client',
      authorization: [types.auth.CONSUMER],
      profile: {},
      orders: []
    },
    {
      email: 'producteur@budzons.ch',
      password: 'Budzonnerie1',
      userId: 'producteur',
      authorization: [types.auth.CONSUMER, types.auth.PRODUCER],
      profile: {},
      orders: [],
      deliverablesShops: ['budz-01'],
      products: []
    },
    {
      email: 'gerant@budzons.ch',
      password: 'Budzonnerie1',
      userId: 'gérant',
      authorization: [types.auth.CONSUMER, types.auth.SHOP_MANAGER],
      profile: {},
      orders: [],
      products: [],
      shop: {
        shopId: 'budz-01',
        producers: ['producteur@budzons.ch', 'gerant@budzons.ch']
      }
    },
    {
      email: 'manager@budzons.ch',
      password: 'Budzonnerie1',
      userId: 'manager',
      authorization: [types.auth.CONSUMER, types.auth.TOP_MANAGER],
      profile: {},
      orders: [],
      products: []
    },
    {
      email: 'softozor@budzons.ch',
      password: 'Budzonnerie1',
      userId: 'softozor',
      authorization: [types.auth.CONSUMER, types.auth.SOFTOZOR]
    },
    {
      email: 'producteur-gerant@budzons.ch',
      password: 'Budzonnerie1',
      userId: 'producteur-gerant',
      authorization: [types.auth.CONSUMER, types.auth.PRODUCER, types.auth.SHOP_MANAGER],
      profile: {},
      orders: [],
      deliverablesShops: ['budz-01'],
      products: [],
      shop: {
        shopId: 'budz-01',
        producers: ['producteur@budzons.ch', 'gerant@budzons.ch']
      }
    }
  ]
}

export const initFakeServer = () => {
  localStorage.setItem('fake_server', JSON.stringify(fakeServerData))
}

export const read = () => JSON.parse(localStorage.getItem('fake_server'))

export const write = newServerData => {
  localStorage.setItem('fake_server', JSON.stringify(newServerData))
}
