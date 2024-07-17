interface todoItem {
  id: number,
  title: string ,
  status: boolean,
  //description: string,
}

type filter = "Todo" | "Done" | "All" ;

interface state {
  index: number;
  ToDoItems: ReadonlyArray<todoItem>;
  selectedFilter: filter;
}
class TodoList {
  private state: state;

  constructor() {
    this.state = {
      index: 0,
      ToDoItems: [],
      selectedFilter: "All",
    };
  }

  public getTodos(): ReadonlyArray<todoItem> {
    return this.state.ToDoItems;
  }

  public addTodo(title: string): void {
    const newTodo: todoItem = {
      id: this.state.index + 1,
      title,
      status: false,
    };
    this.state = {
      ...this.state,
      index: this.state.iastIndex + 1,
      ToDoItems: [...this.state.ToDoItems, newTodo],
    };
  }

  public getFilteredTodos(filter: filter): ReadonlyArray<todoItem> {
    return this.state.ToDoItems.filter((task) => {
      switch (filter) {
        case "Done":
          return task.status;
        case "Todo":
          return !task.status;
        case "All":
        default:
          return true;
      }
    });
  }

  public removeTodoById(id: number): void {
    this.state = {
      ...this.state,
      ToDoItems: this.state.ToDoItems.filter((task) => task.id !== id),
    };
  }

  public toggleTodoStatus(id: number): void {
    this.state = {
      ...this.state,
      ToDoItems: this.state.ToDoItems.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      ),
    };
  }

  public searchTodos(searchTerm: string): ReadonlyArray<todoItem> {
    return this.state.ToDoItems.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}

const todoList = new TodoList();

todoList.addTodo("Finish Rahnema exercises");
todoList.addTodo("Do your taks from work");
todoList.addTodo("Study English");

console.log("All Todos:");
console.log(todoList.getTodos());

console.log("Filtered Todos (done):");
console.log(todoList.getFilteredTodos("Done"));

console.log("Filtered Todos (Todo):");
console.log(todoList.getFilteredTodos("Todo"));

console.log("Search Todos (Get):");
console.log(todoList.searchTodos("Get"));

todoList.toggleTodoStatus(1);
console.log("Todos after toggling status of ID 1:");
console.log(todoList.getTodos());

todoList.removeTodoById(2);
console.log("Todos after removing ID 2:");
console.log(todoList.getTodos());
