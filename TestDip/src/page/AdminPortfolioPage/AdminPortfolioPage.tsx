import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../components/supabase/supabase';
import Loader from '../../shared/ui/Loader/Loader';
import ModalPopup from '../../shared/ui/ModalPopup/ModalPopup';
import styles from './AdminPortfolioPage.module.css';

type Id = string | number;

type PortfolioItem = {
    id: Id;
    title: string;
    description: string | null;
    image_url: string | null;
    student_name: string | null;
    student_age: number | null;
    course_id: Id;
    created_at?: string;
};

type Course = {
    id: Id;
    title: string;
};

type PortfolioForm = {
    title: string;
    description: string;
    student_name: string;
    student_age: string;
    course_id: string;
    imageFile: File | null;
};

const initialForm: PortfolioForm = {
    title: '',
    description: '',
    student_name: '',
    student_age: '',
    course_id: '',
    imageFile: null,
};

const PORTFOLIO_QUERY_KEY = ['admin', 'portfolio'] as const;
const COURSES_QUERY_KEY = ['admin', 'courses'] as const;

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

    const marker = '/storage/v1/object/public/portfolio/';

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
            const maxSide = 1200;

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
                        `${Date.now()}-portfolio.jpg`,
                        { type: 'image/jpeg' }
                    );

                    resolve(normalizedFile);
                },
                'image/jpeg',
                0.75
            );
        };

        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error('Файл не является корректным изображением'));
        };

        image.src = objectUrl;
    });
};

const uploadImageDirect = async (filePath: string, file: File) => {
    const timeoutMs = 15000;

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
        const uploadUrl = `${cleanSupabaseUrl}/storage/v1/object/portfolio/${filePath}`;

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
            throw new Error(responseText || `Ошибка загрузки: ${response.status}`);
        }

        return {
            success: true,
            timeout: false,
        };
    } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
            console.warn('Upload timeout, but file may already be uploaded:', filePath);

            return {
                success: true,
                timeout: true,
            };
        }

        throw error;
    } finally {
        window.clearTimeout(timeoutId);
    }
};

const fetchPortfolioItems = async (signal: AbortSignal) => {
    const timeout = withTimeoutSignal(signal);

    try {
        const { data, error } = await supabase
            .from('portfolio')
            .select('*')
            .order('id', { ascending: false })
            .abortSignal(timeout.signal);

        if (error) {
            throw error;
        }

        return (data || []) as PortfolioItem[];
    } finally {
        timeout.clear();
    }
};

const fetchCourses = async (signal: AbortSignal) => {
    const timeout = withTimeoutSignal(signal);

    try {
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .order('id', { ascending: false })
            .abortSignal(timeout.signal);

        if (error) {
            throw error;
        }

        return (data || []) as Course[];
    } finally {
        timeout.clear();
    }
};

const createPortfolioItem = async (form: PortfolioForm) => {
    if (!form.imageFile) {
        throw new Error('Выберите изображение');
    }

    const preparedImage = await prepareImageForUpload(form.imageFile);
    const filePath = `works/${Date.now()}-${crypto.randomUUID()}.jpg`;

    const uploadResult = await uploadImageDirect(filePath, preparedImage);

    if (uploadResult.timeout) {
        console.warn(
            'Продолжаем создание записи, потому что файл мог уже загрузиться:',
            filePath
        );
    }

    const { data: publicUrlData } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath);

    const imageUrl = publicUrlData.publicUrl;

    const newPortfolioItem = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        image_url: imageUrl,
        student_name: form.student_name.trim() || null,
        student_age: form.student_age ? Number(form.student_age) : null,
        course_id: Number(form.course_id),
    };

    const controller = new AbortController();

    const timeoutId = window.setTimeout(() => {
        controller.abort();
    }, 15000);

    try {
        const { data, error } = await supabase
            .from('portfolio')
            .insert(newPortfolioItem)
            .select('*')
            .single()
            .abortSignal(controller.signal);

        if (error) {
            throw error;
        }

        return data as PortfolioItem;
    } finally {
        window.clearTimeout(timeoutId);
    }
};

const removePortfolioItem = async (item: PortfolioItem) => {
    const controller = new AbortController();

    const timeoutId = window.setTimeout(() => {
        controller.abort();
    }, 15000);

    try {
        const { error } = await supabase
            .from('portfolio')
            .delete()
            .eq('id', item.id)
            .abortSignal(controller.signal);

        if (error) {
            throw error;
        }

        const storagePath = getStoragePathFromPublicUrl(item.image_url);

        if (storagePath) {
            const { error: storageError } = await supabase.storage
                .from('portfolio')
                .remove([storagePath]);

            if (storageError) {
                console.warn('Работа удалена из базы, но файл не удалился:', storageError);
            }
        }

        return item.id;
    } finally {
        window.clearTimeout(timeoutId);
    }
};

export default function AdminPortfolioPage() {
    const queryClient = useQueryClient();

    const [form, setForm] = useState<PortfolioForm>(initialForm);
    const [previewUrl, setPreviewUrl] = useState('');
    const [fileInputKey, setFileInputKey] = useState(0);
    const [itemToDelete, setItemToDelete] = useState<PortfolioItem | null>(null);
    const [localError, setLocalError] = useState('');

    const isSubmitLockedRef = useRef(false);

    const portfolioQuery = useQuery({
        queryKey: PORTFOLIO_QUERY_KEY,
        queryFn: ({ signal }) => fetchPortfolioItems(signal),
        retry: false,
    });

    const coursesQuery = useQuery({
        queryKey: COURSES_QUERY_KEY,
        queryFn: ({ signal }) => fetchCourses(signal),
        retry: false,
    });

    const createPortfolioMutation = useMutation({
        mutationFn: createPortfolioItem,
        onSuccess: (newItem) => {
            queryClient.setQueryData<PortfolioItem[]>(
                PORTFOLIO_QUERY_KEY,
                (prev = []) => [newItem, ...prev]
            );

            setForm(initialForm);
            setPreviewUrl('');
            setFileInputKey((prev) => prev + 1);
        },
        onSettled: () => {
            isSubmitLockedRef.current = false;
        },
    });

    const deletePortfolioMutation = useMutation({
        mutationFn: removePortfolioItem,
        onSuccess: (deletedId) => {
            queryClient.setQueryData<PortfolioItem[]>(
                PORTFOLIO_QUERY_KEY,
                (prev = []) =>
                    prev.filter((item) => String(item.id) !== String(deletedId))
            );

            setItemToDelete(null);
        },
    });

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const portfolioItems = portfolioQuery.data || [];
    const courses = coursesQuery.data || [];

    const isInitialLoading = portfolioQuery.isLoading || coursesQuery.isLoading;
    const isFetching = portfolioQuery.isFetching || coursesQuery.isFetching;

    const deletingId = deletePortfolioMutation.isPending
        ? deletePortfolioMutation.variables?.id || null
        : null;

    const error =
        localError ||
        (portfolioQuery.isError
            ? `Не удалось загрузить портфолио: ${getErrorMessage(portfolioQuery.error)}`
            : coursesQuery.isError
              ? `Не удалось загрузить курсы: ${getErrorMessage(coursesQuery.error)}`
              : createPortfolioMutation.isError
                ? `Не удалось добавить работу: ${getErrorMessage(createPortfolioMutation.error)}`
                : deletePortfolioMutation.isError
                  ? `Не удалось удалить работу: ${getErrorMessage(deletePortfolioMutation.error)}`
                  : '');

    const getCourseTitle = (courseId: Id) => {
        const course = courses.find((item) => String(item.id) === String(courseId));

        return course?.title || 'Курс не найден';
    };

    const refreshData = () => {
        void Promise.all([
            portfolioQuery.refetch(),
            coursesQuery.refetch(),
        ]);
    };

    const updateForm = (field: keyof PortfolioForm, value: string | File | null) => {
        setLocalError('');

        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;

        updateForm('imageFile', file);

        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl('');
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isSubmitLockedRef.current || createPortfolioMutation.isPending) {
            return;
        }

        setLocalError('');

        if (!form.title.trim()) {
            setLocalError('Введите название работы');
            return;
        }

        if (!form.course_id) {
            setLocalError('Выберите курс');
            return;
        }

        if (!form.imageFile) {
            setLocalError('Выберите изображение');
            return;
        }

        isSubmitLockedRef.current = true;
        createPortfolioMutation.mutate(form);
    };

    const deletePortfolioItem = () => {
        if (!itemToDelete || deletePortfolioMutation.isPending) return;

        setLocalError('');
        deletePortfolioMutation.mutate(itemToDelete);
    };

    if (isInitialLoading) {
        return <Loader text="Загружаем портфолио..." />;
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Портфолио</h1>
                    <p className={styles.subtitle}>
                        Добавляй новые работы учеников и изображения.
                    </p>
                </div>

                <button
                    className={styles.refreshButton}
                    onClick={refreshData}
                    disabled={isFetching}
                >
                    {isFetching ? 'Обновляем...' : 'Обновить'}
                </button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.formTitle}>Добавить работу</h2>

                <div className={styles.grid}>
                    <label className={styles.label}>
                        Название работы *
                        <input
                            className={styles.input}
                            value={form.title}
                            onChange={(event) => updateForm('title', event.target.value)}
                            placeholder="Например: Постер для магазина"
                            required
                        />
                    </label>

                    <label className={styles.label}>
                        Курс *
                        <select
                            className={styles.input}
                            value={form.course_id}
                            onChange={(event) => updateForm('course_id', event.target.value)}
                            required
                        >
                            <option value="">Выберите курс</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.title}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className={styles.label}>
                        Имя ученика
                        <input
                            className={styles.input}
                            value={form.student_name}
                            onChange={(event) => updateForm('student_name', event.target.value)}
                            placeholder="Например: Маша"
                        />
                    </label>

                    <label className={styles.label}>
                        Возраст ученика
                        <input
                            className={styles.input}
                            type="number"
                            value={form.student_age}
                            onChange={(event) => updateForm('student_age', event.target.value)}
                            placeholder="Например: 12"
                        />
                    </label>

                    <label className={styles.label}>
                        Изображение *
                        <input
                            key={fileInputKey}
                            className={styles.fileInput}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </label>
                </div>

                <label className={styles.label}>
                    Описание
                    <textarea
                        className={styles.textarea}
                        value={form.description}
                        onChange={(event) => updateForm('description', event.target.value)}
                        placeholder="Описание работы"
                    />
                </label>

                {previewUrl && (
                    <div className={styles.preview}>
                        <p className={styles.previewTitle}>Предпросмотр</p>
                        <img src={previewUrl} alt="Предпросмотр работы" />
                    </div>
                )}

                <button
                    className={styles.submitButton}
                    type="submit"
                    disabled={createPortfolioMutation.isPending}
                >
                    {createPortfolioMutation.isPending ? 'Добавляем...' : 'Добавить работу'}
                </button>
            </form>

            <div className={styles.portfolioList}>
                <h2 className={styles.sectionTitle}>Список работ</h2>

                {portfolioItems.length === 0 ? (
                    <p className={styles.empty}>Работ пока нет.</p>
                ) : (
                    <div className={styles.cards}>
                        {portfolioItems.map((item) => (
                            <article className={styles.card} key={item.id}>
                                {item.image_url && (
                                    <img
                                        className={styles.cardImage}
                                        src={item.image_url}
                                        alt={item.title}
                                    />
                                )}

                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>{item.title}</h3>

                                    <p className={styles.cardDescription}>
                                        {item.description || 'Без описания'}
                                    </p>

                                    <div className={styles.meta}>
                                        <span>Курс: {getCourseTitle(item.course_id)}</span>
                                        <span>Ученик: {item.student_name || '—'}</span>
                                        <span>Возраст: {item.student_age || '—'}</span>
                                    </div>

                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => setItemToDelete(item)}
                                        disabled={String(deletingId) === String(item.id)}
                                    >
                                        {String(deletingId) === String(item.id)
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
                isOpen={!!itemToDelete}
                title="Удалить работу?"
                description={`Работа «${itemToDelete?.title || ''}» будет удалена. Это действие нельзя отменить.`}
                confirmText="Удалить"
                cancelText="Отмена"
                isLoading={deletePortfolioMutation.isPending}
                onClose={() => {
                    if (deletePortfolioMutation.isPending) return;
                    setItemToDelete(null);
                }}
                onConfirm={deletePortfolioItem}
            />
        </div>
    );
}