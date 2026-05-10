import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../components/supabase/supabase';
import Loader from '../../shared/ui/Loader/Loader';
import ModalPopup from '../../shared/ui/ModalPopup/ModalPopup';
import styles from './AdminTeachersPage.module.css';

type Id = string | number;

type Teacher = {
    id: Id;
    photo: string | null;
    full_name: string;
    biography: string | null;
    work_experience: string | null;
    specialization: string | null;
    education: string | null;
    created_at?: string;
};

type TeacherForm = {
    full_name: string;
    specialization: string;
    biography: string;
    work_experience: string;
    education: string;
    photoFile: File | null;
};

const initialForm: TeacherForm = {
    full_name: '',
    specialization: '',
    biography: '',
    work_experience: '',
    education: '',
    photoFile: null,
};

const TEACHERS_QUERY_KEY = ['admin', 'teachers'] as const;
const TEACHER_PHOTOS_BUCKET = 'teachers';

const withTimeoutSignal = (signal: AbortSignal, timeoutMs = 15000) => {
    const controller = new AbortController();

    const timeoutId = window.setTimeout(() => {
        controller.abort();
    }, timeoutMs);

    const abortHandler = () => {
        controller.abort();
    };

    if (signal.aborted) {
        controller.abort();
    } else {
        signal.addEventListener('abort', abortHandler, { once: true });
    }

    return {
        signal: controller.signal,
        clear: () => {
            window.clearTimeout(timeoutId);
            signal.removeEventListener('abort', abortHandler);
        },
    };
};

const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === 'object' && error !== null && 'message' in error) {
        return String((error as { message?: unknown }).message);
    }

    return 'Неизвестная ошибка';
};

const getStoragePathFromPublicUrl = (url: string | null) => {
    if (!url) return null;

    const marker = `/storage/v1/object/public/${TEACHER_PHOTOS_BUCKET}/`;

    if (!url.includes(marker)) {
        return null;
    }

    return decodeURIComponent(url.split(marker)[1]);
};

const prepareImageForUpload = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        const objectUrl = URL.createObjectURL(file);

        image.onload = () => {
            const maxSide = 1000;

            const scale = Math.min(
                1,
                maxSide / image.width,
                maxSide / image.height
            );

            const width = Math.round(image.width * scale);
            const height = Math.round(image.height * scale);

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');

            if (!ctx) {
                URL.revokeObjectURL(objectUrl);
                reject(new Error('Не удалось обработать изображение'));
                return;
            }

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(image, 0, 0, width, height);

            canvas.toBlob(
                (blob) => {
                    URL.revokeObjectURL(objectUrl);

                    if (!blob) {
                        reject(new Error('Не удалось подготовить изображение'));
                        return;
                    }

                    const normalizedFile = new File(
                        [blob],
                        `${Date.now()}-teacher.jpg`,
                        { type: 'image/jpeg' }
                    );

                    resolve(normalizedFile);
                },
                'image/jpeg',
                0.78
            );
        };

        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error('Файл не является корректным изображением'));
        };

        image.src = objectUrl;
    });
};

const uploadTeacherPhotoDirect = async (filePath: string, file: File) => {
    const timeoutMs = 60000;

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        throw new Error('Нет активной сессии админа');
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey =
        import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
        import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Не найдены переменные Supabase в .env');
    }

    const controller = new AbortController();

    const timeoutId = window.setTimeout(() => {
        controller.abort();
    }, timeoutMs);

    try {
        const cleanSupabaseUrl = supabaseUrl.replace(/\/$/, '');
        const uploadUrl = `${cleanSupabaseUrl}/storage/v1/object/${TEACHER_PHOTOS_BUCKET}/${filePath}`;

        const response = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
                apikey: supabaseAnonKey,
                Authorization: `Bearer ${session.access_token}`,
                'Content-Type': file.type || 'image/jpeg',
                'Cache-Control': '3600',
            },
            body: file,
            signal: controller.signal,
        });

        const responseText = await response.text();

        if (!response.ok) {
            throw new Error(responseText || `Ошибка загрузки фото: ${response.status}`);
        }

        return true;
    } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
            throw new Error(
                'Загрузка фото заняла слишком много времени. Попробуйте фото меньшего размера.'
            );
        }

        throw error;
    } finally {
        window.clearTimeout(timeoutId);
    }
};

const fetchTeachers = async (signal: AbortSignal) => {
    const timeout = withTimeoutSignal(signal);

    try {
        const { data, error } = await supabase
            .from('teachers')
            .select('*')
            .order('id', { ascending: false })
            .abortSignal(timeout.signal);

        if (error) {
            throw error;
        }

        return (data || []) as Teacher[];
    } finally {
        timeout.clear();
    }
};

const createTeacher = async (form: TeacherForm) => {
    let photoUrl: string | null = null;

    if (form.photoFile) {
        const preparedImage = await prepareImageForUpload(form.photoFile);
        const filePath = `photos/${Date.now()}-${crypto.randomUUID()}.jpg`;

        await uploadTeacherPhotoDirect(filePath, preparedImage);

        const { data: publicUrlData } = supabase.storage
            .from(TEACHER_PHOTOS_BUCKET)
            .getPublicUrl(filePath);

        photoUrl = publicUrlData.publicUrl;
    }

    const newTeacher = {
        full_name: form.full_name.trim(),
        specialization: form.specialization.trim() || null,
        biography: form.biography.trim() || null,
        work_experience: form.work_experience.trim() || null,
        education: form.education.trim() || null,
        photo: photoUrl,
    };

    const controller = new AbortController();

    const timeoutId = window.setTimeout(() => {
        controller.abort();
    }, 15000);

    try {
        const { data, error } = await supabase
            .from('teachers')
            .insert(newTeacher)
            .select('*')
            .single()
            .abortSignal(controller.signal);

        if (error) {
            throw error;
        }

        return data as Teacher;
    } finally {
        window.clearTimeout(timeoutId);
    }
};

const removeTeacher = async (teacher: Teacher) => {
    const controller = new AbortController();

    const timeoutId = window.setTimeout(() => {
        controller.abort();
    }, 15000);

    try {
        const { error } = await supabase
            .from('teachers')
            .delete()
            .eq('id', teacher.id)
            .abortSignal(controller.signal);

        if (error) {
            throw error;
        }

        const storagePath = getStoragePathFromPublicUrl(teacher.photo);

        if (storagePath) {
            const { error: storageError } = await supabase.storage
                .from(TEACHER_PHOTOS_BUCKET)
                .remove([storagePath]);

            if (storageError) {
                console.warn('Преподаватель удалён из базы, но фото не удалилось:', storageError);
            }
        }

        return teacher.id;
    } finally {
        window.clearTimeout(timeoutId);
    }
};

export default function AdminTeachersPage() {
    const queryClient = useQueryClient();

    const [form, setForm] = useState<TeacherForm>(initialForm);
    const [previewUrl, setPreviewUrl] = useState('');
    const [fileInputKey, setFileInputKey] = useState(0);
    const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null);
    const [localError, setLocalError] = useState('');

    const isSubmitLockedRef = useRef(false);

    const teachersQuery = useQuery({
        queryKey: TEACHERS_QUERY_KEY,
        queryFn: ({ signal }) => fetchTeachers(signal),
        retry: false,
    });

    const createTeacherMutation = useMutation({
        mutationFn: createTeacher,
        onSuccess: (newTeacher) => {
            queryClient.setQueryData<Teacher[]>(
                TEACHERS_QUERY_KEY,
                (prev = []) => [newTeacher, ...prev]
            );

            setForm(initialForm);
            setPreviewUrl('');
            setFileInputKey((prev) => prev + 1);
        },
        onSettled: () => {
            isSubmitLockedRef.current = false;
        },
    });

    const deleteTeacherMutation = useMutation({
        mutationFn: removeTeacher,
        onSuccess: (deletedId) => {
            queryClient.setQueryData<Teacher[]>(
                TEACHERS_QUERY_KEY,
                (prev = []) =>
                    prev.filter((teacher) => String(teacher.id) !== String(deletedId))
            );

            setTeacherToDelete(null);
        },
    });

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const teachers = teachersQuery.data || [];

    const deletingId = deleteTeacherMutation.isPending
        ? deleteTeacherMutation.variables?.id || null
        : null;

    const error =
        localError ||
        (teachersQuery.isError
            ? `Не удалось загрузить преподавателей: ${getErrorMessage(teachersQuery.error)}`
            : createTeacherMutation.isError
              ? `Не удалось добавить преподавателя: ${getErrorMessage(createTeacherMutation.error)}`
              : deleteTeacherMutation.isError
                ? `Не удалось удалить преподавателя: ${getErrorMessage(deleteTeacherMutation.error)}`
                : '');

    const updateForm = (field: keyof TeacherForm, value: string | File | null) => {
        setLocalError('');

        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;

        updateForm('photoFile', file);

        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl('');
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isSubmitLockedRef.current || createTeacherMutation.isPending) {
            return;
        }

        setLocalError('');

        if (!form.full_name.trim()) {
            setLocalError('Введите имя преподавателя');
            return;
        }

        isSubmitLockedRef.current = true;
        createTeacherMutation.mutate(form);
    };

    const deleteTeacher = () => {
        if (!teacherToDelete || deleteTeacherMutation.isPending) return;

        setLocalError('');
        deleteTeacherMutation.mutate(teacherToDelete);
    };

    if (teachersQuery.isLoading) {
        return <Loader text="Загружаем преподавателей..." />;
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Преподаватели</h1>
                    <p className={styles.subtitle}>
                        Добавляй преподавателей, фото и информацию для карточек.
                    </p>
                </div>

                <button
                    className={styles.refreshButton}
                    onClick={() => teachersQuery.refetch()}
                    disabled={teachersQuery.isFetching}
                >
                    {teachersQuery.isFetching ? 'Обновляем...' : 'Обновить'}
                </button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.formTitle}>Добавить преподавателя</h2>

                <div className={styles.grid}>
                    <label className={styles.label}>
                        Имя преподавателя *
                        <input
                            className={styles.input}
                            value={form.full_name}
                            onChange={(event) => updateForm('full_name', event.target.value)}
                            placeholder="Например: Анна Иванова"
                            required
                        />
                    </label>

                    <label className={styles.label}>
                        Специализация
                        <input
                            className={styles.input}
                            value={form.specialization}
                            onChange={(event) => updateForm('specialization', event.target.value)}
                            placeholder="Например: Графический дизайн"
                        />
                    </label>

                    <label className={styles.label}>
                        Фото
                        <input
                            key={fileInputKey}
                            className={styles.fileInput}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>

                <label className={styles.label}>
                    Биография
                    <textarea
                        className={styles.textarea}
                        value={form.biography}
                        onChange={(event) => updateForm('biography', event.target.value)}
                        placeholder="Краткая биография преподавателя"
                    />
                </label>

                <label className={styles.label}>
                    Опыт работы
                    <textarea
                        className={styles.textarea}
                        value={form.work_experience}
                        onChange={(event) => updateForm('work_experience', event.target.value)}
                        placeholder="Например: 5 лет в дизайне, проекты для брендов..."
                    />
                </label>

                <label className={styles.label}>
                    Образование
                    <textarea
                        className={styles.textarea}
                        value={form.education}
                        onChange={(event) => updateForm('education', event.target.value)}
                        placeholder="Образование, курсы, сертификаты"
                    />
                </label>

                {previewUrl && (
                    <div className={styles.preview}>
                        <p className={styles.previewTitle}>Предпросмотр</p>
                        <img src={previewUrl} alt="Предпросмотр преподавателя" />
                    </div>
                )}

                <button
                    className={styles.submitButton}
                    type="submit"
                    disabled={createTeacherMutation.isPending}
                >
                    {createTeacherMutation.isPending
                        ? 'Добавляем...'
                        : 'Добавить преподавателя'}
                </button>
            </form>

            <div className={styles.teachersList}>
                <h2 className={styles.sectionTitle}>Список преподавателей</h2>

                {teachers.length === 0 ? (
                    <p className={styles.empty}>Преподавателей пока нет.</p>
                ) : (
                    <div className={styles.cards}>
                        {teachers.map((teacher) => (
                            <article className={styles.card} key={teacher.id}>
                                {teacher.photo && (
                                    <img
                                        className={styles.cardImage}
                                        src={teacher.photo}
                                        alt={teacher.full_name}
                                    />
                                )}

                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>
                                        {teacher.full_name}
                                    </h3>

                                    <p className={styles.cardText}>
                                        {teacher.specialization || 'Специализация не указана'}
                                    </p>

                                    <div className={styles.meta}>
                                        <span>
                                            Биография: {teacher.biography || '—'}
                                        </span>
                                        <span>
                                            Опыт: {teacher.work_experience || '—'}
                                        </span>
                                        <span>
                                            Образование: {teacher.education || '—'}
                                        </span>
                                    </div>

                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => setTeacherToDelete(teacher)}
                                        disabled={String(deletingId) === String(teacher.id)}
                                    >
                                        {String(deletingId) === String(teacher.id)
                                            ? 'Удаляем...'
                                            : 'Удалить'}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            <ModalPopup
                isOpen={!!teacherToDelete}
                title="Удалить преподавателя?"
                description={`Преподаватель «${teacherToDelete?.full_name || ''}» будет удалён. Это действие нельзя отменить.`}
                confirmText="Удалить"
                cancelText="Отмена"
                isLoading={deleteTeacherMutation.isPending}
                onClose={() => {
                    if (deleteTeacherMutation.isPending) return;
                    setTeacherToDelete(null);
                }}
                onConfirm={deleteTeacher}
            />
        </div>
    );
}