<template>
  <q-toggle
    class="q-ma-sm"
    v-model="visibility"
    :true-value="productState.VISIBLE"
    :false-value="productState.INVISIBLE"
    checked-icon="visibility"
    unchecked-icon="visibility_off"
    @input="toggleVisibility"
    :label="visibilityLabel" />
</template>

<script>
import { mapActions } from 'vuex'
import types from 'src/types'

export default {
  name: 'ProductVisibilityManager',
  data () {
    return {
      visibility: this.$store.state.products.myProducts[this.productId].state,
      productState: {...types.productState}
    }
  },
  props: {
    productId: {
      type: String,
      required: true
    },
    showLabel: {
      type: Boolean,
      default: function () {
        return false
      }
    }
  },
  computed: {
    state () { return this.$store.state.products.myProducts[this.productId].state },
    ordersSummary () { return this.$store.state.products.myProducts[this.productId].ordersSummary },
    visibilityLabel () {
      if (this.state === types.productState.VISIBLE && this.showLabel) return this.$t('products.visible')
      else if (this.showLabel) return this.$t('products.hidden')
      else return ''
    },
    confirmHideWithOrders () {
      return {
        title: this.$t('dialog.warning'),
        message: this.$t(
          'products.warningHide',
          {
            amount: this.ordersSummary.amount,
            price: this.ordersSummary.customerPrice
          }),
        ok: this.$t('products.hide'),
        cancel: this.$t('products.letVisible')
      }
    }
  },
  methods: {
    ...mapActions(['updateProduct']),
    toggleVisibility (newVal) {
      const vm = this
      if (
        vm.state === types.productState.VISIBLE &&
        newVal === types.productState.INVISIBLE &&
        vm.ordersSummary.amount > 0
      ) {
        vm.$q.dialog({...vm.confirmHideWithOrders})
          .then(() => {
            vm.updateProduct({productId: vm.productId, newProps: {state: newVal, force: true}})
          })
          .catch(() => {
            vm.visibility = types.productState.VISIBLE
          })
      } else {
        vm.updateProduct({productId: vm.productId, newProps: {state: newVal}})
      }
    }
  }
}
</script>
