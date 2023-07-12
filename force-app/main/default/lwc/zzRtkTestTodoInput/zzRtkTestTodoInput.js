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

export default class ZzRtkTestTodoInput extends Redux(LightningElement) {
	//============================  Property / getter, setter  ===========================
	todoInput = '';
	mapDispatchToProps() {
		return {
			addTodo: TEST_ACTIONS.addTodo,
            getTodos: TEST_ACTIONS.getTodos
		};
	}
	//============================= Function =============================================
    inputChange(event) {
        this.todoInput = event.target.value;
    }
    async handleSearchKeyUp(event) {
        if (event.keyCode === 13) await this.handleAddAction();
    }
    handleClick(event) {
        this.handleAddAction();
    }
    handleRefresh() {
        console.log('handleRefresh');
        this.props.getTodos();
    }
    async handleAddAction() {
        if (this.todoInput !== '') {
            console.log('this.todoInput : ', this.todoInput);
            await this.props.addTodo(this.todoInput);
            await this.props.getTodos()
            this.todoInput = '';
        }
    }
}