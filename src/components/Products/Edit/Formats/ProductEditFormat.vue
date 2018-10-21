<template>
  <div>
    <format-description :formatId="formatId" />
    <format-amount :formatId="formatId" />
    <span>stock / </span>
    <span>commandes</span>
    <br>
    <span>toggle interface / </span>
    <span>toggle visibility / </span>
    <span>delete</span>
  </div>
</template>

<script>
import FormatDescription from './FormatDescription'
import FormatAmount from './FormatAmount'

export default {
  name: 'ProductEditFormat',
  props: {
    formatId: {
      type: String,
      required: true
    }
  },
  components: {FormatDescription, FormatAmount}
}
</script>
