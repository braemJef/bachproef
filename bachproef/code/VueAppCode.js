<template>
  <div>
    <AddTodoItemInput
      @createdTodo=addNewTodo />
    <section id="main">
      <TodoList
        :todos=todos />
    </section>
  </div>
</template>

<script>
import TodoList from './TodoList'
import AddTodoItemInput from './AddTodoItemInput'

export default {
  name: 'TodoApp',
  data () {
    return {
      todos: []
    }
  },
  methods: {
    addNewTodo(todo) {
      this.todos.push(todo)
    }
  },
  components: {
    TodoList,
    AddTodoItemInput,
  }
}
</script>
