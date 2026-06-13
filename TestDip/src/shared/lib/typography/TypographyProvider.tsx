import type { ReactNode } from 'react';
import { fixTypographyChildren } from './fixHangingPrepositions';

interface TypographyProviderProps {
    children: ReactNode;
}

export function TypographyProvider({ children }: TypographyProviderProps) {
    return <>{fixTypographyChildren(children)}</>;
}
