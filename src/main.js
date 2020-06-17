import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { store } from "./store/index";
import vuetify from "./plugins/vuetify";
import VueI18n from "vue-i18n";
import DateFilter from "./filters/date";
import DayFilter from "./filters/day";
import messages from "./lang";
import VueInstagram from "vue-instagram";

//alles aus firebase package wird importiert. Es können auch einzelne Features
import * as firebase from "firebase";

import AlertCmp from "./components/Alert";

import EditNewsDialog from "./components/Admin/Edit/EditNewsDialog";
import DeleteNewsDialog from "@/components/Admin/Edit/DeleteNewsDialog";
import appFooter from "./components/Footer";
import DeleteTeamDialog from "@/components/Admin/Edit/DeleteTeamDialog";
import EditTeamDialog from "@/components/Admin/Edit/EditTeamDialog";
import EditResultsDialog from "@/components/Admin/Edit/EditResultsDialog";

Vue.config.productionTip = false;

//sprachdatei konfigurieren
//mehr Infos: https://webdeasy.de/vue-i18n-app/
Vue.use(VueI18n);

Vue.use(VueInstagram);

//Komponenten global registrieren
Vue.filter("date", DateFilter);
Vue.filter("day", DayFilter);
Vue.component("app-footer", appFooter);
Vue.component("app-alert", AlertCmp);
Vue.component("edit-news-dialog", EditNewsDialog);
Vue.component("delete-news-dialog", DeleteNewsDialog);
Vue.component("delete-team-dialog", DeleteTeamDialog);
Vue.component("edit-team-dialog", EditTeamDialog);
Vue.component("edit-results-dialog", EditResultsDialog);

export const i18n = new VueI18n({
  locale: "de",
  fallbackLocale: "de",
  messages,
});

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
  //firebase initialisieren
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyAsWovk-Pd2D4PVCxil8rtB94Yb0XGk3SM",
      authDomain: "schietwettercup.firebaseapp.com",
      databaseURL: "https://schietwettercup.firebaseio.com",
      projectId: "schietwettercup",
      storageBucket: "gs://schietwettercup.appspot.com",
    });
    //checken, ob der admin im local Store eingeloggt ist
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      }
    });
    this.$store.dispatch("loadNews");
    this.$store.dispatch("loadTeams");
    this.$store.dispatch("loadGames");
  },
}).$mount("#app");
