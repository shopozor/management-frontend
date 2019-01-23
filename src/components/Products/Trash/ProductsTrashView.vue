<template>
  <q-page
      padding
      class="flex flex-center">
      <product-trash-card
        v-for="(product, productId) in productsInTrash"
        :key="productId"
        :productId="productId" />
      <q-btn
        class="q-ma-lg fixed-bottom-right shadow-6"
        icon="kitchen"
        size="md"
        color="primary"
        :label="$t('products.inventory')"
        @click="jumpToInventory"
        />
    </q-page>
</template>

<script>
import {mapGetters} from 'vuex'
import ProductTrashCard from './ProductTrashCard'

export default {
  name: 'ProductsTrashView',
  props: {
    jumpTo: {
      type: Function,
      required: true
    }
  },
  computed: {
    ...mapGetters(['productsInTrash'])
  },
  methods: {
    jumpToInventory () {
      this.jumpTo('inventory')
    }
  },
  components: {ProductTrashCard},
  created () {
    console.log(this.productsInTrash)
  }
}
</script>
