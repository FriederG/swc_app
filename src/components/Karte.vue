<template>
  <!--
  <div>

    <img src="../assets/map_openStreet.jpg" width="100%" />
    Für weitere Informationen klicke auf den Punkt in der Karte.
  </div> -->
  <div>
    <h2>Übersichtsplan</h2>
    Kicke auf die Punkte, um mehr zum Ort zu erfahren.

    <v-hotspot
      :init-options="hotspotConfig"
      @save-data="saveData"
      @after-delete="afterDelete"
    />
  </div>
</template>

<script>
import VueHotspot from "vue-hotspot";
export default {
  components: {
    "v-hotspot": VueHotspot,
  },
  data() {
    return {
      hotspotConfig: {
        image:
          "https://kielrugby.com/wp-content/uploads/2020/07/map_openStreet-797x1024.jpg",
        editable: false,
        interactivity: "hover",
        data: [
          {
            Message: "Hier gibt es das legendäre Buffet",
            Title: "Frühstück",
            x: 40,
            y: 10,
          },
          {
            Message: "Hier könnt ihr eure Zelte aufschlagen",
            Title: "Camp",
            x: 73,
            y: 43,
          },
          {
            Message: "A prepopulated hotspot",
            Title: "Feld 2",
            x: 42,
            y: 53,
          },
          {
            Message: "Another prepopulated hotspot",
            Title: "Feld 3",
            x: 58,
            y: 78.3,
          },
        ],
        hotspotColor: "green",
        messageBoxColor: "grey",
        textColor: "white",
        opacity: 0.9,
      },
    };
  },
  methods: {
    saveData(data) {
      // Do something with the list of hotspots
      console.log(data);
    },
    afterDelete() {
      // Do something after delete
      console.log("Do something after delete ...");
    },
  },
};
</script>
