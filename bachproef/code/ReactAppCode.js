class App extends Component {
  state = {
    todos: [],
  }

  handleAddTodo = (todo) => {
    this.setState({ todos: [...this.state.todos, todo]})
  }

  render() {
    return (
      <div className="App">
        <TodoInput
          onSubmit={this.handleAddTodo}
           />
        { this.state.todos && this.state.todos.map(todo => <TodoItem key={todo} text={todo} />)}
      </div>
    );
  }
}