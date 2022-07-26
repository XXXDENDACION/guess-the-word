import { forwardRef, KeyboardEvent, memo } from "react";
import type { ChangeEvent, Ref } from "react";

import styles from "./symbol-input.module.css";

type SymbolInputProps = {
    value: string | number;
    id: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDownInput: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const SymbolInput = forwardRef(({ id, value, onChange, onKeyDownInput }: SymbolInputProps, ref: Ref<HTMLInputElement>) => (
    <input
        id={String(id)}
        className={styles.symbolInput} 
        value={value}
        name="symbol"
        maxLength={1} 
        ref={ref} 
        onChange={onChange}
        onKeyDown={onKeyDownInput} 
        autoComplete="off"
    />
));

SymbolInput.displayName = 'SymbolInput';

export default memo(SymbolInput);