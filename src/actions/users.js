import { USER_FETCHED } from "../types";
import api from "../api";

export const userFetched = user => ({
    type: USER_FETCHED,
    user
});

export const fetchCurrentUser = () => dispatch =>
    api.user.fetchCurrentUser().then(user => dispatch(userFetched(user)));
