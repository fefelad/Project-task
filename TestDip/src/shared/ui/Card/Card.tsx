import { memo } from 'react';
import styles from './Card.module.css';
import Text from '../Text/Text';
import Info from '../Info/Info';

interface CardProps {
    title: string;
    description: string;
    secondtitle: string;
    infoTexts: [string, string];
    className?: string;
}

export const Card = memo(({ 
    title, 
    description,
    secondtitle,
    infoTexts,
    className
}: CardProps) => {
    const [info1, info2] = infoTexts;
    return (
        <div className={`${styles.card} ${className || ''}`}>
            <Text fontFamily='onest' className={styles.cardTitle}>{title}</Text>
                <Text fontFamily='onest' className={styles.cardSecondTitle}>{secondtitle}</Text>
            <Text fontFamily='onest' className={styles.cardDescription}>{description}</Text>
            <div className={styles.infoContainer}>
                <Info hasWhiteBg={true} isTextWhite={true}>{info1}</Info>
                <Info hasWhiteBg={false} isTextWhite={false}>{info2}</Info>
            </div>
        </div>
    );
});

Card.displayName = 'Card';
export default Card;