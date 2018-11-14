<template>
  <unit-select
    :unit="editedFormats[formatId].sizeUnit"
    :setUnit="updateSizeUnit"
    width="100%"
    filter="all"
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
    sizeUnit () { return this.editedFormats[this.formatId].sizeUnit }
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
