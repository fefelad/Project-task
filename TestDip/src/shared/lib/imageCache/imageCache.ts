import {
  IMAGE_CACHE_INDEX_KEY,
  IMAGE_CACHE_PREFIX,
  MAX_CACHED_IMAGE_LENGTH,
} from './constants'

interface CacheIndexEntry {
  key: string
  updatedAt: number
}

const getCacheKey = (url: string): string => `${IMAGE_CACHE_PREFIX}${url}`

const readCacheIndex = (): CacheIndexEntry[] => {
  try {
    const raw = localStorage.getItem(IMAGE_CACHE_INDEX_KEY)
    return raw ? (JSON.parse(raw) as CacheIndexEntry[]) : []
  } catch {
    return []
  }
}

const writeCacheIndex = (entries: CacheIndexEntry[]): void => {
  try {
    localStorage.setItem(IMAGE_CACHE_INDEX_KEY, JSON.stringify(entries))
  } catch {
    // ignore quota errors for index
  }
}

const touchCacheIndex = (key: string): void => {
  const entries = readCacheIndex().filter(entry => entry.key !== key)
  entries.push({ key, updatedAt: Date.now() })
  writeCacheIndex(entries)
}

const evictOldestCacheEntries = (): void => {
  const entries = readCacheIndex().sort((a, b) => a.updatedAt - b.updatedAt)
  const removeCount = Math.max(1, Math.ceil(entries.length * 0.25))

  entries.slice(0, removeCount).forEach(entry => {
    localStorage.removeItem(entry.key)
  })

  writeCacheIndex(entries.slice(removeCount))
}

const saveToCache = (url: string, dataUrl: string): void => {
  if (dataUrl.length > MAX_CACHED_IMAGE_LENGTH) {
    return
  }

  const key = getCacheKey(url)

  try {
    localStorage.setItem(key, dataUrl)
    touchCacheIndex(key)
  } catch {
    evictOldestCacheEntries()

    try {
      localStorage.setItem(key, dataUrl)
      touchCacheIndex(key)
    } catch {
      // skip caching if storage is still full
    }
  }
}

const readFromCache = (url: string): string | null => {
  try {
    const cached = localStorage.getItem(getCacheKey(url))
    if (!cached) {
      return null
    }

    touchCacheIndex(getCacheKey(url))
    return cached
  } catch {
    return null
  }
}

const loadImage = (src: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve()
    image.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    image.src = src
  })

const blobToDataUrl = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })

const fetchImageAsDataUrl = async (url: string): Promise<string> => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${url}`)
  }

  const blob = await response.blob()
  return blobToDataUrl(blob)
}

export const preloadAndCacheImage = async (url: string): Promise<void> => {
  if (!url) {
    return
  }

  const cached = readFromCache(url)

  if (cached) {
    await loadImage(cached)
    return
  }

  const dataUrl = await fetchImageAsDataUrl(url)
  saveToCache(url, dataUrl)
  await loadImage(dataUrl)
}

export const preloadAndCacheImages = async (urls: string[]): Promise<void> => {
  const uniqueUrls = [...new Set(urls.filter(Boolean))]

  await Promise.all(uniqueUrls.map(url => preloadAndCacheImage(url)))
}

export const getCachedImageSrc = (url: string): string | null => readFromCache(url)
