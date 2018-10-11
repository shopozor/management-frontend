<template>
  <q-card-actions align="between">
    <q-toggle
      class="q-ma-sm"
      v-model="visibility"
      :true-value="productState.VISIBLE"
      :false-value="productState.INVISIBLE"
      checked-icon="visibility"
      unchecked-icon="visibility_off"
      @input="toggleVisibility"
      :label="visibilityLabel" />
    <q-btn
      class="q-ma-sm"
      @click="deleteProduct"
      icon="delete"
      color="negative"
      round
      size="md" />
  </q-card-actions>
</template>

<script>
import { mapActions } from 'vuex'
import types from '../../types'

export default {
  name: 'ProductCardStateManager',
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
    },
    state: {
      type: String,
      required: true
    },
    ordersSummary: {
      type: Object,
      required: true
    }
  },
  computed: {
    visibilityLabel () {
      if (this.state === types.productState.VISIBLE) return 'produit en vente'
      else return 'produit caché'
    },
    dialogs () {
      return {
        confirmDeleteWithoutOrders: {
          title: 'Attention',
          message: 'Vous êtes sur le point de mettre un produit à la corbeille. Il pourra être restauré pendant six mois. Passé ce délai, il sera définitvement effacé.',
          ok: 'Jeter',
          cancel: 'Conserver'
        },
        consfirmDeleteWithOrders: {
          title: 'Attention',
          message: `Vous êtes sur le point d\`effacer un produit. Ses formats seront aussi effacés. Il pourra être restauré pendant six mois, mais sera définitivement effacé par la suite. ATTENTION: Ce produit comporte ${this.ordersSummary.amount} commandes en cours pour un total de ${this.ordersSummary.customerPrice} francs payés par les clients. Vous devrez dédommager vos clients si vous ne les livrez pas.`,
          ok: 'Jeter',
          cancel: 'Conserver'
        },
        confirmHideWithOrders: {
          title: 'Attention',
          message: `Vous êtes sur le point de cacher un produit avec ${this.ordersSummary.amount} commandes en cours pour un total de ${this.ordersSummary.customerPrice} francs payés par les clients. Vous devrez dédommager vos clients si vous ne les livrez pas.`,
          ok: 'Cacher',
          cancel: 'Laisser visible'
        }
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
        vm.$q.dialog({...vm.dialogs.confirmHideWithOrders})
          .then(() => {
            vm.updateProduct({productId: vm.productId, newProps: {state: newVal, force: true}})
          })
          .catch(() => {
            vm.visibility = types.productState.VISIBLE
          })
      } else {
        vm.updateProduct({productId: vm.productId, newProps: {state: newVal}})
      }
    },
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
