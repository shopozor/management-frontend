<template>
  <q-list
    no-border
    link
    inset-delimiter
  >
  <q-list-header>
    {{ user }}
  </q-list-header>
    <page-link
      v-for="(value, key) in access.user"
      v-if="value"
      :key="pages[key].path"
      :path="pages[key].path"
      :label="pages[key].label" />
    <q-item-separator />
    <page-link
      v-for="(value, key) in access.pages"
      v-if="value"
      :key="pages[key].path"
      :path="pages[key].path"
      :label="pages[key].label" />
    <q-item-separator />
    <page-link
      v-for="(value, key) in access.last"
      v-if="value"
      :key="pages[key].path"
      :path="pages[key].path"
      :label="pages[key].label" />
  </q-list>
</template>

<script>
import {mapGetters} from 'vuex'
import access from '../../router/access'
import pages from '../../router/pages'
import types from 'src/types'
import PageLink from './PageLink'

export default {
  name: 'SideDrawerContent',
  data () {
    return {
      pages,
      separator: types.links.SEPARATOR
    }
  },
  props: { drawerOpen: Boolean },
  computed: {
    ...mapGetters(['email', 'authorizations', 'isAuthorized']),
    access: function () {
      return access(this.authorizations)
    },
    user () {
      if (this.isAuthorized) return this.email
      else return this.$t('layout.notConnected')
    }
  },
  components: {
    PageLink
  }
}
</script>
