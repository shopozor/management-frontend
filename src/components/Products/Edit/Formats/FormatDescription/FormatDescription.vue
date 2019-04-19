<template>
  <q-card inline class="width-md q-ma-sm">
    <q-card-section>
      <format-description-free v-if="formatUI === formatUIs.FREE" :formatId="formatId"/>
      <format-description-size-unit
        v-else-if="formatUI === formatUIs.AUTO_UNIT"
        :formatId="formatId"
      />
      <format-description-auto v-else-if="formatUI === formatUIs.AUTO_PRICE" :formatId="formatId"/>
      <format-description-bulk v-else-if="formatUI === formatUIs.BULK" :formatId="formatId"/>
      <format-u-i-select :formatId="formatId" style="width: 100%"/>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import types from '../../../../../../common/src/types'
import FormatDescriptionFree from './FormatDescriptionFree'
import FormatDescriptionSizeUnit from './FormatDescriptionSizeUnit'
import FormatDescriptionAuto from './FormatDescriptionAuto'
import FormatDescriptionBulk from './FormatDescriptionBulk'
import FormatUISelect from './FormatUISelect'

export default {
  name: 'FormatDescription',
  data () {
    return {
      formatUIs: types.formatUI
    }
  },
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['editedFormats']),
    formatUI () {
      return this.editedFormats[this.formatId].formatUI
    },
    description () {
      return this.editedFormats[this.formatId]['description']
    },
    size () {
      return this.editedFormats[this.formatId]['size']
    },
    sizeUnit () {
      return this.editedFormats[this.formatId]['sizeUnit']
    },
    customerPrice () {
      return this.editedFormats[this.formatId]['customerPrice']
    },
    customerPriceUnit () {
      return this.editedFormats[this.formatId]['customerPriceUnit']
    }
  },
  methods: {
    ...mapActions(['updateEditedFormat']),
    update (propName, value) {
      this.updateEditedFormat({
        formatId: this.formatId,
        newProps: { [propName]: value }
      })
    },
    updateDescription (value) {
      this.update('description', value)
    },
    updateSize (value) {
      this.update('size', value)
    },
    updateSizeUnit (newUnit) {
      this.update('sizeUnit', newUnit)
    },
    updateCustomerPrice (value) {
      this.update('customerPrice', value)
    },
    updateCustomerPriceUnit (value) {
      this.update('customerPriceUnit', value)
    }
  },
  components: {
    FormatDescriptionFree,
    FormatDescriptionSizeUnit,
    FormatDescriptionAuto,
    FormatDescriptionBulk,
    FormatUISelect
  }
}
</script>
