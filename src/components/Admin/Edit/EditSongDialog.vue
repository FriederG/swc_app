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
            <v-card-title>Song bearbeiten</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="editedTitle"
                required
              ></v-text-field>
              <v-textarea
                name="rating"
                label="Rating"
                id="rating"
                multi-line
                v-model="editedRating"
                required
              ></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                text
                class="green--text darken-1"
                @click="editDialog = false"
                >Close</v-btn
              >
              <v-btn text class="blue--text darken-1" @click="onSaveChanges"
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
      editedTitle: this.song.title,
      editedDescription: this.song.rating,
    };
  },
  methods: {
    onSaveChanges() {
      if (
        this.editedTitle.trim() === "" ||
        this.editedDescription.trim() === ""
      ) {
        return;
      }
      this.editDialog = false;
      this.$store.dispatch("updateNewsData", {
        id: this.song.id,
        title: this.editedTitle,
        rating: this.editedTitle,
      });
    },
  },
};
</script>
