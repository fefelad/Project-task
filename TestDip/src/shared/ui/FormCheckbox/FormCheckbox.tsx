import styles from './FormCheckbox.module.css';
import { forwardRef, InputHTMLAttributes } from 'react';

interface FormCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(({ 
    label, 
    error,
    className = '',
    checked, 
    onChange,
    ...props 
}, ref) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className={styles.CheckboxContainer}>
            <label className={`${styles.FormCheckboxWrapper} ${className}`}>
                <input 
                    ref={ref}
                    type="checkbox"
                    className={styles.hiddenInput}
                    checked={checked} 
                    onChange={handleChange}
                    {...props}
                />
                <div className={styles.customCheckbox}>
                    {checked && (
                        <svg 
                            className={styles.checkIcon} 
                            width="15" 
                            height="10" 
                            viewBox="0 0 15 10" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                d="M13.5 1L5.5 9L1.5 5" 
                                stroke="white" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                            />
                        </svg>
                    )}
                </div>
                {label && (
                    <span className={styles.labelText}>
                        {label}
                        <span className={styles.requiredStar}> *</span>
                    </span>
                )}
            </label>
        </div>
    );
});

FormCheckbox.displayName = 'FormCheckbox';

export default FormCheckbox;