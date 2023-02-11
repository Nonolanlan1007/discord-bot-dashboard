<template>
  <div class="dashaccess">
    <h1>
      Connexion en cours...
    </h1>
  </div>
</template>

<script>
import config from "../../../src/utils/config.json";
import {checkIfUserIsLoggedIn, updateAccessToken, updateUserData} from "@/assets/scripts/loginFunctions";

export default {
  name: "DashAccess",
  async created() {
    const searchParams = new URLSearchParams(window.location.search);

    let code = searchParams.get("code");

    if (checkIfUserIsLoggedIn(this.$store.state) === false && !code) {
      console.log("User is not logged in, redirecting to login page");
      const clientId = config.infos.id;
      const redirectUri = window.location.origin + "/dash";
      const scope = "guilds identify";
      // Step 2: Redirect the user to the OAuth2 URL
      window.location = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`;
    }
    if (checkIfUserIsLoggedIn(this.$store.state) === false && code) {
      const res = updateAccessToken(this.$store.state, code, config.infos.id, window.location.origin + "/dash", "guilds identify")
      if (res === true) {
        const result = await updateUserData(this.$store.state)
        if (result === true) {
          console.log(this.$store.state)
        }
        if (result === false) {
          alert("Error while updating user data");
          const clientId = config.infos.id;
          const redirectUri = window.location.origin + "/dash";
          const scope = "guilds identify";
          // Step 2: Redirect the user to the OAuth2 URL
          window.location = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`;
        }
      }
      if (res === false) {
        alert("Error while updating access token");
        const clientId = config.infos.id;
        const redirectUri = window.location.origin + "/dash";
        const scope = "guilds identify";
        // Step 2: Redirect the user to the OAuth2 URL
        window.location = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`;
      }
    }
  }
}
</script>

<style scoped>
  h1 {
    margin-top: 200px;
    text-align: center;
    font-size: 150px;
  }
</style>