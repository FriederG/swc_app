<template
  ><div>
    <h1>Schietwettercup</h1>

    <p>
      {{ $t("Since 1990") }}
    </p>
    <p>
      {{ $t("In addition to top class rugby") }}
    </p>
    <iframe
      v-if="!loading"
      src="https://player.vimeo.com/video/344488270"
      width="auto"
      frameborder="0"
      allow="autoplay; fullscreen"
      allowfullscreen
    ></iframe>
    <p v-if="!loading">
      <a href="https://vimeo.com/344488270">Schietwettercup Aftermovie 2019</a>
    </p>
    <p>
      <b>{{ $t("Take a chance") }} </b>
    </p>
    <app-footer></app-footer></div
></template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>
