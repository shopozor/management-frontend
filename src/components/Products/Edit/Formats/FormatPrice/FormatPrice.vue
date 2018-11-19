<template>
  <q-card inline class="width-md q-ma-sm">
    <format-price-auto
      v-if="autoPrice"
      :formatId="formatId"
      customer
      producer />
    <format-price-free
      v-else
      :formatId="formatId"
      customer
      producer />
  </q-card>
</template>

<script>
import types from '../../../../../types'
import FormatPriceAuto from './FormatPriceAuto'
import FormatPriceFree from './FormatPriceFree'
import { mapGetters } from 'vuex'

export default {
  name: 'FormatPrice',
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedFormats']),
    autoPrice () {
      const formatUI = this.editedFormats[this.formatId].formatUI
      return formatUI === types.formatUI.AUTO_PRICE
    }
  },
  components: { FormatPriceAuto, FormatPriceFree }
}
</script>
