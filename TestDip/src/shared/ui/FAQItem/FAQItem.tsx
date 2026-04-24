import { useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './FAQItem.module.css';
import Text from '../Text/Text';

interface FAQItemProps {
    title: string;
    text: string;
}

export const FAQItem = ({ title, text }: FAQItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className={classNames(styles.faqItem, {
            [styles.open]: isOpen,
        })}
        >
            <button
                className={styles.header}
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <Text fontFamily="onest" className={styles.title}>
                    {title}
                </Text>

                <span className={styles.icon}>
                    <svg viewBox="0 0 27 26" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1 13H26M13.5 1V25"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </button>

            <div
                ref={contentRef}
                className={styles.content}
                style={{
                    maxHeight: isOpen
                        ? `${contentRef.current?.scrollHeight}px`
                        : '0px',
                }}
            >
                <Text fontFamily="onest" className={styles.text}>
                    {text}
                </Text>
            </div>
        </div>
    );
};