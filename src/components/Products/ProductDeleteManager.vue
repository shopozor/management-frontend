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
import types from '../../types'

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
