import styles from './Input.module.css';
import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    plasholder: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ 
    plasholder, 
    error,
    className = '',
    ...props 
}, ref) => {
    return (
        <div className={styles.InputWrapper}>
            <input 
                ref={ref}
                placeholder={plasholder} 
                className={`${styles.Input} ${error ? styles.hasError : ''} ${className}`}
                {...props}
            />
            {error && (
                <span className={styles.ErrorText} role="alert">
                    {error}
                </span>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;