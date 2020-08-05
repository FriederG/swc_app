<template>
  <div>
    <h1>Feedback</h1>
    <h4>
      {{ $t("how did you like the tournament") }}
    </h4>
    <br />
    <br />
    <h4>{{ $t("What did you like about the SWC?") }}</h4>
    <v-textarea
      v-model="answer_1"
      v-bind:placeholder="$t('Your Answer')"
    ></v-textarea>
    <br />
    <h4>{{ $t("What did you not like about the SWC?") }}</h4>
    <v-textarea
      v-model="answer_2"
      v-bind:placeholder="$t('Your Answer')"
    ></v-textarea>
    <br />
    <h4>{{ $t("Do you have any questions or suggestions?") }}</h4>
    <v-textarea
      v-model="answer_3"
      v-bind:placeholder="$t('Your Answer')"
    ></v-textarea>
    <br />
    <v-btn
      :href="`mailto:${mailAdress}?subject=Feedback SWC &body=
      Was hat dir am SWC gefallen?%0D%0A %0D%0A
      ${answer_1}%0D%0A %0D%0A
      Was hat dir am SWC nicht gefallen?%0D%0A %0D%0A
       ${answer_2}%0D%0A %0D%0A
       Hast du Fragen/Anregungen für uns?%0D%0A %0D%0A
       ${answer_3}`"
    >
      {{ $t("Send E-Mail") }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Feedback",

  data() {
    return {
      mailAdress: "swc@kiel-rugby.de",
      mailText1: "Moin, ich habe beim Schietwetercup ",
      mailText2:
        "vergessen. Es wäre super, wenn wir besprechen können, wie ich es wieder bekomme. Viele Grüße NAME EINTRAGEN",

      answer_1: "",
      answer_2: "",
      answer_3: "",
    };
  },

  methods: {
    enter() {
      console.log("hello");
    },
  },
};
</script>

<style scoped></style>
