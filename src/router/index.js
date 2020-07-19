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
import FundsachenErstellen from "@/components/Admin/FundsachenErstellen";
import FundsachenBearbeiten from "@/components/Admin/FundsachenBearbeiten";
import InstaFeed from "../components/InstaFeed";
import TeamsVerwalten from "../components/Admin/TeamVerwaltung";
import SpielplanVerwaltung from "@/components/Admin/SpielplanVerwaltung";
import ErgebnisseBearbeiten from "@/components/Admin/ErgebnisseBearbeiten";
import GruppenVerwaltung from "@/components/Admin/GruppenVerwaltung";
import Musikwunsch from "@/components/Musikwunsch";
import MusikVerwaltung from "@/components/Admin/MusikBearbeiten";
import Karte from "@/components/Karte";
import Kalender from "@/components/Kalender";
import Fundsachen from "@/components/Fundsachen";
import Feedback from "@/components/Feedback";
import Impressum from "@/components/Impressum";
import Fotos from "@/components/Fotos";

import AuthGuard from "./auth-guard";

Vue.use(VueRouter);

//Routen zu den jeweiligen Komponenten im Vue-Router festlegen
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title: "Home" },
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
    path: "/musik",
    name: "Musikwunsch",
    component: Musikwunsch,
  },
  {
    path: "/map",
    name: "Karte",
    component: Karte,
  },
  {
    path: "/calendar",
    name: "Kalender",
    component: Kalender,
  },
  {
    path: "/fundsachen",
    name: "Fundsachen",
    component: Fundsachen,
  },
  {
    path: "/feedback",
    name: "Feedback",
    component: Feedback,
  },
  {
    path: "/impressum",
    name: "Impressum",
    component: Impressum,
  },
  {
    path: "/fotos",
    name: "Fotos",
    component: Fotos,
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
    path: "/admin/fundsachen/new",
    name: "FundsachenErstellen",
    component: FundsachenErstellen,
    beforeEnter: AuthGuard,
  },

  {
    path: "/admin/fundsachen/edit",
    name: "FundsachenBearbeiten",
    component: FundsachenBearbeiten,
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
  {
    path: "/admin/music",
    name: "SongsBearbeiten",
    component: MusikVerwaltung,
    beforeEnter: AuthGuard,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
