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
import {api, LightningElement} from 'lwc';
import {Redux} from 'c/lwcRtk';
import {TEST_ACTIONS} from 'c/zzRtkTestAppStore';

export default class ZzRtkTestTodo extends Redux(LightningElement) {
	@api record;
	//============================  Property / getter, setter  ===========================
	STATUS = {
		COMPLETED: 'Completed',
		INCOMPLETE: 'Incomplete',
		INPROGRESS: 'Inprogress'
	};

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
			changeTodoStatus: TEST_ACTIONS.changeTodoStatus,
			getTodos: TEST_ACTIONS.getTodos
		};
	}

	//============================= Function =============================================
	async handleStatusChange(event) {
		await this.props.changeTodoStatus({recordId: this.record.Id, status: event.target.value});
		await this.props.getTodos();
	}
	async handleDelete(event) {
		await this.props.deleteTodo(this.record.Id);
		await this.props.getTodos();
	}

	get hasRecord() {
		return this.record;
	}
	get bodyClass() {
		let strClass = 'slds-var-m-bottom_medium ';
		if (this.record.Status__c === this.STATUS.INCOMPLETE) strClass += 'incomplete';
		else if (this.record.Status__c === this.STATUS.INPROGRESS) strClass += 'inprogress';
		else if (this.record.Status__c === this.STATUS.COMPLETED) strClass += 'completed';
		return strClass;
	}

	get isCompleted() {
		return this.record.Status__c === this.STATUS.COMPLETED;
	}

	//============================= lifecycle ============================================
}