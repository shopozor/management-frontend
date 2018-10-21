<template>
  <div class="row no-wrap justify-center">
    <q-input
      class="self-baseline"
      :value="value"
      @input="setValue"
      :style="`width: ${valueWidth}em`"
      type="number" />
    <q-btn
      class="q-ma-sm self-middle"
      :icon="autoValueUpdate ? 'link' : 'link_off'"
      size="sm"
      round
      flat
      @click="autoValueUpdate = !autoValueUpdate" />
    <unit-select
      class="self-baseline"
      :unit="unit"
      :setUnit="updateUnitAndValue"
      :filter="filter"
      :width="unitWidth" />
  </div>
</template>

<script>
import * as helpers from './UnitsHelpers'
import UnitSelect from './UnitSelect'

export default {
  name: 'UnitField',
  data () {
    return {
      autoValueUpdate: true
    }
  },
  props: {
    unit: {
      type: String,
      required: true
    },
    setUnit: {
      type: Function,
      required: true
    },
    unitWidth: {
      type: Number,
      default () {
        return 3
      }
    },
    filter: {
      type: String,
      default () {
        return 'compatible'
      }
    },
    value: {
      type: Number,
      required: true
    },
    setValue: {
      type: Function,
      required: true
    },
    valueWidth: {
      type: Number,
      default () {
        return 3
      }
    }
  },
  methods: {
    updateUnitAndValue (newUnit) {
      if (this.autoValueUpdate && helpers.unitsAreCompatible({unit1: this.unit, unit2: newUnit})) {
        const newValue = helpers.convert({ startValue: this.value, startUnit: this.unit, endUnit: newUnit })
        this.setValue(newValue)
      }
      this.setUnit(newUnit)
    }
  },
  components: {UnitSelect}
}
</script>
