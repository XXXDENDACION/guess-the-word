import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react"

import WordInput from "../word-input/word-input"

import styles from "./game-area.module.css";

const COUNT_LETTERS = 5;

type GameAreaProps = {
    currentWord: string;
}

export const GameArea = ({ currentWord }: GameAreaProps): JSX.Element => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [lastInputedWord, setLastInputedWord] = useState<string>('');
    const [countErrorMessage, setCountErrorMessage] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [hasError, setHasError] = useState(false);

    const handleSetErrorMessage = (error: string): void => {
        setErrorMessage(error);
        setHasError(true);
        setCountErrorMessage((prevState) => prevState++);
    }

    const handleSetLastInputedWord = (word: string): void => {
        setLastInputedWord(word);
    }

    const nextStep = () => {
        setCurrentStep(prevState => prevState + 1);
    }

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (hasError) {
            timeout = setTimeout(() => {
                setHasError(false);
            }, 2000)
        }

        return () => clearTimeout(timeout)
    }, [hasError])

    const isGuessedWord = lastInputedWord === currentWord;

    return (
        <div className={styles.wrapper}>
            <div className={styles.box}>
                <div className={styles.titleBox}>
                    <h2 className={styles.title}>Denis WORDLE</h2>
                </div>
                <AnimatePresence initial={false}>
                    {hasError && (
                        <div
                            className={styles.notificationBox}
                            key={errorMessage + countErrorMessage}
                        >
                            <motion.div
                                className={styles.notificationMessage}
                                initial={{ opacity: 0, y: 50, scale: 0.3 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 }}}
                            >
                                {errorMessage}
                            </motion.div>
                        </div>
                    )}
                    {currentWord && Array.from(Array(COUNT_LETTERS).keys()).map((item) => (
                        <WordInput
                            key={'step' + (item + 1)}
                            currentWord={currentWord}
                            blocked={currentStep !== (item + 1) || isGuessedWord}
                            nextStep={nextStep}
                            handleSetLastInputedWord={handleSetLastInputedWord}
                            handleSetErrorMessage={handleSetErrorMessage}
                        />
                        )
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
