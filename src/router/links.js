import types from '../../common/src/types'

export const links = [
  types.links.LOGIN,
  types.links.SIGNUP,
  types.links.PROFILE,
  types.links.LOGOUT,
  types.links.HOME,
  types.links.FAKE_SHOP,
  types.links.MAP,
  types.links.ORDERS,
  types.links.PRODUCTS,
  types.links.MY_SHOP,
  types.links.MANAGE_SHOPS,
  types.links.MANAGE_SITE
]

export const orderedLinks = {
  userManagement: [
    types.links.SIGNUP,
    types.links.LOGIN,
    types.links.PROFILE,
    types.links.LOGOUT
  ],
  navigation: [
    types.links.HOME,
    types.links.FAKE_SHOP,
    types.links.MAP,
    types.links.CALENDAR,
    types.links.ORDERS,
    types.links.PRODUCTS,
    types.links.MY_SHOP,
    types.links.MANAGE_SHOPS,
    types.links.MANAGE_SITE
  ]
}

export const accessRules = {
  [types.permissions.NOT_CONNECTED]: {
    [types.links.LOGIN]: true,
    [types.links.SIGNUP]: false,
    [types.links.PROFILE]: false,
    [types.links.LOGOUT]: false,
    [types.links.HOME]: true,
    [types.links.FAKE_SHOP]: true,
    [types.links.CALENDAR]: false,
    [types.links.MAP]: true,
    [types.links.ORDERS]: false,
    [types.links.PRODUCTS]: false,
    [types.links.MY_SHOP]: false,
    [types.links.MANAGE_SHOPS]: false,
    [types.links.MANAGE_SITE]: false
  },
  [types.permissions.MANAGE_PRODUCTS]: {
    [types.links.LOGIN]: false,
    [types.links.SIGNUP]: false,
    [types.links.PROFILE]: true,
    [types.links.LOGOUT]: true,
    [types.links.HOME]: true,
    [types.links.FAKE_SHOP]: true,
    [types.links.CALENDAR]: true,
    [types.links.MAP]: true,
    [types.links.ORDERS]: true,
    [types.links.PRODUCTS]: true,
    [types.links.MY_SHOP]: false,
    [types.links.MANAGE_SHOPS]: false,
    [types.links.MANAGE_SITE]: false
  },
  [types.permissions.MANAGE_PRODUCERS]: {
    [types.links.LOGIN]: false,
    [types.links.SIGNUP]: false,
    [types.links.PROFILE]: true,
    [types.links.LOGOUT]: true,
    [types.links.HOME]: true,
    [types.links.FAKE_SHOP]: true,
    [types.links.CALENDAR]: true,
    [types.links.MAP]: true,
    [types.links.ORDERS]: false,
    [types.links.PRODUCTS]: false,
    [types.links.MY_SHOP]: true,
    [types.links.MANAGE_SHOPS]: false,
    [types.links.MANAGE_SITE]: false
  },
  [types.permissions.MANAGE_MANAGERS]: {
    [types.links.LOGIN]: false,
    [types.links.SIGNUP]: false,
    [types.links.PROFILE]: true,
    [types.links.LOGOUT]: true,
    [types.links.HOME]: true,
    [types.links.FAKE_SHOP]: true,
    [types.links.CALENDAR]: true,
    [types.links.MAP]: true,
    [types.links.ORDERS]: false,
    [types.links.PRODUCTS]: false,
    [types.links.MY_SHOP]: false,
    [types.links.MANAGE_SHOPS]: true,
    [types.links.MANAGE_SITE]: false
  },
  [types.permissions.MANAGE_STAFF]: {
    [types.links.LOGIN]: false,
    [types.links.SIGNUP]: false,
    [types.links.PROFILE]: true,
    [types.links.LOGOUT]: true,
    [types.links.HOME]: true,
    [types.links.FAKE_SHOP]: true,
    [types.links.CALENDAR]: true,
    [types.links.MAP]: true,
    [types.links.ORDERS]: false,
    [types.links.PRODUCTS]: false,
    [types.links.MY_SHOP]: false,
    [types.links.MANAGE_SHOPS]: true,
    [types.links.MANAGE_SITE]: false
  },
  [types.permissions.MANAGE_USERS]: {
    [types.links.LOGIN]: false,
    [types.links.SIGNUP]: false,
    [types.links.PROFILE]: true,
    [types.links.LOGOUT]: true,
    [types.links.HOME]: true,
    [types.links.FAKE_SHOP]: true,
    [types.links.CALENDAR]: true,
    [types.links.MAP]: true,
    [types.links.ORDERS]: false,
    [types.links.PRODUCTS]: false,
    [types.links.MY_SHOP]: false,
    [types.links.MANAGE_SHOPS]: true,
    [types.links.MANAGE_SITE]: false
  },
  [types.permissions.MANAGE_REX]: {
    [types.links.LOGIN]: false,
    [types.links.SIGNUP]: false,
    [types.links.PROFILE]: true,
    [types.links.LOGOUT]: true,
    [types.links.HOME]: true,
    [types.links.FAKE_SHOP]: true,
    [types.links.CALENDAR]: true,
    [types.links.MAP]: true,
    [types.links.ORDERS]: false,
    [types.links.PRODUCTS]: false,
    [types.links.MY_SHOP]: false,
    [types.links.MANAGE_SHOPS]: false,
    [types.links.MANAGE_SITE]: true
  }
}
