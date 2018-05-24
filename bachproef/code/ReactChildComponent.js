class Parent extends React.Component {
	render() {
		return (
		  <Child value={'This is a message from the parent component.'} />
		);
	}
}

function Child(props) {
	return (
	<p>{props.value}</p> // => <p>This is a message from the parent component.</p>
	);
}