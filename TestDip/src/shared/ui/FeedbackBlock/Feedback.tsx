import Input from '../Input/Input';
import Text, { TextSizes, TextWeight } from '../Text/Text';
import styles from './Feedback.module.css';
import { ReactNode } from 'react';

interface FeedbackProps {
    title: string;
    children: ReactNode;
    fullWidth?: boolean;
    contentPadding?: string | number;
}

export default function Feedback({ 
    title, 
    children, 
    fullWidth = false,
    contentPadding = '220px' 
}: FeedbackProps) {
    
    const contentStyle = fullWidth ? {
        padding: `0 ${typeof contentPadding === 'number' ? `${contentPadding}px` : contentPadding}`,
        maxWidth: '100%',
        boxSizing: 'border-box' as const,
        margin: '0 auto'
    } : {};

    return (
        <div className={`${styles.FeedbackWrapper} ${fullWidth ? styles.fullWidth : ''}`}>
            <div 
                className={styles.FeedbackContent}
                style={contentStyle}
            >
                <Text 
                    className={styles.FeedbackContentTitle} 
                    fontFamily='involve' 
                    weight={TextWeight.REGULAR} 
                    size={TextSizes.XL5}
                >
                    {title}
                </Text>
                <Text 
                    className={styles.FeedbackContentDescritpion} 
                    fontFamily='onest' 
                    weight={TextWeight.REGULAR} 
                    size={TextSizes.XL}
                >
                    {children}
                </Text>
                
                <form action="">
                    <label>Введите имя</label>
                </form>
            </div>
        </div>
    );
}