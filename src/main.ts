import { TodoList } from './TodoList';

const todoList = new TodoList();
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const addTodoBtn = document.getElementById('add-todo-btn')  as HTMLButtonElement;
const todoListElement = document.getElementById('todo-list') as HTMLBaseElement;
const clearTodoBtn = document.getElementById('clear-todo-btn') as HTMLButtonElement;

const showTodos = () => {
  todoListElement.innerHTML = '';

  todoList.getTodos().forEach(todo => {
    const todoItemLi = document.createElement('li'); //Gör en li för varje todo
    const todoItemElement = document.createElement('span');
    todoItemElement.textContent = todo.text;

    // "gjorda" todos
    if (todo.completed) {
      todoItemLi.classList.add('completed'); // lägger till completed klass för att visa vilka som är klara
    }

    todoItemLi.addEventListener('click', () => { // Togglar "completed"
      todoList.toggleTodoCompleted(todo.id);
      showTodos();
    });

    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = '🗑️'; // Papperskörg
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Hindrar andra klickevents
      todoList.removeTodo(todo.id);
      showTodos();
    });

    // Due date!!-------------------------------------------------------------------------------------------------------
    const dueDateBtn = document.createElement('button');
    dueDateBtn.classList.add('due-date-btn');

    // Kollar om den har ett due date och visar det
    if (todo.dueDate) {
      const formattedDate = new Date(todo.dueDate).toLocaleDateString("sv-SE");
      dueDateBtn.textContent = formattedDate; // Visar datum
      dueDateBtn.classList.add('date-selected');
    } else {
      dueDateBtn.textContent = '📅';
      dueDateBtn.classList.remove('date-selected');
    }

    // Tar fram kalendern och döljer
    const dueDatePicker = document.createElement('input');
    dueDatePicker.setAttribute('type', 'datetime-local');
    dueDatePicker.classList.add('datetime-picker');
    dueDatePicker.style.display = 'none'; 

    // Visar kalendern när man klickar på kalenderikonen
    dueDateBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dueDatePicker.style.display = 'block';
    });

    //Visar valt datum
    dueDatePicker.addEventListener('change', function() {
      if (this.value) {
        const formattedDate = new Date(this.value).toLocaleDateString("sv-SE");
        dueDateBtn.textContent = formattedDate; 
        dueDateBtn.classList.add('date-selected');

        todoList.updateTodoDueDate(todo.id, new Date(this.value));

        this.style.display = 'none';
        showTodos(); 
      }
    });

    dueDatePicker.addEventListener('click', (e) => {
      e.stopPropagation(); // Hindrar att andra klicks registreras som man inte vill, typ för completed tex
    });

 // Due date!!--------------------------------------------------------------------------------------------------------------------


    todoItemLi.appendChild(todoItemElement);
    todoItemLi.appendChild(dueDatePicker);
    todoItemLi.appendChild(dueDateBtn);
    todoItemLi.appendChild(removeBtn);
    todoListElement.appendChild(todoItemLi);
  });
};


addTodoBtn.addEventListener('click', () => {
  if (todoInput.value) {
    todoList.addTodo(todoInput.value); //lägger till todo
    todoInput.value = ''; // Tömmer inputfältet
    showTodos();
}});


clearTodoBtn.addEventListener('click', () => {
todoList.clearTodos(); //Tar bort alla todos
showTodos();
});


showTodos();




