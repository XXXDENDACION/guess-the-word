import type { NextPage } from 'next'
import { GameArea } from '../components/game-area/game-area'
import WordInput from '../components/word-input/word-input'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.home}>
      <GameArea />
    </div>
  )
}

export default Home
