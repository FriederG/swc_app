<template>
  <v-dialog width="350px" persistent v-model="editDialog"
    ><template v-slot:activator="{ on }">
      <v-btn style="margin: 10px;" accent v-on="on">
        <v-icon>mdi-border-color</v-icon>
      </v-btn></template
    >
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Menüpunkt aktivieren/deaktivieren</v-card-title>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12
            ><v-card-subtitle>{{ menuItem.title }}</v-card-subtitle>
            <v-card-actions>
              <v-btn
                text
                class="blue--text darken-1"
                @click="editDialog = false"
                >Abbrechen</v-btn
              >
              <v-btn text class="green--text darken-1" @click="onSaveChanges"
                >Ändern</v-btn
              >
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  //prop aus der TeamVerwaltung.vue
  props: ["menuItem"],
  data() {
    return {
      editDialog: false,
      isActive: true,
    };
  },
  methods: {
    onSaveChanges() {
      this.editDialog = false;
      this.$store.dispatch("updateMenueItemData", {
        id: this.menuItem.id,
        isActive: this.menuItem.isActive,
      });
    },
  },
};
</script>
