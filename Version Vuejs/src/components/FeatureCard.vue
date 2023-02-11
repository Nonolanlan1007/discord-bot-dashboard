<template>
  <div class="card">
    <img v-bind:src="icon" v-bind:alt="title">
    <h2>{{ title }}</h2>
    <h3>{{ desc }}</h3>
  </div>
</template>

<script>
import config from "../../../src/utils/config.json";

export default {
  name: "FeatureCard",
  props: ["title", "icon", "desc"],
  data() {
    return {
      config: config
    };
  }
}
</script>

<style scoped>
  .card {
    width: 450px;
    height: 450px;
    background-color: #2F3136;
    border-radius: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
  }

  .card img {
    width: 100px;
    height: 100px;
  }

  .card h2 {
    margin-top: 20px;
  }

  .card h3 {
    margin-top: 20px;
  }

  .card:hover h2 {
    color: v-bind("config.infos.mainColor");
  }
</style>