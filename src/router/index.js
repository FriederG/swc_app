import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import About from "../components/About";
import Ergebnisse from "../components/Ergebnisse";
import FAQ from "../components/FAQ";
import News from "../components/News";
import Spielplan from "../components/Spielplan";
import AdminLogin from "../components/Admin/AdminLogin";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/results",
    name: "Ergebnisse",
    component: Ergebnisse,
  },
  {
    path: "/faq",
    name: "FAQ",
    component: FAQ,
  },
  {
    path: "/news",
    name: "News",
    component: News,
  },
  {
    path: "/spielplan",
    name: "Spielplan",
    component: Spielplan,
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLogin,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
