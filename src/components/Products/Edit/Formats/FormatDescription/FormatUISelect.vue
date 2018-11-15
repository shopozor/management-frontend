<template>
  <!-- <q-btn-toggle
    :value="UI"
    @input="updateFormatUI"
    :options="options" /> -->
  <q-select
    float-label="Type de conditionnement"
    :value="UI"
    @input="updateFormatUI"
    :options="options" />
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import * as formatUI from '../../../../../types/formatUI'

export default {
  name: 'FormatUISelect',
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedFormats']),
    UI () {
      return this.editedFormats[this.formatId].formatUI
    },
    options () {
      const vm = this
      return Object.values(formatUI).map(UI => {
        return {label: vm.$t(`formatUI.${UI}`), value: UI}
      })
    }
  },
  methods: {
    ...mapMutations(['updateEditedFormat']),
    updateFormatUI (value) {
      this.updateEditedFormat({formatId: this.formatId, newProps: {formatUI: value}})
    }
  }
}
</script>
