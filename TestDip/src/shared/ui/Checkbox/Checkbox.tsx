import styles from './Checkbox.module.css';
import { useState } from 'react';

interface CheckboxProps {
    label?: string; // Текст справа от чекбокса
    defaultChecked?: boolean; // Начальное состояние (опционально)
    onChange?: (checked: boolean) => void; // Колбэк при изменении (опционально)
    className?: string; // Дополнительные классы (опционально)
}

export default function Checkbox({ 
    label, 
    defaultChecked = false,
    onChange,
    className = ''
}: CheckboxProps) {
    const [isChecked, setIsChecked] = useState(defaultChecked);

    const handleCheckboxChange = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        
        // Вызываем колбэк, если он передан
        if (onChange) {
            onChange(newChecked);
        }
    };

    return (
        <label className={`${styles.CheckboxWrapper} ${className}`}>
            <input 
                type="checkbox" 
                checked={isChecked}
                onChange={handleCheckboxChange}
                className={styles.hiddenInput}
            />
            <div className={styles.customCheckbox}>
                {isChecked && (
                    <svg 
                        className={styles.checkIcon} 
                        width="21" 
                        height="14" 
                        viewBox="0 0 21 14" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            d="M19.7381 0.599958L7.43366 12.9044L0.601562 6.07227" 
                            stroke="white" 
                            strokeWidth="1.2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                        />
                    </svg>
                )}
            </div>
            {label && <span className={styles.labelText}>{label}</span>}
        </label>
    );
}