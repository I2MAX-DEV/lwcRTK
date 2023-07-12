import {RTK} from 'c/lwcReduxLibs';
import getTodosApex from '@salesforce/apex/ZZ_TodoController.getDefaultTodos';
import addNewTodoApex from '@salesforce/apex/ZZ_TodoController.addDefaultNewTodo';
import changeStatus from '@salesforce/apex/ZZ_TodoController.changeDefaultTodoStatus';
import deleteTodoApex from '@salesforce/apex/ZZ_TodoController.deleteTodo';
import {UIUtil} from "c/comApUtil";

const {createAsyncThunk} = RTK;

const getTodos = createAsyncThunk('test/getPosts', async (_, thunkAPI) => {
    console.log('getState : ', JSON.parse(JSON.stringify(thunkAPI.getState())))
    try {
        return await getTodosApex();
    } catch (err) {
        return thunkAPI.rejectWithValue({error: err.body.message, status: err.status, statusText: err.statusText});
    }
});

const addTodo = createAsyncThunk('test/addTodo', async (content, thunkAPI) => {
    try {
        return await addNewTodoApex({content});
    } catch (err) {
        return thunkAPI.rejectWithValue({error: err.body.message, status: err.status, statusText: err.statusText});
    }
});

const deleteTodo = createAsyncThunk('test/deleteTodo', async (recordId, thunkAPI) => {
    try {
        return await deleteTodoApex({recordId});
    } catch (err) {
        return thunkAPI.rejectWithValue({error: err.body.message, status: err.status, statusText: err.statusText});
    }
});

const changeTodoStatus = createAsyncThunk('test/updateTodo', async ({recordId = '', status = ''}, thunkAPI) => {
    try {
        return await changeStatus({recordId, status});
    } catch (err) {
        return thunkAPI.rejectWithValue({error: err.body.message, status: err.status, statusText: err.statusText});
    }
});


const extraReducers = {
    [getTodos.pending]: (state, action) => {
        state.todoLoading = true;
    },
    [getTodos.fulfilled]: (state, action) => {
        console.log(action);
        state.todoLoading = false;
        state.todos = action.payload;
    },
    [getTodos.rejected]: (state, action) => {
        state.todoLoading = false;
        state.error = action.error.message;
        UIUtil.comShowToast(`[${action.payload.status} ${action.payload.statusText}] ${action.payload.error}`);
    },

    [addTodo.pending]: (state, action) => {
        state.todoLoading = true;
    },
    [addTodo.fulfilled]: (state, action) => {
        state.todoLoading = false;
    },
    [addTodo.rejected]: (state, action) => {
        state.todoLoading = false;
        UIUtil.comShowToast(`[${action.payload.status} ${action.payload.statusText}] ${action.payload.error}`);
    },

    [changeTodoStatus.pending]: (state, action) => {
        state.todoLoading = true;
    },
    [changeTodoStatus.fulfilled]: (state, action) => {
        state.todoLoading = false;
    },
    [changeTodoStatus.rejected]: (state, action) => {
        state.todoLoading = false;
        UIUtil.comShowToast(`[${action.payload.status} ${action.payload.statusText}] ${action.payload.error}`);
    },

    [deleteTodo.pending]: (state, action) => {
        state.todoLoading = true;
    },
    [deleteTodo.fulfilled]: (state, action) => {
        state.todoLoading = false;
    },
    [deleteTodo.rejected]: (state, action) => {
        state.todoLoading = false;
        UIUtil.comShowToast(`[${action.payload.status} ${action.payload.statusText}] ${action.payload.error}`);
    }
}

export {getTodos, addTodo, deleteTodo, changeTodoStatus, extraReducers}