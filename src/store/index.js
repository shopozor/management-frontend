import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import products from './modules/products'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default new Vuex.Store({
  state: { },
  getters: { },
  mutations: { },
  actions: { },
  modules: {
    user,
    products
  }
})
