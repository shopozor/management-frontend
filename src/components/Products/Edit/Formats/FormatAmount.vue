<template>
  <q-field>
    <q-input :value="editedFormats[formatId].amount" @input="updateAmount" />
  </q-field>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'FormatAmount',
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedFormats'])
  },
  methods: {
    ...mapMutations(['updateEditedFormat']),
    updateAmount (value) {
      this.updateEditedFormat({formatId: this.formatId, newProps: {amount: value}})
    }
  }
}
</script>
