import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import About from "../components/About";
import Ergebnisse from "../components/Ergebnisse";
import FAQ from "../components/FAQ";
import News from "../components/News";
import Spielplan from "../components/Spielplan";
import Pegelstand from "../components/Pegelstand";
import AdminLogin from "../components/Admin/AdminLogin";
import NewsErstellen from "../components/Admin/NewsErstellen";
import NewsBearbeiten from "../components/Admin/NewsBearbeiten";
import InstaFeed from "../components/InstaFeed";
import TeamsVerwalten from "../components/Admin/TeamVerwaltung";
import SpielplanVerwaltung from "@/components/Admin/SpielplanVerwaltung";
import ErgebnisseBearbeiten from "@/components/Admin/ErgebnisseBearbeiten";
import GruppenVerwaltung from "@/components/Admin/GruppenVerwaltung";

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
    path: "/pegelstand",
    name: "Pegelstand",
    component: Pegelstand,
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
  {
    path: "/admin/teams",
    name: "TeamsVerwalten",
    component: TeamsVerwalten,
    beforeEnter: AuthGuard,
  },
  {
    path: "/admin/spielplan",
    name: "SpielplanVerwalten",
    component: SpielplanVerwaltung,
    beforeEnter: AuthGuard,
  },
  {
    path: "/admin/ergebnisse",
    name: "ErgebnisseBearbeiten",
    component: ErgebnisseBearbeiten,
    beforeEnter: AuthGuard,
  },
  {
    path: "/admin/gruppen",
    name: "GruppenBearbeiten",
    component: GruppenVerwaltung,
    beforeEnter: AuthGuard,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
