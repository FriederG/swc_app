import * as firebase from "firebase";

export default {
  state: {
    user: null,
    loading: false,
    error: null,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },

    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {},
          };
          commit("setUser", newUser);
        })
        .catch((error) => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit("setLoading", false);

          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {},
          };
          commit("setUser", newUser);
        })
        .catch((error) => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", { id: payload.uid, fbKeys: {} });
    },

    logout({ commit }) {
      //Token aus der indexed DB entfernen
      firebase.auth().signOut();
      //in vuex auf null setzen
      commit("setUser", null);
    },

    clearError({ commit }) {
      commit("clearError");
    },
  },
  modules: {},
  getters: {
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
  },
};
