import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import config from '@/utils/config.json'
import NavBar from "@/components/NavBar";
import styles from "@/styles/pages/index.module.css"
import { Button } from "@/components/globals";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>{ config.infos.name } - Accueil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          <NavBar />

          <div className={styles.botpresentation}>
              <img src={config.infos.avatar} alt={config.infos.name}/>
              <h1>{config.infos.name}</h1>
              <h3>{config.infos.shortDesc}</h3>

              <div className="cards">
                  <Button label="Accéder au dashboard" type="secondary" redirect="/login"/>
                  <Button label="Inviter le bot" type="primary" redirect={`https://discord.com/api/oauth2/authorize?client_id=${config.infos.id}&permissions=-1&scope=bot`}/>
              </div>
          </div>
      </main>
    </>
  )
}
