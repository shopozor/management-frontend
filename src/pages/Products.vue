<template>
  <transition
    enter-active-class="animated bounceInLeft"
    leave-active-class="animated bounceOutRight"
    mode="out-in"
  >
    <q-page
      key="inventory"
      padding
      class="row justify-around"
      v-if="view === 'inventory'">
      <product-card
        v-for="(product, productId) in myProducts"
        :key="productId"
        v-bind="product" />
      <q-btn
        class="q-ma-lg fixed-bottom-right shadow-6"
        icon="delete_sweep"
        size="md"
        color="primary"
        label="Corbeille"
        v-show="!isTrashEmpty"
        @click="() => {view = 'trash'}"
        />
      <q-page-sticky position="bottom">
        <q-btn class="q-ma-md shadow-12" icon="add" round color="primary" size="xl" />
      </q-page-sticky>
    </q-page>
    <q-page
      key="trash"
      padding
      class="row justify-around"
      v-else>
      <product-trash-card
        v-for="(product, productId) in myProducts"
        :key="productId"
        v-bind="product" />
      <q-btn
        class="q-ma-lg fixed-bottom-right shadow-6"
        icon="kitchen"
        size="md"
        color="primary"
        label="Inventaire"
        @click="() => {view = 'inventory'}"
        />
    </q-page>
  </transition>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import ProductCard from 'components/ProductCard/ProductCard'
import ProductTrashCard from 'components/ProductCard/ProductTrashCard'
import types from '../types'

export default {
  name: 'Products',
  data () {
    return {
      view: 'inventory'
    }
  },
  components: {ProductCard, ProductTrashCard},
  computed: {
    ...mapGetters(['myProducts']),
    deletedAmount () {
      const vm = this
      return Object.keys(vm.myProducts).reduce((sum, productId) => {
        if (vm.myProducts[productId].state === types.productState.DELETED) sum += 1
        return sum
      }, 0)
    },
    isTrashEmpty () {
      return this.deletedAmount === 0
    }
  },
  methods: {
    ...mapActions(['getMyProducts'])
  },
  created: function () {
    this.getMyProducts()
  }
}
</script>
