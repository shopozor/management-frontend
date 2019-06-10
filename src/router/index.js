import Vue from 'vue'
import VueRouter from 'vue-router'

import { generateRoutes, checkIfUserCanAccess } from '../../common/src/router/Helpers'
import { links, accessRules } from './links'
import store from '../store'
import types from '../../common/types'

const forceLogin = ({ to }) => {
  const loginPath = `/${types.links.LOGIN}`
  const pathIsNotLogin = to.path !== loginPath
  const userIsNotConnected = !store.getters.isAuthorized
  if (pathIsNotLogin && userIsNotConnected) return loginPath
  else return false
}

const routes = generateRoutes({ links, accessRules, permissions: store.getters.permissions })

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    const path = forceLogin({ to })
    if (path) next(path)
    else {
      const routeIsAccessible = checkIfUserCanAccess({ to, permissions: store.getters.permissions })
      next(routeIsAccessible)
    }
  })

  return Router
}
