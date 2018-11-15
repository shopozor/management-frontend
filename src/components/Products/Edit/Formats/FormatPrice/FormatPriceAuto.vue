<template>
  <q-card-main>
      <q-field>
        <q-input
          :float-label="$t('products.customerPays')"
          :value="customerPrice"
          suffix="CHF"
          readonly
        />
      </q-field>
      <q-field>
        <q-input
          :float-label="$t('products.iGet')"
          :value="producerPrice"
          suffix="CHF"
          readonly
        />
      </q-field>
  </q-card-main>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'FormatPriceAuto',
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedFormats']),
    customerPrice () { return (this.editedFormats[this.formatId].customerPrice / 100).toFixed(2) },
    producerPrice () { return (this.customerPrice * 0.85).toFixed(2) },
    shopPrice () { return (this.customerPrice * 0.15).toFixed(2) },
    formatUI () { return this.editedFormats[this.formatId].formatUI }
  }
}
</script>
