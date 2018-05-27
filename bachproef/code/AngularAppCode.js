@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Array<string> = [];

  constructor() { }

  addTodo(newTodo) {
		if (newTodo.value.trim().length) {
      this.todos.push(newTodo.value);
      newTodo.value = '';
		}
  }
}