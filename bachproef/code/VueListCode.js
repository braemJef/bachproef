<template>
  <ul class="todo-list">
    <TodoItem
      v-for="(todo, idx) in todos"
      :key=idx
      :todo=todo />
  </ul>
</template>

<script>
import TodoItem from './TodoItem'

export default {
  name: 'TodoList',
  props: ['todos'],
  components: {
    TodoItem
  }
}
</script>

<style>
.todo-list {
	margin: 0;
	padding: 0;
	list-style: none;
}
</style>

