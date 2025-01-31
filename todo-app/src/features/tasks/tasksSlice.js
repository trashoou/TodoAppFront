import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

import { BASE_URL } from '../../utils/constants';

export const getTasks = createAsyncThunk(
    'tasks/getTasks',
    async (_, thunkApi) => {
        try {
            const res = await axios(`${BASE_URL}/tasks`);
            return res.data;
        } catch(err) {
            console.log(err);
            return thunkApi.rejectWithValue(err);
        }
    }
);

// Добавление новой задачи
export const addTask = createAsyncThunk('tasks/addTask', async (task, thunkApi) => {
    try {
        const res = await axios.post(`${BASE_URL}/tasks`, { name: task });
        return res.data;
    } catch (err) {
        console.error(err);
        return thunkApi.rejectWithValue(err.response.data);
    }
});

// Удаление задачи
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id, thunkApi) => {
    try {
        await axios.delete(`${BASE_URL}/tasks/${id}`);
        return id;
    } catch (err) {
        console.error(err);
        return thunkApi.rejectWithValue(err.response.data);
    }
});


// Обновление задачи (изменение названия)
export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, name }, thunkApi) => {
    try {
        // Проверь, что id и name действительно передаются в запрос
        if (!id || !name) {
            throw new Error('ID or name is missing');
        }
        const res = await axios.put(`${BASE_URL}/tasks/${id}`, { name });
        return res.data;
    } catch (err) {
        console.error('Error updating task:', err);
        return thunkApi.rejectWithValue(err.response ? err.response.data : err.message);
    }
});


// Изменение статуса задачи (completed)
export const toggleTaskCompletion = createAsyncThunk(
    'tasks/toggleTaskCompletion',
    async ({ id, completed, name }, thunkApi) => {
        try {
            // Возможно, придется отправить запрос на сервер для сохранения изменений.
            const res = await axios.put(`${BASE_URL}/tasks/${id}`, { completed, name });
            return res.data;
        } catch (err) {
            console.error(err);
            return thunkApi.rejectWithValue(err.response.data);
        }
    }
);


// Создаем Slice
const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex((task) => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(toggleTaskCompletion.fulfilled, (state, action) => {
                const index = state.tasks.findIndex((task) => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index].completed = action.payload.completed;
                }
            });
    }
    
});

export default tasksSlice.reducer;