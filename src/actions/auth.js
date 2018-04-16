import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_CONFIRMED} from "../types";
import { TOKEN_NAME} from "../constants";
import api from "../api";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userConfirmed = () => ({
    type: USER_CONFIRMED
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const signup = data => dispatch =>
    api.user.signup(data).then(user => {
        localStorage.websiteJWT = user.token;
        dispatch(userLoggedIn(user));
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.websiteJWT = user.token;
      setAuthorizationHeader(user.token);
    dispatch(userLoggedIn(user));
  });

export const logout = () => dispatch => {
  localStorage.removeItem(TOKEN_NAME);
    setAuthorizationHeader();
  dispatch(userLoggedOut());
};

export const confirm = confirmationToken => dispatch =>
  api.user.confirm(confirmationToken).then(data => {
    dispatch(userConfirmed());
    return data;
  });

export const resetPasswordRequest = ({ email }) => () =>
  api.user.resetPasswordRequest(email);

export const validateToken = token => () => api.user.validateToken(token);

export const resetPassword = data => () => api.user.resetPassword(data);
