import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import config from '@/utils/config.json'
import NavBar from "@/components/NavBar";
import styles from "@/styles/pages/index.module.css"
import { Button } from "@/components/Inputs";
import FeatureCard from "@/components/FeatureCard";
import {parseUser} from "@/utils/parseUser";
import {GetServerSideProps} from "next";
import {DiscordUser, Props} from "@/utils/types";
import axios from "axios";

const inter = Inter({ subsets: ['latin'] })

export default function Home(props: Props) {
  return (
    <>
      <Head>
        <title>{ config.infos.name } - Accueil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          <NavBar user={props.user} />

          <div className={styles.botpresentation}>
              <img src={config.infos.avatar} alt={config.infos.name}/>
              <h1>{config.infos.name}</h1>
              <h3>{config.infos.shortDesc}</h3>

              <div className={styles.btns}>
                  <Button label="Accéder au dashboard" type="secondary" redirect="/dash"/>
                  <Button label="Inviter le bot" type="primary" redirect={`https://discord.com/api/oauth2/authorize?client_id=${config.infos.id}&permissions=-1&scope=bot`}/>
              </div>
          </div>

          <div className={styles.features}>
              <h1>
                  Fonctionnalités
              </h1>
              <div className={styles.cards}>
                  {
                      config.infos.features.map((feature, index) => {
                          return (
                              <FeatureCard title={feature.title} description={feature.description} icon={feature.icon} key={index} />
                          )
                      })
                  }
              </div>
          </div>

          <div className={styles.beforefooter}>
              <h1>
                  {props.servers} serveurs nous font déjà confiance ! <br/>Alors pourquoi pas vous ?
              </h1>
              <div className={styles.btns}>
                  <Button label="Accéder au dashboard" type="secondary" redirect="/dash" />
                  <Button label="Inviter le bot" type="primary" redirect={`https://discord.com/api/oauth2/authorize?client_id=${config.infos.id}&permissions=-1&scope=bot`} />
              </div>
          </div>
      </main>
    </>
  )
}

export const getServerSideProps: (ctx: any) => Promise<{ props: { servers: string; user: DiscordUser | null } }> = async (ctx) => {
    const user = parseUser(ctx);

    const stats = await axios.get(`${process.env.APP_URL}/api/stats`).then(res => res.data);

    return { props: { user: user, servers: stats.servers! } };
}