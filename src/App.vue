<template>
  <v-app>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    />
    <!--App Bar oben -->

    <v-card flattile dark style="margin-bottom: 80px; border-radius: 0;">
      <v-app-bar height="90px" fixed>
        <v-toolbar-title
          ><router-link to="/" tag="span" style="cursor: pointer;"
            ><img
              src="./assets/Logo_mobile.png"
              height="70px"
              style="padding-top: 10px;" /></router-link
        ></v-toolbar-title>
        <v-spacer></v-spacer>

        <v-app-bar-nav-icon
          @click.stop="sideNav = !sideNav"
        ></v-app-bar-nav-icon>
      </v-app-bar>
    </v-card>
    <!--Header mobile, der sich von unten hochfährt-->
    <v-navigation-drawer
      style="z-index: 999;"
      v-model="sideNav"
      fixed
      app
      temporary
      right
    >
      <v-list shaped>
        <v-subheader>Menu</v-subheader>
        <v-list-item-group color="primary">
          <div v-for="item in menuItems" :key="item.title">
            <!--Items aus der DB weren nur angezeigt, wenn sie aktiv gesetzt sind -->
            <v-list-item v-if="item.isActive" :to="item.link">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>

          <v-list-item @click="onLogout" v-if="userIsAuthenticated">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!--Header groß------------------------------------------------------------------------------------->
    <main style="margin: 30px;"><router-view></router-view></main>
  </v-app>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      sideNav: false,
    };
  },
  computed: {
    dbMenuItems() {
      return this.$store.getters.loadedMenueItems;
    },

    menuItems() {
      if ()
      let menuItems = this.dbMenuItems;

      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "mdi-plus",
            title: "News erstellen",
            link: "/admin/news/new",
            isActive: true,
          },
          {
            icon: "mdi-newspaper",
            title: "News bearbeiten",
            link: "/admin/news/edit",
            isActive: true,
          },
          {
            icon: "mdi-human",
            title: "Teams verwalten",
            link: "/admin/teams",
            isActive: true,
          },
          {
            icon: "mdi-table",
            title: "Spiele anlegen",
            link: "/admin/spielplan",
            isActive: true,
          },
          /*
          {
            icon: "mdi-group",
            title: "Gruppen verwalten",
            link: "/admin/gruppen",
          }, */
          {
            icon: "mdi-reply",
            title: "Ergebnisse bearbeiten",
            link: "/admin/ergebnisse",
            isActive: true,
          },
          {
            icon: "mdi-music",
            title: "Musik bearbeiten",
            link: "/admin/music",
            isActive: true,
          },
          {
            icon: "mdi-camera",
            title: "Fotos verwalten",
            link: "/admin/fotos",
            isActive: true,
          },
          {
            icon: "mdi-plus",
            title: "Fundsachen erstellen",
            link: "/admin/fundsachen/new",
            isActive: true,
          },
          {
            icon: "mdi-newspaper",
            title: "Fundsachen bearbeiten",
            link: "/admin/fundsachen/edit",
            isActive: true,
          },
          {
            icon: "mdi-animation-outline",
            title: "Menü anpassen",
            link: "/admin/menue",
            isActive: true,
          },
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },

    timer() {
      return "lul";
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");

      router.push("/admin/login");
    },
  },
};
</script>
