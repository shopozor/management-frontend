<template>
  <div>
    <q-collapsible icon="settings" label="Conditionnements du produit et stock">
      <div>interface par défaut</div>
      <div>prix et unité par défaut</div>
    </q-collapsible>
    <product-edit-format
      v-for="id in editedProduct.formatsIds"
      :key="id"
      :formatId="id"
    />
  </div>
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
