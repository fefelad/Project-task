import Input from '../Input/Input';
import FormCheckbox from '../FormCheckbox/FormCheckbox';
import Btn from '../Btn/Btn';
import Text, { TextSizes, TextWeight } from '../Text/Text';
import styles from './Feedback.module.css';
import { ReactNode } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { feedbackSchema, type FeedbackFormData } from './schemas/feedback.schema';

interface FeedbackProps {
    title: string;
    children: ReactNode;
    fullWidth?: boolean;
    contentPadding?: string | number;
    showForm?: boolean;
    onSubmitSuccess?: (data: FeedbackFormData) => void;
}

export default function Feedback({ 
    title, 
    children, 
    fullWidth = false,
    contentPadding = '220px',
    showForm = true,
    onSubmitSuccess
}: FeedbackProps) {
    const {
        control,
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValid },
        reset,
        watch
    } = useForm<FeedbackFormData>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            name: '',
            email: '',
            agreement: false
        },
        mode: 'onChange'
    });

    const agreement = watch('agreement');
    const name = watch('name');
    const email = watch('email');

    const onSubmit = async (data: FeedbackFormData) => {
        try {
            console.log('Данные формы:', data);
            
            if (onSubmitSuccess) {
                onSubmitSuccess(data);
            }
            
            alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
            reset();
        } catch (error) {
            console.error('Ошибка отправки формы:', error);
            alert('Произошла ошибка при отправке формы. Попробуйте еще раз.');
        }
    };

    const contentStyle = fullWidth ? {
        padding: `0 ${typeof contentPadding === 'number' ? `${contentPadding}px` : contentPadding}`,
        maxWidth: '100%',
        boxSizing: 'border-box' as const,
        margin: '0 auto'
    } : {};

    return (
        <div className={`${styles.FeedbackWrapper} ${fullWidth ? styles.fullWidth : ''}`}>
            <div 
                className={styles.FeedbackContent}
                style={contentStyle}
            >
                <div className={styles.FeedbackGrid}>
                    <div className={styles.TextColumn}>
                        <Text 
                            className={styles.FeedbackContentTitle} 
                            fontFamily='involve' 
                            weight={TextWeight.REGULAR} 
                            size={TextSizes.XL5}
                        >
                            {title}
                        </Text>
                        <Text 
                            className={styles.FeedbackContentDescription} 
                            fontFamily='onest' 
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
                                    <label className={styles.FormLabel}>Введите ваше имя</label>
                                    <Input 
                                        plasholder="Ваше имя"
                                        {...register('name')}
                                        error={errors.name?.message}
                                    />
                                </div>
                                
                                <div className={styles.FormGroup}>
                                    <label className={styles.FormLabel}>Введите вашу почту</label>
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
                                                onChange={(e) => field.onChange(e.target.checked)}
                                                error={errors.agreement?.message}
                                            />
                                        )}
                                    />
                                </div>
                                
                                <div className={styles.ButtonContainer}>
                                    <Btn 
                                        color="orange"
                                        type="submit"
                                        disabled={!agreement || isSubmitting || !isValid || name.length < 2 || !email}
                                        className={styles.SubmitButton}
                                    >
                                        {isSubmitting ? 'Отправка...' : 'Оставить заявку'}
                                    </Btn>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}