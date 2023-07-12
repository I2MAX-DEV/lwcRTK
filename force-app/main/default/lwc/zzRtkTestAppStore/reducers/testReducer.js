import {RTK} from 'c/lwcReduxLibs';
import {getTodos, addTodo, deleteTodo, changeTodoStatus, extraReducers} from "../actions/testAction";

const {createSlice} = RTK;

const initialState = {
	value: 0,
	todos: [],
	todoLoading: false,
	todoFilter: 'All',
	status: 'idle',
	error: null
};

const counterSlice = createSlice({
	name: 'test',
	initialState,
	reducers: {
		increment(state) {
			state.value++;
		},
		decrement(state) {
			state.value--;
		},
		incrementByAmount(state, action) {
			state.value += action.payload;
		},
		setTodoFilter(state, action) {
			state.todoFilter = action.payload;
		}
	},
	extraReducers
});
const { setTodoFilter } = counterSlice.actions;
export const TEST_ACTIONS = {
	setTodoFilter,
	getTodos,
	addTodo,
	deleteTodo,
	changeTodoStatus
};
export default counterSlice.reducer;