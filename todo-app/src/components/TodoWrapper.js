import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TodoForm } from './TodoForm'
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import { getTasks,addTask,deleteTask,updateTask, toggleTaskCompletion } from '../features/tasks/tasksSlice';

export const TodoWrapper = () => {
    const dispatch = useDispatch();
    const { tasks, loading } = useSelector((state) => state.tasks);
    const [editingTask, setEditingTask] = useState(null); // Храним текущую редактируемую задачу

    useEffect(() => {
        dispatch(getTasks());
    },[dispatch]);

    console.log(tasks);

    const handleAddTask = (task) => {
        dispatch(addTask(task));
    };

    const handleEditClick = (task) => {
        setEditingTask(task); // Устанавливаем задачу, которую будем редактировать
    };

    const handleDeleteTask = (id) => {
        dispatch(deleteTask(id));
    };



    const handleUpdateTask = (task, id) => {
        console.log("handleUpdateTask - task:", task); // Логируем перед dispatch
        if (task && task.id && task.name) {
            dispatch(updateTask({ id: task.id, name: task.name }));
        } else {
            console.error('Invalid task data');
        }
    };
    

    const handleToggleComplete = (id, completed, name) => {
        dispatch(toggleTaskCompletion({ id, completed: !completed, name }));
    };
    
    

  return (
    
    
    <div className='TodoWrapper'>
        
        <h1>Input new task!</h1>
        <TodoForm addTodo={handleAddTask}/>
        {loading ? (
            <p>Loading...</p>
        ): (
            tasks.map((task) =>
            task.id === editingTask?.id ? (
                <EditTodoForm 
                    editTodo={handleUpdateTask}
                    task={task}
                    key ={task.id}
                    setEditingTask={setEditingTask}
                    />
            ) : (
                <Todo
                    task={task}
                    key={task.id}
                    deleteTodo={handleDeleteTask}
                    editTodo={handleEditClick}
                    toggleComplete={handleToggleComplete}
                />
            ))
        )}
        
    </div>
  );
};
