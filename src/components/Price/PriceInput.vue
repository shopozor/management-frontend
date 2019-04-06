<template>
  <q-card-section>
    <q-field v-if="customer">
      <q-input
        :style="`width: ${width}`"
        :float-label="$t('products.customerPays')"
        :value="readonly ? computedCustomerPrice : tempCustomerPrice"
        @blur="updateCustomerPrice"
        @input="tempCustomerPriceChanged"
        suffix="CHF"
        :readonly="readonly"
      />
    </q-field>
    <q-field v-if="producer">
      <q-input
        :style="`width: ${width}`"
        :float-label="$t('products.iGet')"
        :value="readonly ? computedProducerPrice : tempProducerPrice"
        @blur="updateCustomerPrice"
        @input="tempProducerPriceChanged"
        suffix="CHF"
        :readonly="readonly"
      />
    </q-field>
    <q-field v-if="shop">
      <q-input
        :style="`width: ${width}`"
        :float-label="$t('products.shopGets')"
        :value="readonly ? computedShopPrice : tempShopPrice"
        @blur="updateCustomerPrice"
        @input="tempShopPriceChanged"
        suffix="CHF"
        :readonly="readonly"
      />
    </q-field>
  </q-card-section>
</template>

<script>
export default {
  name: 'PriceInput',
  data () {
    return {
      tempCustomerPrice: 0,
      tempProducerPrice: 0,
      tempShopPrice: 0
    }
  },
  props: {
    customerPrice: {
      type: Number,
      required: true
    },
    setCustomerPrice: {
      type: Function,
      required: true
    },
    producerRatio: {
      type: Number,
      required: true
    },
    customer: {
      type: Boolean,
      default () {
        return false
      }
    },
    producer: {
      type: Boolean,
      default () {
        return false
      }
    },
    shop: {
      type: Boolean,
      default () {
        return false
      }
    },
    readonly: {
      type: Boolean,
      default () {
        return false
      }
    },
    width: {
      type: String,
      default () {
        return '100%'
      }
    }
  },
  computed: {
    computedCustomerPrice () { return (this.customerPrice / 100).toFixed(2) },
    computedProducerPrice () { return (this.customerPrice * this.producerRatio / 100).toFixed(2) },
    computedShopPrice () { return (this.customerPrice * (1 - this.producerRatio) / 100).toFixed(2) }
  },
  methods: {
    tempCustomerPriceChanged (value) {
      const num = value * 1
      this.tempCustomerPrice = num
      this.tempProducerPrice = (num * this.producerRatio).toFixed(2)
      this.tempShopPrice = (num * (1 - this.producerRatio)).toFixed(2)
    },
    tempProducerPriceChanged (value) {
      const num = value * 1
      this.tempCustomerPrice = (num / this.producerRatio).toFixed(2)
      this.tempProducerPrice = num
      this.tempShopPrice = (num / this.producerRatio * (1 - this.producerRatio)).toFixed(2)
    },
    tempShopPriceChanged (value) {
      const num = value * 1
      this.tempCustomerPrice = (num / (1 - this.producerRatio)).toFixed(2)
      this.tempProducerPrice = (num / (1 - this.producerRatio) * this.producerRatio).toFixed(2)
      this.tempShopPrice = num
    },
    updateCustomerPrice () {
      this.setCustomerPrice(Number.parseInt(this.tempCustomerPrice * 100))
      this.tempCustomerPrice = Number.parseFloat(this.tempCustomerPrice).toFixed(2)
      this.tempProducerPrice = Number.parseFloat(this.tempProducerPrice).toFixed(2)
      this.tempShopPrice = Number.parseFloat(this.tempShopPrice).toFixed(2)
    }
  },
  mounted () {
    this.tempCustomerPrice = (this.customerPrice / 100).toFixed(2)
    this.tempProducerPrice = (this.customerPrice * this.producerRatio / 100).toFixed(2)
    this.tempShopPrice = (this.customerPrice * (1 - this.producerRatio) / 100).toFixed(2)
  }
}
</script>
