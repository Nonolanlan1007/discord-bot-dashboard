import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import config from "@/utils/config.json";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
        <Component {...pageProps} />
        <script type="text/javascript">
          document.getElementsByName("button").style.background = "#7289da";
        </script>
        <footer>
          <div className="content">
            <img src={config.infos.avatar} alt={config.infos.name} className="logo"/>
            <div className="links">
              {
                config.infos.support ? <a className="link" href={config.infos.support}>Serveur support</a> : null
              }
              {
                config.infos.docs ? <a className="link" href={config.infos.docs}>Documentation</a> : null
              }
              <button className="link">
                Accéder au dashboard
              </button>
            </div>
          </div>

          <p>
            Site web développé par <a href="https://github.com/Nonolanlan1007" className="link">Nolhan</a> avec ❤️ en 2023. Le site est <a href="https://github.com/Nonolanlan1007/discord-bot-dashboard" className="link">open-source</a> et sous licence <a href="https://github.com/Nonolanlan1007/discord-bot-dashboard/blob/f83c662e0450e19a576f6a99600d27be4c6549c7/LICENSE" className="link">Apache 2.0</a>.
          </p>
        </footer>
      </>
  )
}
