<template>
  <q-page>
    {{ $t('welcome') }}
  </q-page>
</template>

<script>
import types from '../../common/src/types'

export default {
  name: 'PageHome',
  methods: {
    loginIfNotConnected () {
      const permissions = this.$store.getters.permissions
      const isNotConnected = permissions.some(permission => permission === types.permissions.NOT_CONNECTED)
      if (isNotConnected) this.$router.push(`/${types.links.LOGIN}`)
    }
  },
  mounted () {
    this.loginIfNotConnected()
  }
}
</script>
