<template>
  <unit-field
    :value="editedFormats[formatId].size"
    :setValue="updateSize"
    :unit="editedFormats[formatId].sizeUnit"
    :setUnit="updateSizeUnit"
    filter="all"
  />
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import UnitField from '../../../../Units/UnitField'

export default {
  name: 'FormatDescriptionSizeUnit',
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedFormats']),
    size () { return this.editedFormats[this.formatId].size },
    sizeUnit () { return this.editedFormats[this.formatId].sizeUnit }
  },
  components: {UnitField},
  methods: {
    ...mapMutations(['updateEditedFormat']),
    update (propName, value) {
      this.updateEditedFormat({formatId: this.formatId, newProps: {[propName]: value}})
    },
    updateSize (value) { this.update('size', value) },
    updateSizeUnit (newUnit) { this.update('sizeUnit', newUnit) }
  }
}
</script>
