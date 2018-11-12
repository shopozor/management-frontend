<template>
  <q-card inline class="format-description">
    <q-card-main>
      <format-description-free v-if="formatUI === formatUIs.FREE" :formatId="formatId" />
      <div v-else-if="formatUI === formatUIs.AUTO_UNIT">
        description - auto-unit
        <smart-unit-field
          :value="editedFormats[formatId].size"
          :setValue="updateSize"
          :unit="editedFormats[formatId].sizeUnit"
          :setUnit="updateSizeUnit"
        />
        <q-field>
          <q-input :value="customerPrice" @input="updateCustomerPrice" />
        </q-field>
      </div>
      <div v-else-if="formatUI === formatUIs.AUTO_PRICE">
        description - auto-price
        <smart-unit-field
          :value="editedFormats[formatId].size"
          :setValue="updateSize"
          :unit="editedFormats[formatId].sizeUnit"
          :setUnit="updateSizeUnit"
        />
        <q-field>
          <q-input :value="customerPrice" @input="updateCustomerPrice" />
        </q-field>
      </div>
      <div v-else-if="formatUI === formatUIs.BULK">
        description - vrac
        <q-field>
          <q-input :value="customerPrice" @input="updateCustomerPrice" />
          <q-input :value="customerPriceUnit" @input="updateCustomerPriceUnit" />
        </q-field>
      </div>
    </q-card-main>
    <q-card-actions>
      <format-u-i-select :formatId="formatId" />
    </q-card-actions>
  </q-card>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import types from '../../../../types'
import SmartUnitField from '../../../Units/SmartUnitField'
import FormatDescriptionFree from './FormatDescription/FormatDescriptionFree'
import FormatUISelect from './FormatUISelect'

export default {
  name: 'FormatDescription',
  data () {
    return {
      formatUIs: {...types.formatUI}
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
    formatUI () { return this.editedFormats[this.formatId].formatUI },
    description () { return this.editedFormats[this.formatId]['description'] },
    size () { return this.editedFormats[this.formatId]['size'] },
    sizeUnit () { return this.editedFormats[this.formatId]['sizeUnit'] },
    customerPrice () { return this.editedFormats[this.formatId]['customerPrice'] },
    customerPriceUnit () { return this.editedFormats[this.formatId]['customerPriceUnit'] }
  },
  components: {SmartUnitField, FormatDescriptionFree, FormatUISelect},
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

<style lang="stylus">
.format-description {
  width: 300px;
}
</style>
