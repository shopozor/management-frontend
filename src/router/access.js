import types from '../types'

const access = {
  [types.permissions.NOT_CONNECTED]: {
    // user
    [types.links.LOGIN]: true,
    [types.links.SIGNUP]: false,
    [types.links.PROFILE]: false,
    // pages
    [types.links.HOME]: true,
    [types.links.FAKE_SHOP]: true,
    [types.links.MAP]: true,
    [types.links.ORDERS]: false,
    [types.links.PRODUCTS]: false,
    [types.links.MY_SHOP]: false,
    [types.links.MANAGE_SHOPS]: false,
    [types.links.MANAGE_SITE]: false,
    // last
    [types.links.LOGOUT]: false
  },
  [types.permissions.MANAGE_PRODUCTS]: {
    // user
    [types.links.LOGIN]: false,
    [types.links.SIGNUP]: false,
    [types.links.PROFILE]: true,
    // pages
    [types.links.HOME]: true,
    [types.links.FAKE_SHOP]: true,
    [types.links.CALENDAR]: true,
    [types.links.MAP]: true,
    [types.links.ORDERS]: true,
    [types.links.PRODUCTS]: true,
    [types.links.MY_SHOP]: false,
    [types.links.MANAGE_SHOPS]: false,
    [types.links.MANAGE_SITE]: false,
    // last
    [types.links.LOGOUT]: true
  },
  [types.permissions.MANAGE_PRODUCERS]: {
    // user
    [types.links.LOGIN]: false,
    [types.links.SIGNUP]: false,
    [types.links.PROFILE]: true,
    // pages
    [types.links.HOME]: true,
    [types.links.FAKE_SHOP]: true,
    [types.links.CALENDAR]: true,
    [types.links.MAP]: true,
    [types.links.ORDERS]: false,
    [types.links.PRODUCTS]: false,
    [types.links.MY_SHOP]: true,
    [types.links.MANAGE_SHOPS]: false,
    [types.links.MANAGE_SITE]: false,
    // last
    [types.links.LOGOUT]: true
  },
  [types.permissions.MANAGE_MANAGERS]: {
    // user
    [types.links.LOGIN]: false,
    [types.links.SIGNUP]: false,
    [types.links.PROFILE]: true,
    // pages
    [types.links.HOME]: true,
    [types.links.FAKE_SHOP]: true,
    [types.links.CALENDAR]: true,
    [types.links.MAP]: true,
    [types.links.ORDERS]: false,
    [types.links.PRODUCTS]: false,
    [types.links.MY_SHOP]: false,
    [types.links.MANAGE_SHOPS]: true,
    [types.links.MANAGE_SITE]: false,
    // last
    [types.links.LOGOUT]: true
  },
  [types.permissions.MANAGE_STAFF]: {
    // user
    [types.links.LOGIN]: false,
    [types.links.SIGNUP]: false,
    [types.links.PROFILE]: true,
    // pages
    [types.links.HOME]: true,
    [types.links.FAKE_SHOP]: true,
    [types.links.CALENDAR]: true,
    [types.links.MAP]: true,
    [types.links.ORDERS]: false,
    [types.links.PRODUCTS]: false,
    [types.links.MY_SHOP]: false,
    [types.links.MANAGE_SHOPS]: true,
    [types.links.MANAGE_SITE]: false,
    // last
    [types.links.LOGOUT]: true
  },
  [types.permissions.MANAGE_USERS]: {
    // user
    [types.links.LOGIN]: false,
    [types.links.SIGNUP]: false,
    [types.links.PROFILE]: true,
    // pages
    [types.links.HOME]: true,
    [types.links.FAKE_SHOP]: true,
    [types.links.CALENDAR]: true,
    [types.links.MAP]: true,
    [types.links.ORDERS]: false,
    [types.links.PRODUCTS]: false,
    [types.links.MY_SHOP]: false,
    [types.links.MANAGE_SHOPS]: true,
    [types.links.MANAGE_SITE]: false,
    // last
    [types.links.LOGOUT]: true
  },
  [types.permissions.MANAGE_REX]: {
    // user
    [types.links.LOGIN]: false,
    [types.links.SIGNUP]: false,
    [types.links.PROFILE]: true,
    // pages
    [types.links.HOME]: true,
    [types.links.FAKE_SHOP]: true,
    [types.links.CALENDAR]: true,
    [types.links.MAP]: true,
    [types.links.ORDERS]: false,
    [types.links.PRODUCTS]: false,
    [types.links.MY_SHOP]: false,
    [types.links.MANAGE_SHOPS]: false,
    [types.links.MANAGE_SITE]: true,
    // last
    [types.links.LOGOUT]: true
  }
}

const verify = (permissions, link) => {
  const isAuthorized = permissions.some(key => access[key][link])
  return isAuthorized
}

export default permissions => {
  const accessibleLinks = {
    [types.links.LOGIN]: verify(permissions, types.links.LOGIN),
    [types.links.SIGNUP]: verify(permissions, types.links.SIGNUP),
    [types.links.PROFILE]: verify(permissions, types.links.PROFILE),
    [types.links.HOME]: verify(permissions, types.links.HOME),
    [types.links.FAKE_SHOP]: verify(permissions, types.links.FAKE_SHOP),
    [types.links.MAP]: verify(permissions, types.links.MAP),
    [types.links.CALENDAR]: verify(permissions, types.links.CALENDAR),
    [types.links.ORDERS]: verify(permissions, types.links.ORDERS),
    [types.links.PRODUCTS]: verify(permissions, types.links.PRODUCTS),
    [types.links.MY_SHOP]: verify(permissions, types.links.MY_SHOP),
    [types.links.MANAGE_SHOPS]: verify(permissions, types.links.MANAGE_SHOPS),
    [types.links.MANAGE_SITE]: verify(permissions, types.links.MANAGE_SITE),
    [types.links.LOGOUT]: verify(permissions, types.links.LOGOUT)
  }
  return accessibleLinks
}
