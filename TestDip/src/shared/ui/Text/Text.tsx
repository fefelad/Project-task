import { memo, useMemo } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Text.module.css';


export const TextSizes = {
    XS: 'xs',
    SM: 'sm',
    BASE: 'base',
    LG: 'lg',
    XL: 'xl',
    xl22: 'xl22',
    XL2: 'xl2',
    XL3: 'xl3',
    XL4: 'xl4',
    XL5: 'xl5',
    XL9: 'xl9'
} as const;


export const TextWeight = {
    REGULAR: 'regular',
    MEDIUM: 'medium',
    SEMIBOLD: 'semibold',
    BOLD: 'bold'
} as const;

export const TextColor = {
    BLACK: 'black',
    WHITE: 'white'
} as const;

export const TextAlign = {
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right'
} as const;

export type TextSizesType = typeof TextSizes[keyof typeof TextSizes];
export type TextWeightType = typeof TextWeight[keyof typeof TextWeight];
export type TextColorType = typeof TextColor[keyof typeof TextColor];
export type TextAlignType = typeof TextAlign[keyof typeof TextAlign];

interface TextProps {
    children: ReactNode;
    size?: TextSizesType;
    weight?: TextWeightType;
    color?: TextColorType;
    align?: TextAlignType;
    fontFamily?: 'involve' | 'onest';
    className?: string;
    overflowLine?: number;
    uppercase?: boolean;
    italic?: boolean;
    underline?: boolean;
    style?: CSSProperties;
}

export const Text = memo((props: TextProps) => {
    const {
        children,
        size = TextSizes.BASE,
        weight = TextWeight.REGULAR,
        color = TextColor.BLACK,
        align = TextAlign.LEFT,
        fontFamily = 'involve',
        className = '',
        overflowLine,
        uppercase = false,
        italic = false,
        underline = false,
        style = {},
    } = props;

    const mods = {
        [styles[size]]: true,
        [styles[weight]]: true,
        [styles[color]]: true,
        [styles[align]]: true,
        [styles[`font-${fontFamily}`]]: true,
        [styles.uppercase]: uppercase,
        [styles.italic]: italic,
        [styles.underline]: underline,
    };

    const overflowStyles: CSSProperties = useMemo(() => {
        if (!overflowLine) return {};
        
        return {
            display: '-webkit-box',
            WebkitLineClamp: overflowLine,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        };
    }, [overflowLine]);

    const combinedStyles: CSSProperties = {
        ...overflowStyles,
        ...style,
    };

    return (
        <p
            className={classNames(styles.Text, mods, className)}
            style={combinedStyles}
        >
            {children}
        </p>
    );
});

Text.displayName = 'Text';
export default Text;