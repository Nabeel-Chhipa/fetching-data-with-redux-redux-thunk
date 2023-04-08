const redux = require('redux')
const produce = require('immer').produce
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const bindActionCreator = redux.bindActionCreators
const combineReducers = redux.combineReducers
const logger = reduxLogger.createLogger()

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

function orderIceCream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function restockedIceCream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

const initialCakeState = {
    numOfCakes: 10,
}

const initialIceCreamState = {
    numOfIceCreams: 20
}

const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        case CAKE_RESTOCKED:
            // return {
            //     ...state,
            //     numOfCakes: state.numOfCakes + action.payload
            // }
            return produce(state, (draft) => {
                draft.numOfCakes = state.numOfCakes + action.payload
            })
        default:
            return state
    }
}
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        case ICECREAM_RESTOCKED:
            // return {
            //     ...state,
            //     numOfIceCreams: state.numOfIceCreams + action.payload
            // }
            return produce(state, (draft) => {
                draft.numOfIceCreams = state.numOfIceCreams + action.payload
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer)
console.log('Initial State', store.getState())

const unsubscribe = store.subscribe(() => console.log('Updated State', store.getState()))

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(20))

const actions = bindActionCreator({ orderCake, restockCake, orderIceCream, restockedIceCream }, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(2)
actions.orderIceCream()
actions.orderIceCream()
actions.restockedIceCream(3)

unsubscribe()