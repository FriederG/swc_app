import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import About from "../components/About";
import Ergebnisse from "../components/Ergebnisse";
import FAQ from "../components/FAQ";
import News from "../components/News";
import Spielplan from "../components/Spielplan";
import AdminLogin from "../components/Admin/AdminLogin";
import NewsErstellen from "../components/Admin/NewsErstellen";
import NewsBearbeiten from "../components/Admin/NewsBearbeiten";
import InstaFeed from "../components/InstaFeed";

import AuthGuard from "./auth-guard";

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
    path: "/instafeed",
    name: "InstaFeed",
    component: InstaFeed,
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLogin,
  },
  {
    path: "/admin/news/new",
    name: "NewsErstellen",
    component: NewsErstellen,
    beforeEnter: AuthGuard,
  },
  {
    path: "/admin/news/edit",
    name: "NewsBearbeiten",
    component: NewsBearbeiten,
    beforeEnter: AuthGuard,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
