<template>
  <q-card inline class="format-price q-ma-sm">
    <q-card-main>
      <q-field>
        <q-input
          :float-label="$t('products.customerPays')"
          v-model="customerPrice"
          @blur="updateTrueCustomerPrice"
          @input="customerPriceChanged"
          suffix="CHF"
        />
      </q-field>
      <q-field>
        <q-input
          :float-label="$t('products.iGet')"
          v-model="producerPrice"
          @blur="updateTrueCustomerPrice"
          @input="producerPriceChanged"
          suffix="CHF"
        />
      </q-field>
      <!-- <q-field>
        <q-input
          float-label="la budzonnerie reçoit"
          v-model="shopPrice"
          @blur="updateTrueCustomerPrice"
          @input="shopPriceChanged"
          suffix="CHF"
        />
      </q-field> -->
    </q-card-main>
  </q-card>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'FormatPrice',
  data () {
    return {
      customerPrice: this.trueCustomerPrice,
      producerPrice: this.trueProducerPrice,
      shopPrice: this.trueShopPrice
    }
  },
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedFormats']),
    trueCustomerPrice () { return this.editedFormats[this.formatId].customerPrice / 100 },
    trueProducerPrice () { return Math.round(this.editedFormats[this.formatId].customerPrice * 0.85) / 100 },
    trueShopPrice () { return Math.round(this.editedFormats[this.formatId].customerPrice * 0.15) / 100 }
  },
  methods: {
    ...mapMutations(['updateEditedFormat']),
    updateTrueCustomerPrice () {
      this.updateEditedFormat({
        formatId: this.formatId,
        newProps: {
          customerPrice: Math.round(this.customerPrice * 100)
        }
      })
      this.customerPrice = this.trueCustomerPrice
      this.producerPrice = this.trueProducerPrice
      this.shopPrice = this.trueShopPrice
    },
    customerPriceChanged (value) {
      this.producerPrice = Math.round(value * 100 * 0.85) / 100
      this.shopPrice = Math.round(value * 100 * 0.15) / 100
    },
    producerPriceChanged (value) {
      this.customerPrice = Math.round(value * 100 / 0.85) / 100
      this.shopPrice = Math.round(value * 100 / 0.85 * 0.15) / 100
    },
    shopPriceChanged (value) {
      this.customerPrice = Math.round(value * 100 / 0.15) / 100
      this.producerPrice = Math.round(value * 100 / 0.15 * 0.85) / 100
    }
  }
}
</script>

<style lang="stylus">
.format-price {
  width: 260px;
}
</style>
