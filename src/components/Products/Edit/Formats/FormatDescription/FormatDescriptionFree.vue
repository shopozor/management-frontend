<template>
  <q-field>
    <q-input
      :float-label="$t('products.formatDescription')"
      :value="description"
      @input="updateDescription"
      :readonly="!isUpdatable" />
  </q-field>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import FormatCriticalValuesMixin from '../FormatCriticalValuesMixin.js'

export default {
  name: 'FormatDescriptionFree',
  mixins: [FormatCriticalValuesMixin],
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
    ...mapActions(['updateEditedFormat']),
    update (propName, value) {
      this.updateEditedFormat({formatId: this.formatId, newProps: {[propName]: value}})
    },
    updateDescription (value) { this.update('description', value) },
    updateCustomerPrice (value) { this.update('customerPrice', value) }
  }
}
</script>
