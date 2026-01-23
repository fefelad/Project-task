import { memo } from 'react';
import type { CSSProperties } from 'react';
import classNames from 'classnames';
import Text, { TextSizes, type TextSizesType } from '../Text/Text';
import styles from './PopupInfo.module.css';

export type PopupInfoColor = 'blue' | 'orange';

interface PopupInfoProps {
    children: React.ReactNode;
    color: PopupInfoColor;
    className?: string;
    textSize?: TextSizesType;
    textStyle?: CSSProperties;
}

export const PopupInfo = memo(({ children, color, className, textSize, textStyle }: PopupInfoProps) => {
    return (
        <div className={classNames(styles.popupInfo, className)}>
            <svg 
                width="296" 
                height="93" 
                viewBox="0 0 296 93" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={styles.svg}
            >
                <path 
                    d="M0.6869 32.4834C66.2888 -1.28095 160.875 -13.6285 248.93 27.2823C336.984 68.1932 276.149 84.5706 242.829 87.3592C209.51 90.1478 34.9618 93.6172 13.846 51.9108C-7.26975 10.2044 254.421 23.2305 276.422 45.8021C298.424 68.3737 278.193 76.2232 212.514 85.895C146.835 95.5668 40.2405 93.1668 13.2873 63.4783C-13.6659 33.7899 139.747 10.6765 270.316 31.5138" 
                    stroke="currentColor"
                    strokeWidth="3"
                    className={styles[color]}
                />
            </svg>
            <div className={styles.content}>
                <Text size={textSize} style={textStyle} fontFamily='onest'>
                    {children}
                </Text>
            </div>
        </div>
    );
});

PopupInfo.displayName = 'PopupInfo';
export default PopupInfo;
