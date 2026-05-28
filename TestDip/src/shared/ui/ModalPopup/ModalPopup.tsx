import { useEffect, type ReactNode } from 'react';
import Text, { TextSizes, TextWeight } from '../Text/Text';
import styles from './ModalPopup.module.css';

interface ModalPopupProps {
    isOpen: boolean;
    title: string;
    description?: string;
    children?: ReactNode;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    hideActions?: boolean;
    contentClassName?: string;
    modalClassName?: string;
    onClose: () => void;
    onConfirm?: () => void;
}

function ModalPopup({
    isOpen,
    title,
    description,
    children,
    confirmText = 'Хорошо',
    cancelText,
    isLoading = false,
    hideActions = false,
    contentClassName,
    modalClassName,
    onClose,
    onConfirm,
}: ModalPopupProps) {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
            return;
        }

        onClose();
    };

    return (
        <div className={styles.ModalOverlay} onClick={onClose}>
            <div
                className={`${styles.Modal} ${modalClassName || ''}`}
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className={styles.ModalClose}
                    onClick={onClose}
                    aria-label="Закрыть окно"
                >
                    ×
                </button>

                <Text
                    className={styles.ModalTitle}
                    fontFamily="involve"
                    weight={TextWeight.REGULAR}
                    size={TextSizes.XL4}
                >
                    {title}
                </Text>

                {description && (
                    <Text
                        className={styles.ModalDescription}
                        fontFamily="onest"
                        weight={TextWeight.REGULAR}
                        size={TextSizes.XL}
                    >
                        {description}
                    </Text>
                )}

                {children && (
                    <div className={`${styles.ModalContent} ${contentClassName || ''}`}>
                        {children}
                    </div>
                )}

                {!hideActions && (
                <div className={styles.ModalActions}>
                    {cancelText && (
                        <button
                            type="button"
                            className={styles.CancelButton}
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            {cancelText}
                        </button>
                    )}

                    <button
                        type="button"
                        className={styles.ConfirmButton}
                        onClick={handleConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Подождите...' : confirmText}
                    </button>
                </div>
                )}
            </div>
        </div>
    );
}

export default ModalPopup;