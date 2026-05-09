import { useEffect, useRef, useState, type FormEvent } from 'react';
import { supabase } from '../../components/supabase/supabase';
import Loader from '../../shared/ui/Loader/Loader';
import ModalPopup from '../../shared/ui/ModalPopup/ModalPopup';
import styles from './AdminCoursesPage.module.css';

type Id = string | number;

type Course = {
    id: Id;
    title: string;
    description: string | null;
    age_group: string | null;
    direction: string | null;
    price: number | null;
    schedule: string | null;
    format: string | null;
    duration: string | null;
    start_date: string | null;
    teacher_id: Id | null;
    category_id: Id | null;
};

type Teacher = {
    id: Id;
    full_name?: string;
    name?: string;
    title?: string;
};

type Category = {
    id: Id;
    title?: string;
    name?: string;
};

type CourseForm = {
    title: string;
    description: string;
    age_group: string;
    direction: string;
    price: string;
    schedule: string;
    format: string;
    duration: string;
    start_date: string;
    teacher_id: string;
    category_id: string;
};

const initialForm: CourseForm = {
    title: '',
    description: '',
    age_group: '',
    direction: '',
    price: '',
    schedule: '',
    format: '',
    duration: '',
    start_date: '',
    teacher_id: '',
    category_id: '',
};

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [form, setForm] = useState<CourseForm>(initialForm);

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<Id | null>(null);
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
    const [error, setError] = useState('');

    const isSubmitLockedRef = useRef(false);

    const getTeacherName = (teacherId: Id | null) => {
        if (!teacherId) return 'Не выбран';

        const teacher = teachers.find((item) => String(item.id) === String(teacherId));

        return teacher?.full_name || teacher?.name || teacher?.title || 'Не найден';
    };

    const getCategoryName = (categoryId: Id | null) => {
        if (!categoryId) return 'Не выбрана';

        const category = categories.find((item) => String(item.id) === String(categoryId));

        return category?.title || category?.name || 'Не найдена';
    };

    const loadData = async () => {
        setIsLoading(true);
        setError('');

        const [coursesResult, teachersResult, categoriesResult] = await Promise.all([
            supabase.from('courses').select('*').order('id', { ascending: false }),
            supabase.from('teachers').select('*').order('id', { ascending: true }),
            supabase.from('categories').select('*').order('id', { ascending: true }),
        ]);

        if (coursesResult.error) {
            setError(`Не удалось загрузить курсы: ${coursesResult.error.message}`);
            setIsLoading(false);
            return;
        }

        if (teachersResult.error) {
            setError(`Не удалось загрузить преподавателей: ${teachersResult.error.message}`);
            setIsLoading(false);
            return;
        }

        if (categoriesResult.error) {
            setError(`Не удалось загрузить категории: ${categoriesResult.error.message}`);
            setIsLoading(false);
            return;
        }

        setCourses((coursesResult.data || []) as Course[]);
        setTeachers((teachersResult.data || []) as Teacher[]);
        setCategories((categoriesResult.data || []) as Category[]);
        setIsLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const updateForm = (field: keyof CourseForm, value: string) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isSubmitLockedRef.current) {
            return;
        }

        isSubmitLockedRef.current = true;
        setIsSaving(true);
        setError('');

        try {
            const { error } = await supabase.from('courses').insert({
                title: form.title.trim(),
                description: form.description.trim() || null,
                age_group: form.age_group.trim() || null,
                direction: form.direction.trim() || null,
                price: form.price ? Number(form.price) : null,
                schedule: form.schedule.trim() || null,
                format: form.format.trim() || null,
                duration: form.duration.trim() || null,
                start_date: form.start_date || null,
                teacher_id: form.teacher_id ? Number(form.teacher_id) : null,
                category_id: form.category_id ? Number(form.category_id) : null,
            });

            if (error) {
                setError(`Не удалось добавить курс: ${error.message}`);
                return;
            }

            setForm(initialForm);
            await loadData();
        } finally {
            setIsSaving(false);
            isSubmitLockedRef.current = false;
        }
    };

    const deleteCourse = async () => {
        if (!courseToDelete) return;

        setDeletingId(courseToDelete.id);
        setError('');

        const { error } = await supabase
            .from('courses')
            .delete()
            .eq('id', courseToDelete.id);

        if (error) {
            setError(`Не удалось удалить курс: ${error.message}`);
            setDeletingId(null);
            return;
        }

        setCourses((prev) => prev.filter((course) => course.id !== courseToDelete.id));
        setDeletingId(null);
        setCourseToDelete(null);
    };

    if (isLoading) {
        return <Loader text="Загружаем курсы..." />;
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Курсы</h1>
                    <p className={styles.subtitle}>
                        Добавляй новые курсы и управляй списком.
                    </p>
                </div>

                <button className={styles.refreshButton} onClick={loadData}>
                    Обновить
                </button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.formTitle}>Добавить курс</h2>

                <div className={styles.grid}>
                    <label className={styles.label}>
                        Название курса *
                        <input
                            className={styles.input}
                            value={form.title}
                            onChange={(event) => updateForm('title', event.target.value)}
                            placeholder="Например: Основы дизайна"
                            required
                        />
                    </label>

                    <label className={styles.label}>
                        Возраст
                        <input
                            className={styles.input}
                            value={form.age_group}
                            onChange={(event) => updateForm('age_group', event.target.value)}
                            placeholder="Например: 8–12 лет"
                        />
                    </label>

                    <label className={styles.label}>
                        Направление
                        <input
                            className={styles.input}
                            value={form.direction}
                            onChange={(event) => updateForm('direction', event.target.value)}
                            placeholder="Например: Графический дизайн"
                        />
                    </label>

                    <label className={styles.label}>
                        Цена
                        <input
                            className={styles.input}
                            type="number"
                            value={form.price}
                            onChange={(event) => updateForm('price', event.target.value)}
                            placeholder="Например: 12000"
                        />
                    </label>

                    <label className={styles.label}>
                        Расписание
                        <input
                            className={styles.input}
                            value={form.schedule}
                            onChange={(event) => updateForm('schedule', event.target.value)}
                            placeholder="Например: Сб 12:00"
                        />
                    </label>

                    <label className={styles.label}>
                        Формат
                        <input
                            className={styles.input}
                            value={form.format}
                            onChange={(event) => updateForm('format', event.target.value)}
                            placeholder="Онлайн / Офлайн"
                        />
                    </label>

                    <label className={styles.label}>
                        Длительность
                        <input
                            className={styles.input}
                            value={form.duration}
                            onChange={(event) => updateForm('duration', event.target.value)}
                            placeholder="Например: 3 месяца"
                        />
                    </label>

                    <label className={styles.label}>
                        Дата старта
                        <input
                            className={styles.input}
                            type="date"
                            value={form.start_date}
                            onChange={(event) => updateForm('start_date', event.target.value)}
                        />
                    </label>

                    <label className={styles.label}>
                        Преподаватель *
                        <select
                            className={styles.input}
                            value={form.teacher_id}
                            onChange={(event) => updateForm('teacher_id', event.target.value)}
                            required
                        >
                            <option value="">Выберите преподавателя</option>
                            {teachers.map((teacher) => (
                                <option key={teacher.id} value={teacher.id}>
                                    {teacher.full_name || teacher.name || teacher.title || `ID ${teacher.id}`}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className={styles.label}>
                        Категория *
                        <select
                            className={styles.input}
                            value={form.category_id}
                            onChange={(event) => updateForm('category_id', event.target.value)}
                            required
                        >
                            <option value="">Выберите категорию</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.title || category.name || `ID ${category.id}`}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <label className={styles.label}>
                    Описание
                    <textarea
                        className={styles.textarea}
                        value={form.description}
                        onChange={(event) => updateForm('description', event.target.value)}
                        placeholder="Описание курса"
                    />
                </label>

                <button className={styles.submitButton} type="submit" disabled={isSaving}>
                    {isSaving ? 'Добавляем...' : 'Добавить курс'}
                </button>
            </form>

            <div className={styles.coursesList}>
                <h2 className={styles.sectionTitle}>Список курсов</h2>

                {courses.length === 0 ? (
                    <p className={styles.empty}>Курсов пока нет.</p>
                ) : (
                    <div className={styles.cards}>
                        {courses.map((course) => (
                            <article className={styles.card} key={course.id}>
                                <div>
                                    <h3 className={styles.courseTitle}>{course.title}</h3>

                                    <p className={styles.courseDescription}>
                                        {course.description || 'Без описания'}
                                    </p>

                                    <div className={styles.meta}>
                                        <span>Возраст: {course.age_group || '—'}</span>
                                        <span>Цена: {course.price ? `${course.price} ₽` : '—'}</span>
                                        <span>Формат: {course.format || '—'}</span>
                                        <span>Преподаватель: {getTeacherName(course.teacher_id)}</span>
                                        <span>Категория: {getCategoryName(course.category_id)}</span>
                                    </div>
                                </div>

                                <button
                                    className={styles.deleteButton}
                                    onClick={() => setCourseToDelete(course)}
                                    disabled={deletingId === course.id}
                                >
                                    {deletingId === course.id ? 'Удаляем...' : 'Удалить'}
                                </button>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            <ModalPopup
                isOpen={!!courseToDelete}
                title="Удалить курс?"
                description={`Курс «${courseToDelete?.title || ''}» будет удалён. Это действие нельзя отменить.`}
                confirmText="Удалить"
                cancelText="Отмена"
                isLoading={!!courseToDelete && deletingId === courseToDelete.id}
                onClose={() => {
                    if (deletingId) return;
                    setCourseToDelete(null);
                }}
                onConfirm={deleteCourse}
            />
        </div>
    );
}