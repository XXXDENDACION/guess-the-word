import { ChangeEvent, KeyboardEvent, memo, useEffect, useState } from 'react';

import { useCallback, useRef } from 'react'
import SymbolInput from '../symbol-input/symbol-input';

import type { FC } from 'react';

const regularExpression = /^[а-я]*$/;

interface IInputValues {
    [index: string]: string;
}

const WordInput: FC = () => {
    const [inputValues, setInputValues] = useState<IInputValues>({
        "0": "",
        "1": "",
        "2": "",
        "3": "",
        "4": ""
    });
    const [lastInputedIndex, setLastInputedIndex] = useState<number>(-1);
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
  
    useEffect(() => {
      const onKeyDown = () => {
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
  
      window.addEventListener('keydown', onKeyDown);
  
      return () => window.removeEventListener('keydown', onKeyDown);
    }, [lastInputedIndex, inputValues])
  
    return (
      <div>
        {Object.keys(inputValues).map((item, index) => 
          <SymbolInput 
            id={item}
            ref={(el) => symbolsRef.current[index] = el} 
            value={inputValues[item]}
            key={index} 
            onChange={onChangeInput} 
            onKeyDownInput={onKeyDownInput}
          /> 
        )}
      </div>
    )
}

export default memo(WordInput);