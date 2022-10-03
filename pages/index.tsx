import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { GameArea } from '../components/game-area/game-area'

import styles from '../styles/Home.module.css'
import { getAuthSession } from '../server/common/get-server-session'
import { useState } from 'react'
import { getSession, useSession } from 'next-auth/react'

const Home: NextPage = (props) => {
  const [word, setWord] = useState<string>();

  const getWord = async () => {
    const response = await fetch('/api/words');
    const randomWord = await response.json();
    setWord(randomWord?.word);
  }

  const handleGetVk = async() => {
    // const formData = new FormData();
    // formData.append('access_token', props.data.token);
    // formData.append('v', '5.131');
    // const response = await fetch(`https://api.vk.com/method/account.getProfileInfo?access_token=${props.data.token}&v=5.194`, {
    //   method: 'POST',
    //   mode: 'no-cors',
    //   // body: formData
    // })
    // const data = await response.json();
    // console.log(data);
    const res = await fetch('/api/hello');
    const tok = await res.json();
  }

  return (
    <div className={styles.home}>
      <button onClick={handleGetVk}>Get</button>
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
