<template>
  <div>
    <h1>Feedback</h1>
    <h4>
      Wie hat euch das Tunier gefallen? Habt ihr Fragen/Anregungen? Wir freuen
      uns über euer Feedback.
    </h4>
    <br />
    <br />
    <h4>Was hat dir am SWC gefallen?</h4>
    <v-textarea v-model="answer_1" placeholder="Deine Antwort"></v-textarea>
    <br />
    <h4>Was hat dir am SWC <b>nicht</b> gefallen?</h4>
    <v-textarea v-model="answer_2" placeholder="Deine Antwort"></v-textarea>
    <br />
    <h4>Hast du Fragen/Anregungen für uns?</h4>
    <v-textarea v-model="answer_3" placeholder="Deine Antwort"></v-textarea>
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
      E-Mail schicken
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Feedback",

  data() {
    return {
      mailAdress: "frieder@griem-online.de",
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
