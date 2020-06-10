import Vue from "vue";
import Vuex from "vuex";

import news from "./News";
import signin from "./SignIn";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    news: news,
    signin: signin,
  },
});
