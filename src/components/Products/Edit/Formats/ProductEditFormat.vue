<template>
  <div>
    <span>description / </span>
    <span>prix / </span>
    <span>stock / </span>
    <span>commandes</span>
    <br>
    <span>toggle interface / </span>
    <span>toggle visibility / </span>
    <span>delete</span>
  </div>
</template>

<script>
export default {
  name: 'ProductEditFormat',
  props: {
    formatId: {
      type: String,
      required: true
    }
  }
}
</script>
