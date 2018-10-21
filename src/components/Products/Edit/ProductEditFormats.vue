<template>
  <q-card class="formats-edit-card">
    <q-card-title>
      Formats du produit et stock
    </q-card-title>
    <q-card-main>
      <q-collapsible icon="settings" label="Paramètres">
        <div>interface par défaut</div>
        <div>prix et unité par défaut</div>
      </q-collapsible>
      <q-list>
        <q-item v-for="id in editedProduct.formatsIds" :key="id">
          <product-edit-format :formatId="id" />
        </q-item>
      </q-list>
    </q-card-main>
  </q-card>
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
.formats-edit-card{
  width: 100%
}
</style>
