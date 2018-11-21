<template>
  <div></div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'FormatIsUpdatableMixin',
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedFormats', 'editedProduct', 'pendingOrdersOfFormatSummary']),
    hasPendingPaidOrders () {
      const summary = this.pendingOrdersOfFormatSummary({ formatId: this.formatId }).paidSummary
      return summary.amount > 0
    },
    hasPendingNotPaidOrders () {
      const summary = this.pendingOrdersOfFormatSummary({ formatId: this.formatId }).notPaidSummary
      return summary.amount > 0
    },
    notUpdatable () {
      return this.hasPendingPaidOrders || this.hasPendingNotPaidOrders
    }
  }
}
</script>
