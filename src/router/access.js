import * as links from '../types/links'
import * as auth from '../types/authorization'

const access = {
  [auth.NOT_CONNECTED]: {
    // user
    [links.LOGIN]: true,
    [links.SIGNUP]: true,
    [links.PROFILE]: false,
    // pages
    [links.HOME]: true,
    [links.MAP]: true,
    [links.PRODUCTS]: false,
    [links.MY_SHOP]: false,
    [links.MANAGE_SHOPS]: false,
    [links.MANAGE_SITE]: false,
    // last
    [links.LOGOUT]: false
  },
  [auth.CONSUMER]: {
    // user
    [links.LOGIN]: false,
    [links.SIGNUP]: false,
    [links.PROFILE]: true,
    // pages
    [links.HOME]: true,
    [links.CALENDAR]: true,
    [links.MAP]: true,
    [links.PRODUCTS]: false,
    [links.MY_SHOP]: false,
    [links.MANAGE_SHOPS]: false,
    [links.MANAGE_SITE]: false,
    // last
    [links.LOGOUT]: true
  },
  [auth.PRODUCER]: {
    // user
    [links.LOGIN]: false,
    [links.SIGNUP]: false,
    [links.PROFILE]: true,
    // pages
    [links.HOME]: true,
    [links.CALENDAR]: true,
    [links.MAP]: true,
    [links.PRODUCTS]: true,
    [links.MY_SHOP]: false,
    [links.MANAGE_SHOPS]: false,
    [links.MANAGE_SITE]: false,
    // last
    [links.LOGOUT]: true
  },
  [auth.SHOP_MANAGER]: {
    // user
    [links.LOGIN]: false,
    [links.SIGNUP]: false,
    [links.PROFILE]: true,
    // pages
    [links.HOME]: true,
    [links.CALENDAR]: true,
    [links.MAP]: true,
    [links.PRODUCTS]: false,
    [links.MY_SHOP]: true,
    [links.MANAGE_SHOPS]: false,
    [links.MANAGE_SITE]: false,
    // last
    [links.LOGOUT]: true
  },
  [auth.TOP_MANAGER]: {
    // user
    [links.LOGIN]: false,
    [links.SIGNUP]: false,
    [links.PROFILE]: true,
    // pages
    [links.HOME]: true,
    [links.CALENDAR]: true,
    [links.MAP]: true,
    [links.PRODUCTS]: false,
    [links.MY_SHOP]: false,
    [links.MANAGE_SHOPS]: true,
    [links.MANAGE_SITE]: false,
    // last
    [links.LOGOUT]: true
  },
  [auth.SOFTOZOR]: {
    // user
    [links.LOGIN]: false,
    [links.SIGNUP]: false,
    [links.PROFILE]: true,
    // pages
    [links.HOME]: true,
    [links.CALENDAR]: true,
    [links.MAP]: true,
    [links.PRODUCTS]: false,
    [links.MY_SHOP]: false,
    [links.MANAGE_SHOPS]: false,
    [links.MANAGE_SITE]: true,
    // last
    [links.LOGOUT]: true
  }
}

const verify = (authorizations, link) =>
  authorizations.some(key => access[key][link])

export default authorizations => {
  const accessibleLinks = {
    user: {
      [links.LOGIN]: verify(authorizations, links.LOGIN),
      [links.SIGNUP]: verify(authorizations, links.SIGNUP),
      [links.PROFILE]: verify(authorizations, links.PROFILE)
    },
    pages: {
      [links.HOME]: verify(authorizations, links.HOME),
      [links.MAP]: verify(authorizations, links.MAP),
      [links.CALENDAR]: verify(authorizations, links.CALENDAR),
      [links.PRODUCTS]: verify(authorizations, links.PRODUCTS),
      [links.MY_SHOP]: verify(authorizations, links.MY_SHOP),
      [links.MANAGE_SHOPS]: verify(authorizations, links.MANAGE_SHOPS),
      [links.MANAGE_SITE]: verify(authorizations, links.MANAGE_SITE)
    },
    last: {
      [links.LOGOUT]: verify(authorizations, links.LOGOUT)
    }
  }
  return accessibleLinks
}
