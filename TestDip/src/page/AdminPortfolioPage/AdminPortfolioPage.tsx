import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
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
            const canvas = document.createElement('canvas');

            const maxWidth = 1600;
            const scale = image.width > maxWidth ? maxWidth / image.width : 1;

            canvas.width = Math.round(image.width * scale);
            canvas.height = Math.round(image.height * scale);

            const ctx = canvas.getContext('2d');

            if (!ctx) {
                URL.revokeObjectURL(objectUrl);
                reject(new Error('Не удалось обработать изображение'));
                return;
            }

            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

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
                0.85
            );
        };

        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error('Файл не является корректным изображением'));
        };

        image.src = objectUrl;
    });
};

export default function AdminPortfolioPage() {
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [form, setForm] = useState<PortfolioForm>(initialForm);
    const [previewUrl, setPreviewUrl] = useState('');
    const [fileInputKey, setFileInputKey] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<Id | null>(null);
    const [itemToDelete, setItemToDelete] = useState<PortfolioItem | null>(null);
    const [error, setError] = useState('');

    const isSubmitLockedRef = useRef(false);

    const getCourseTitle = (courseId: Id) => {
        const course = courses.find((item) => String(item.id) === String(courseId));

        return course?.title || 'Курс не найден';
    };

    const loadData = async () => {
        setIsLoading(true);
        setError('');

        const [portfolioResult, coursesResult] = await Promise.all([
            supabase.from('portfolio').select('*').order('id', { ascending: false }),
            supabase.from('courses').select('id, title').order('id', { ascending: false }),
        ]);

        if (portfolioResult.error) {
            setError(`Не удалось загрузить портфолио: ${portfolioResult.error.message}`);
            setIsLoading(false);
            return;
        }

        if (coursesResult.error) {
            setError(`Не удалось загрузить курсы: ${coursesResult.error.message}`);
            setIsLoading(false);
            return;
        }

        setPortfolioItems((portfolioResult.data || []) as PortfolioItem[]);
        setCourses((coursesResult.data || []) as Course[]);
        setIsLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const updateForm = (field: keyof PortfolioForm, value: string | File | null) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;

        updateForm('imageFile', file);

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl('');
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isSubmitLockedRef.current) {
            return;
        }

        if (!form.title.trim()) {
            setError('Введите название работы');
            return;
        }

        if (!form.course_id) {
            setError('Выберите курс');
            return;
        }

        if (!form.imageFile) {
            setError('Выберите изображение');
            return;
        }

        isSubmitLockedRef.current = true;
        setIsSaving(true);
        setError('');

        try {
            const preparedImage = await prepareImageForUpload(form.imageFile);

            const filePath = `works/${Date.now()}-${crypto.randomUUID()}.jpg`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio')
                .upload(filePath, preparedImage, {
                    cacheControl: '3600',
                    upsert: true,
                    contentType: 'image/jpeg',
                });

            if (uploadError) {
                setError(`Не удалось загрузить изображение: ${uploadError.message}`);
                return;
            }

            const { data: publicUrlData } = supabase.storage
                .from('portfolio')
                .getPublicUrl(filePath);

            const imageUrl = publicUrlData.publicUrl;

            const { error: insertError } = await supabase.from('portfolio').insert({
                title: form.title.trim(),
                description: form.description.trim() || null,
                image_url: imageUrl,
                student_name: form.student_name.trim() || null,
                student_age: form.student_age ? Number(form.student_age) : null,
                course_id: Number(form.course_id),
            });

            if (insertError) {
                setError(`Не удалось добавить работу: ${insertError.message}`);
                return;
            }

            setForm(initialForm);
            setPreviewUrl('');
            setFileInputKey((prev) => prev + 1);

            await loadData();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Не удалось обработать изображение'
            );
        } finally {
            setIsSaving(false);
            isSubmitLockedRef.current = false;
        }
    };

    const deletePortfolioItem = async () => {
        if (!itemToDelete) return;

        setDeletingId(itemToDelete.id);
        setError('');

        const { error: deleteDbError } = await supabase
            .from('portfolio')
            .delete()
            .eq('id', itemToDelete.id);

        if (deleteDbError) {
            setError(`Не удалось удалить работу: ${deleteDbError.message}`);
            setDeletingId(null);
            return;
        }

        const storagePath = getStoragePathFromPublicUrl(itemToDelete.image_url);

        if (storagePath) {
            await supabase.storage.from('portfolio').remove([storagePath]);
        }

        setPortfolioItems((prev) => prev.filter((item) => item.id !== itemToDelete.id));
        setDeletingId(null);
        setItemToDelete(null);
    };

    if (isLoading) {
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

                <button className={styles.refreshButton} onClick={loadData}>
                    Обновить
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

                <button className={styles.submitButton} type="submit" disabled={isSaving}>
                    {isSaving ? 'Добавляем...' : 'Добавить работу'}
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
                                        disabled={deletingId === item.id}
                                    >
                                        {deletingId === item.id ? 'Удаляем...' : 'Удалить'}
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
                isLoading={!!itemToDelete && deletingId === itemToDelete.id}
                onClose={() => {
                    if (deletingId) return;
                    setItemToDelete(null);
                }}
                onConfirm={deletePortfolioItem}
            />
        </div>
    );
}