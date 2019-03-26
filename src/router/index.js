import Vue from 'vue'
import VueRouter from 'vue-router'

import { generateRoutes } from '../../common/src/router/helpers'
import { links, accessRules } from './links'
import store from '../store'
import types from '../../common/src/types'

const permissions = store.getters.permissions

const forceLogin = (to, next) => {
  const loginPath = `/${types.links.LOGIN}`
  const pathIsNotLogin = to.path !== loginPath
  const userIsNotConnected = !store.getters.isAuthorized
  if (pathIsNotLogin && userIsNotConnected) next({ path: loginPath })
  else next()
}

const routes = generateRoutes({ links, accessRules, permissions })

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

  Router.beforeEach((to, from, next) => { forceLogin(to, next) })

  return Router
}
