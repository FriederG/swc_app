<template>
  <v-container>
    <div v-if="current_month === 6">
      <div v-if="entered === 'false'">
        <button @click="enter">enter</button>
      </div>
      <div v-if="entered === 'true'">
        <!-- Tag 1 -->
        <div class="day_card">
          <div v-if="open_1 === 'false'" class="ball_shape" @click="open_a">
            1
          </div>
          <div v-if="open_1 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
        </div>

        <!-- Tag 2 -->
        <div class="day_card">
          <div
            @click="open_b"
            v-if="current_date >= 2 && open_2 === 'false'"
            class="ball_shape"
          >
            2
          </div>
          <div v-if="current_date >= 2 && open_2 === 'true'">
            <iframe
              src="https://player.vimeo.com/video/344488270"
              width="250"
              height="360"
              frameborder="0"
              allow="autoplay;"
              allowfullscreen
            ></iframe>
          </div>
          <div v-if="current_date < 2 && open_2 === 'false'" class="ball_shape">
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 3 -->
        <div class="day_card">
          <div
            @click="open_c"
            v-if="current_date >= 3 && open_3 === 'false'"
            class="ball_shape"
          >
            3
          </div>
          <div v-if="current_date >= 3 && open_3 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div v-if="current_date < 3 && open_3 === 'false'" class="ball_shape">
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 4 -->
        <div class="day_card">
          <div
            @click="open_d"
            v-if="current_date >= 4 && open_4 === 'false'"
            class="ball_shape"
          >
            4
          </div>
          <div v-if="current_date >= 4 && open_4 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div v-if="current_date < 4 && open_4 === 'false'" class="ball_shape">
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 5 -->
        <div class="day_card">
          <div
            @click="open_e"
            v-if="current_date >= 5 && open_5 === 'false'"
            class="ball_shape"
          >
            5
          </div>
          <div v-if="current_date >= 5 && open_5 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div v-if="current_date < 5 && open_5 === 'false'" class="ball_shape">
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 6 -->
        <div class="day_card">
          <div
            @click="open_f"
            v-if="current_date >= 6 && open_6 === 'false'"
            class="ball_shape"
          >
            6
          </div>
          <div v-if="current_date >= 6 && open_6 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div v-if="current_date < 6 && open_6 === 'false'" class="ball_shape">
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 7 -->
        <div class="day_card">
          <div
            @click="open_g"
            v-if="current_date >= 7 && open_7 === 'false'"
            class="ball_shape"
          >
            7
          </div>
          <div v-if="current_date >= 7 && open_7 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div v-if="current_date < 7 && open_7 === 'false'" class="ball_shape">
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 8 -->
        <div class="day_card">
          <div
            @click="open_h"
            v-if="current_date >= 8 && open_8 === 'false'"
            class="ball_shape"
          >
            8
          </div>
          <div v-if="current_date >= 8 && open_8 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div v-if="current_date < 8 && open_8 === 'false'" class="ball_shape">
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 9 -->
        <div class="day_card">
          <div
            @click="open_i"
            v-if="current_date >= 9 && open_9 === 'false'"
            class="ball_shape"
          >
            9
          </div>
          <div v-if="current_date >= 9 && open_9 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div v-if="current_date < 9 && open_9 === 'false'" class="ball_shape">
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 10 -->
        <div class="day_card">
          <div
            @click="open_j"
            v-if="current_date >= 10 && open_10 === 'false'"
            class="ball_shape"
          >
            10
          </div>
          <div v-if="current_date >= 10 && open_10 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div
            v-if="current_date < 10 && open_10 === 'false'"
            class="ball_shape"
          >
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 11 -->
        <div class="day_card">
          <div
            @click="open_k"
            v-if="current_date >= 11 && open_11 === 'false'"
            class="ball_shape"
          >
            11
          </div>
          <div v-if="current_date >= 11 && open_11 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div
            v-if="current_date < 11 && open_11 === 'false'"
            class="ball_shape"
          >
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 12 -->
        <div class="day_card">
          <div
            @click="open_l"
            v-if="current_date >= 12 && open_12 === 'false'"
            class="ball_shape"
          >
            12
          </div>
          <div v-if="current_date >= 12 && open_12 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div
            v-if="current_date < 12 && open_12 === 'false'"
            class="ball_shape"
          >
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 13 -->
        <div class="day_card">
          <div
            @click="open_m"
            v-if="current_date >= 13 && open_13 === 'false'"
            class="ball_shape"
          >
            13
          </div>
          <div v-if="current_date >= 13 && open_13 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div
            v-if="current_date < 13 && open_13 === 'false'"
            class="ball_shape"
          >
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 14 -->
        <div class="day_card">
          <div
            @click="open_n"
            v-if="current_date >= 14 && open_14 === 'false'"
            class="ball_shape"
          >
            14
          </div>
          <div v-if="current_date >= 14 && open_14 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div
            v-if="current_date < 14 && open_14 === 'false'"
            class="ball_shape"
          >
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 15 -->
        <div class="day_card">
          <div
            @click="open_o"
            v-if="current_date >= 15 && open_15 === 'false'"
            class="ball_shape"
          >
            15
          </div>
          <div v-if="current_date >= 15 && open_15 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div
            v-if="current_date < 15 && open_15 === 'false'"
            class="ball_shape"
          >
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 16 -->
        <div class="day_card">
          <div
            @click="open_p"
            v-if="current_date >= 16 && open_16 === 'false'"
            class="ball_shape"
          >
            16
          </div>
          <div v-if="current_date >= 16 && open_16 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div
            v-if="current_date < 16 && open_16 === 'false'"
            class="ball_shape"
          >
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 17 -->
        <div class="day_card">
          <div
            @click="open_q"
            v-if="current_date >= 17 && open_17 === 'false'"
            class="ball_shape"
          >
            17
          </div>
          <div v-if="current_date >= 17 && open_17 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div
            v-if="current_date < 17 && open_17 === 'false'"
            class="ball_shape"
          >
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 18 -->
        <div class="day_card">
          <div
            @click="open_r"
            v-if="current_date >= 18 && open_18 === 'false'"
            class="ball_shape"
          >
            18
          </div>
          <div v-if="current_date >= 18 && open_18 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div
            v-if="current_date < 18 && open_18 === 'false'"
            class="ball_shape"
          >
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 19 -->
        <div class="day_card">
          <div
            @click="open_s"
            v-if="current_date >= 19 && open_19 === 'false'"
            class="ball_shape"
          >
            19
          </div>
          <div v-if="current_date >= 19 && open_19 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div
            v-if="current_date < 19 && open_19 === 'false'"
            class="ball_shape"
          >
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 20 -->
        <div class="day_card">
          <div
            @click="open_t"
            v-if="current_date >= 20 && open_20 === 'false'"
            class="ball_shape"
          >
            20
          </div>
          <div v-if="current_date >= 20 && open_20 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div
            v-if="current_date < 20 && open_20 === 'false'"
            class="ball_shape"
          >
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 21 -->
        <div class="day_card">
          <div
            @click="open_u"
            v-if="current_date >= 21 && open_21 === 'false'"
            class="ball_shape"
          >
            21
          </div>
          <div v-if="current_date >= 21 && open_21 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div
            v-if="current_date < 21 && open_21 === 'false'"
            class="ball_shape"
          >
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 22 -->
        <div class="day_card">
          <div
            @click="open_v"
            v-if="current_date >= 22 && open_22 === 'false'"
            class="ball_shape"
          >
            22
          </div>
          <div v-if="current_date >= 22 && open_22 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div
            v-if="current_date < 22 && open_22 === 'false'"
            class="ball_shape"
          >
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 23 -->
        <div class="day_card">
          <div
            @click="open_w"
            v-if="current_date >= 23 && open_23 === 'false'"
            class="ball_shape"
          >
            23
          </div>
          <div v-if="current_date >= 23 && open_23 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div
            v-if="current_date < 23 && open_23 === 'false'"
            class="ball_shape"
          >
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
        <!-- Tag 24 -->
        <div class="day_card">
          <div
            @click="open_x"
            v-if="current_date >= 24 && open_24 === 'false'"
            class="ball_shape"
          >
            24
          </div>
          <div v-if="current_date >= 24 && open_24 === 'true'">
            <iframe src="https://codepen.io/dazulu/pen/ByoWee"></iframe>
          </div>
          <div
            v-if="current_date < 24 && open_24 === 'false'"
            class="ball_shape"
          >
            <v-icon size="x-large">mdi-lock</v-icon>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Kalender",

  data() {
    return {
      current_date: new Date().getDate(),
      current_month: new Date().getMonth(),

      entered: "false",

      open_1: "false",
      open_2: "false",
      open_3: "false",
      open_4: "false",
      open_5: "false",
      open_6: "false",
      open_7: "false",
      open_8: "false",
      open_9: "false",
      open_10: "false",
      open_11: "false",
      open_12: "false",
      open_13: "false",
      open_14: "false",
      open_15: "false",
      open_16: "false",
      open_17: "false",
      open_18: "false",
      open_19: "false",
      open_20: "false",
      open_21: "false",
      open_22: "false",
      open_23: "false",
      open_24: "false",
    };
  },

  mounted() {
    if (localStorage.getItem("entered") === "true") {
      this.entered = "true";
      this.open_1 = localStorage.getItem("open_1");
      this.open_2 = localStorage.getItem("open_2");
      this.open_3 = localStorage.getItem("open_3");
      this.open_4 = localStorage.getItem("open_4");
      this.open_5 = localStorage.getItem("open_5");
      this.open_6 = localStorage.getItem("open_6");
      this.open_7 = localStorage.getItem("open_7");
      this.open_8 = localStorage.getItem("open_8");
      this.open_9 = localStorage.getItem("open_9");
      this.open_10 = localStorage.getItem("open_10");
      this.open_11 = localStorage.getItem("open_11");
      this.open_12 = localStorage.getItem("open_12");
      this.open_13 = localStorage.getItem("open_13");
      this.open_14 = localStorage.getItem("open_14");
      this.open_15 = localStorage.getItem("open_15");
      this.open_16 = localStorage.getItem("open_16");
      this.open_17 = localStorage.getItem("open_17");
      this.open_18 = localStorage.getItem("open_18");
      this.open_19 = localStorage.getItem("open_19");
      this.open_20 = localStorage.getItem("open_20");
      this.open_21 = localStorage.getItem("open_21");
      this.open_22 = localStorage.getItem("open_22");
      this.open_23 = localStorage.getItem("open_23");
      this.open_24 = localStorage.getItem("open_24");
    } else {
      this.entered = "false";
      localStorage.setItem("open_1", "false");
      localStorage.setItem("open_2", "false");
      localStorage.setItem("open_3", "false");
      localStorage.setItem("open_4", "false");
      localStorage.setItem("open_5", "false");
      localStorage.setItem("open_6", "false");
      localStorage.setItem("open_7", "false");
      localStorage.setItem("open_8", "false");
      localStorage.setItem("open_9", "false");
      localStorage.setItem("open_10", "false");
      localStorage.setItem("open_11", "false");
      localStorage.setItem("open_12", "false");
      localStorage.setItem("open_13", "false");
      localStorage.setItem("open_14", "false");
      localStorage.setItem("open_15", "false");
      localStorage.setItem("open_16", "false");
      localStorage.setItem("open_17", "false");
      localStorage.setItem("open_18", "false");
      localStorage.setItem("open_19", "false");
      localStorage.setItem("open_20", "false");
      localStorage.setItem("open_21", "false");
      localStorage.setItem("open_22", "false");
      localStorage.setItem("open_23", "false");
      localStorage.setItem("open_24", "false");
    }
  },

  methods: {
    enter() {
      this.entered = "true";
      localStorage.setItem("entered", "true");
    },

    open_a() {
      if (this.open_1 === "false") {
        this.open_1 = "true";
        localStorage.setItem("open_1", "true");
      }
    },
    open_b() {
      if (this.open_2 === "false") {
        this.open_2 = "true";
        localStorage.setItem("open_2", "true");
      }
    },
    open_c() {
      if (this.open_3 === "false") {
        this.open_3 = "true";
        localStorage.setItem("open_3", "true");
      }
    },
    open_d() {
      if (this.open_4 === "false") {
        this.open_4 = "true";
        localStorage.setItem("open_4", "true");
      }
    },
    open_e() {
      if (this.open_5 === "false") {
        this.open_5 = "true";
        localStorage.setItem("open_5", "true");
      }
    },
    open_f() {
      if (this.open_6 === "false") {
        this.open_6 = "true";
        localStorage.setItem("open_6", "true");
      }
    },
    open_g() {
      if (this.open_7 === "false") {
        this.open_7 = "true";
        localStorage.setItem("open_7", "true");
      }
    },
    open_h() {
      if (this.open_8 === "false") {
        this.open_8 = "true";
        localStorage.setItem("open_8", "true");
      }
    },
    open_i() {
      if (this.open_9 === "false") {
        this.open_9 = "true";
        localStorage.setItem("open_9", "true");
      }
    },
    open_j() {
      if (this.open_10 === "false") {
        this.open_10 = "true";
        localStorage.setItem("open_10", "true");
      }
    },
    open_k() {
      if (this.open_11 === "false") {
        this.open_11 = "true";
        localStorage.setItem("open_11", "true");
      }
    },
    open_l() {
      if (this.open_12 === "false") {
        this.open_12 = "true";
        localStorage.setItem("open_12", "true");
      }
    },
    open_m() {
      if (this.open_13 === "false") {
        this.open_13 = "true";
        localStorage.setItem("open_13", "true");
      }
    },
    open_n() {
      if (this.open_14 === "false") {
        this.open_14 = "true";
        localStorage.setItem("open_14", "true");
      }
    },
    open_o() {
      if (this.open_15 === "false") {
        this.open_15 = "true";
        localStorage.setItem("open_15", "true");
      }
    },
    open_p() {
      if (this.open_16 === "false") {
        this.open_16 = "true";
        localStorage.setItem("open_16", "true");
      }
    },
    open_q() {
      if (this.open_17 === "false") {
        this.open_17 = "true";
        localStorage.setItem("open_17", "true");
      }
    },
    open_r() {
      if (this.open_18 === "false") {
        this.open_18 = "true";
        localStorage.setItem("open_18", "true");
      }
    },
    open_s() {
      if (this.open_19 === "false") {
        this.open_19 = "true";
        localStorage.setItem("open_19", "true");
      }
    },
    open_t() {
      if (this.open_20 === "false") {
        this.open_20 = "true";
        localStorage.setItem("open_20", "true");
      }
    },
    open_u() {
      if (this.open_21 === "false") {
        this.open_21 = "true";
        localStorage.setItem("open_21", "true");
      }
    },
    open_v() {
      if (this.open_22 === "false") {
        this.open_22 = "true";
        localStorage.setItem("open_22", "true");
      }
    },
    open_w() {
      if (this.open_23 === "false") {
        this.open_23 = "true";
        localStorage.setItem("open_23", "true");
      }
    },
    open_x() {
      if (this.open_24 === "false") {
        this.open_24 = "true";
        localStorage.setItem("open_24", "true");
      }
    },
  },
};
</script>

<style scoped>
.day_card {
  height: 200px;
  font-size: 40pt;
  display: flex;
  align-items: center;
  margin: 10px;
  justify-content: center;
  background-color: green;
  color: white;
  border-radius: 20px;
  -webkit-box-shadow: 2px 2px 5px 0px rgba(199, 199, 199, 1);
  -moz-box-shadow: 2px 2px 5px 0px rgba(199, 199, 199, 1);
  box-shadow: 2px 2px 5px 0px rgba(199, 199, 199, 1);
}
.ball_shape {
  width: 200px;
  height: 100px;
  background: red;
  border-radius: 100px / 50px;
  background-color: white;
  color: firebrick;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
