const redux = require('redux')
const produce = require('immer').produce
const reduxLogger = require('redux-logger')

const applyMiddleware = redux.applyMiddleware
const createStore = redux.createStore
const logger = reduxLogger.createLogger()
const bindActionCreators = redux.bindActionCreators

const initialState = {
    name: 'Muhammad Nabeel',
    age: '26',
    address: {
        houseNo: 'B/532',
        area: 'Korangi no 4, Zaman Town',
        sector: '35-A'
    }
}

const UPDATE_ADDRESS = 'UPDATE_ADDRESS'
const UPDATE_HOUSE = 'UPDATE_HOUSE'

const updateAddressAction = (area) => {
    return {
        type: UPDATE_ADDRESS,
        payload: area
    }
}
const updateHouseAction = (houseNo) => {
    return {
        type: UPDATE_HOUSE,
        payload: houseNo
    }
}

const updateAddressReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_ADDRESS:
            return produce(state, (draft) => {
                draft.address.area = action.payload
            });
        case UPDATE_HOUSE:
            return produce(state, (draft) => {
                draft.address.houseNo = action.payload
            });
        default:
            return state
    }
}

const store = createStore(updateAddressReducer, applyMiddleware(logger))
console.log('Initial State', store.getState())
const unsubscribe = store.subscribe(() => {})
const actions = bindActionCreators({updateAddressAction, updateHouseAction}, store.dispatch)
actions.updateAddressAction('Korangi Crossing, Bhitai Colony')
actions.updateHouseAction('A/012')
// store.dispatch(updateAddressAction('Korangi Crossing'))
unsubscribe()