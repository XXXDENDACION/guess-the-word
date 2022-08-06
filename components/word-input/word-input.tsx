import { ChangeEvent, KeyboardEvent, memo, useEffect, useState } from 'react';

import { useCallback, useRef } from 'react'
import cn from "classnames";
import { CompleteButton } from '../complete-button/complete-button';
import SymbolInput from '../symbol-input/symbol-input';

import styles from "./word-input.module.css";

const regularExpression = /^[а-я]*$/;

enum StatusCharacter {
  correctPlace = "correctPlace",
  incorrectPlace = "incorrectPlace",
  noExist = "noExist",
  notInputed = "noInputed"
}

interface IInputValues {
  [index: string]: string;
}

interface IStatusValues {
  [index: string]: StatusCharacter;
}

interface IWordInputProps {
  blocked?: boolean;
  currentWord: string;
  handleSetLastInputedWord: (word: string) => void;
  nextStep: () => void;
  handleSetErrorMessage: (error: string) => void;
}

const WordInput = ({ blocked, currentWord, nextStep, handleSetLastInputedWord, handleSetErrorMessage }: IWordInputProps) => {
    const [inputValues, setInputValues] = useState<IInputValues>({
        "0": "",
        "1": "",
        "2": "",
        "3": "",
        "4": ""
    });
    const [statusInputValues, setStatusInputValues] = useState<IStatusValues>({
        "0": StatusCharacter.notInputed,
        "1": StatusCharacter.notInputed,
        "2": StatusCharacter.notInputed,
        "3": StatusCharacter.notInputed,
        "4": StatusCharacter.notInputed
  });
    const [lastInputedIndex, setLastInputedIndex] = useState<number>(-1);
    const [isVisibleCompleteButton, setIsVisibleCompleteButton] = useState(false);
    const symbolsRef = useRef(new Array());

    const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      if (!handleOnlyRussianSymbol(e.target.value)) {
        return;
      }

      const inputId = parseInt(e.target.id);

      setInputValues((prevState) => ({...prevState, [inputId]: e.target.value}));
      setLastInputedIndex(inputId);

      symbolsRef.current[inputId + 1]?.focus();
    }, [])

    const onKeyDownInput = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
      if (!handleOnlyRussianSymbol(e.target.value)) {
        return;
      }

      const inputId = parseInt(e.target.id);

      if (symbolsRef.current[inputId].value === "" && e.key === "Backspace") {
          if (inputId - 1 >= 0) {
            setInputValues((prevState) => ({...prevState, [inputId-1]: ""}))
            return symbolsRef.current[inputId - 1]?.focus();
          }
      }
    }, [])

    const handleOnlyRussianSymbol = (value: string) => {
        return !!value.match(regularExpression);
    }

    const submitWord = useCallback(async () => {

      const response = await fetch('/api/sendWord', {
        method: "POST",
        body: JSON.stringify(Object.values(inputValues).join(''))
      })
      const responseResolved = await response.json();

      if (responseResolved?.hasWord) {
        const newStatusValues = {...statusInputValues};
        Object.values(inputValues).forEach((value, index) => {
          if (value === currentWord[index]) {
            return newStatusValues[index] = StatusCharacter.correctPlace;
          }

          if (currentWord.includes(value)) {
            return newStatusValues[index] = StatusCharacter.incorrectPlace;
          }

          newStatusValues[index] = StatusCharacter.noExist;
        })
        setStatusInputValues(newStatusValues);
        handleSetLastInputedWord(Object.values(inputValues).join(''));
        nextStep();
      } else {
        handleSetErrorMessage("Такого слова нет в словаре игры!")
      }
    }, [currentWord, handleSetErrorMessage, handleSetLastInputedWord, inputValues, nextStep, statusInputValues])

    useEffect(() => {
      const inputedWord = Object.values(inputValues).join('');
      if (inputedWord.length === 5) {
        return setIsVisibleCompleteButton(true);
      }

      setIsVisibleCompleteButton(false);
    }, [inputValues])
  
    useEffect(() => {
      const onKeyDown = (e: any) => {
        if (!blocked) {
          if (Object.values(inputValues).join('').length === 5 && e.key === "Enter") {
            submitWord();
          }

          const countSymbols = Object.keys(inputValues).length;
          if (Object.keys(inputValues).map(index => symbolsRef.current[parseInt(index)]).includes(document.activeElement)) {
            return;
          }
          if (lastInputedIndex + 1 >= countSymbols) {
            return symbolsRef.current[lastInputedIndex]?.focus();
          }
          if (lastInputedIndex < 0) {
            return symbolsRef.current[0]?.focus();
          }

          symbolsRef.current[lastInputedIndex + 1]?.focus();
        }
      }
  
      window.addEventListener('keydown', onKeyDown);
  
      return () => window.removeEventListener('keydown', onKeyDown);
    }, [lastInputedIndex, inputValues, submitWord, blocked])

    return (
      <div className={styles.wrapper}>
        <div>
          {Object.keys(inputValues).map((item, index) => 
            <SymbolInput 
              id={item}
              ref={(el) => symbolsRef.current[index] = el} 
              value={inputValues[item]}
              key={index} 
              onChange={onChangeInput} 
              onKeyDownInput={onKeyDownInput}
              blocked={blocked || statusInputValues[index] !== StatusCharacter.notInputed}
              className={cn(
                styles.symbolInput, 
                {
                  [styles.symbolInputCorrect]: statusInputValues[index] === StatusCharacter.correctPlace,
                  [styles.symbolInputIncorrect]: statusInputValues[index] === StatusCharacter.incorrectPlace,
                  [styles.symbolInputNotExist]: statusInputValues[index] === StatusCharacter.noExist,
                }
            )}
            /> 
          )}
        </div>
      </div>
    )
}

export default memo(WordInput);