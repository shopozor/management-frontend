<template>
  <price-input
    :customerPrice="customerPrice"
    :setCustomerPrice="setCustomerPrice"
    :producerRatio="0.85"
    :customer="customer"
    :producer="producer"
    :shop="shop" />
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import PriceInput from './PriceInput'

export default {
  name: 'FormatPriceFree',
  props: {
    formatId: {
      type: String,
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
    }
  },
  computed: {
    ...mapGetters(['editedFormats']),
    customerPrice () { return this.editedFormats[this.formatId].customerPrice }
  },
  methods: {
    ...mapMutations(['updateEditedFormat']),
    setCustomerPrice (value) {
      this.updateEditedFormat({
        formatId: this.formatId,
        newProps: { customerPrice: value }
      })
    }
  },
  components: {PriceInput}
}
</script>
