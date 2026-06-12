import { memo } from 'react';
import classNames from 'classnames';
import styles from './Info.module.css';
import Text from '../Text/Text';

interface InfoProps {
    children: React.ReactNode;
    hasWhiteBg?: boolean;
    isTextWhite?: boolean;
    fullWidth?: boolean;
    singleLine?: boolean;
}

export const Info = memo(({
    children,
    hasWhiteBg = false,
    isTextWhite = false,
    fullWidth = false,
    singleLine = false,
}: InfoProps) => {
    return (
        <div
            className={classNames(
                styles.Info,
                hasWhiteBg ? styles.orangeBg : styles.whiteBg,
                fullWidth ? styles.fullWidth : styles.withPadding,
                singleLine && styles.singleLine
            )}
        >
            <Text
                fontFamily="onest"
                className={classNames(
                    styles.infoText,
                    isTextWhite ? styles.whiteText : styles.blackText,
                    singleLine && styles.singleLineText
                )}
            >
                {children}
            </Text>
        </div>
    );
});

Info.displayName = 'Info';
export default Info;