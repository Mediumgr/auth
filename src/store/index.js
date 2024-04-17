import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: null,
    isNewUser: true,
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      let user = {
        token: userData.token ? userData.token : null,
        username: userData.username,
      };
      localStorage.setItem("user", JSON.stringify(user));
      state.user = true;
    },
    LOGOUT() {
      localStorage.removeItem("user");
      location.reload();
    },
    IS_NEW_USER(state, isNewUser) {
      state.isNewUser = isNewUser;
    },
  },
  actions: {
    async register({ dispatch }, credentials) {
      let response = await dispatch("sendData", {
        credentials,
        action: "register",
      });
      return response;
    },
    async login({ dispatch }, credentials) {
      let response = await dispatch("sendData", {
        credentials,
        action: "login",
      });
      return response;
    },
    async sendData({ commit }, userData) {
      let username = userData.credentials.username;
      try {
        const { data } = await axios.post(
          `http://localhost:8081/${userData.action}`,
          userData.credentials
        );
        commit("SET_USER_DATA", { ...data, username });
        return data;
      } catch (error) {
        console.warn(error);
        throw error;
      }
    },
    async goToProfile() {
      let token = JSON.parse(localStorage.getItem("user"))?.token;
      try {
        const { data } = await axios.get("http://localhost:8081/about", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data;
      } catch (error) {
        console.warn(error);
        throw error;
      }
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    isNewUser({ commit }, isNewUser) {
      commit("IS_NEW_USER", isNewUser);
    },
  },
});
