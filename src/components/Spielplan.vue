<template
  ><div>
    <h2>Spielplan</h2>
    <br />

    <v-container v-for="game in games" :key="game.id">
      <h4>{{ game.time | date }}h</h4>
      <v-card class="mx-auto" max-width="400">
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-subtitle>Platz: {{ game.pitch }}</v-list-item-subtitle>
            <v-list-item-title
              ><b>{{ game.team1 }}</b></v-list-item-title
            >
            <v-list-item-title>vs.</v-list-item-title>
            <v-list-item-title
              ><b>{{ game.team2 }}</b></v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-subtitle>Ergebnis</v-list-item-subtitle>
            <v-list-item-title
              >{{ game.scoreTeam1 }} : {{ game.scoreTeam2 }}</v-list-item-title
            ></v-list-item-content
          >
        </v-list-item>
      </v-card>
    </v-container>

    <br />
    <v-card class="mx-auto" max-width="400">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-subtitle>Platz B</v-list-item-subtitle>
          <v-list-item-title><b>Team Eins</b></v-list-item-title>
          <v-list-item-title>vs.</v-list-item-title>
          <v-list-item-title><b>Team 2</b></v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-subtitle>Ergebnis</v-list-item-subtitle>
          <v-list-item-title>23 : 25</v-list-item-title></v-list-item-content
        >
      </v-list-item>
    </v-card>
    <br />
    <v-card class="mx-auto" max-width="400">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-subtitle>Platz C</v-list-item-subtitle>
          <v-list-item-title><b>Team Eins</b></v-list-item-title>
          <v-list-item-title>vs.</v-list-item-title>
          <v-list-item-title><b>Team 2</b></v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-subtitle>Ergebnis</v-list-item-subtitle>
          <v-list-item-title>32 : 25</v-list-item-title></v-list-item-content
        >
      </v-list-item>
    </v-card>
    <br /><br />
    <h4>10:30h</h4>
    <v-card class="mx-auto" max-width="400">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-subtitle>Platz A</v-list-item-subtitle>
          <v-list-item-title><b>Team Eins</b></v-list-item-title>
          <v-list-item-title>vs.</v-list-item-title>
          <v-list-item-title><b>Team 2</b></v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-subtitle>Ergebnis</v-list-item-subtitle>
          <v-list-item-title>32 : 25</v-list-item-title></v-list-item-content
        >
      </v-list-item>
    </v-card>
    <br />
    <v-card class="mx-auto" max-width="400">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-subtitle>Platz A</v-list-item-subtitle>
          <v-list-item-title><b>Team Eins</b></v-list-item-title>
          <v-list-item-title>vs.</v-list-item-title>
          <v-list-item-title><b>Team 2</b></v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-subtitle>Ergebnis</v-list-item-subtitle>
          <v-list-item-title>32 : 25</v-list-item-title></v-list-item-content
        >
      </v-list-item>
    </v-card>
  </div></template
>

<script>
export default {
  data() {
    return {
      title: "",
      time: new Date(),
    };
  },
  computed: {
    games() {
      return this.$store.getters.loadedGames;
    },
  },
};
</script>
