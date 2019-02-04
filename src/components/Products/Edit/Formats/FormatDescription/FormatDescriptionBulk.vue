<template>
  <unit-select
    :unit="sizeUnit"
    :setUnit="updateSizeUnit"
    width="100%"
    filter="all"
    withPriceReferenceQuantities
    :label="$t('products.bulk')"
    :readonly="!isUpdatable"
  />
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import UnitSelect from '../../../../Units/UnitSelect'
import FormatCriticalValuesMixin from '../FormatCriticalValuesMixin.js'

export default {
  name: 'FormatDescriptionBulk',
  mixins: [FormatCriticalValuesMixin],
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedFormats']),
    sizeUnit () {
      const sizeUnit = this.editedFormats[this.formatId].sizeUnit
      if (sizeUnit) return sizeUnit
      else return ''
    }
  },
  components: {UnitSelect},
  methods: {
    ...mapActions(['updateEditedFormat']),
    update (propName, value) {
      this.updateEditedFormat({formatId: this.formatId, newProps: {[propName]: value}})
    },
    updateSizeUnit (newUnit) { this.update('sizeUnit', newUnit) }
  }
}
</script>
