import * as types from "../constants/ActionType";

const userReducers = (state = [], action) => {
    switch (action.type) {
        case types.playlist.GET_PLAYLIST:
            return [...action.payload]
        case types.playlist.CREATE_PLAYLIST:
            return [...state, { ...action.payload }]
        case types.playlist.DELETE_PLAYLIST:
            state = [...state].filter(item => item._id !== action.payload._id)
            return [...state]
        case types.playlist.UPDATE_PLAYLIST:
            state = [...state].map(item => {
                if (item._id === action.payload._id) {
                    const { name, description, user, imageUrl } = action.payload;
                    return { name, description, user, imageUrl, }
                }
                return item
            })
            return [...state]
        default:
            return state
    }
}

export default userReducers;