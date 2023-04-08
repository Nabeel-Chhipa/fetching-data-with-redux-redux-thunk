const redux = require('redux')
const createStore = redux.createStore
const produce = require('immer').produce

const initialState = {
    name: 'Muhammad Nabeel',
    address: {
        houseNumber: 'B/532',
        sector: '35 A',
        area: 'Zaman Town'
    }
}

const AREA_UPDATE = 'AREA_UPDATE'

const updateArea = (area) => {
    return {
        type: 'AREA_UPDATE',
        payload: area
    }
}

const updateAddressReducer = (state = initialState, action) => {
    switch(action.type) {
        case AREA_UPDATE:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         area: action.payload
            //     }
            // }
            return produce(state, (draft) => {
                draft.address.area = action.payload
            })
        default:
            return state
    }
}

const store = createStore(updateAddressReducer)
console.log('Initial State', store.getState())
const unsubscribe = store.subscribe(() => {
    console.log('Updated State', store.getState())
})
store.dispatch(updateArea('Gulshan-e-Iqbal'))
unsubscribe()
