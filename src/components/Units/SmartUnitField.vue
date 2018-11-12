<template>
  <div>
    <unit-field
      :unit="unit"
      :setUnit="smartSetUnit"
      :unitWidth="unitWidth"
      linked
      :value="value"
      :setValue="setValue"
      :valueWidth="valueWidth"
      filter="warning" />
    <q-dialog
      v-model="askAboutConversion"
      prevent-close
      @cancel="onCancel"
      @ok="onOk"
      @show="onShow"
      @hide="onHide">
      <span slot="title">Attention !</span>
      <span slot="message">{{message}}</span>
      <div slot="body" class="row justify-center">
        <unit-field
          :unit="startConversionUnit"
          :setUnit="newUnit => startConversionUnit = newUnit"
          :value="startConversionValue"
          :setValue="newValue => startConversionValue = newValue"
          :linked="true"
        />
        <span class="q-mx-lg self-center">correspond à</span>
        <unit-field
          :unit="endConversionUnit"
          :setUnit="newUnit => endConversionUnit = newUnit"
          :value="endConversionValue"
          :setValue="newValue => endConversionValue = newValue"
          :linked="true"
        />
      </div>
      <div slot="buttons" slot-scope="props">
        <q-btn label="Annuler le changement" color="negative" @click="props.cancel" />
        <q-btn label="Valider la conversion" color="positive" @click="props.ok" />
      </div>
    </q-dialog>
  </div>
</template>

<script>
import UnitSelect from './UnitSelect'
import UnitField from './UnitField'
import * as helpers from './UnitsHelpers'

export default {
  name: 'SmartUnitField',
  data () {
    return {
      askAboutConversion: false,
      targetUnit: this.unit,
      startConversionValue: 1,
      startConversionUnit: this.unit,
      endConversionValue: 1,
      endConversionUnit: this.unit
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
        return 4
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
        return 4
      }
    },
    densities: {
      type: Object,
      default () {
        return {
          kg2lt: 1,
          kg2piece: 1,
          lt2piece: 1
        }
      }
    },
    updateDensities: {
      type: Function,
      default () {
        console.warn('updateDensities(newDensity) function not set. Density will not be saved.')
      }
    }
  },
  computed: {
    message () {
      return `L'unité va passer de ${helpers.getUnitInfos({unit: this.unit}).name} à ${helpers.getUnitInfos({unit: this.targetUnit}).name}. La conversion dépend du produit.`
    }
  },
  methods: {
    smartSetUnit (newUnit) {
      if (this.unitIsCompatible({newUnit})) {
        this.setUnit(newUnit)
      } else {
        this.targetUnit = newUnit
        this.startConversionValue = 1
        this.startConversionUnit = helpers.mainUnit({unit: this.unit}).short
        this.endConversionValue = helpers.getPhysicalSizesConversionFactor({
          startPhysicalSize: helpers.getPhysicalSize({ unit: this.unit }),
          endPhysicalSize: helpers.getPhysicalSize({ unit: newUnit }),
          densities: this.densities
        })
        this.endConversionUnit = helpers.mainUnit({unit: newUnit}).short
        this.askAboutConversion = true
      }
    },
    onCancel () {

    },
    onOk () {
      const startWeight = helpers.convert({ startValue: this.startConversionValue, startUnit: this.startConversionUnit, endUnit: this.unit })
      const endWeight = helpers.convert({ startValue: this.endConversionValue, startUnit: this.endConversionUnit, endUnit: this.targetUnit })
      const newValue = this.value * endWeight / startWeight
      const newDensity = helpers.generateDensityProp({
        startValue: this.startConversionValue,
        startUnit: this.startConversionUnit,
        endValue: this.endConversionValue,
        endUnit: this.endConversionUnit
      })
      console.log(newDensity)
      this.updateDensities({newDensity})
      this.setValue(newValue)
      this.setUnit(this.targetUnit)
    },
    onShow () {

    },
    onHide () {

    },
    unitIsCompatible ({newUnit}) {
      return helpers.getPhysicalSize({unit: newUnit}) === helpers.getPhysicalSize({unit: this.unit})
    }
  },
  components: {
    UnitSelect,
    UnitField
  }
}
</script>
