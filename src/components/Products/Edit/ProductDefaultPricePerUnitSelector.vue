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
import {mapGetters, mapMutations} from 'vuex'
import PriceInput from '../../Price/PriceInput'
import UnitSelect from '../../Units/UnitSelect'
// import { defaultUnit } from '../../Units/UnitsHelpers';

export default {
  name: 'DefaultPricePerUnitSelector',
  computed: {
    ...mapGetters(['editedProduct']),
    defaultCustomerPrice () { return this.editedProduct.defaultCustomerPrice },
    defaultUnit () { return this.editedProduct.defaultUnit }
  },
  methods: {
    ...mapMutations(['updateEditedProduct']),
    setDefaultCustomerPrice (value) {
      this.updateEditedProduct({ defaultCustomerPrice: value })
      console.log(this.defaultCustomerPrice, this.defaultUnit)
    },
    setDefaultUnit (value) {
      this.updateEditedProduct({ defaultUnit: value })
    }
  },
  components: {PriceInput, UnitSelect}
}
</script>
