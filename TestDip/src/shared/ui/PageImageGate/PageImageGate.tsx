import type { ReactNode } from 'react'

import { useSiteImagePreload } from '../../hooks/useSiteImagePreload'
import Loader from '../Loader/Loader'
import styles from './PageImageGate.module.css'

interface SiteImageGateProps {
  children: ReactNode
  enabled?: boolean
}

export function SiteImageGate({ children, enabled = true }: SiteImageGateProps) {
  const { isLoading } = useSiteImagePreload({ enabled })

  if (!enabled) {
    return <>{children}</>
  }

  return (
    <>
      {isLoading && (
        <div className={styles.overlay} aria-live="polite" aria-busy="true">
          <Loader text="Загружаем сайт..." size="large" />
        </div>
      )}

      <div className={isLoading ? styles.contentHidden : styles.contentVisible}>
        {children}
      </div>
    </>
  )
}
