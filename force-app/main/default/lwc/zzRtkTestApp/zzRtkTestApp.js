/****************************************************************************************
 * @filename      : 
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
//============================  Property / getter, setter  ===========================

//============================  @wire  ===============================================

//============================= Function =============================================

//============================= lifecycle ============================================
import {api, LightningElement} from 'lwc';
import {combineReducers, createLogger, configureStore} from 'c/lwcRtk';
import {reducers} from 'c/zzRtkTestAppStore'

export default class ZzRtkTestApp extends LightningElement {
	@api store;
	isSandBox = false;
	isReadyStore = false;

	async initialize() {
		let logger;
		// this.isSandBox = await getIsSandBox();
		// console.log('Environment : ', this.isSandBox ? 'SandBox' : 'Production');

		// if (this.isSandBox) {
		logger = createLogger({
			duration: true,
			diff: true,
			collapsed: true
		});
		// }
		const combineReducersInstance = combineReducers(reducers);
		this.store = configureStore(combineReducersInstance, logger);
		this.isReadyStore = true;
	}
}