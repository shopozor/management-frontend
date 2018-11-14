<template>
  <q-card inline class="format-description q-ma-sm">
    <q-card-main>
      <format-description-free
        v-if="formatUI === formatUIs.FREE"
        :formatId="formatId" />
      <format-description-size-unit
        v-else-if="formatUI === formatUIs.AUTO_UNIT"
        :formatId="formatId" />
      <format-description-auto
        v-else-if="formatUI === formatUIs.AUTO_PRICE"
        :formatId="formatId" />
      <format-description-bulk
        v-else-if="formatUI === formatUIs.BULK"
        :formatId="formatId" />
      <format-u-i-select :formatId="formatId" style="width: 100%" />
    </q-card-main>
  </q-card>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import types from '../../../../types'
import FormatDescriptionFree from './FormatDescription/FormatDescriptionFree'
import FormatDescriptionSizeUnit from './FormatDescription/FormatDescriptionSizeUnit'
import FormatDescriptionAuto from './FormatDescription/FormatDescriptionAuto'
import FormatDescriptionBulk from './FormatDescription/FormatDescriptionBulk'
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
    formatUI () { return this.editedFormats[this.formatId].formatUI },
    description () { return this.editedFormats[this.formatId]['description'] },
    size () { return this.editedFormats[this.formatId]['size'] },
    sizeUnit () { return this.editedFormats[this.formatId]['sizeUnit'] },
    customerPrice () { return this.editedFormats[this.formatId]['customerPrice'] },
    customerPriceUnit () { return this.editedFormats[this.formatId]['customerPriceUnit'] }
  },
  methods: {
    ...mapMutations(['updateEditedFormat']),
    update (propName, value) {
      this.updateEditedFormat({formatId: this.formatId, newProps: {[propName]: value}})
    },
    updateDescription (value) { this.update('description', value) },
    updateSize (value) { this.update('size', value) },
    updateSizeUnit (newUnit) { this.update('sizeUnit', newUnit) },
    updateCustomerPrice (value) { this.update('customerPrice', value) },
    updateCustomerPriceUnit (value) { this.update('customerPriceUnit', value) }
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

<style lang="stylus">
.format-description {
  width: 260px;
}
</style>
