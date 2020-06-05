import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueI18n from "vue-i18n";
import messages from "./lang";
import appFooter from "./components/Footer";

Vue.config.productionTip = false;

//sprachdatei konfigurieren
//mehr Infos: https://webdeasy.de/vue-i18n-app/
Vue.use(VueI18n);

//Komponenten global registrieren
Vue.component("app-footer", appFooter);

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
}).$mount("#app");
