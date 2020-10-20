const axios = require("axios");

const API = {
    loginUser: function (userInfo) {
        console.log("userInfo in utils.API", userInfo);
        return axios.post("/login", userInfo)
    },

    logoutUser: function () {
        return axios.get("/logout")
    },

    registerUser: function (userInput) {
        console.log("registerUser in utils/API.js", userInput);
        return axios.post("/register", userInput)
    },

    getUser: function () {
        return axios.get("/api/getuser")
    },

    addSubscription: function (subData) {
        return axios.post("/api/addsub", subData)
    },

    deleteSubscription: function (subData) {
        return axios.post("api/removesub", subData)
    }
}

module.exports = API;