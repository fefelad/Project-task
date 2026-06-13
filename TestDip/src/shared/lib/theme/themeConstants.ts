export const THEME_STORAGE_KEY = 'testdip-theme';

export type Theme = 'light' | 'dark';

export const THEMES: Theme[] = ['light', 'dark'];

export function getPreferredTheme(): Theme {
    if (typeof window === 'undefined') {
        return 'light';
    }

    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
}
