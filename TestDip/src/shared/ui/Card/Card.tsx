import { memo } from 'react';
import classNames from 'classnames';
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
    isDisabled?: boolean;
}

export const Card = memo(({
    title,
    description,
    secondtitle,
    infoTexts,
    directions = [],
    className,
    onClick,
    widthPercent,
    isDisabled = false
}: CardProps) => {
    const [info1, info2] = infoTexts;

    return (
        <div
            className={`${styles.card} ${onClick ? styles.cardClickable : ''} ${className || ''}`}
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
            {!isDisabled && (
                <>
                <div className={styles.infoContainer}>
                    <div className={styles.infoTab}>
                        <Info
                            hasWhiteBg={true}
                            isTextWhite={true}
                            fullWidth={true}
                            singleLine={true}
                            compact={true}
                        >
                            {info1}
                        </Info>
                    </div>

                    <div className={classNames(styles.infoTab, styles.infoTabSecondary)}>
                        <Info
                            hasWhiteBg={false}
                            isTextWhite={false}
                            fullWidth={true}
                            singleLine={true}
                            compact={true}
                        >
                            {info2}
                        </Info>
                    </div>
                </div>
                </>
            )}
        </div>
    );
});

Card.displayName = 'Card';

export default Card;