const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

const CAKE_ORDER = 'CAKE_ORDER'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDER = 'ICECREAM_ORDER'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

const orderCake = () => {
    return {
        type: 'CAKE_ORDER',
        payload: 1
    }
}

const restockCake = (qty = 1) => {
    return {
        type: 'CAKE_RESTOCKED',
        payload: qty
    }
}

const iceCreamOrder = (qty = 1) => {
    return {
        type: 'ICECREAM_ORDER',
        payload: qty
    }
}

const restockedIceCream = (qty = 1) => {
    return {
        type: 'ICECREAM_RESTOCKED',
        payload: qty
    }
}

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCream: 20
}

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDER:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes:  state.numOfCakes + action.payload
            }
        default:
            return state;
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
        case ICECREAM_ORDER:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream - action.payload
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream + action.payload
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial state : ', store.getState())
const unsubscribe = store.subscribe(() => {})

const actions = bindActionCreators({orderCake, restockCake, iceCreamOrder, restockedIceCream}, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.restockCake(2)
actions.iceCreamOrder(1)
actions.iceCreamOrder(1)
actions.restockedIceCream(2)

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(1))

unsubscribe()