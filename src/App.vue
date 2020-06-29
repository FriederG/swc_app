<template>
  <v-app>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    />
    <!--App Bar oben -->
    <v-card color="grey lighten-4" flattile dark style="margin-bottom: 80px;">
      <v-app-bar height="90px" fixed>
        <v-toolbar-title
          ><router-link to="/" tag="span" style="cursor: pointer;"
            ><img
              src="./assets/swc_schrift.png"
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
    <v-navigation-drawer v-model="sideNav" fixed app temporary>
      <v-list shaped>
        <v-subheader>Menu</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

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
export default {
  data() {
    return {
      sideNav: false,
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "mdi-star", title: "Turnierinformationen", link: "/about" },
        { icon: "mdi-newspaper", title: "News", link: "/news" },
        {
          icon: "mdi-table",
          title: "Spielpläne",
          link: "/spielplan",
        },
        { icon: "mdi-trophy", title: "Ergebnisse", link: "/results" },
        { icon: "mdi-help", title: "FAQ", link: "/faq" },
        { icon: "mdi-beer", title: "Pegelstand", link: "/pegelstand" },
        { icon: "mdi-instagram", title: "Insta-Feed", link: "instafeed" },
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "mdi-plus",
            title: "News erstellen",
            link: "/admin/news/new",
          },
          {
            icon: "mdi-newspaper",
            title: "News bearbeiten",
            link: "/admin/news/edit",
          },
          {
            icon: "mdi-human",
            title: "Teams verwalten",
            link: "/admin/teams",
          },
          {
            icon: "mdi-table",
            title: "Spielplan verwalten",
            link: "/admin/spielplan",
          },
          {
            icon: "mdi-reply",
            title: "Ergebnisse bearbeiten",
            link: "/admin/ergebnisse",
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
    },
  },
};
</script>
