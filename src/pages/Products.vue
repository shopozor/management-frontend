<template>
  <transition
    enter-active-class="animated bounceInLeft"
    leave-active-class="animated bounceOutRight"
    mode="out-in"
  >
    <products-inventory-view
      key="inventory"
      v-if="view === 'inventory'"
      :jumpTo="jumpTo" />
    <products-trash-view
      key="trash"
      v-else-if="view == 'trash'"
      :jumpTo="jumpTo" />
    <products-edit-view
      key="edit"
      v-else-if="view === 'edit'"
      :jumpTo="jumpTo" />
    <div
      key="error"
      v-else>Error</div>
  </transition>
</template>

<script>
import {mapActions} from 'vuex'
import ProductsInventoryView from '../components/Products/Inventory/ProductsInventoryView'
import ProductsTrashView from '../components/Products/Trash/ProductsTrashView'
import ProductsEditView from '../components/Products/Edit/ProductsEditView'

export default {
  name: 'PageProducts',
  data () {
    return {
      view: 'inventory'
    }
  },
  components: {ProductsInventoryView, ProductsTrashView, ProductsEditView},
  methods: {
    ...mapActions(['getMyProducts', 'getMyOrdersToDeliver']),
    jumpTo (view) {
      this.view = view
    }
  },
  created: function () {
    this.getMyProducts()
    this.getMyOrdersToDeliver()
  }
}
</script>
