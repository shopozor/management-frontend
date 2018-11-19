<template>
  <q-card class="width-md height-md">
    <q-card-main>
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
      <br>
      <q-select
        :stack-label="$t('products.categories')"
        multiple
        chips
        separator
        :options="categoriesOptions"
        :value="editedProduct.categories"
        @input="updateEditedProduct({categories: $event})"
      />
    </q-card-main>
  </q-card>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
// import ProductVisibilityManager from '../ProductVisibilityManager'
import types from '../../../types'

export default {
  name: 'ProductEditType',
  computed: {
    ...mapGetters(['editedProduct']),
    categoriesOptions () {
      return Object.keys(types.categories).map(categories => {
        return {
          value: categories,
          label: this.$t(`categories.${categories}`)
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
  }
}
</script>
