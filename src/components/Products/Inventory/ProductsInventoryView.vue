<template>
  <q-page class="flex flex-center">
    <product-inventory-card
      v-for="(product, productId) in productsInInventory"
      :key="productId"
      :productId="productId"
      :jumpTo="jumpTo" />
    <q-btn
      class="q-ma-lg fixed-bottom-right shadow-6"
      icon="delete_sweep"
      size="md"
      color="primary"
      :label="$t('products.trash')"
      v-show="!productsTrashIsEmpty"
      @click="jumpToTrash"
      />
    <q-page-sticky position="bottom">
      <q-btn class="q-ma-md shadow-12" icon="add" round color="primary" size="xl" @click="newProduct" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import ProductInventoryCard from './ProductInventoryCard'

export default {
  name: 'ProductsInventoryView',
  props: {
    jumpTo: {
      type: Function,
      required: true
    }
  },
  components: {ProductInventoryCard},
  computed: {
    ...mapGetters(['productsTrashIsEmpty', 'productsInInventory'])
  },
  methods: {
    ...mapActions(['createProduct']),
    newProduct () {
      this.createProduct()
      this.jumpTo('edit')
    },
    jumpToTrash () {
      this.jumpTo('trash')
    }
  }
}
</script>
