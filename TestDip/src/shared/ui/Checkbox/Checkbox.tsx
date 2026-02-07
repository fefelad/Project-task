import styles from './Checkbox.module.css';

interface CheckboxProps {
    label?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
    type?: 'checkbox' | 'radio';
    groupName?: string;
}

export default function Checkbox({ 
    label, 
    checked,
    onChange,
    className = '',
    type = 'checkbox',
    groupName
}: CheckboxProps) {
    const handleChange = () => {
        if (type === 'radio') {
            onChange(true);
        } else {
            onChange(!checked);
        }
    };

    return (
        <label className={`${styles.CheckboxWrapper} ${className}`}>
            <input 
                type={type}
                name={groupName}
                checked={checked}
                onChange={handleChange}
                className={styles.hiddenInput}
            />
            <div className={`${styles.customCheckbox} ${type === 'radio' ? styles.radio : ''}`}>
                {checked && (
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