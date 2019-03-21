import * as links from '../../common/src/types/links'
import access from './access'
import { generatePage } from '../../common/src/router/helpers'

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
  [links.SIGNUP]: generatePage(links.SIGNUP, access),
  [links.CONFIRMATION_EMAIL_SENT]: generatePage(links.CONFIRMATION_EMAIL_SENT, access),
  [links.LOGIN]: generatePage(links.LOGIN, access),
  [links.LOGOUT]: generatePage(links.LOGOUT, access),
  [links.PROFILE]: generatePage(links.PROFILE, access),
  [links.CALENDAR]: generatePage(links.CALENDAR, access),
  [links.PRODUCTS]: generatePage(links.PRODUCTS, access),
  [links.MY_SHOP]: generatePage(links.MY_SHOP, access),
  [links.MANAGE_SHOPS]: generatePage(links.MANAGE_SHOPS, access),
  [links.MANAGE_SITE]: generatePage(links.MANAGE_SITE, access),
  [links.MAP]: generatePage(links.MAP, access),
  [links.ORDERS]: generatePage(links.ORDERS, access),
  [links.FAKE_SHOP]: generatePage(links.FAKE_SHOP, access)
}
