<template>
  <q-card inline class="format-amount">
    <q-card-title>
      Stock
    </q-card-title>
    <q-card-main>
      <div class="row justify-center">
        <q-btn
          @click="remove"
          icon="remove"
          round
          color="primary" />
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
      <div class="row justify-center">
        <div>{{$tc('products.ordered', pendingOrdersAmount)}} : </div>
        <div class="q-ml-md">{{pendingOrdersAmount}}</div>
      </div>
      <div class="row justify-center">
        <div>{{$tc('products.available', amount - pendingOrdersAmount)}} : </div>
        <div class="q-ml-md">{{amount - pendingOrdersAmount}}</div>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'FormatAmount',
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
    pendingOrdersAmount () {
      const ordersOfFormat = this.ordersPropsOfFilterPropValue({
        arrayOfPropsKeys: ['amount'],
        filterKey: 'formatId',
        filterValue: this.formatId
      })
      return Object.values(ordersOfFormat).reduce((totalAmount, actualOrder) => {
        return totalAmount + actualOrder.amount
      }, 0)
    }
  },
  methods: {
    ...mapMutations(['updateEditedFormat']),
    add () {
      this.updateAmount(this.amount + 1)
    },
    remove () {
      this.updateAmount(this.amount - 1)
    },
    updateAmount (value) {
      if (value >= this.pendingOrdersAmount) {
        this.updateEditedFormat({formatId: this.formatId, newProps: {amount: value}})
      } else {
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
      }
    }
  },
  created () {
    console.log(
      Object.values(
        this.ordersPropsOfFilterPropValue({arrayOfPropsKeys: ['amount'], filterKey: 'formatId', filterValue: this.formatId})
      )[0].amount
    )
  }
}
</script>

<style lang="stylus">
.format-amount {
  width: 220px;
}
</style>
