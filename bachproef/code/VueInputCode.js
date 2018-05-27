<template>
  <input
    class="new-todo"
    @keydown.enter=addTodoItem
    v-model=nameNewTodo
    placeholder="Write your todo here..."
    autofocus
    name="todoInput" />
</template>

<script>
export default {
  name: 'AddTodoItemInput',
  data () {
    return {
      nameNewTodo: ''
    }
  },
  methods: {
    addTodoItem () {
      this.$emit('createdTodo', this.nameNewTodo)
      this.nameNewTodo = ''
    }
  }
}
</script>

<style scoped>
.new-todo {
  width: 300px;
  outline: none;
  border: none;
  padding: 20px;
  margin-top: 20px;
  font-size: 24px;
  box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.7);
}
</style>
