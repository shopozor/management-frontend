import Vue from 'vue'
import Vuex from 'vuex'

import users from './modules/users'
import products from './modules/products'
import orders from './modules/orders'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    users,
    products,
    orders
  }
})

export default store
