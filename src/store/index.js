import Vue from "vue";
import Vuex from "vuex";

import news from "./News";
import signin from "./SignIn";
import teams from "./Teams";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    news: news,
    signin: signin,
    teams: teams,
  },
});
