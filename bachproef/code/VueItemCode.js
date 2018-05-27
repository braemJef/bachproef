<template>
  <p class="todoItem">{{ todo }}</p>
</template>

<script>
export default {
  name: 'TodoItem',
  props: ['todo'],
  mounted: function() {
    window.benchmarkNext();
  },
}
</script>

<style scoped>
.todoItem {
  width: 310px;
  padding: 15px;
  background-color: white;
}
</style>