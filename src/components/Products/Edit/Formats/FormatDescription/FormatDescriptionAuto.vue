<template>
  <unit-field
    :value="editedFormats[formatId].size"
    :setValue="updateSize"
    :unit="editedFormats[formatId].sizeUnit"
    :setUnit="updateSizeUnit"
    :linked="true"
    filter="compatible"
  />
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import UnitField from '../../../../Units/UnitField'
import {convert} from '../../../../Units/UnitsHelpers'

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
    defaultCustomerPrice () { return this.editedProduct.defaultCustomerPrice },
    defaultUnit () { return this.editedProduct.defaultUnit }
  },
  components: {UnitField},
  methods: {
    ...mapMutations(['updateEditedFormat']),
    update (propName, value) {
      this.updateEditedFormat({formatId: this.formatId, newProps: {[propName]: value}})
    },
    updateSize (value) {
      this.update('size', value)
      const newPrice = convert({
        startValue: this.defaultCustomerPrice,
        startUnit: this.defaultUnit,
        endUnit: this.sizeUnit
      })
      this.update('customerPrice', newPrice)
    },
    updateSizeUnit (newUnit) { this.update('sizeUnit', newUnit) }
  }
}
</script>
