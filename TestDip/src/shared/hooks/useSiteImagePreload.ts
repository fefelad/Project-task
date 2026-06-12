import { useEffect, useState } from 'react'

import { preloadAndCacheImages } from '../lib/imageCache/imageCache'
import { getAllSiteImageUrls } from '../lib/imageCache/pageImageRegistry'
import {
  hasSiteBeenPreloaded,
  markSiteAsPreloaded,
} from '../lib/imageCache/sitePreloadCache'

const MIN_LOADER_DURATION_MS = 2000

interface UseSiteImagePreloadOptions {
  enabled: boolean
}

interface UseSiteImagePreloadResult {
  isLoading: boolean
}

const wait = (ms: number): Promise<void> =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })

export const useSiteImagePreload = ({
  enabled,
}: UseSiteImagePreloadOptions): UseSiteImagePreloadResult => {
  const [isLoading, setIsLoading] = useState(
    () => enabled && !hasSiteBeenPreloaded()
  )

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false)
      return
    }

    if (hasSiteBeenPreloaded()) {
      setIsLoading(false)
      return
    }

    let isCancelled = false

    const preloadSite = async () => {
      setIsLoading(true)

      const imageUrls = getAllSiteImageUrls()
      const preloadPromise =
        imageUrls.length === 0
          ? Promise.resolve()
          : preloadAndCacheImages(imageUrls).catch(error => {
              console.error('Не удалось предзагрузить изображения сайта:', error)
            })

      await Promise.all([preloadPromise, wait(MIN_LOADER_DURATION_MS)])

      markSiteAsPreloaded()

      if (!isCancelled) {
        setIsLoading(false)
      }
    }

    void preloadSite()

    return () => {
      isCancelled = true
    }
  }, [enabled])

  return { isLoading }
}
