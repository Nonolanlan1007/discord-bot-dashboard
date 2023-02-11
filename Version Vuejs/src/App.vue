<template>
  <router-view/>
</template>

<script>
import config from "../../src/utils/config.json";

export default {
  name: 'App',
  data() {
    return {
      config: config
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap');
  body {
    background: #36393F;
    font-family: 'Nunito',sans-serif;
    margin: 0;
  }

  /*div {
    border: 2px solid aqua;
  }*/

  h1 {
    font-size: 2.5em;
    font-weight: bold;
    color: white;
  }

  h2 {
    font-size: 2em;
    font-weight: bold;
    color: white;
  }

  h3 {
    font-size: 1.5em;
    font-weight: bold;
    color: white;
  }

  button.primary {
    background: #2F3136;
    border-radius: 1em;
    border: none;
    padding: 25px;
    transition: all 0.3s ease;
    color: white;
    font-size: 1.5em;
    font-weight: bold;
    font-family: 'Nunito', sans-serif;
    outline: none;
    text-decoration: none;
  }

  .primary:hover {
    background: #36393F;
    cursor: pointer;
    color: v-bind("config.infos.mainColor");
  }

  .secondary {
    background: v-bind("config.infos.mainColor");
    border-radius: 1em;
    border: none;
    padding: 25px;
    transition: all 0.3s ease;
    color: white;
    font-size: 1.5em;
    font-weight: bold;
    font-family: 'Nunito', sans-serif;
    outline: none;
    text-decoration: none;
  }

  .secondary:hover {
    background: #2F3136;
    cursor: pointer;
    color: v-bind("config.infos.mainColor");
  }

  .tertiary {
    border-radius: 1em;
    border: 10px solid v-bind("config.infos.mainColor");
    padding: 15px;
    transition: all 0.3s ease;
    color: white;
    font-size: 1.5em;
    font-weight: bold;
    font-family: 'Nunito', sans-serif;
    outline: none;
    background: none;
    text-decoration: none;
  }

  .tertiary:hover {
    background: v-bind("config.infos.mainColor");
    cursor: pointer;
    color: white;
  }
</style>
