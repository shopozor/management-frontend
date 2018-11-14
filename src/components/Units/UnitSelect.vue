<template>
  <q-field
    :style="`width: ${width}`"
    :label="label">
    <q-select
      :float-label="$t('products.unit')"
      :value="unit"
      @input="setUnit"
      :options="options" />
  </q-field>
</template>

<script>
import * as helpers from './UnitsHelpers'

export default {
  name: 'UnitSelect',
  props: {
    unit: {
      type: String,
      required: true
    },
    setUnit: {
      type: Function,
      required: true
    },
    filter: {
      type: String,
      default () {
        return 'compatible'
      }
    },
    width: {
      type: String,
      default () {
        return '100%'
      }
    },
    label: {
      type: String,
      default () {
        return ''
      }
    }
  },
  computed: {
    options () { return helpers.options({filter: this.filter, unit: this.unit}) }
  }
}
</script>
