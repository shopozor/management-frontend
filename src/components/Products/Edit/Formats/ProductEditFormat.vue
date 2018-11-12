<template>
  <q-card flat inline style="width: 100%">
    <q-card-main>
      <format-description :formatId="formatId" />
      <span>format-customer-price</span>
      <format-amount :formatId="formatId" />
      <br>
      <span>toggle visibility / </span>
      <span>delete</span>
    </q-card-main>
  </q-card>
</template>

<script>
import FormatDescription from './FormatDescription'
import FormatAmount from './FormatAmount'
import FormatUISelect from './FormatUISelect'

export default {
  name: 'ProductEditFormat',
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  components: {FormatDescription, FormatAmount, FormatUISelect}
}
</script>
