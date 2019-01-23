<template>
  <price-input
    :customerPrice="customerPrice"
    :setCustomerPrice="setCustomerPrice"
    :producerRatio="0.85"
    :customer="customer"
    :producer="producer"
    :shop="shop"
    :readonly="!isUpdatable" />
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import PriceInput from '../../../../Price/PriceInput'
import FormatCriticalValuesMixin from '../FormatCriticalValuesMixin.js'

export default {
  name: 'FormatPriceFree',
  mixins: [FormatCriticalValuesMixin],
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
    ...mapActions(['updateEditedFormat']),
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
