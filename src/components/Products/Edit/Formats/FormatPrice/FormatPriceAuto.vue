<template>
  <price-input
    :customerPrice="customerPrice"
    :setCustomerPrice="() => {}"
    :producerRatio="0.85"
    :customer="customer"
    :producer="producer"
    :shop="shop"
    :readonly="true" />
</template>

<script>
import {mapGetters} from 'vuex'
import PriceInput from '../../../../Price/PriceInput'

export default {
  name: 'FormatPriceAuto',
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
  components: {PriceInput}
}
</script>
