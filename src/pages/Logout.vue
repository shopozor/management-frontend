<template>
  <q-page>
    <div class="fixed-center text-center">
      <div v-if="isAuthorized">
        <q-spinner size="50px" />
        <div class="text-faded">Déconnection...</div>
      </div>
      <div v-else>
        <div>Vous avez été correctement déconnecté</div>
        <q-btn color="primary" @click.native="goHome">ok</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageLogout',
  created () {
    this.logout().then(this.goHome)
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
