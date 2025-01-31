import React, {useState} from 'react'

export const EditTodoForm = ({ editTodo, task, setEditingTask }) => {
  const [value, setValue] = useState(task.name); // Храним значение, которое редактируем

  const handleSubmit = (e) => {
      e.preventDefault();
      if (value.trim()) {
          editTodo({ ...task, name: value }); // Отправляем изменённые данные
          setValue("");
          setEditingTask(null);
      } else {
          console.error('Task name cannot be empty');
      }
  };

  return (
      <form className='TodoForm' onSubmit={handleSubmit}>
          <input
              type="text"
              className='todo-input'
              value={value}
              placeholder='Update Task'
              onChange={(e) => setValue(e.target.value)}
          />
          <button type='submit' className='todo-btn'>
              Update Task
          </button>
      </form>
  );
};
