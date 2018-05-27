class TodoItem extends Component {
  componentDidMount() {
    window.benchmarkNext();
  }

  render() {
    return (
      <p className='todoItem'>{this.props.text}</p>
    );
  }
}