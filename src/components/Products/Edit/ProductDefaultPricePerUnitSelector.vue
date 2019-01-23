<template>
  <div>
    <div class="row justify-center items-center">
      <price-input
        :customerPrice="defaultCustomerPrice"
        :setCustomerPrice="setDefaultCustomerPrice"
        :producerRatio="0.85"
        customer
        producer
        width="220px" />
      <div class="row no-wrap items-center">
        <div class="q-ml-md q-mr-lg"> par </div>
        <unit-select
          :unit="defaultUnit"
          :setUnit="setDefaultUnit"
          filter="all"
          withPriceReferenceQuantities
          width="100px" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import PriceInput from '../../Price/PriceInput'
import UnitSelect from '../../Units/UnitSelect'
import types from 'src/types'

export default {
  name: 'DefaultPricePerUnitSelector',
  computed: {
    ...mapGetters(['editedProduct']),
    defaultCustomerPrice () {
      console.log(this.editedProduct)
      if (!this.editedProduct.defaultCustomerPrice) this.setDefaultCustomerPrice(0)
      return this.editedProduct.defaultCustomerPrice
    },
    defaultUnit () {
      if (!this.editedProduct.defaultUnit) this.setDefaultUnit(types.units.mass.KG)
      return this.editedProduct.defaultUnit
    }
  },
  methods: {
    ...mapActions(['updateEditedProduct']),
    setDefaultCustomerPrice (value) {
      this.updateEditedProduct({ defaultCustomerPrice: value })
    },
    setDefaultUnit (value) {
      this.updateEditedProduct({ defaultUnit: value })
    }
  },
  components: {PriceInput, UnitSelect}
}
</script>
