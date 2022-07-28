import { useState } from "react"
import WordInput from "../word-input/word-input"

export const GameArea = (): JSX.Element => {
    const [currentWord, setCurrentWord] = useState("печка");

    return (
        <div>
            <WordInput currentWord={currentWord} />
            <WordInput blocked />
            <WordInput blocked />
            <WordInput blocked />
            <WordInput blocked />
            <WordInput blocked />
        </div>
    )
}