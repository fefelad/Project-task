import { z } from 'zod';

export const feedbackSchema = z.object({
    name: z.string()
        .min(2, { message: 'Имя должно содержать минимум 2 символа' })
        .max(50, { message: 'Имя не должно превышать 50 символов' })
        .regex(/^[^\d]*$/, { 
            message: 'Имя не должно содержать цифры' 
        })
        .regex(/^[a-zA-Zа-яА-ЯёЁ\s\-']+$/, {
            message: 'Имя может содержать только буквы, пробелы, дефисы и апострофы'
        })
        .trim()
        .refine((name) => {
            const lettersOnly = name.replace(/[\s\-']/g, '');
            return /^[a-zA-Zа-яА-ЯёЁ]+$/.test(lettersOnly);
        }, {
            message: 'Имя должно содержать хотя бы одну букву'
        }),
    
    email: z.string()
        .min(1, { message: 'Email обязателен для заполнения' })
        .email({ message: 'Введите корректный email адрес' })
        .trim()
        .toLowerCase(),
    
    agreement: z.boolean()
        .refine(val => val === true, {
            message: 'Необходимо согласие на обработку персональных данных'
        })
});

export type FeedbackFormData = z.infer<typeof feedbackSchema>;