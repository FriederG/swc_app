<template>
  <div>
    <h1>Pegelstand</h1>
    <br />
    <v-simple-table>
      <table>
        <tr>
          <td><b>Bier</b></td>
          <td>{{ beer_count }}</td>
          <td>
            <v-btn v-on:click="more_beer"><v-icon>mdi-beer</v-icon></v-btn>
          </td>
        </tr>
        <tr>
          <td><b>Wein</b></td>
          <td>{{ wine_count }}</td>
          <td>
            <v-btn v-on:click="more_wine"><v-icon>mdi-beer</v-icon></v-btn>
          </td>
        </tr>
        <tr>
          <td><b>Shot</b></td>
          <td>{{ shot_count }}</td>
          <td>
            <v-btn v-on:click="more_shots"><v-icon>mdi-beer</v-icon></v-btn>
          </td>
        </tr>
        <tr>
          <td><b>Drink</b></td>
          <td>{{ drink_count }}</td>
          <td>
            <v-btn v-on:click="more_drinks"><v-icon>mdi-beer</v-icon></v-btn>
          </td>
        </tr>
      </table>
    </v-simple-table>
    <br />
    <p>{{ alc_calc_male }}</p>
  </div>
</template>

<script>
export default {
  name: "Pegelstand",

  data() {
    return {
      beer_count: 0,
      wine_count: 0,
      shot_count: 0,
      drink_count: 0,
    };
  },
  methods: {
    more_beer() {
      this.beer_count = this.beer_count + 1;
    },
    more_wine() {
      this.wine_count = this.wine_count + 1;
    },
    more_shots() {
      this.shot_count = this.shot_count + 1;
    },
    more_drinks() {
      this.drink_count = this.drink_count + 1;
    },
  },
  computed: {
    alc_calc_male() {
      return (
        (this.beer_count * 12 +
          this.wine_count * 15 +
          this.shot_count * 7 +
          this.drink_count * 12) /
        (70 * 0.55)
      );
    },
    alc_calc_female() {
      return (this.beer_count * 12) / (70 * 0.68);
    },
  },
};
</script>

<style scoped></style>
