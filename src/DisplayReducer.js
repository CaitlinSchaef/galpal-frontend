import { useReducer } from "react";

// export const initialState = 
//     JSON.parse(localStorage.getItem('user'))

export const initialState = {
    currentUser: {
        firstName: '',
        lastName: '',
        user: '',
    },
    matchProfileViewing: [], // [{firstName, username}, {}]
    display: [], //not really sure what to put here
}


export const displayReducer = (state, action) => {
    switch(action.type){
        case 'changeMatchProfile':
            return {}
    }
}

