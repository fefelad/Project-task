import Input from '../Input/Input';
import FormCheckbox from '../FormCheckbox/FormCheckbox';
import Btn from '../Btn/Btn';
import Text, { TextSizes, TextWeight } from '../Text/Text';
import ModalPopup from '../ModalPopup/ModalPopup';
import styles from './Feedback.module.css';
import { useState, type ReactNode } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { feedbackSchema, type FeedbackFormData } from './schemas/feedback.schema';

import { supabase } from '../../../components/supabase/supabase.ts';

interface FeedbackProps {
    title: string;
    children: ReactNode;
    fullWidth?: boolean;
    showForm?: boolean;
    onSubmitSuccess?: (data: FeedbackFormData) => void;
    textBtn?: string;
}

export default function Feedback({
    title,
    children,
    fullWidth = false,
    showForm = true,
    onSubmitSuccess,
    textBtn,
}: FeedbackProps) {
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

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

    const onSubmit = async (data: FeedbackFormData) => {
        try {
            const { error } = await supabase
                .from('feedback_requests')
                .insert({
                    name: data.name.trim(),
                    email: data.email.trim(),
                    agreement: data.agreement,
                });

            if (error) {
                throw error;
            }

            if (onSubmitSuccess) {
                onSubmitSuccess(data);
            }

            reset();
            setIsSuccessModalOpen(true);
        } catch (error) {
            console.error('Ошибка отправки формы:', error);
            setIsErrorModalOpen(true);
        }
    };

    const wrapperClasses = [
        styles.FeedbackWrapper,
        fullWidth ? styles.fullWidth : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <>
            <div className={wrapperClasses}>
                <div className={styles.FeedbackContent}>
                    <div className={styles.FeedbackGrid}>
                        <div className={styles.TextColumn}>
                            <Text
                                className={styles.FeedbackContentTitle}
                                fontFamily="involve"
                                weight={TextWeight.REGULAR}
                                size={TextSizes.XL5}
                            >
                                {title}
                            </Text>

                            <Text
                                className={styles.FeedbackContentDescription}
                                fontFamily="onest"
                                weight={TextWeight.REGULAR}
                                size={TextSizes.XL}
                            >
                                {children}
                            </Text>
                        </div>

                        {showForm && (
                            <div className={styles.FormColumn}>
                                <form
                                    className={styles.FeedbackForm}
                                    onSubmit={handleSubmit(onSubmit)}
                                    noValidate
                                >
                                    <div className={styles.FormGroup}>
                                        <label className={styles.FormLabel}>
                                            Введите ваше имя
                                        </label>

                                        <Input
                                            plasholder="Ваше имя"
                                            {...register('name')}
                                            error={errors.name?.message}
                                        />
                                    </div>

                                    <div className={styles.FormGroup}>
                                        <label className={styles.FormLabel}>
                                            Введите вашу почту
                                        </label>

                                        <Input
                                            plasholder="example@mail.ru"
                                            type="email"
                                            {...register('email')}
                                            error={errors.email?.message}
                                        />
                                    </div>

                                    <div className={styles.CheckboxGroup}>
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

                                    <div className={styles.ButtonContainer}>
                                        <Btn
                                            color="orange"
                                            type="submit"
                                            disabled={
                                                !agreement ||
                                                isSubmitting ||
                                                !isValid ||
                                                name.length < 2 ||
                                                !email
                                            }
                                            className={styles.SubmitButton}
                                        >
                                            {isSubmitting
                                                ? 'Отправка...'
                                                : textBtn || 'Оставить заявку'}
                                        </Btn>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ModalPopup
                isOpen={isSuccessModalOpen}
                title="Заявка отправлена!"
                description="Спасибо! Мы получили вашу заявку и свяжемся с вами в ближайшее время."
                confirmText="Хорошо"
                onClose={() => setIsSuccessModalOpen(false)}
            />

            <ModalPopup
                isOpen={isErrorModalOpen}
                title="Ошибка отправки"
                description="Произошла ошибка при отправке формы. Попробуйте ещё раз."
                confirmText="Хорошо"
                onClose={() => setIsErrorModalOpen(false)}
            />
        </>
    );
}