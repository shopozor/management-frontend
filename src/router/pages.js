import * as links from '../types/links'

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
    label: 'Accueil'
  },
  [links.SIGNUP]: {
    path: `/${links.SIGNUP}`,
    component: () => import('pages/Signup.vue'),
    label: "S'inscrire"
  },
  [links.CONFIRMATION_EMAIL_SENT]: {
    path: `/${links.CONFIRMATION_EMAIL_SENT}`,
    component: () => import('pages/ConfirmationEmailSent.vue')
  },
  [links.LOGIN]: {
    path: `/${links.LOGIN}`,
    component: () => import('pages/Login.vue'),
    label: 'Se connecter'
  },
  [links.LOGOUT]: {
    path: `/${links.LOGOUT}`,
    component: () => import('pages/Logout.vue'),
    label: 'Se déconnecter'
  },
  [links.PROFILE]: {
    path: `/${links.PROFILE}`,
    component: () => import('pages/Home.vue'),
    label: 'Profil'
  },
  [links.CALENDAR]: {
    path: `/${links.CALENDAR}`,
    component: () => import('pages/Calendar.vue'),
    label: 'Calendrier'
  },
  [links.PRODUCTS]: {
    path: `/${links.PRODUCTS}`,
    component: () => import('pages/Products.vue'),
    label: 'Produits'
  },
  [links.MY_SHOP]: {
    path: `/${links.MY_SHOP}`,
    component: () => import('pages/Home.vue'),
    label: 'Ma Budzonnerie'
  },
  [links.MANAGE_SHOPS]: {
    path: `/${links.MANAGE_SHOPS}`,
    component: () => import('pages/Home.vue'),
    label: 'Gestion des Budzonneries'
  },
  [links.MANAGE_SITE]: {
    path: `/${links.MANAGE_SITE}`,
    component: () => import('pages/Home.vue'),
    label: 'Gestion du Site'
  },
  [links.MAP]: {
    path: `/${links.MAP}`,
    component: () => import('pages/Map.vue'),
    label: 'Carte'
  },
  [links.ORDERS]: {
    path: `/${links.ORDERS}`,
    component: () => import('pages/Home.vue'),
    label: 'Commandes'
  },
  [links.FAKE_SHOP]: {
    path: `/${links.FAKE_SHOP}`,
    component: () => import('pages/Home.vue'),
    label: 'Boutique Test'
  }
}
