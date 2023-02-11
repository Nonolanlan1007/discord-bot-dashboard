<template>
  <div class="navbar">
    <div class="left">
      <img v-bind:src="config.infos.avatar" v-bind:alt="config.infos.name" class="logo" />
      <button class="primary">Accueil</button>
      <button v-if="config.infos.docs" class="primary" v-on:click="redirect(config.infos.docs)">Documentation</button>
      <button v-if="config.infos.support" class="primary" v-on:click="redirect(config.infos.support)">Serveur support</button>
    </div>
    <div class="right">
      <router-link class="tertiary" to="/dash">Se connecter</router-link>
    </div>
  </div>
</template>

<script>
import config from "@/assets/config.json";

export default {
  name: "NavBar",
  data() {
    return {
      config: config,
    };
  },
  methods: {
    redirect (link) {
      window.location.href = link;
    }
  }
}
</script>

<style scoped>
  .navbar {
    background: #2F3136;
    display: flex;
  }

  .navbar * {
    vertical-align: middle;
  }

  .navbar .left * {
    margin-left: 50px;
  }

  .navbar .left {
    margin: 10px;
  }

  .navbar .right * {
    margin: 20px;
    right: 0;
    position: absolute;
  }

  .logo {
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }

  button.primary:hover {
    color: v-bind("config.infos.mainColor");
  }
</style>