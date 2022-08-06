import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react"

import WordInput from "../word-input/word-input"

import styles from "./game-area.module.css";

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
        <div>
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
                {currentWord && (
                    <>
                            <WordInput
                                key={'step' + 1}
                                currentWord={currentWord} 
                                blocked={currentStep !== 1 || isGuessedWord}
                                nextStep={nextStep}
                                handleSetLastInputedWord={handleSetLastInputedWord}
                                handleSetErrorMessage={handleSetErrorMessage}
                            />
                            <WordInput
                                key={'step' + 2}
                                currentWord={currentWord} 
                                blocked={currentStep !== 2 || isGuessedWord}
                                nextStep={nextStep}
                                handleSetLastInputedWord={handleSetLastInputedWord}
                                handleSetErrorMessage={handleSetErrorMessage}
                            />
                            <WordInput
                                key={'step' + 3}
                                currentWord={currentWord} 
                                blocked={currentStep !== 3 || isGuessedWord}
                                nextStep={nextStep}
                                handleSetLastInputedWord={handleSetLastInputedWord}
                                handleSetErrorMessage={handleSetErrorMessage}
                            />
                            <WordInput
                                key={'step' + 4}
                                currentWord={currentWord} 
                                blocked={currentStep !== 4 || isGuessedWord}
                                nextStep={nextStep}
                                handleSetLastInputedWord={handleSetLastInputedWord}
                                handleSetErrorMessage={handleSetErrorMessage}
                            />
                            <WordInput
                                key={'step' + 5}
                                currentWord={currentWord} 
                                blocked={currentStep !== 5 || isGuessedWord}
                                nextStep={nextStep}
                                handleSetLastInputedWord={handleSetLastInputedWord}
                                handleSetErrorMessage={handleSetErrorMessage}
                            />
                            <WordInput
                                key={'step' + 6}
                                currentWord={currentWord} 
                                blocked={currentStep !== 6 || isGuessedWord}
                                nextStep={nextStep}
                                handleSetLastInputedWord={handleSetLastInputedWord}
                                handleSetErrorMessage={handleSetErrorMessage}
                            />
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}