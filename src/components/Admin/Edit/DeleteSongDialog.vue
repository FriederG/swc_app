<template>
  <v-dialog width="350px" class="v-alert" persistent v-model="editDialog"
    ><template v-slot:activator="{ on }">
      <v-btn class="red--text darken-1" accent v-on="on" style="margin: 10px;">
        <v-icon>mdi-delete</v-icon>
      </v-btn></template
    >
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Song wirklich löschen?</v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                text
                class="blue--text darken-1"
                @click="editDialog = false"
                >Abbrechen</v-btn
              >
              <v-btn text class="red--text darken-1" @click="onSaveDeleteSong"
                >Löschen</v-btn
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
  props: ["song"],
  data() {
    return {
      editDialog: false,
    };
  },
  methods: {
    onSaveDeleteSong() {
      this.editDialog = false;

      this.$store.dispatch("deleteSongData", {
        id: this.song.id,
      });
    },
  },
};
</script>
