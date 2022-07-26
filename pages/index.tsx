import type { NextPage } from 'next'
import WordInput from '../components/word-input/word-input'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.home}>
      <WordInput />
    </div>
  )
}

export default Home
