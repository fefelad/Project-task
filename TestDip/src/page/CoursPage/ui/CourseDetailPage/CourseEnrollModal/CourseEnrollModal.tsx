import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import ModalPopup from '../../../../../shared/ui/ModalPopup/ModalPopup';
import Input from '../../../../../shared/ui/Input/Input';
import FormCheckbox from '../../../../../shared/ui/FormCheckbox/FormCheckbox';
import Btn from '../../../../../shared/ui/Btn/Btn';
import {
    feedbackSchema,
    type FeedbackFormData,
} from '../../../../../shared/ui/FeedbackBlock/schemas/feedback.schema';
import { supabase } from '../../../../../components/supabase/supabase';

import styles from './CourseEnrollModal.module.css';

const SUBMIT_ERROR_MESSAGE =
    'Не удалось отправить заявку. Попробуйте ещё раз.';

interface CourseEnrollModalProps {
    isOpen: boolean;
    courseId: number;
    courseTitle: string;
    onClose: () => void;
}

export default function CourseEnrollModal({
    isOpen,
    courseId,
    courseTitle,
    onClose,
}: CourseEnrollModalProps) {
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValid },
        reset,
        watch,
    } = useForm<FeedbackFormData>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            name: '',
            email: '',
            agreement: false,
        },
        mode: 'onChange',
    });

    const agreement = watch('agreement');
    const name = watch('name');
    const email = watch('email');

    useEffect(() => {
        if (!isOpen) {
            setSubmitError(null);
        }
    }, [isOpen]);

    useEffect(() => {
        if (submitError) {
            setSubmitError(null);
        }
    }, [name, email, agreement]);

    const handleClose = () => {
        if (isSubmitting) return;
        setSubmitError(null);
        reset();
        onClose();
    };

    const onSubmit = async (data: FeedbackFormData) => {
        setSubmitError(null);

        try {
            const { error } = await supabase.from('feedback_requests').insert({
                name: data.name.trim(),
                email: data.email.trim(),
                agreement: data.agreement,
                admin_comment: `Запись на курс: ${courseTitle} (id: ${courseId})`,
            });

            if (error) {
                throw error;
            }

            reset();
            onClose();
            setIsSuccessModalOpen(true);
        } catch (error) {
            console.error('Ошибка записи на курс:', error);
            setSubmitError(SUBMIT_ERROR_MESSAGE);
        }
    };

    return (
        <>
            <ModalPopup
                isOpen={isOpen}
                title="Запись на курс"
                description="Оставьте контакты — мы свяжемся с вами и подтвердим запись."
                hideActions
                modalClassName={styles.enrollModal}
                contentClassName={styles.enrollModalContent}
                onClose={handleClose}
            >
                <form
                    className={styles.form}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Ваше имя</label>
                        <Input
                            plasholder="Ваше имя"
                            {...register('name')}
                            error={errors.name?.message}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Ваша почта</label>
                        <Input
                            plasholder="example@mail.ru"
                            type="email"
                            {...register('email')}
                            error={errors.email?.message}
                        />
                    </div>

                    <div className={styles.checkboxGroup}>
                        <Controller
                            name="agreement"
                            control={control}
                            render={({ field }) => (
                                <FormCheckbox
                                    label="Согласен на обработку персональных данных"
                                    checked={field.value}
                                    onChange={(event) =>
                                        field.onChange(event.target.checked)
                                    }
                                    error={errors.agreement?.message}
                                />
                            )}
                        />
                    </div>

                    {submitError && (
                        <p className={styles.submitError} role="alert">
                            {submitError}
                        </p>
                    )}

                    <Btn
                        color="orange"
                        type="submit"
                        className={styles.submitButton}
                        disabled={
                            !agreement ||
                            isSubmitting ||
                            !isValid ||
                            name.length < 2 ||
                            !email
                        }
                    >
                        {isSubmitting ? 'Отправка...' : 'Записаться'}
                    </Btn>
                </form>
            </ModalPopup>

            <ModalPopup
                isOpen={isSuccessModalOpen}
                title="Заявка отправлена!"
                description="Спасибо! Мы получили вашу заявку на курс и свяжемся с вами в ближайшее время."
                confirmText="Хорошо"
                onClose={() => setIsSuccessModalOpen(false)}
            />
        </>
    );
}
