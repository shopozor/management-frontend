import * as links from '../types/links'
import access from './access'
import store from '../store'

export const generatePage = (link) => {
  return {
    path: `/${link}`,
    component: () => import(`pages/${firstUpperCase(link)}.vue`),
    beforeEnter: (to, from, next) => {
      if (userCanAccess(link)) {
        next()
      } else {
        next(from)
      }
    }
  }
}

function userCanAccess (link) {
  return access(store.getters.permissions)[link]
}

export const firstUpperCase = string => string.charAt(0).toUpperCase() + string.slice(1)

/**
 * To add a new page:
 *  1) add its type to types/links.js.
 *     It must match the component file name : ConfirmationEmailSent.js -> confirmationEmailSent)
 *  2) authorize and return access in router/access.js
 *  3) generate the new page below
 *
 *  4) If the page must be reachable from the burger menu,
 *     make it accessible in the SideDrawerContent component.
 *     Write its name in data > orderedLinks
 **/

export default {
  [links.HOME]: { path: '/', component: () => import('pages/Home.vue') },
  [links.SIGNUP]: generatePage(links.SIGNUP),
  [links.CONFIRMATION_EMAIL_SENT]: generatePage(links.CONFIRMATION_EMAIL_SENT),
  [links.LOGIN]: generatePage(links.LOGIN),
  [links.LOGOUT]: generatePage(links.LOGOUT),
  [links.PROFILE]: generatePage(links.PROFILE),
  [links.CALENDAR]: generatePage(links.CALENDAR),
  [links.PRODUCTS]: generatePage(links.PRODUCTS),
  [links.MY_SHOP]: generatePage(links.MY_SHOP),
  [links.MANAGE_SHOPS]: generatePage(links.MANAGE_SHOPS),
  [links.MANAGE_SITE]: generatePage(links.MANAGE_SITE),
  [links.MAP]: generatePage(links.MAP),
  [links.ORDERS]: generatePage(links.ORDERS),
  [links.FAKE_SHOP]: generatePage(links.FAKE_SHOP)
}
