import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { store } from "./store/index";
import vuetify from "./plugins/vuetify";
import VueI18n from "vue-i18n";
import FlagIcon from "vue-flag-icon";
import DateFilter from "./filters/date";
import DayFilter from "./filters/day";
import messages from "./lang";
import VueInstagram from "vue-instagram";
import VueHotspot from "vue-hotspot";

//alles aus firebase package wird importiert. Es können auch einzelne Features
//import * as firebase from "firebase";

import firebase from "firebase";
import "firebase/database";
import "firebase/messaging";
import "firebase/auth";

import AlertCmp from "./components/Alert";

import EditNewsDialog from "./components/Admin/Edit/EditNewsDialog";
import DeleteNewsDialog from "@/components/Admin/Edit/DeleteNewsDialog";
import appFooter from "./components/Footer";
import DeleteTeamDialog from "@/components/Admin/Edit/DeleteTeamDialog";
import EditTeamDialog from "@/components/Admin/Edit/EditTeamDialog";
import EditResultsDialog from "@/components/Admin/Edit/EditResultsDialog";
import DeleteGameDialog from "@/components/Admin/Edit/DeleteGameDialog";
import DeleteSongDialog from "@/components/Admin/Edit/DeleteSongDialog";
import EditSongDialog from "@/components/Admin/Edit/EditSongDialog";
import DeletePhotoDialog from "@/components/Admin/Edit/DeletePhotoDialog";
import EditMenuItemDialog from "@/components/Admin/Edit/EditMenuItemDialog";

Vue.config.productionTip = false;

//sprachdatei konfigurieren
//mehr Infos: https://webdeasy.de/vue-i18n-app/
Vue.use(VueI18n);

Vue.use(FlagIcon);
Vue.config.productionTip = false;

Vue.use(VueInstagram);

Vue.use(VueHotspot);

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
Vue.component("delete-game-dialog", DeleteGameDialog);
Vue.component("delete-song-dialog", DeleteSongDialog);
Vue.component("edit-song-dialog", EditSongDialog);
Vue.component("delete-photo-dialog", DeletePhotoDialog);
Vue.component("edit-menu-item-dialog", EditMenuItemDialog);

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
      messagingSenderId: "977017215304",
      appId: "1:977017215304:web:44bd817cb04fa998a27b7d",
      measurementId: "G-KZXXTCM4N5",
    });

    //Bedingung zum Checken, ob der Browser Cloud Messaging unterstützt
    //Ansonsten lädt er gar keine Daten aus der Firebase
    if (firebase.messaging.isSupported()) {
      firebase
        .messaging()
        .requestPermission()
        .then(() => firebase.messaging().getToken())
        .then((token) => console.log(token))
        .catch((err) => console.log(err));
    }

    //Zum Überprüfen in der Konsole, ob die Message angekommen ist
    /*
    navigator.serviceWorker.addEventListener("message", (event) => {
      console.log("Push Notification Recieved" + event); // refresh code goes here
    });*/

    //checken, ob der admin im local Store eingeloggt ist
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      }
    });

    //Messaging ausprobieren
    /*
    const messaging = firebase.messaging();

    //firebase.messaging().useServiceWorker();

    messaging.usePublicVapidKey(
      "BCjoFLgQZcka1d--yY8dHjiZYWCIXPSSuGjEXZkyCSO4P858wTw0rw_6jchO1jEKLhMktf8vOlf6KOFSs8ydvX4"
    );

    // Request Permission of Notifications
    messaging
      .requestPermission()
      .then(() => {
        console.log("Notification permission granted.");

        // Get Token
        messaging.getToken().then((token) => {
          console.log(token);
        });
      })
      .catch((err) => {
        console.log("Unable to get permission to notify.", err);
      });
    const messaging = firebase.messaging();
    messaging
      .requestPermission()
      .then(function () {
        console.log("GRANTED");
        console.log(messaging.getToken());
        return messaging.getToken();
      })
      .then(function (token) {
        console.log(token);
      })
      .catch(function (err) {
        console.log("Error Occurred." + err);
      });

    messaging.setBackgroundMessageHandler(function (payload) {
      const title = "Hello World";
      const option = { body: payload.data.status };
      return self.registration.showNotification(title, option);
    });*/

    //Zum Start Daten laden
    this.$store.dispatch("loadNews");
    this.$store.dispatch("loadTeams");
    this.$store.dispatch("loadGames");
    this.$store.dispatch("loadFinalGames");
    this.$store.dispatch("loadGroups");
    //this.$store.dispatch("loadTeamGames");
    this.$store.dispatch("loadSongs");
    this.$store.dispatch("loadLostItems");
    this.$store.dispatch("loadPhotos");

    this.$store.dispatch("loadMenueItems");
  },
}).$mount("#app");
