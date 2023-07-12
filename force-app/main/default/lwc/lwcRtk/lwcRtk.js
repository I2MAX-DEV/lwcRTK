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
import ReduxElement from './reduxElement';
import {registerListener, unregisterAllListeners} from './reduxHandler';
import {reduxLogger, RTK} from 'c/lwcReduxLibs';

export const combineReducers = (reducers) => {
    try {
        return RTK.combineReducers(reducers);
    } catch (error) {
        console.error(error);
    }
};

export const configureStore = (reducer, logger) => {
    try {
        const middlewares = [];
        if (logger) middlewares.push(logger);

        return RTK.configureStore({
            reducer,
            middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares)
        });
    } catch (error) {
        console.error(error);
    }
};

export const createLogger = (logger = initialLogger) => {
    try {
        logger = {...initialLogger, ...logger};
        return reduxLogger.createLogger(logger);
    } catch (error) {
        console.error(error);
    }
};

export const bindActionCreators = (actions, dispatch) => {
    try {
        return RTK.bindActionCreators(actions, dispatch);
    } catch (error) {
        console.error(error);
    }
};

const getStore = (thisArg, callback) => {
    try {
        const eventStore = new CustomEvent('lwc_rtk__getstore', {
            bubbles: true,
            composed: true,
            detail: (store) => callback(store)
        });
        if (eventStore) thisArg.dispatchEvent(eventStore);
    } catch (error) {
        console.error(error);
    }
};

export const Redux = (Superclass = Object) => ReduxElement;

const initialLogger = {
    level: 'log',
    logger: console,
    logErrors: true,
    collapsed: undefined,
    predicate: undefined,
    duration: false, // By default, duration is false
    timestamp: true,
    stateTransformer: (state) => JSON.parse(JSON.stringify(state)),
    actionTransformer: (action) => JSON.parse(JSON.stringify(action)),
    errorTransformer: (error) => JSON.parse(JSON.stringify(error)),
    colors: {
        title: () => 'inherit',
        prevState: () => '#9E9E9E',
        action: () => '#03A9F4',
        nextState: () => '#4CAF50',
        error: () => '#F20404'
    },
    diff: false, // By default, diff is false
    diffPredicate: undefined
};

/**
 * @param {any} values
 * @returns {string}
 */
const serialize = (values) => JSON.stringify(values);

/**
 * @param {string} values
 * @returns {any}
 */
const deSerialize = (values) => JSON.parse(values);

const hasStringValue = (value) => {
    return !!value?.trim();
};

const debounceReduxActionUpdateState = function ({newState, func, useSerialize = false, time = 50}) {
    window.clearTimeout(this.delayTimeout);
    this.delayTimeout = setTimeout(() => {
        const state = useSerialize ? serialize(newState) : newState;
        func(state);
    }, time);
};

const debounceReduxUpdateByProperty = function ({
                                                    value = '',
                                                    propertyName = '',
                                                    func,
                                                    oldState,
                                                    useSerialize = true,
                                                    isArrayState = false,
                                                    arrayIndex = 0,
                                                    propertyNameForIndex = '',
                                                    time = 50
                                                }) {
    window.clearTimeout(this.delayTimeout);
    this.delayTimeout = setTimeout(() => {
        if (isArrayState) {
            let state = JSON.parse(JSON.stringify(oldState));
            state[arrayIndex][propertyNameForIndex] = value;
            state = useSerialize ? serialize(state) : state;
            func(state);
        } else {
            if (hasStringValue(propertyName)) {
                const state = useSerialize
                    ? serialize({
                        ...oldState,
                        [propertyName]: value
                    })
                    : {
                        ...oldState,
                        [propertyName]: value
                    };
                func(state);
            }
        }
    }, time);
};

const deepClone = (value) => {
    return JSON.parse(JSON.stringify(value));
};

export {
    ReduxElement,
    registerListener,
    unregisterAllListeners,
    deepClone,
    serialize,
    deSerialize,
    debounceReduxUpdateByProperty,
    debounceReduxActionUpdateState
};