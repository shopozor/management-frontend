<template>
  <unit-field
    :value="editedFormats[formatId].size"
    :setValue="updateSize"
    valueWidth="50%"
    :unit="editedFormats[formatId].sizeUnit"
    :setUnit="updateSizeUnit"
    unitWidth="50%"
    filter="all"
    :readonly="!isUpdatable"
  />
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import UnitField from '../../../../Units/UnitField'
import FormatCriticalValuesMixin from '../FormatCriticalValuesMixin.js'

export default {
  name: 'FormatDescriptionSizeUnit',
  mixins: [FormatCriticalValuesMixin],
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
    ...mapActions(['updateEditedFormat']),
    update (propName, value) {
      this.updateEditedFormat({formatId: this.formatId, newProps: {[propName]: value}})
    },
    updateSize (value) { this.update('size', value) },
    updateSizeUnit (newUnit) { this.update('sizeUnit', newUnit) }
  }
}
</script>
