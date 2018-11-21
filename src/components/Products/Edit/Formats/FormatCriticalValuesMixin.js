import {mapGetters} from 'vuex'

export default {
  name: 'FormatCriticalValuesMixin',
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['pendingOrdersOfFormatSummary']),
    pendingOrdersSummary () {
      return this.pendingOrdersOfFormatSummary({ formatId: this.formatId })
    },
    hasPendingPaidOrders () {
      const summary = this.pendingOrdersSummary.paid
      return summary.amount > 0
    },
    hasPendingNotPaidOrders () {
      const summary = this.pendingOrdersSummary.notPaid
      return summary.amount > 0
    },
    allowNonTrivialChanges () {
      return this.$store.getters.editedProduct.allowNonTrivialChanges
    },
    isUpdatable () {
      return (!this.hasPendingPaidOrders && !this.hasPendingNotPaidOrders) || this.allowNonTrivialChanges
    }
  }
}
