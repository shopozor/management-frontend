<template>
  <smart-unit-field
    :value="editedFormats[formatId].size"
    :setValue="updateSize"
    :unit="editedFormats[formatId].sizeUnit"
    :setUnit="updateSizeUnit"
    :densities="densities"
    :updateDensities="updateDensities"
  />
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import SmartUnitField from '../../../../Units/SmartUnitField'
import {smartConvert} from '../../../../Units/UnitsHelpers'

export default {
  name: 'FormatDescriptionAuto',
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedFormats', 'editedProduct']),
    size () { return this.editedFormats[this.formatId].size },
    sizeUnit () { return this.editedFormats[this.formatId].sizeUnit },
    customerPrice () { return this.editedFormats[this.formatId].customerPrice },
    densities () { return this.editedFormats[this.formatId].densities },
    defaultCustomerPrice () { return this.editedProduct.defaultCustomerPrice },
    defaultUnit () { return this.editedProduct.defaultUnit }
  },
  components: {SmartUnitField},
  methods: {
    ...mapMutations(['updateEditedFormat']),
    update (propName, value) {
      this.updateEditedFormat({formatId: this.formatId, newProps: {[propName]: value}})
    },
    updateSize (value) {
      this.update('size', value)
      const newPrice = smartConvert({
        startValue: this.defaultCustomerPrice,
        startUnit: this.defaultUnit,
        endUnit: this.sizeUnit,
        densities: this.densities
      })
      this.update('customerPrice', newPrice)
    },
    updateDensities (newDensity) {
      const densities = {...this.densities, ...newDensity}
      this.updateEditedFormat({ formatId: this.formatId, newProps: {densities} })
    },
    updateSizeUnit (newUnit) { this.update('sizeUnit', newUnit) }
  }
}
</script>
