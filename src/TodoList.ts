// TodoList.ts
import { TodoItem } from './TodoItem';

export class TodoList {
  private todos: TodoItem[] = [];

  addTodo(text: string): void {
    const todo: TodoItem = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    this.todos.push(todo);
  }

  removeTodo(id: string): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleTodoCompleted(id: string): void {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }

  clearTodos(): void {
    this.todos = [];
  }

  getTodos(): TodoItem[] {
    return this.todos;
  }

  updateTodoDueDate(id: string, dueDate: Date | string): void {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, dueDate } : todo
    );
  }
}
