interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// We need an interface to declare the State
interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

// And same for the Action, here we using types instead of an interface
export type TaskAction =
  | { type: 'ADD_TODO', payload: string }
  | { type: 'TOGGLE_TODO', payload: number }
  | { type: 'DELETE_TODO', payload: number };

export const getTasksInitialState = (): TaskState => {

  const localStorageState = localStorage.getItem('tasksstates')

  if (!localStorageState) {
    return {
      todos: [],
      length: 0,
      completed: 0,
      pending: 0
    }
  }

  return JSON.parse(localStorageState);
}

// A reducer is a pure function, it receives a state and and action and we return a new state.
// we won't modify the original, we create a new one
export const tasksReducer = (state: TaskState, action: TaskAction): TaskState => {

  switch (action.type) {
    case "ADD_TODO": {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload.trim(),
        completed: false
      };

      // ! We should not do this, we are muting the state and we need to return
      // ! a new state
      // state.todos.push(newTodo)

      return {
        ...state,
        todos: [...state.todos, newTodo],
        length: state.todos.length + 1,
        pending: state.pending + 1
      };
    }

    case "DELETE_TODO": {
      const currentTodos = state.todos.filter((todo) => todo.id !== action.payload);

      const completedTodos = currentTodos.filter(todo => todo.completed).length;

      return {
        ...state,
        todos: currentTodos,
        length: currentTodos.length,
        completed: completedTodos,
        pending: currentTodos.length - completedTodos,
      };
    }

    case "TOGGLE_TODO": {
      const updatedTodos = state.todos.map(todo => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

      const completedTodos = updatedTodos.filter(todo => todo.completed).length;

      return {
        ...state,
        todos: updatedTodos,
        completed: completedTodos,
        pending: updatedTodos.length - completedTodos
      };
    }

    default:
      return state
  }
}