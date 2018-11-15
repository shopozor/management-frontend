<template>
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
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'FormatPriceFree',
  data () {
    return {
      customerPrice: 0,
      producerPrice: 0,
      shopPrice: 0
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
    trueProducerPrice () { return this.trueCustomerPrice * 0.85 },
    trueShopPrice () { return this.trueCustomerPrice * 0.15 }
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
      this.customerPrice = this.trueCustomerPrice.toFixed(2)
      this.producerPrice = this.trueProducerPrice.toFixed(2)
      this.shopPrice = this.trueShopPrice.toFixed(2)
    },
    customerPriceChanged (value) {
      this.producerPrice = (value * 0.85).toFixed(2)
      this.shopPrice = (value * 0.15).toFixed(2)
    },
    producerPriceChanged (value) {
      this.customerPrice = (value / 0.85).toFixed(2)
      this.shopPrice = (value / 0.85 * 0.15).toFixed(2)
    },
    shopPriceChanged (value) {
      this.customerPrice = (value / 0.15).toFixed(2)
      this.producerPrice = (value / 0.15 * 0.85).toFixed(2)
    }
  },
  mounted () {
    this.customerPrice = this.trueCustomerPrice.toFixed(2)
    this.producerPrice = this.trueProducerPrice.toFixed(2)
    this.shopPrice = this.trueShopPrice.toFixed(2)
  }
}
</script>
