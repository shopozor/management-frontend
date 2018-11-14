<template>
  <q-field>
    <q-input
      :float-label="$t('products.formatDescription')"
      :value="description"
      @input="updateDescription" />
  </q-field>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'FormatDescriptionFree',
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedFormats']),
    description () { return this.editedFormats[this.formatId].description },
    customerPrice () { return this.editedFormats[this.formatId].customerPrice }
  },
  methods: {
    ...mapMutations(['updateEditedFormat']),
    update (propName, value) {
      this.updateEditedFormat({formatId: this.formatId, newProps: {[propName]: value}})
    },
    updateDescription (value) { this.update('description', value) },
    updateCustomerPrice (value) { this.update('customerPrice', value) }
  }
}
</script>
