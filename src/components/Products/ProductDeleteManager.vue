<template>
  <q-btn
    class="q-ma-sm"
    @click="deleteProduct"
    icon="delete"
    color="negative"
    round
    size="md" />
</template>

<script>
import { mapActions } from 'vuex'
import types from 'src/types'

export default {
  name: 'ProductDeleteManager',
  data () {
    return {
      visibility: this.state,
      productState: {...types.productState}
    }
  },
  props: {
    productId: {
      type: String,
      required: true
    }
  },
  computed: {
    ordersSummary () { return this.$store.getters.productsInInventory[this.productId].ordersSummary },
    state () { return this.$store.getters.productsInInventory[this.productId].state },
    dialogs () {
      return {
        confirmDeleteWithoutOrders: {
          title: this.$t('dialog.warning'),
          message: this.$t('products.warningDeleteWithoutOrders'),
          ok: this.$t('products.throwAway'),
          cancel: this.$t('products.keep')
        },
        consfirmDeleteWithOrders: {
          title: this.$t('dialog.warning'),
          message: this.$t(
            'products.warningDeleteWithOrders',
            {
              amount: this.ordersSummary.amount,
              price: this.ordersSummary.customerPrice
            }),
          ok: this.$t('products.throwAway'),
          cancel: this.$t('products.keep')
        }
      }
    }
  },
  methods: {
    ...mapActions(['updateProduct']),
    deleteProduct () {
      const vm = this
      if (
        vm.state === types.productState.VISIBLE &&
        vm.ordersSummary.amount > 0
      ) {
        vm.$q.dialog({...vm.dialogs.consfirmDeleteWithOrders})
          .then(() => {
            vm.updateProduct({productId: vm.productId, newProps: {state: types.productState.DELETED, force: true}})
          })
          .catch(() => {})
      } else {
        vm.$q.dialog({...vm.dialogs.confirmDeleteWithoutOrders})
          .then(() => {
            vm.updateProduct({productId: vm.productId, newProps: {state: types.productState.DELETED}})
          })
          .catch(() => {})
      }
    }
  }
}
</script>
