import axios from "axios";

function checkIfUserIsLoggedIn (state) {
    if (!state.userData || !state.accessToken) return false
    return true
}

async function updateUserData(state) {
    const response = await axios.get("https://discord.com/api/users/@me", {
        headers: {
            Authorization: `Bearer ${state.accessToken}`
        }
    }).catch(() => {
        return false
    });
    state.userData = response.data
    return true
}
async function updateAccessToken(state, token, clientId, redirect_uri, scope) {
    try {

        console.log(process.env.CLIENT_SECRET)
        const body = new URLSearchParams({
            client_id: clientId,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: "authorization_code",
            redirect_uri: redirect_uri,
            code: token,
            scope: scope,
        }).toString();

        const { access_token, token_type = "Bearer" } = await axios.post("https://discord.com/api/oauth2/token", body, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }).then(res => res.data);

        if (!access_token) return false;

        state.accessToken = await axios.get("https://discord.com/api/users/@me", {
            headers: {Authorization: `${token_type} ${access_token}`}
        }).then(res => res.data)
        return true
    } catch {
        return false
    }
}

export {
    checkIfUserIsLoggedIn,
    updateUserData,
    updateAccessToken
}