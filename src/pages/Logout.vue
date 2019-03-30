<template>
  <q-page>
    <div class="fixed-center text-center">
      <p>
        <q-spinner v-if="isAuthorized" size="50px" />
        <q-btn v-else @click.native="goHome">GO HOME</q-btn>
      </p>
      <p class="text-faded">Déconnection...</p>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageLogout',
  mounted () {
    this.logout()
  },
  computed: {
    ...mapGetters(['isAuthorized'])
  },
  methods: {
    ...mapActions(['logout']),
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>
