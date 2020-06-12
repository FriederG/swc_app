<template>
  <v-dialog width="350px" persistent v-model="editDialog"
    ><template v-slot:activator="{ on }">
      <v-btn accent v-on="on">
        <v-icon>mdi-delete</v-icon>
      </v-btn></template
    >
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Beitrag löschen</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field>Beitrag wirklich löschen?</v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                text
                class="blue--text darken-1"
                @click="editDialog = false"
                >Close</v-btn
              >
              <v-btn text class="blue--text darken-1" @click="onSaveDelete"
                >Save</v-btn
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
  //prop aus der News.vue
  props: ["news"],
  data() {
    return {
      editDialog: false,
    };
  },
  methods: {
    onSaveDelete() {
      this.editDialog = false;

      this.$store.dispatch("deleteNewsData", {
        id: this.news.id,
      });
    },
  },
};
</script>
