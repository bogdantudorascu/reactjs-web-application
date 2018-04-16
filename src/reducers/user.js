import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_FETCHED, USER_CONFIRMED } from "../types";

export default function user(state = { loaded: false }, action = {}) {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {...action.user, loaded: true};
        case USER_FETCHED:
            return {...state, ...action.user, loaded: true};
        case USER_LOGGED_OUT:
            return {};
        case USER_CONFIRMED:
            return {...state, confirmed: true};
        default:
            return state;
    }
}
