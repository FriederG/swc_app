<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Neues Foto hochladen</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <!--Prevent verhindert http-request-->
        <form @submit.prevent="onCreatePhoto">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised class="primary" @click="onPickFile"
                >Foto wählen</v-btn
              >
              <input
                type="file"
                style="display: none;"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150" />
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" :disabled="!formIsValid" type="submit"
                >Foto hochladen</v-btn
              >
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
    <div>
      <h1>Fotos vom SWC</h1>
      <v-layout v-if="loading"
        ><v-flex xs12 class="text-center" style="padding: 30px;"
          ><v-progress-circular
            indeterminate
            color="green"
            style="padding: 30px;"
          ></v-progress-circular
          ><v-card-text
            >Lädt Daten<br />Bitte Internet-Verbindung herstellen</v-card-text
          ></v-flex
        ></v-layout
      >
      <v-layout v-if="!loading">
        <v-expansion-panels>
          <v-expansion-panel
            v-for="singleNews in fotos"
            :key="singleNews.id"
            class="mb-2"
          >
            <v-card class="mx-auto" max-width="400">
              <v-img
                class="white--text align-end"
                height="200px"
                :src="singleNews.imageUrl"
              >
              </v-img>

              <delete-photo-dialog :foto="singleNews.id"></delete-photo-dialog>
            </v-card>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      imageUrl: "",
      description: "",
      time: new Date(),
      image: null,
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    fotos() {
      return this.$store.getters.loadedPhotos;
    },
    formIsValid() {
      return this.imageUrl !== "";
    },
  },
  methods: {
    onCreatePhoto() {
      //Wenn die Form ungültig ist
      if (!this.formIsValid) {
        return;
      }
      if (!this.image) {
        return;
      }
      const photoData = {
        image: this.image,
      };
      this.$store.dispatch("createPhoto", photoData);
      //this.$router.push("/admin/news/edit");
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },
  },
};
</script>

<style scoped></style>
