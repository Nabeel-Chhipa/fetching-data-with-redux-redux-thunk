const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()


const initialState = {
    name: 'Muhammad Nabeel',
    age: 27,
    address: {
        area: 'Zaman Town',
        sector: '35-A',
        houseNo: 'B/532'
    }
}

const UPDATE_AREA = 'UPDATE_AREA'

const updateAddress = (area) => {
    return {
        type: UPDATE_AREA,
        payload: area
    }
}

const updateAreaReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_AREA:
            return {
                ...state,
                address: {
                    ...state.address,
                    area: action.payload
                }
            }
        default:
            return state
    }
}

const store = createStore(updateAreaReducer, applyMiddleware(logger))
console.log('Initial State', store.getState())
const unsubscribe = store.subscribe(() => {})
store.dispatch(updateAddress('Defence'))
unsubscribe()