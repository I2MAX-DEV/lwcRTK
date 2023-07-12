# lwcRTK
Lightning Web Component 를 위한 상태관리 라이브러리.

## Development Setup
### 해당 library 가 담고 있는 source code 에 대한 설명

    ├── lwcRTK                  # LWC에서 Redux-Toolkit을 사용할 수 있도록 LWC 를 Wrapping 하는 컴포넌트 
    │   ├── lwcRTk.js           # LWC Redux Util / Reducer Combine / store Configure / logger 생성등 Root Reducer & store를 구성하는 함수 제공
    │   └── reduxElement.js     # LWC에 Redux 관련 메서드를 구성하는 Wrapping Class
    │
    ├── lwcRtkProvider          # LWC컴포넌트에서 Store에 접근하고 Store의 상태값에 반응을 위한 Wrapping Component
    ├── lwcRtkLibs              # RTK 관련 라이브러리를 export 하는 Component
    │   ├── rtk.js              # Redux-Toolkit@4.5.0 Library
    │   └── reduxLogger.js      # RTK action 에 의한  prev state / action / next state / diff 등을 표시하는 logger  
    │
    └── lwcRtkInput             # redux state에 연동하여 input / checkbox / text / combo / multi combo / radio 등의 입출력을 공통화 하는 컴포넌트.

### Requirement
- Org의 Session Settings > Lightning Web Security 옵션 활성화 필수

### 구현목록
- LWC - RTK state management
- state 변화시 re-rendering
- redux-toolkit을 이용한 UI Layer(LWC) 와 Data Layer(Redux Store) 분리
- state 입출력을 위한 컴포넌트 공통화
- 각 컴포넌트에서 mapStateProps 작성 및 사용을 통한 LWC Prop Drilling(부모 -> 자식 -> 그외 Depth Props(@api Property) 전달을 위한 행위 ex) customEvent 등록 & @api 등) 해소.
  ```javascript
      // zzRtkTestTodo.js (LWC Component)
      import {api, LightningElement} from 'lwc';
      import {Redux} from 'c/lwcRtk';
      import {TEST_ACTIONS} from 'c/zzRtkTestAppStore';
  
      export default class ZzRtkTestTodo extends Redux(LightningElement) {
        mapStateToProps(state) {
		    const {
			    counter: {todos}
		    } = state;

		    return {
			    todos
		    };
	    }

	    mapDispatchToProps() {
		    return {
			    addTodo: TEST_ACTIONS.addTodo,
			    deleteTodo: TEST_ACTIONS.deleteTodo,
			    changeTodoStatus: TEST_ACTIONS.changeTodoStatus
		    };
	    }
      }
  ```
  ```javascript

	import {RTK} from 'c/lwcReduxLibs';
	import getTodosApex from '@salesforce/apex/ZZ_TodoController.getDefaultTodos';
	import addNewTodoApex from '@salesforce/apex/ZZ_TodoController.addDefaultNewTodo';
	import changeStatus from '@salesforce/apex/ZZ_TodoController.changeDefaultTodoStatus';
	import deleteTodoApex from '@salesforce/apex/ZZ_TodoController.deleteTodo';
	import {UIUtil} from "c/comApUtil";

	const {createAsyncThunk} = RTK;

	const getTodos = createAsyncThunk('test/getPosts', async (_, thunkAPI) => {
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
        		state.todos.push(action.payload);
    		},
    		[addTodo.rejected]: (state, action) => {
       			 state.todoLoading = false;
       			 UIUtil.comShowToast(`[${action.payload.status} ${action.payload.statusText}] ${action.payload.error}`);
    		},
   		 ....
   
	}

	export {getTodos, addTodo, ...., extraReducers}
  ```
- LWC - APEX 통신을 Action화 함으로써 각 컴포넌트에서는 구현 해둔 Action을 호출. 그로 인한 불필요한 보일러 플레이트 코드 (ex ) apiService.gfnComApex ) 해소 
