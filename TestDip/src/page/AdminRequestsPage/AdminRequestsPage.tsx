import { useEffect, useState } from 'react';
import { supabase } from '../../components/supabase/supabase'
import styles from './AdminRequestsPage.module.css';
import Loader from '../../shared/ui/Loader/Loader';

type RequestStatus = 'new' | 'in_process' | 'done' | 'cancelled';
type PaymentStatus = 'not_paid' | 'paid' | 'refunded';

type FeedbackRequest = {
    id: string | number;
    name: string;
    email: string;
    agreement: boolean;
    created_at: string;
    status: RequestStatus;
    payment_status: PaymentStatus;
    admin_comment: string | null;
};

const statusLabels: Record<RequestStatus, string> = {
    new: 'Новая',
    in_process: 'В процессе',
    done: 'Завершена',
    cancelled: 'Отменена',
};

const paymentLabels: Record<PaymentStatus, string> = {
    not_paid: 'Не оплачено',
    paid: 'Оплачено',
    refunded: 'Возврат',
};

export default function AdminRequestsPage() {
    const [requests, setRequests] = useState<FeedbackRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [savingId, setSavingId] = useState<string | number | null>(null);
    const [error, setError] = useState('');

    const loadRequests = async () => {
        setIsLoading(true);
        setError('');

        const { data, error } = await supabase
            .from('feedback_requests')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            setError('Не удалось загрузить заявки');
            setIsLoading(false);
            return;
        }

        setRequests((data || []) as FeedbackRequest[]);
        setIsLoading(false);
    };

    useEffect(() => {
        loadRequests();
    }, []);

    const updateLocalRequest = (
        id: string | number,
        field: keyof FeedbackRequest,
        value: string
    ) => {
        setRequests((prev) =>
            prev.map((request) =>
                request.id === id
                    ? {
                          ...request,
                          [field]: value,
                      }
                    : request
            )
        );
    };

    const saveRequest = async (request: FeedbackRequest) => {
        setSavingId(request.id);
        setError('');

        const { error } = await supabase
            .from('feedback_requests')
            .update({
                status: request.status,
                payment_status: request.payment_status,
                admin_comment: request.admin_comment,
            })
            .eq('id', request.id);

        if (error) {
            setError('Не удалось сохранить заявку');
            setSavingId(null);
            return;
        }

        setSavingId(null);
    };

    if (isLoading) {
        return <Loader text="Загружаем заявки..." fullPage />;
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Заявки</h1>
                    <p className={styles.subtitle}>
                        Здесь можно смотреть заявки и менять статус оплаты.
                    </p>
                </div>

                <button className={styles.refreshButton} onClick={loadRequests}>
                    Обновить
                </button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            {requests.length === 0 ? (
                <p className={styles.empty}>Заявок пока нет.</p>
            ) : (
                <div className={styles.list}>
                    {requests.map((request) => (
                        <div className={styles.card} key={request.id}>
                            <div className={styles.cardTop}>
                                <div>
                                    <h2 className={styles.name}>{request.name}</h2>
                                    <p className={styles.email}>{request.email}</p>
                                </div>

                                <p className={styles.date}>
                                    {new Date(request.created_at).toLocaleString('ru-RU')}
                                </p>
                            </div>

                            <div className={styles.controls}>
                                <label className={styles.label}>
                                    Статус заявки
                                    <select
                                        className={styles.select}
                                        value={request.status || 'new'}
                                        onChange={(event) =>
                                            updateLocalRequest(
                                                request.id,
                                                'status',
                                                event.target.value
                                            )
                                        }
                                    >
                                        {Object.entries(statusLabels).map(([value, label]) => (
                                            <option key={value} value={value}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className={styles.label}>
                                    Оплата
                                    <select
                                        className={styles.select}
                                        value={request.payment_status || 'not_paid'}
                                        onChange={(event) =>
                                            updateLocalRequest(
                                                request.id,
                                                'payment_status',
                                                event.target.value
                                            )
                                        }
                                    >
                                        {Object.entries(paymentLabels).map(([value, label]) => (
                                            <option key={value} value={value}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <label className={styles.label}>
                                Комментарий
                                <textarea
                                    className={styles.textarea}
                                    value={request.admin_comment || ''}
                                    onChange={(event) =>
                                        updateLocalRequest(
                                            request.id,
                                            'admin_comment',
                                            event.target.value
                                        )
                                    }
                                    placeholder="Например: клиенту написали, ждём оплату"
                                />
                            </label>

                            <div className={styles.footer}>
                                <span className={styles.agreement}>
                                    Согласие: {request.agreement ? 'да' : 'нет'}
                                </span>

                                <button
                                    className={styles.saveButton}
                                    onClick={() => saveRequest(request)}
                                    disabled={savingId === request.id}
                                >
                                    {savingId === request.id ? 'Сохраняем...' : 'Сохранить'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}