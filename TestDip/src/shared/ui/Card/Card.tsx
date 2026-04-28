import { memo } from 'react';
import styles from './Card.module.css';
import Text from '../Text/Text';
import Info from '../Info/Info';

interface CardProps {
    title: string;
    description: string;
    secondtitle: string;
    infoTexts: [string, string];
    directions?: string[];
    className?: string;
    onClick?: () => void;
    widthPercent?: number;
}

export const Card = memo(({
    title,
    description,
    secondtitle,
    infoTexts,
    directions = [],
    className,
    onClick,
    widthPercent
}: CardProps) => {
    const [info1, info2] = infoTexts;

    return (
        <div
            className={`${styles.card} ${className || ''}`}
            onClick={onClick}
            style={
                widthPercent
                    ? ({ '--card-width': `${widthPercent}%` } as React.CSSProperties)
                    : undefined
            }
        >
            <Text fontFamily="onest" className={styles.cardTitle}>
                {title}
            </Text>

            <Text fontFamily="onest" className={styles.cardSecondTitle}>
                {secondtitle}
            </Text>

            {directions.length > 0 && (
                <div className={styles.directions}>
                    {directions.map((dir, index) => (
                        <Text
                            key={`${dir}-${index}`}
                            className={styles.directionTag}
                            fontFamily="onest"
                        >
                            #{dir}
                        </Text>
                    ))}
                </div>
            )}

            <Text fontFamily="onest" className={styles.cardDescription}>
                {description}
            </Text>

            <div className={styles.infoContainer}>
                <Info hasWhiteBg={true} isTextWhite={true} fullWidth={false}>
                    {info1}
                </Info>

                <Info hasWhiteBg={false} isTextWhite={false} fullWidth={false}>
                    {info2}
                </Info>
            </div>
        </div>
    );
});

Card.displayName = 'Card';

export default Card;