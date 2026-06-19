import { useEffect, useRef, useState, type ReactNode } from 'react';
import classNames from 'classnames';
import Text, { TextSizes, TextWeight } from '../../../../shared/ui/Text/Text';
import styles from './TeacherDetailPage.module.css';

interface TeacherCollapsibleBlockProps {
  title: string;
  className?: string;
  collapsible?: boolean;
  children: ReactNode;
}

export default function TeacherCollapsibleBlock({
  title,
  className,
  collapsible = false,
  children,
}: TeacherCollapsibleBlockProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!collapsible) {
      setIsOpen(false);
    }
  }, [collapsible]);

  const handleToggle = () => {
    if (collapsible) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div
      className={classNames(
        styles.infoBlock,
        className,
        collapsible && styles.collapsibleBlock,
        collapsible && isOpen && styles.collapsibleBlockOpen,
      )}
    >
      {collapsible ? (
        <button
          type="button"
          className={styles.collapsibleHeader}
          onClick={handleToggle}
          aria-expanded={isOpen}
        >
          <Text
            weight={TextWeight.MEDIUM}
            size={TextSizes.XL2}
            className={styles.blockTitle}
            fontFamily="onest"
          >
            {title}
          </Text>

          <span className={styles.collapsibleToggle}>
            <Text fontFamily="onest" className={styles.collapsibleToggleText}>
              {isOpen ? 'Свернуть' : 'Развернуть'}
            </Text>
            <svg
              className={styles.collapsibleToggleIcon}
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M1 1.5L7 6.5L13 1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      ) : (
        <Text
          weight={TextWeight.MEDIUM}
          size={TextSizes.XL2}
          className={styles.blockTitle}
          fontFamily="onest"
        >
          {title}
        </Text>
      )}

      {collapsible ? (
        <div
          ref={contentRef}
          className={classNames(
            styles.collapsibleBody,
            !isOpen && styles.collapsibleBodyClosed,
          )}
          style={{
            maxHeight: isOpen
              ? `${contentRef.current?.scrollHeight ?? 0}px`
              : '0px',
          }}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
