<template>
  <q-list class="formats-edit-list">
    <q-list-header>
      <q-collapsible icon="settings" label="Formats du produit et stock">
        <div>interface par défaut</div>
        <div>prix et unité par défaut</div>
      </q-collapsible>
    </q-list-header>
    <q-item v-for="id in editedProduct.formatsIds" :key="id">
      <product-edit-format :formatId="id" />
    </q-item>
  </q-list>
</template>

<script>
import {mapGetters} from 'vuex'
import ProductEditFormat from './Formats/ProductEditFormat'

export default {
  name: 'ProductEditFormats',
  computed: {
    ...mapGetters(['editedProduct'])
  },
  components: {ProductEditFormat}
}
</script>

<style lang="stylus">
.formats-edit-list{
  width: 100%
}
</style>
