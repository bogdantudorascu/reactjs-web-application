import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth/login", { credentials }).then(res => res.data.user),
    signup: credentials =>
      axios.post("/api/auth/signup", { credentials }).then(res => res.data.user),
    confirm: confirmationToken =>
      axios
        .post("/api/auth/confirmation", { confirmationToken })
        .then(res => res.data.success),
    resetPasswordRequest: email =>
      axios.post("/api/auth/reset_password_request", { email }),
    validateToken: token => axios.post("/api/auth/validate_token", { token }),
    resetPassword: data => axios.post("/api/auth/reset_password", { data }),
    fetchCurrentUser: () =>
        axios.get("/api/users/current_user").then(res => res.data.user)
  },
    reservations: {
        addReservation: data =>
            axios.post("/api/reservations", { data }).then(res => res.data.reservation),
        updateReservation: data =>
            axios.put("/api/reservations", { data }),
        getReservations: offset => axios.get(`/api/reservations/all/${offset}`).then(res => res.data.reservations),
        getReservation: id => axios.get(`/api/reservations/${id}`).then(res => res.data.reservation)
    },
    locations: {
        addLocation: data =>
            axios.post("/api/locations", { data }).then(res => res.data.location),
        updateLocation: data =>
            axios.put("/api/locations", { data }),
        getLocations: () => axios.get(`/api/locations`).then(res => res.data.locations),
        getLocation: id => axios.get(`/api/locations/${id}`).then(res => res.data.location)
    }

};

