import React, { MouseEvent } from "react";
import cn from "classnames";

import styles from "./complete-button.module.css";

interface ICompleteButtonProps {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    className?: string;
}

export const CompleteButton = ({ onClick, className, disabled }: ICompleteButtonProps) => {
    return (
        <button className={cn(styles.button, className)} onClick={onClick} disabled={disabled}>
            Подтвердить
        </button>
    )
}