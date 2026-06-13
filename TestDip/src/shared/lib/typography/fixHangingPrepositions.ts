import {
    Children,
    Fragment,
    cloneElement,
    createElement,
    isValidElement,
    type ReactElement,
    type ReactNode,
} from 'react';

const NBSP = '\u00A0';

const SHORT_WORDS = [
    'благодаря',
    'включая',
    'вместо',
    'внутри',
    'вследствие',
    'ввиду',
    'вокруг',
    'между',
    'перед',
    'после',
    'среди',
    'через',
    'около',
    'из-за',
    'из-под',
    'без',
    'вдоль',
    'для',
    'если',
    'когда',
    'либо',
    'лишь',
    'мимо',
    'над',
    'под',
    'при',
    'про',
    'ради',
    'только',
    'хотя',
    'чтобы',
    'вне',
    'в',
    'во',
    'до',
    'за',
    'из',
    'к',
    'ко',
    'на',
    'о',
    'об',
    'обо',
    'от',
    'по',
    'с',
    'со',
    'у',
    'а',
    'и',
    'но',
    'да',
    'или',
    'как',
    'что',
    'чем',
    'не',
    'ни',
    'же',
    'ли',
    'бы',
    'так',
    'уже',
    'еще',
    'ещё',
    'тут',
    'там',
    'где',
    'куда',
];

const SHORT_WORDS_PATTERN = SHORT_WORDS
    .sort((a, b) => b.length - a.length)
    .map((word) => word.replace(/-/g, '\\-'))
    .join('|');

const PREPOSITION_PATTERN = new RegExp(
    `(^|[\\s\\u00A0(\\[{«"'„""—–\\-])(${SHORT_WORDS_PATTERN})\\s+`,
    'gi',
);

const NUMBER_PATTERN =
    /(^|[\s\u00A0(])(от|до|с|со|в|во|к|ко|на|по)\s+(\d)/gi;

export function fixHangingPrepositions(text: string): string {
    if (!text || !/[а-яёА-ЯЁ]/.test(text)) {
        return text;
    }

    let result = text.replace(NUMBER_PATTERN, `$1$2${NBSP}$3`);

    result = result.replace(PREPOSITION_PATTERN, `$1$2${NBSP}`);

    return result;
}

export function fixTypographyChildren(children: ReactNode): ReactNode {
    return Children.map(children, (child) => {
        if (typeof child === 'string') {
            return fixHangingPrepositions(child);
        }

        if (child === null || child === undefined || typeof child === 'boolean') {
            return child;
        }

        if (typeof child === 'number') {
            return child;
        }

        if (!isValidElement(child)) {
            return child;
        }

        const element = child as ReactElement<{ children?: ReactNode }>;

        if (element.type === Fragment) {
            return createElement(Fragment, null, fixTypographyChildren(element.props.children));
        }

        if (element.props.children == null) {
            return element;
        }

        return cloneElement(element, {
            ...element.props,
            children: fixTypographyChildren(element.props.children),
        });
    });
}
