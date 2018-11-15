<template>
  <unit-field
    :value="editedFormats[formatId].size"
    :setValue="updateSize"
    valueWidth="50%"
    :unit="editedFormats[formatId].sizeUnit"
    :setUnit="updateSizeUnit"
    unitWidth="50%"
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
    defaultCustomerPrice () { return this.editedProduct.defaultCustomerPrice },
    defaultUnit () { return this.editedProduct.defaultUnit }
  },
  components: {UnitField},
  methods: {
    ...mapMutations(['updateEditedFormat']),
    update (propName, value) {
      this.updateEditedFormat({formatId: this.formatId, newProps: {[propName]: value}})
    },
    updateSizeUnit (newUnit) { this.update('sizeUnit', newUnit) },
    updateSize (value) {
      this.update('size', value)
      this.updateCustomerPrice()
    },
    updateCustomerPrice () {
      const newPricePerUnit = 1 / convert({
        startValue: 1 / this.defaultCustomerPrice,
        startUnit: this.defaultUnit,
        endUnit: this.sizeUnit
      })
      this.update('customerPrice', newPricePerUnit * this.size)
    }
  },
  mounted () {
    if (!this.defaultCustomerPrice || !this.defaultUnit) console.log('à définir')
    else this.updateCustomerPrice()
  }
}
</script>
