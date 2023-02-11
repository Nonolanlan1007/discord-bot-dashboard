<template>
  <div class="home">
    <NavBar/>

    <div class="botpresentation">
      <img v-bind:src="config.infos.avatar" v-bind:alt="config.infos.name" />
      <h1>{{ config.infos.name }}</h1>
      <h3>{{ config.infos.shortDesc }}</h3>

      <div class="cards">
        <button class="secondary">
          Accéder au dashboard
        </button>
        <button class="primary">
          Inviter le bot
        </button>
      </div>
    </div>

    <div class="features">
      <h1>
        Fontionnalités
      </h1>
      <div class="cards">
        <FeatureCard v-for="feature in config.infos.features" v-bind:title="feature.title" v-bind:icon="feature.icon" v-bind:desc="feature.desc || feature.title" :key="feature.title" />
      </div>
    </div>
    <div class="beforefooter">
      <h1>
        Prêt à vous lancer ?
      </h1>
      <div class="cards">
        <button class="secondary">
          Accéder au dashboard
        </button>
        <button class="primary">
          Inviter le bot
        </button>
      </div>
    </div>

    <footer>
      <div class="content">
        <img v-bind:src="config.infos.avatar" v-bind:alt="config.infos.name" class="logo" />
        <div class="links">
          <a v-if="config.infos.support" class="link" v-bind:href="config.infos.support">
            Serveur support
          </a>
          <a v-if="config.infos.docs" class="link" v-bind:href="config.infos.docs">
            Documentation
          </a>
          <router-link class="link" to="/dash">
            Accéder au dashboard
          </router-link>
        </div>
      </div>

      <p>
        Site web développé par<a href="https://github.com/Nonolanlan1007" class="link">Nolhan</a>avec ❤️ en 2023. Le site est<a href="https://github.com/Nonolanlan1007/discord-bot-dashboard" class="link">open-source</a>et sous licence<a href="https://github.com/Nonolanlan1007/discord-bot-dashboard/blob/f83c662e0450e19a576f6a99600d27be4c6549c7/LICENSE" class="link">Apache 2.0</a>.
      </p>
    </footer>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import config from "@/assets/config.json";
import FeatureCard from "@/components/FeatureCard.vue";

export default {
  name: 'HomeView',
  components: {FeatureCard, NavBar},
  data() {
    return {
      config: config
    }
  },
  created() {
    document.title = config.infos.name + " - Accueil";
  }
}
</script>

<style scoped>
  .botpresentation {
    margin-top: 150px;
    text-align: center;
  }

  .botpresentation img {
    width: 200px;
    height: 200px;
    border-radius: 100%;
  }

  .botpresentation h1 {
    margin-top: 20px;
  }

  .botpresentation h3 {
    margin-top: 20px;
  }

  .features {
    margin: 250px;
    margin-top: 350px;
    text-align: center;
  }

  .features .cards {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .cards button {
    margin: 10px;
  }

  .cards button.primary:hover {
    background: #2F3136;
  }

  .beforefooter {
    margin-top: 150px;
    text-align: center;
  }

  footer {
    text-align: center;
    justify-content: center;
    align-items: center;
    margin-top: 150px;
    background: #2F3136;
    padding: 50px;
  }

  footer .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  footer .content .logo {
    width: 100px;
    height: 100px;
    margin: 10px;
    border-radius: 100%;
  }

  footer .content .links {
    display: block;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .link {
    margin: 10px;
    color: white;
    text-decoration: none;
  }

  p {
    color: white;
  }
</style>