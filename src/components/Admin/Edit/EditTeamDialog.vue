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
            <v-card-title>Team bearbeiten</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                id="EditTitle"
                v-model="editedTitle"
                required
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-card-text>Turnierzweig</v-card-text>
          <v-flex xs12 sm6 offset-sm3>
            <v-radio-group v-model="gender" row>
              <v-radio
                style="margin-left: 20px;"
                label="Damen"
                value="female"
              ></v-radio>
              <v-radio
                style="margin-left: 20px;"
                label="Herren"
                value="male"
              ></v-radio>
            </v-radio-group>
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
  //prop aus der TeamVerwaltung.vue
  props: ["team"],
  data() {
    return {
      editDialog: false,
      gender: this.team.gender,
      editedTitle: this.team.title,
    };
  },
  methods: {
    onSaveChanges() {
      if (this.editedTitle.trim() === "") {
        return;
      }
      this.editDialog = false;
      this.$store.dispatch("updateTeamsData", {
        id: this.team.id,
        title: this.editedTitle,
        gender: this.gender,
      });
    },
  },
};
</script>
