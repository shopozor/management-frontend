<template>
  <q-card class="product-edit-card q-ma-xs">
    <q-card-actions class="row justify-between">
      <product-visibility-manager :productId="productId" showLabel />
    </q-card-actions>
    <q-card-main>
      <q-select
        stack-label="Rayon"
        separator
        v-model="aisle"
        :options="aisleOptions"
      />
      <br>
      <q-select
        stack-label="Méthode de conservation"
        separator
        v-model="conservationMethod"
        :options="conservationOptions"
      />
      <br>
      <q-field helper="jours après achat">
        <q-input float-label="temps de conservation" v-model="conservationDays" type="number" />
      </q-field>
    </q-card-main>
  </q-card>
</template>

<script>
import ProductVisibilityManager from '../ProductVisibilityManager'
import types from '../../../types'

export default {
  name: 'ProductEditType',
  computed: {
    productId () { return this.$store.state.products.editedProduct.productId },
    aisle: {
      get: function () { return this.$store.state.products.editedProduct.aisle },
      set: function (newVal) { this.$store.state.products.editedProduct.aisle = newVal }
    },
    conservationMethod: {
      get: function () { return this.$store.state.products.editedProduct.conservationMethod },
      set: function (newVal) { this.$store.state.products.editedProduct.conservationMethod = newVal }
    },
    conservationDays: {
      get: function () { return this.$store.state.products.editedProduct.conservationDays },
      set: function (newVal) { this.$store.state.products.editedProduct.conservationDays = newVal }
    },
    aisleOptions () {
      return [
        {
          value: types.aisle.DAIRY,
          label: 'Produits laitiers'
        },
        {
          value: types.aisle.MEAT,
          label: 'Viande'
        },
        {
          value: types.aisle.FRUITS,
          label: 'Fruits'
        }
      ]
    },
    conservationOptions () {
      return [
        {
          value: types.conservation.BASEMENT,
          label: 'à la cave'
        },
        {
          value: types.conservation.FRIDGE,
          label: 'au frigo'
        },
        {
          value: types.conservation.FREEZER,
          label: 'au congélateur'
        }
      ]
    }
  },
  components: {ProductVisibilityManager}
}
</script>
