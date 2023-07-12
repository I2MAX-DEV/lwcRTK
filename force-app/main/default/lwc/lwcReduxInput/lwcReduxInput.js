/****************************************************************************************
 * @filename      :
 * @projectname   : 
 * @author        : I2MAX JW.KIM
 * @date          : 2022-10-11
 * @group         :
 * @group-content :
 * @description   :
 * @reference     :
 * @release       : v1.0.0
 * @modification Log
 * ===============================================================
 * ver     date            author          description
 * ===============================================================
 * 0.1     2022-10-11      I2MAX JW.KIM    Create
 ****************************************************************************************/
import {api, LightningElement} from 'lwc';
import {Redux, debounceReduxUpdateByProperty} from 'c/lwcRtk';

export default class LwcReduxInput extends Redux(LightningElement) {
	@api useClass = '';
	@api label = '';
	@api useLabel = false;

	@api labelInline = false;
	@api propertyName = '';
	@api value = '';
	@api oldState = {};
	@api callback;
	@api isArrayState = false;
	@api arrayIndex = 0;
	@api propertyNameForIndex = '';
	@api formatter= '';
	@api step = '';
	@api min = '';
	@api debounceTime = '50';

	/** @type {'text' | 'number' | 'date' | 'checkbox'} */
	@api valueType = 'text';

	/** @type {'select' | 'input' | 'check' | 'radio'} */
	@api eventType = 'input';

	/** @type {'input' | 'combobox' | 'textarea' | 'multiCombo' | 'checkbox' | 'radioButton'} */
	@api componentType = 'input';

	@api placeHolder = '';
	@api isRequired = false;
	@api readOnly = false;
	@api disabled = false;
	@api options = [];

	@api useEnter = false;
	@api enterCallback;
	@api useSerialize = false

	// get inputTypeValue(){
	// 	return this.valueType === 'number' ? this.value === 0 && !this.isRequired ? '' : this.value : this.value;
	// }

	@api
	get element() {
		switch (this.componentType) {
			case 'input':
				return this.template.querySelector("[data-el='input']");
			case 'checkbox':
				return this.template.querySelector("[data-el='input-check']");
			case 'combobox':
				return this.template.querySelector("[data-el='combobox']");
			case 'textarea':
				return this.template.querySelector("[data-el='textarea']");
			case 'radioButton':
				return this.template.querySelector("[data-el='radio']");
			case 'multiCombo':
				return this.template.querySelector('c-fdr-multi-select-combobox');
		}
	}
	get labelVariant() {
		return this.useLabel ? (this.labelInline ? 'label-inline' : 'label-stacked') : 'label-hidden';
	}
	get isInput() {
		return this.componentType === 'input';
	}
	get isCheckBox() {
		return this.componentType === 'checkbox';
	}
	get isCombobox() {
		return this.componentType === 'combobox';
	}
	get isMultiCombobox() {
		return this.componentType === 'multiCombo';
	}
	get isTextArea() {
		return this.componentType === 'textarea';
	}
	get isRadioButton() {
		return this.componentType === 'radioButton';
	}
	get elClass(){
		return `redux-input ${this.useClass}`
	}

	// @api focusInput = () => {
	// 	if (this.isInput || this.isCheckBox) this.template.querySelector('lightning-input').focus();
	// 	else if (this.isTextArea) this.template.querySelector('lightning-textarea').focus();
	// 	else if (this.isCombobox) {
	// 		const el = this.template.querySelector('lightning-combobox');
	// 		console.log(el);
	// 		el.focus()
	// 	}
	// }

	handleEnter(event) {
		if (this.useEnter && event.keyCode === 13 && this.enterCallback) this.enterCallback();
	}

	handleChange(event) {
		let value = '';
		if (this.isMultiCombobox) value = event.detail.value;
		else if (this.isCheckBox) value = event.target.checked;
		else value = event.target.dataset.type === 'input' || event.target.dataset.type === 'radio' ? event.target.value : event.detail.value;

		if (this.valueType === 'checkbox') value = JSON.parse(value);
		if (this.valueType === 'number') value = Number(value);

		let propertyName = event.target.name;

		if(this.isArrayState){
			debounceReduxUpdateByProperty({
				value,
				propertyName,
				propertyNameForIndex: this.propertyNameForIndex,
				arrayIndex: this.arrayIndex,
				isArrayState: true,
				func: this.callback,
				oldState: this.oldState,
				useSerialize : this.useSerialize,
				time: Number(this.debounceTime)
			})
		}else{
			debounceReduxUpdateByProperty({
				value,
				propertyName,
				func: this.callback,
				oldState: this.oldState,
				useSerialize : this.useSerialize,
				time:  Number(this.debounceTime)
			});
		}
	}
}