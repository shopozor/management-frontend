<template>
  <div>
    <q-collapsible icon="settings" label="Conditionnements du produit et stock">
      <q-card>
        <q-card-title>
          Prix à l'unité
        </q-card-title>
        <q-card-main>
          <product-default-price-per-unit-selector />
        </q-card-main>
      </q-card>
      <div>interface par défaut</div>
    </q-collapsible>
    <product-edit-format
      class="q-ma-sm"
      v-for="id in editedProduct.formatsIds"
      :key="id"
      :formatId="id"
    />
    <new-format class="q-ma-sm" />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import ProductEditFormat from './Formats/ProductEditFormat'
import ProductDefaultPricePerUnitSelector from './ProductDefaultPricePerUnitSelector'
import NewFormat from './Formats/NewFormat'

export default {
  name: 'ProductEditFormats',
  computed: {
    ...mapGetters(['editedProduct'])
  },
  components: {ProductEditFormat, ProductDefaultPricePerUnitSelector, NewFormat}
}
</script>
