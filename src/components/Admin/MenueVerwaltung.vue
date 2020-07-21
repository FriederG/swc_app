<template
  ><div>
    Menü anpassen

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Menüpunkte anpassen</h2>
      </v-flex>
    </v-layout>
    <!--
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateMenuItem">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" :disabled="!formIsValid" type="submit"
                >Menüpunkt erstellen</v-btn
              >
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
    -->

    <v-list shaped>
      <v-subheader>Menu</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item v-for="item in menuItems" :key="item.title">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-content style="color: green;" v-if="item.isActive"
            >On</v-list-item-content
          >
          <v-list-item-content style="color: red;" v-if="!item.isActive"
            >Off</v-list-item-content
          >
          <edit-menu-item-dialog :menu-item="item"></edit-menu-item-dialog>
        </v-list-item>
      </v-list-item-group>
    </v-list></div
></template>

<script>
export default {
  props: ["itemData"],
  data() {
    return {
      sideNav: false,

      title: "",
      link: "",
      icon: "",
    };
  },
  computed: {
    formIsValid() {
      return this.title !== "";
    },

    dbMenuItems() {
      console.log(this.$store.getters.loadedMenueItems);
      return this.$store.getters.loadedMenueItems;
    },

    menuItems() {
      let menuItems = this.dbMenuItems;

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
    onCreateMenuItem() {
      //Wenn die Form ungültig ist
      if (!this.formIsValid) {
        return;
      }
      const SongData = {
        title: "A",
        icon: 0,
      };
      this.$store.dispatch("createMenuItem", SongData);
      //Wenn schon etwas im Wunsch-Store steht
    },
  },
};
</script>
