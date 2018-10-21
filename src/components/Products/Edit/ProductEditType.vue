<template>
  <q-card>
    <q-card-actions class="row justify-between">
      <product-visibility-manager :productId="editedProduct.productId" showLabel />
    </q-card-actions>
    <q-card-main>
      <q-select
        stack-label="Rayon"
        separator
        :options="aisleOptions"
        :value="editedProduct.aisle"
        @input="updateEditedProduct({aisle: $event})"
      />
      <br>
      <q-select
        stack-label="Méthode de conservation"
        separator
        :options="conservationOptions"
        :value="editedProduct.conservationMethod"
        @input="updateEditedProduct({conservationMethod: $event})"
      />
      <br>
      <q-field>
        <q-input
          style="width: 50px"
          float-label="temps de conservation"
          type="number"
          :value="editedProduct.conservationDays"
          @input="updateEditedProduct({conservationDays: $event})"
          orientation="horizontal"
        />
        jours
      </q-field>
    </q-card-main>
  </q-card>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import ProductVisibilityManager from '../ProductVisibilityManager'
import types from '../../../types'

export default {
  name: 'ProductEditType',
  computed: {
    ...mapGetters(['editedProduct']),
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
  methods: {
    ...mapMutations(['updateEditedProduct'])
  },
  components: {ProductVisibilityManager}
}
</script>
