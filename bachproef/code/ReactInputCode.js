class TodoInput extends Component {
  state = {
    todo: '',
  }

  handleChange = (event) => {
    this.setState({ todo: event.target.value });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.props.onSubmit(this.state.todo);
      this.setState({ todo: '' });
    }
  }

  render() {
    return (
      <input
        className='todoInput new-todo'
        placeholder='Write your todo here...'
        onInput={this.handleChange}
        onKeyDown={this.handleKeyPress}
        value={this.state.todo} />
    );
  }
}