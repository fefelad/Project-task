import { SITE_PRELOADED_KEY } from './constants'

export const hasSiteBeenPreloaded = (): boolean => {
  try {
    return localStorage.getItem(SITE_PRELOADED_KEY) === 'true'
  } catch {
    return false
  }
}

export const markSiteAsPreloaded = (): void => {
  try {
    localStorage.setItem(SITE_PRELOADED_KEY, 'true')
  } catch {
    // ignore storage errors
  }
}
