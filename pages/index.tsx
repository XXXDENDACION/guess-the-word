import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { GameArea } from '../components/game-area/game-area';

import styles from '../styles/Home.module.css';
import { getAuthSession } from '../server/common/get-server-session';
import { useState } from 'react';
import {useSession} from "next-auth/react";

const Home: NextPage = (props) => {
  const { data: session } = useSession();
  console.log(session);
  const [word, setWord] = useState<string>();
  const getWord = async () => {
    const response = await fetch('/api/words');
    const randomWord = await response.json();
    setWord(randomWord?.word);
  }


  return (
    <div className={styles.home}>
      {!word && <button className={styles.buttony} onClick={getWord}>Загадать слово</button>}
      {word && <GameArea currentWord={word || ''} />}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getAuthSession(context);

  if (!session) {
    return {
      redirect: { destination: "/api/auth/signin", permanent: false }
    }
  }

  return {
    props: {
      data: {
        name: session?.user?.name || null,
        email: session?.user?.email || null,
        image: session?.user?.image || null,
      },
    }
  }
}

export default Home
