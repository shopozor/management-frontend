<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { initFakeServer } from './store/modules/simulateServer'

export default {
  name: 'App',
  methods: {
    ...mapActions(['getAuthorizations'])
  },
  created () {
    const serverMustBeInitialized = localStorage.getItem('fake_server') === null
    if (serverMustBeInitialized) {
      initFakeServer()
    } else {
      this.getAuthorizations()
    }
  }
}
</script>

<style>
</style>
