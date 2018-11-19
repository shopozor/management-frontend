<template>
  <unit-select
    :unit="sizeUnit"
    :setUnit="updateSizeUnit"
    width="100%"
    filter="all"
    withPriceReferenceQuantities
    :label="$t('products.bulk')"
  />
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import UnitSelect from '../../../../Units/UnitSelect'

export default {
  name: 'FormatDescriptionBulk',
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
    ...mapMutations(['updateEditedFormat']),
    update (propName, value) {
      this.updateEditedFormat({formatId: this.formatId, newProps: {[propName]: value}})
    },
    updateSizeUnit (newUnit) { this.update('sizeUnit', newUnit) }
  }
}
</script>
