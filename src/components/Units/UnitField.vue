<template>
  <div class="row no-wrap justify-center">
    <q-field
      :style="`width: ${valueWidth}`">
      <q-input
        class="self-baseline"
        :value="value"
        @input="setValue"
        type="number"
        :float-label="$t('products.size')"
        :readonly="readonly" />
    </q-field>
    <unit-select
      class="self-baseline"
      :unit="unit"
      :setUnit="updateUnitAndValue"
      :filter="filter"
      :width="unitWidth"
      :readonly="readonly" />
  </div>
</template>

<script>
import * as helpers from './UnitsHelpers'
import UnitSelect from './UnitSelect'

export default {
  name: 'UnitField',
  props: {
    value: {
      type: Number,
      required: true
    },
    setValue: {
      type: Function,
      required: true
    },
    valueWidth: {
      type: String,
      default () {
        return '100%'
      }
    },
    linked: {
      type: Boolean,
      default () {
        return false
      }
    },
    unit: {
      type: String,
      required: true
    },
    setUnit: {
      type: Function,
      required: true
    },
    unitWidth: {
      type: String,
      default () {
        return '100%'
      }
    },
    filter: {
      type: String,
      default () {
        return 'compatible'
      }
    },
    readonly: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  methods: {
    updateUnitAndValue (newUnit) {
      const unit1 = this.unit
      this.setUnit(newUnit)
      if (this.linked && helpers.unitsAreCompatible({unit1, unit2: newUnit})) {
        const newValue = helpers.convert({ startValue: this.value, startUnit: unit1, endUnit: newUnit })
        this.setValue(newValue)
      }
    }
  },
  components: {UnitSelect}
}
</script>
