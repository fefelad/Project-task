const applyAbortSignal = <T,>(query: T, signal: AbortSignal): T => {
    const abortableQuery = query as T & {
        abortSignal: (signal: AbortSignal) => T;
    };

    return abortableQuery.abortSignal(signal);
};

export default applyAbortSignal;