<template>
  <q-card inline class="width-md q-ma-sm">
    <q-card-section>
      <div class="row justify-center">
        <q-btn
          @click="remove"
          icon="remove"
          round
          color="primary"
          :disable="disableRemove" />
        <q-field
          class="q-mx-md"
          style="width: 4em">
          <q-input
            :value="amount"
            @change="updateAmount"
            type="number" />
        </q-field>
        <q-btn
          @click="add"
          icon="add"
          round
          color="primary" />
      </div>
      <div class="row justify-between q-mt-md">
        <div>
          <div>{{$tc('products.ordered', pendingOrdersSummary.paid.amount)}}: {{pendingOrdersSummary.paid.amount}}</div>
          <br>
          <div>{{$tc('products.available', amount - pendingOrdersSummary.paid.amount)}}: {{amount - pendingOrdersSummary.paid.amount}}</div>
          <br>
          <div>dans un panier : {{pendingOrdersSummary.notPaid.amount}}</div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import FormatCriticalValuesMixin from './FormatCriticalValuesMixin.js'

export default {
  name: 'FormatAmount',
  mixins: [FormatCriticalValuesMixin],
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedFormats', 'ordersPropsOfFilterPropValue']),
    amount () {
      return this.editedFormats[this.formatId].amount
    },
    disableRemove () {
      const noMore = this.amount <= this.pendingOrdersSummary.paid.amount
      return (noMore && !this.isUpdatable) || this.amount <= 0
    }
  },
  methods: {
    ...mapActions(['updateEditedFormat']),
    add () {
      this.updateAmount(this.amount + 1)
    },
    remove () {
      this.updateAmount(this.amount - 1)
    },
    updateAmount (value) {
      if ((value >= this.pendingOrdersSummary.paid.amount || this.isUpdatable) && value >= 0) {
        this.updateEditedFormat({formatId: this.formatId, newProps: {amount: value}})
      } else if (value >= 0) {
        this.$q.notify({
          message: 'Vous ne pouvez pas baisser votre stock en-dessous du nombre de commandes.',
          icon: 'warning',
          timeout: 5000,
          position: 'top',
          actions: [
            {
              icon: 'close'
            }
          ]
        })
      } else {
        this.$q.notify({
          message: 'Votre stock ne peut pas être inférieur à 0.',
          icon: 'warning',
          timeout: 5000,
          position: 'top',
          actions: [
            {
              icon: 'close'
            }
          ]
        })
      }
    }
  }
}
</script>
