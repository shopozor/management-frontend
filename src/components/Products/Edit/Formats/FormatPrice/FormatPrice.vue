<template>
  <q-card inline class="format-price q-ma-sm">
    <format-price-auto v-if="autoPrice" :formatId="formatId" />
    <format-price-free v-else :formatId="formatId" />
  </q-card>
</template>

<script>
import types from '../../../../../types'
import FormatPriceAuto from './FormatPriceAuto'
import FormatPriceFree from './FormatPriceFree'

export default {
  name: 'FormatPrice',
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  computed: {
    // mapGetters fait buguer. Pourquoi ????
    autoPrice () {
      const formatUI = this.$store.state.formats.editedFormats[this.formatId].formatUI
      return formatUI === types.formatUI.AUTO_PRICE
    }
  },
  components: { FormatPriceAuto, FormatPriceFree }
}
</script>

<style lang="stylus">
.format-price {
  width: 260px;
}
</style>
