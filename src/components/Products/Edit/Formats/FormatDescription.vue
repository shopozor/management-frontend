<template>
  <div>
    <div v-if="formatMode === formatModes.FREE">
      <q-field>
        <q-input :value="description" @input="updateDescription" />
        <q-input :value="customerPrice" @input="updateCustomerPrice" />
      </q-field>
    </div>
    <div v-else-if="formatMode === formatModes.AUTO_UNIT">
      <q-field>
        <smart-unit-field
          :value="editedFormats[formatId].size"
          :setValue="updateSize"
          :unit="editedFormats[formatId].sizeUnit"
          :setUnit="updateSizeUnit"
        />
        <q-input :value="customerPrice" @input="updateCustomerPrice" />
      </q-field>
    </div>
    <div v-else-if="formatMode === formatModes.AUTO_PRICE">
      <q-field>
        <smart-unit-field
          :value="editedFormats[formatId].size"
          :setValue="updateSize"
          :unit="editedFormats[formatId].sizeUnit"
          :setUnit="updateSizeUnit"
        />
        <q-input :value="customerPrice" @input="updateCustomerPrice" />
      </q-field>
    </div>
    <div v-else-if="formatMode === formatModes.BULK">
      <q-field>
        <q-input :value="customerPrice" @input="updateCustomerPrice" />
        <q-input :value="customerPriceUnit" @input="updateCustomerPriceUnit" />
      </q-field>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import types from '../../../../types'
import SmartUnitField from '../../../Units/SmartUnitField'

export default {
  name: 'FormatDescription',
  data () {
    return {
      formatModes: {...types.formatMode}
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
    formatMode () { return this.editedFormats[this.formatId]['mode'] },
    description () { return this.editedFormats[this.formatId]['description'] },
    size () { return this.editedFormats[this.formatId]['size'] },
    sizeUnit () { return this.editedFormats[this.formatId]['sizeUnit'] },
    customerPrice () { return this.editedFormats[this.formatId]['customerPrice'] },
    customerPriceUnit () { return this.editedFormats[this.formatId]['customerPriceUnit'] }
  },
  components: {SmartUnitField},
  methods: {
    ...mapMutations(['updateEditedFormat']),
    update (propName, value) {
      this.updateEditedFormat({formatId: this.formatId, newProps: {[propName]: value}})
    },
    updateDescription (value) { this.update('description', value) },
    updateSize (value) { this.update('size', value) },
    updateSizeUnit (newUnit) { this.update('sizeUnit', newUnit) },
    updateCustomerPrice (value) { this.update('customerPrice', value) },
    updateCustomerPriceUnit (value) { this.update('customerPriceUnit', value) }
  }
}
</script>
