@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [ WindowRef ],
})
export class TodoComponent implements AfterViewInit {
  @Input() todo: string;

  window = null;

	constructor(winRef: WindowRef) {
		this.window = winRef.nativeWindow;
  }

  ngAfterViewInit() {
		this.window.benchmarkNext();
	}
}