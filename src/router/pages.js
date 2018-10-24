import * as links from '../types/links'

export const generatePage = (link, { withLabel }) => {
  return {
    path: `/${link}`,
    component: () => import(`pages/${firstUpperCase(link)}.vue`),
    label: withLabel ? link : ''
  }
}

export const firstUpperCase = string => string.charAt(0).toUpperCase() + string.slice(1)

/**
 * A page that can be reached from the burger menu must have a label
 *
 * To add a new menu reachable page:
 *  1) add its type to types/links.js
 *  2) authorize and return access in router/access.js
 *  3) add a path, component and label here
 **/

export default {
  [links.HOME]: {
    path: '/',
    component: () => import('pages/Home.vue'),
    label: links.HOME
  },
  [links.SIGNUP]: generatePage(links.SIGNUP, { withLabel: true }),
  [links.CONFIRMATION_EMAIL_SENT]: generatePage(links.CONFIRMATION_EMAIL_SENT, { withLabel: false }),
  [links.LOGIN]: generatePage(links.LOGIN, { withLabel: true }),
  [links.LOGOUT]: generatePage(links.LOGOUT, { withLabel: true }),
  [links.PROFILE]: generatePage(links.PROFILE, { withLabel: true }),
  [links.CALENDAR]: generatePage(links.CALENDAR, { withLabel: true }),
  [links.PRODUCTS]: generatePage(links.PRODUCTS, { withLabel: true }),
  [links.MY_SHOP]: generatePage(links.MY_SHOP, { withLabel: true }),
  [links.MANAGE_SHOPS]: generatePage(links.MANAGE_SHOPS, { withLabel: true }),
  [links.MANAGE_SITE]: generatePage(links.MANAGE_SITE, { withLabel: true }),
  [links.MAP]: generatePage(links.MAP, { withLabel: true }),
  [links.ORDERS]: generatePage(links.ORDERS, { withLabel: true }),
  [links.FAKE_SHOP]: generatePage(links.FAKE_SHOP, { withLabel: true })
}
