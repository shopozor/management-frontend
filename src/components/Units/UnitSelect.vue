<template>
  <div :style="`width: ${width}em`">
    <q-select
        :value="unit"
        @input="setUnit"
        :options="options" />
  </div>
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
      type: Number,
      default () {
        return 4
      }
    }
  },
  computed: {
    options () { return helpers.options({filter: this.filter, unit: this.unit}) }
  }
}
</script>
