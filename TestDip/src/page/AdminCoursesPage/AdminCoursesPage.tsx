import { useRef, useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '../../components/supabase/supabase';
import applyAbortSignal from '../../shared/lib/applyAbortSignal/applyAbortSignal';
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

const COURSES_QUERY_KEY = ['admin', 'courses'] as const;
const TEACHERS_QUERY_KEY = ['admin', 'teachers'] as const;
const CATEGORIES_QUERY_KEY = ['admin', 'categories'] as const;

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

const normalizeId = (value: string) => {
    if (!value) return null;

    const numberValue = Number(value);

    return Number.isNaN(numberValue) ? value : numberValue;
};

const fetchCourses = async (signal: AbortSignal) => {
    const timeout = withTimeoutSignal(signal);

    try {
        const query = supabase
            .from('courses')
            .select('*')
            .order('id', { ascending: false });

        const { data, error } = await applyAbortSignal(query, timeout.signal);

        if (error) {
            throw error;
        }

        return (data || []) as Course[];
    } finally {
        timeout.clear();
    }
};

const fetchTeachers = async (signal: AbortSignal) => {
    const timeout = withTimeoutSignal(signal);

    try {
        const query = supabase
            .from('teachers')
            .select('*')
            .order('id', { ascending: true });

        const { data, error } = await applyAbortSignal(query, timeout.signal);

        if (error) {
            throw error;
        }

        return (data || []) as Teacher[];
    } finally {
        timeout.clear();
    }
};

const fetchCategories = async (signal: AbortSignal) => {
    const timeout = withTimeoutSignal(signal);

    try {
        const query = supabase
            .from('categories')
            .select('*')
            .order('id', { ascending: true });

        const { data, error } = await applyAbortSignal(query, timeout.signal);

        if (error) {
            throw error;
        }

        return (data || []) as Category[];
    } finally {
        timeout.clear();
    }
};

const createCourse = async (form: CourseForm) => {
    const controller = new AbortController();

    const timeoutId = window.setTimeout(() => {
        controller.abort();
    }, 15000);

    try {
        const query = supabase
            .from('courses')
            .insert({
                title: form.title.trim(),
                description: form.description.trim() || null,
                age_group: form.age_group.trim() || null,
                direction: form.direction.trim() || null,
                price: form.price ? Number(form.price) : null,
                schedule: form.schedule.trim() || null,
                format: form.format.trim() || null,
                duration: form.duration.trim() || null,
                start_date: form.start_date || null,
                teacher_id: normalizeId(form.teacher_id),
                category_id: normalizeId(form.category_id),
            })
            .select('*')
            .single();

        const { data, error } = await applyAbortSignal(query, controller.signal);

        if (error) {
            throw error;
        }

        return data as Course;
    } finally {
        window.clearTimeout(timeoutId);
    }
};

const removeCourse = async (courseId: Id) => {
    const controller = new AbortController();

    const timeoutId = window.setTimeout(() => {
        controller.abort();
    }, 15000);

    try {
        const query = supabase
            .from('courses')
            .delete()
            .eq('id', courseId);

        const { error } = await applyAbortSignal(query, controller.signal);

        if (error) {
            throw error;
        }

        return courseId;
    } finally {
        window.clearTimeout(timeoutId);
    }
};

export default function AdminCoursesPage() {
    const queryClient = useQueryClient();

    const [form, setForm] = useState<CourseForm>(initialForm);
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

    const isSubmitLockedRef = useRef(false);

    const coursesQuery = useQuery({
        queryKey: COURSES_QUERY_KEY,
        queryFn: ({ signal }) => fetchCourses(signal),
        retry: false,
    });

    const teachersQuery = useQuery({
        queryKey: TEACHERS_QUERY_KEY,
        queryFn: ({ signal }) => fetchTeachers(signal),
        retry: false,
    });

    const categoriesQuery = useQuery({
        queryKey: CATEGORIES_QUERY_KEY,
        queryFn: ({ signal }) => fetchCategories(signal),
        retry: false,
    });

    const createCourseMutation = useMutation({
        mutationFn: createCourse,
        onSuccess: (newCourse) => {
            queryClient.setQueryData<Course[]>(COURSES_QUERY_KEY, (prev = []) => [
                newCourse,
                ...prev,
            ]);

            setForm(initialForm);
        },
        onSettled: () => {
            isSubmitLockedRef.current = false;
        },
    });

    const deleteCourseMutation = useMutation({
        mutationFn: removeCourse,
        onSuccess: (deletedCourseId) => {
            queryClient.setQueryData<Course[]>(COURSES_QUERY_KEY, (prev = []) =>
                prev.filter((course) => String(course.id) !== String(deletedCourseId))
            );

            setCourseToDelete(null);
        },
    });

    const courses = coursesQuery.data || [];
    const teachers = teachersQuery.data || [];
    const categories = categoriesQuery.data || [];

    const isInitialLoading =
        coursesQuery.isLoading || teachersQuery.isLoading || categoriesQuery.isLoading;

    const isFetching =
        coursesQuery.isFetching || teachersQuery.isFetching || categoriesQuery.isFetching;

    const deletingId = deleteCourseMutation.isPending
        ? deleteCourseMutation.variables
        : null;

    const error =
        coursesQuery.isError
            ? `Не удалось загрузить курсы: ${getErrorMessage(coursesQuery.error)}`
            : teachersQuery.isError
              ? `Не удалось загрузить преподавателей: ${getErrorMessage(teachersQuery.error)}`
              : categoriesQuery.isError
                ? `Не удалось загрузить категории: ${getErrorMessage(categoriesQuery.error)}`
                : createCourseMutation.isError
                  ? `Не удалось добавить курс: ${getErrorMessage(createCourseMutation.error)}`
                  : deleteCourseMutation.isError
                    ? `Не удалось удалить курс: ${getErrorMessage(deleteCourseMutation.error)}`
                    : '';

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

    const refreshData = () => {
        void Promise.all([
            coursesQuery.refetch(),
            teachersQuery.refetch(),
            categoriesQuery.refetch(),
        ]);
    };

    const updateForm = (field: keyof CourseForm, value: string) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isSubmitLockedRef.current || createCourseMutation.isPending) {
            return;
        }

        isSubmitLockedRef.current = true;
        createCourseMutation.mutate(form);
    };

    const deleteCourse = () => {
        if (!courseToDelete || deleteCourseMutation.isPending) return;

        deleteCourseMutation.mutate(courseToDelete.id);
    };

    if (isInitialLoading) {
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
                                    {teacher.full_name ||
                                        teacher.name ||
                                        teacher.title ||
                                        `ID ${teacher.id}`}
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

                <button
                    className={styles.submitButton}
                    type="submit"
                    disabled={createCourseMutation.isPending}
                >
                    {createCourseMutation.isPending ? 'Добавляем...' : 'Добавить курс'}
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
                                    disabled={String(deletingId) === String(course.id)}
                                >
                                    {String(deletingId) === String(course.id)
                                        ? 'Удаляем...'
                                        : 'Удалить'}
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
                isLoading={deleteCourseMutation.isPending}
                onClose={() => {
                    if (deleteCourseMutation.isPending) return;
                    setCourseToDelete(null);
                }}
                onConfirm={deleteCourse}
            />
        </div>
    );
}