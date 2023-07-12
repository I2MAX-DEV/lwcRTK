/****************************************************************************************
 * @filename      : ZzRtkTestTodo
 * @projectname   : 
 * @author        : I2MAX JW.KIM
 * @date          : 2023-04-13
 * @group         :
 * @group-content :
 * @description   :
 * @reference     :
 * @release       : v1.0.0
 * @modification Log
 * ===============================================================
 * ver     date            author              description
 * ===============================================================
 * 0.1     2023-04-13      I2MAX JW.KIM        Create
 ****************************************************************************************/
import {LightningElement} from 'lwc';
import {Redux} from 'c/lwcRtk';
import {TEST_ACTIONS} from 'c/zzRtkTestAppStore';
export default class ZzRtkTestView extends Redux(LightningElement) {
	//============================= lifecycle ============================================
	connectedCallback() {
		super.connectedCallback();
		console.log('test view connectedCallback');
		console.log('test value : ', this.props.value);
		this.props.getTodos();
	}

	//============================  Property / getter, setter  ===========================
	VISIBILITY_FILTER = {
		ALL: 'All',
		COMPLETED: 'Completed',
		INCOMPLETE: 'Incomplete',
		INPROGRESS: 'Inprogress'
	};

	mapStateToProps(state) {
		const {
			counter: {value, todos, todoFilter, todoLoading}
		} = state;

		return {
			value,
			todos,
			todoFilter,
			todoLoading
		};
	}

	mapDispatchToProps() {
		return {
			// increment: TEST_ACTIONS.increment,
			// decrement: TEST_ACTIONS.decrement,
			// incrementByAmount: TEST_ACTIONS.incrementByAmount,
			getTodos: TEST_ACTIONS.getTodos,
			setTodoFilter: TEST_ACTIONS.setTodoFilter
		};
	}

	get hasTodos() {
		return this.props && this.props.todos.length > 0;
	}

	get filterTodos() {
		if (this.props.todoFilter === this.VISIBILITY_FILTER.ALL) {
			return this.props.todos;
		} else {
			return this.props.todos.filter((todo) => todo.Status__c === this.props.todoFilter);
		}
	}
	get filterOption() {
		return [
			{label: this.VISIBILITY_FILTER.ALL, value: this.VISIBILITY_FILTER.ALL},
			{label: this.VISIBILITY_FILTER.COMPLETED, value: this.VISIBILITY_FILTER.COMPLETED},
			{label: this.VISIBILITY_FILTER.INCOMPLETE, value: this.VISIBILITY_FILTER.INCOMPLETE},
			{label: this.VISIBILITY_FILTER.INPROGRESS, value: this.VISIBILITY_FILTER.INPROGRESS}
		];
	}

	//============================= Function =============================================
	handleChangeFilter(event) {
		this.props.setTodoFilter(event.target.value);
	}
}