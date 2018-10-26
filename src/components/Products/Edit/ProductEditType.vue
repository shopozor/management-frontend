<template>
  <q-card>
    <q-card-actions class="row justify-between">
      <product-visibility-manager :productId="editedProduct.productId" showLabel />
    </q-card-actions>
    <q-card-main>
      <q-select
        :stack-label="$t('products.aisle')"
        separator
        :options="aisleOptions"
        :value="editedProduct.aisle"
        @input="updateEditedProduct({aisle: $event})"
      />
      <br>
      <q-select
        :stack-label="$t('products.conservationMethod')"
        separator
        :options="conservationOptions"
        :value="editedProduct.conservationMethod"
        @input="updateEditedProduct({conservationMethod: $event})"
      />
      <br>
      <q-field>
        <q-input
          :float-label="$t('products.conservationTime')"
          type="number"
          :value="editedProduct.conservationDays"
          @input="updateEditedProduct({conservationDays: $event})"
          orientation="horizontal"
          :suffix="$tc('products.day', editedProduct.conservationDays)"
        />
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
      return Object.keys(types.aisle).map(aisle => {
        return {
          value: aisle,
          label: this.$t(`aisle.${aisle}`)
        }
      })
    },
    conservationOptions () {
      return Object.keys(types.conservation).map(conservation => {
        return {
          value: conservation,
          label: this.$t(`conservation.${conservation}`)
        }
      })
    }
  },
  methods: {
    ...mapMutations(['updateEditedProduct'])
  },
  components: {ProductVisibilityManager}
}
</script>
