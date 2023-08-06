
/****************************************************************************************
 * @filename      : LwcReduxProvider
 * @projectname   : SSDS-공통
 * @author        : I2MAX
 * @date          : 2022-07-28
 * @group         :
 * @group-content :
 * @description   :
 * @reference     :
 * @release       : v1.0.0
 * @modification Log
 * ===============================================================
 * ver     date            author          description
 * ===============================================================
 0.1     2022-07-28      I2MAX           Create
 ****************************************************************************************/
import {LightningElement, api, track} from 'lwc';

export default class LwcReduxProvider extends LightningElement {
	@api _store;
	@track loadCompleted = false;
	@api
	get store() {
		return this._store;
	}
	set store(value) {
		if (value) this._store = value;
	}
	async connectedCallback() {
		try {
			this.template.addEventListener('lwcredux__getstore', this.handleGetStore.bind(this));
			this.dispatchEvent(new CustomEvent('init'));

			setTimeout(() => (this.loadCompleted = true));
		} catch (error) {
			console.error(error);
		}
	}
	handleGetStore(event) {
		try {
			event.stopPropagation();
			let callback = event.detail;
			callback(this._store);
		} catch (error) {
			console.error(error);
		}
	}
	getStore() {
		return this._store;
	}
}