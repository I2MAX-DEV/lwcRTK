# lwcRTK
Lightning Web Component 를 위한 상태관리 라이브러리.(https://redux-toolkit.js.org/)


## 적용배경
### 원인
 - 복잡한 화면을 LWC 구현시 유지보수를 위해 컴포넌트를 구분하는 상황에서 LWC에서 Prop Drilling 이 너무 심해지고 수많은 이벤트가 커스텀으로 생성되고 코드가 복잡해지는 경향이 있다.
 - 컴포넌트 별 데이터 기반으로 화면을 그려야하는데, 컴포넌트 별로 Data가 일관적인지 않으니, 직접적으로 HTML Element 를 조작함으로 인한 오류가 너무 많았음.
 - LWC에서 Apex 메소드 호출 하는 코드를 작성할 때, UI Layer(Presentation) 와 Data Layer(Service & Container)가 구분없이 관리되는 것을 보게됨.
 - 그로 인해 UI와 Data 가 별도로 구분되는 상태관리 라이브러리가 필요헀음.

### 결과
 -  RTK(Redux-ToolKit) 검토.
 -  배포를 용이하게 하게위해 Static Resource는 사용하지 않음.
 -  PS / FS / Production ORG 개발 및 배포를 통해 검증 완료.
 -  State(Data) 디버깅 용이.
 -  단일페이지가 아닌 복잡한 구성의 Application 단위 LWC 개발용으로 적정.

## Redux Flow
![ReduxAsyncDataFlowDiagram-d97ff38a0f4da0f327163170ccc13e80](https://github.com/I2MAX-DEV/lwcRTK/assets/17538535/14271444-7321-4069-a534-6a5cb82a9e0c)


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

## Requirement
- Org의 Session Settings > Lightning Web Security 옵션 활성화 필수
- ServerSide Rendering(Aura / VF) 가 아닌 ClientSide Rendering(LWC)에서 컴포넌트와 서버 데이터 동기화를 위해 사용하므로, LWC에서만 사용가능.

## 구현목록
- LWC - RTK state management
- 구현된 Action을 통한 state 변화시 state를 구독하고 있는 컴포넌트들은 re-rendering
- redux-toolkit을 이용한 `UI Layer(LWC)` 와 `Data Layer(Redux Store)` 분리
- state 입출력을 위한 컴포넌트 공통화
- 각 컴포넌트에서 mapStateProps 작성 및 사용을 통한 **LWC Prop Drilling**(부모 -> 자식 -> 그외 Depth Props(@api Property) 전달을 위한 행위 ex) customEvent 등록 & @api 등) 해소.
- LWC - APEX 통신을 Action화 함으로써 각 컴포넌트에서는 구현 해둔 Action을 호출. 그로 인한 불필요한 보일러 플레이트 코드 (ex ) apiService.gfnComApex ) 해소

## 미구현
- 브라우저 extension 중 redux dev tools는 사용 불가로 확인.
- reselect를 통한 memoization
- Apex caching control

## 예제 Todo List

### 예제설명.
![스크린샷 2023-07-12 오후 1 07 16](https://github.com/I2MAX-DEV/lwcRTK/assets/17538535/09bf434d-2ab2-45ee-bb05-49e709672047)


```javascript
import {api, LightningElement} from 'lwc';
import {Redux} from 'c/lwcRtk';
import {TEST_ACTIONS} from 'c/zzRtkTestAppStore';

export default class ZzRtkTestTodo extends Redux(LightningElement) {
	// LWC Component에 Store에 있는 필요한 State를 @track에 Mapping 시킨다.(readOnly & action을 통해서만 변경가능.)
	mapStateToProps(state) {
		const {
			counter: {todos}
		} = state;

		return {
			todos
		};
	}

	// state를 변화 시키거나, 비동기호출(Apex)등을 실행시키는 Action을 @track에 Mapping 시킨다.(함수)
	mapDispatchToProps() {
		return {
			addTodo: TEST_ACTIONS.addTodo,
			deleteTodo: TEST_ACTIONS.deleteTodo,
			changeTodoStatus: TEST_ACTIONS.changeTodoStatus
		};
	}

	/// mapStateToProps & mapDispatchToProps에서 불러온 것들은 LWC Component내에서 this.props에 Binding 된다.
}
```



```javascript
// store/actions/testAction.js
import {RTK} from 'c/lwcReduxLibs';
import getTodosApex from '@salesforce/apex/ZZ_TodoController.getDefaultTodos';
import addNewTodoApex from '@salesforce/apex/ZZ_TodoController.addDefaultNewTodo';
import changeStatus from '@salesforce/apex/ZZ_TodoController.changeDefaultTodoStatus';
import deleteTodoApex from '@salesforce/apex/ZZ_TodoController.deleteTodo';
import {UIUtil} from "c/comApUtil";

const {createAsyncThunk} = RTK;

// https://redux-toolkit.js.org/api/createAsyncThunk
// createAsyncThunk를 통해 비동기 처리 및 비동기 결과를 return 하여 pending/fulfilled/rejected에 대한 결과를 처리한다.
// 첫번째 인자는 해당 Action에 대한 로그 네이밍
// 두번째 인자는 콜백함수 async(param, thunkAPI)
//   param은 고차함수에 넘겨줄 파라미터 ex> Apex parameter
//   thunkAPI
//    - thunkAPI.dispatch / 내부에서 다른 Action을 호출한다.
//    - thunkAPI.rejectWithValue / 실패 처리와 함께 value를 리턴.
//    - thunkAPI.getState() / store내의 state를 불러온다.

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

// Action에 대한 대응. action의 return 에 따른 처리 ( Apex실패시 에러처리, Apex 호출시작시 Loading처리 등 )
const extraReducers = {
	[getTodos.pending]: (state, action) => {
		state.todoLoading = true;
	},
	[getTodos.fulfilled]: (state, action) => {
		state.todoLoading = true;
		state.todos = action.payload;
	},
	[getTodos.rejected]: (state, action) => {
		state.todoLoading = true;
		state.error = action.error.message;
		UIUtil.comShowToast(`[${action.payload.status} ${action.payload.statusText}] ${action.payload.error}`);
	},
	....
}

export {getTodos, addTodo, ...., extraReducers}
```
  
```javascript
// store/reducers/testReducer.js
import {RTK} from 'c/lwcReduxLibs';
import {getTodos, addTodo, deleteTodo, changeTodoStatus, extraReducers} from "../actions/testAction";

const {createSlice} = RTK;

// 관리될 state 
const initialState = {
	todos: [],
	todoLoading: false,
	todoFilter: 'All',
	status: 'idle',
	error: null
};


const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		// state에 대한 변경 처리 Action 선언  
		setTodoFilter(state, action) {
			state.todoFilter = action.payload;
		},
		reset(state) {
			Object.assign(state, initialState);
		}
	},
	extraReducers
});

const { setTodoFilter } = counterSlice.actions;

// LWC에서 사용할 수 있도록 export 
export const TEST_ACTIONS = {
	setTodoFilter,
	getTodos,
	addTodo,
	deleteTodo,
	changeTodoStatus,
	reset
};
export default counterSlice.reducer;
```

