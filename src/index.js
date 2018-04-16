import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./rootReducer";
import { userFetched, fetchCurrentUser } from "./actions/users";
import setAuthorizationHeader from "./utils/setAuthorizationHeader";
import { TOKEN_NAME} from "./constants";
import './index.css'

import GuestRoute from "./components/routes/GuestRoute";
import AdminRoute from "./components/routes/AdminRoute";

import AdminReservationsPage from "./components/pages/admin/reservations/ReservationsPage";
import ReservationsEdit from "./components/pages/admin/reservations/ReservationsEdit";
import LocationsPage from "./components/pages/admin/locations/LocationsPage";
import LocationsAdd from "./components/pages/admin/locations/LocationsAdd";
import ReservationsAdd from "./components/pages/admin/reservations/ReservationsAdd";
import LocationsEdit from "./components/pages/admin/locations/LocationsEdit";

import ReservationsPage from "./components/pages/reservations/ReservationsPage";
import SignupPage from "./components/pages/auth/SignupPage";
import ForgotPasswordPage from "./components/pages/auth/ForgotPasswordPage";
import ConfirmationPage from "./components/pages/auth/ConfirmationPage";
import LoginPage from "./components/pages/auth/LoginPage";
import ResetPasswordPage from "./components/pages/auth/ResetPasswordPage";


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.getItem(TOKEN_NAME)) {
    setAuthorizationHeader(localStorage.getItem(TOKEN_NAME));
    store.dispatch(fetchCurrentUser());
} else {
    store.dispatch(userFetched({}));
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Switch>
                <GuestRoute exact path="/" component={ReservationsPage}/>

                <GuestRoute exact path="/confirmation/:token" component={ConfirmationPage}/>
                <GuestRoute exact path="/login" component={LoginPage}/>
                <GuestRoute exact path="/signup" component={SignupPage}/>
                <GuestRoute exact path="/forgot_password" component={ForgotPasswordPage}/>
                <GuestRoute exact path="/reset_password/:token" component={ResetPasswordPage}/>

                <AdminRoute exact path="/admin/reservations" component={AdminReservationsPage}/>
                <AdminRoute exact path="/admin/reservations/new" component={ReservationsAdd}/>
                <AdminRoute exact path="/admin/reservations/:id" component={ReservationsEdit}/>

                <AdminRoute exact path='/admin/locations' component={LocationsPage}/>
                <AdminRoute exact path="/admin/locations/new/" component={LocationsAdd}/>
                <AdminRoute exact path="/admin/locations/:id" component={LocationsEdit}/>
                <GuestRoute component={ReservationsPage}/>
            </Switch>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);

registerServiceWorker();
