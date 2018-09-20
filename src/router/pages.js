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
    path: '/signup',
    component: () => import('pages/Signup.vue'),
    label: "S'inscrire"
  },
  [links.CONFIRMATION_EMAIL_SENT]: {
    path: '/confirmationEmailSent',
    component: () => import('pages/ConfirmationEmailSent.vue')
  },
  [links.LOGIN]: {
    path: '/login',
    component: () => import('pages/Login.vue'),
    label: 'Se connecter'
  },
  [links.LOGOUT]: {
    path: '/logout',
    component: () => import('pages/Logout.vue'),
    label: 'Se déconnecter'
  },
  [links.PROFILE]: {
    path: '/profile',
    component: () => import('pages/Home.vue'),
    label: 'Profil'
  },
  [links.CALENDAR]: {
    path: '/calendar',
    component: () => import('pages/Calendar.vue'),
    label: 'Calendrier'
  },
  [links.PRODUCTS]: {
    path: '/products',
    component: () => import('pages/Home.vue'),
    label: 'Produits'
  },
  [links.MY_SHOP]: {
    path: '/myShop',
    component: () => import('pages/Home.vue'),
    label: 'Ma Budzonnerie'
  },
  [links.MANAGE_SHOPS]: {
    path: '/manageShops',
    component: () => import('pages/Home.vue'),
    label: 'Gestion des Budzonneries'
  },
  [links.MANAGE_SITE]: {
    path: '/manageSite',
    component: () => import('pages/Home.vue'),
    label: 'Gestion du Site'
  },
  [links.MAP]: {
    path: '/map',
    component: () => import('pages/Map.vue'),
    label: 'Carte'
  },
  [links.ORDERS]: {
    path: '/orders',
    component: () => import('pages/Home.vue'),
    label: 'Commandes'
  }
}
