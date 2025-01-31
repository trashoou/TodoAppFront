import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const Todo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className='Todo'>
        <p 
        onClick={() => toggleComplete(task.id, task.completed, task.name)} 
        className={`${task.completed ? 'completed' : ""}`}
        >
          {task.name}
        </p>
        <div>
            {/* Иконка редактирования */}
            <FontAwesomeIcon 
                icon={faPenToSquare} 
                onClick={() => editTodo(task)} // Передаем задачу в редактирование
            />
            {/* Иконка удаления */}
            <FontAwesomeIcon 
                icon={faTrash} 
                onClick={() => deleteTodo(task.id)} 
            />
        </div>
    </div>
  );
};
