import { forwardRef, KeyboardEvent, memo } from "react";
import type { ChangeEvent, Ref } from "react";
import cn from "classnames";

import styles from "./symbol-input.module.css";

type SymbolInputProps = {
    blocked?: boolean;
    value: string | number;
    id: string;
    className?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDownInput: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const SymbolInput = forwardRef(({ id, value, blocked, onChange, onKeyDownInput, className }: SymbolInputProps, ref: Ref<HTMLInputElement>) => (
    <input
        id={String(id)}
        className={cn(styles.symbolInput, className)} 
        value={value}
        name="symbol"
        maxLength={1} 
        ref={ref} 
        onChange={onChange}
        onKeyDown={onKeyDownInput} 
        autoComplete="off"
        disabled={blocked}
    />
));

SymbolInput.displayName = 'SymbolInput';

export default memo(SymbolInput);