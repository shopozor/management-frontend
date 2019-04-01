<template>
  <!-- <q-btn-toggle
    :value="UI"
    @input="updateFormatUI"
  :options="options" />-->
  <q-select
    float-label="Type de conditionnement"
    :value="UI"
    @input="updateFormatUI"
    :options="options"
    :readonly="!isUpdatable"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as formatUI from '../../../../../../common/src/types/formatUI'
import FormatCriticalValuesMixin from '../FormatCriticalValuesMixin'

export default {
  name: 'FormatUISelect',
  mixins: [FormatCriticalValuesMixin],
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
        return { label: vm.$t(`formatUI.${UI}`), value: UI }
      })
    }
  },
  methods: {
    ...mapActions(['updateEditedFormat']),
    updateFormatUI (value) {
      this.updateEditedFormat({
        formatId: this.formatId,
        newProps: { formatUI: value }
      })
    }
  }
}
</script>
