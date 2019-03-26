<template>
  <parametricLayout
    subtitle="management"
    :email="email"
    :orderedLinks="orderedLinks"
    :accessRules="accessRules"
    :permissions="permissions"
    :disableNavigation="!isAuthorized"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import parametricLayout from '../../common/src/layouts/parametricLayout'
import { orderedLinks, accessRules } from '../router/links'

export default {
  name: 'layout',
  data () {
    return {
      accessRules,
      orderedLinks
    }
  },
  computed: {
    ...mapGetters(['isAuthorized', 'permissions', 'email'])
  },
  components: { parametricLayout }
}
</script>
