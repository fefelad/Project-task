import { useEffect, useState } from 'react'
import styles from './CoursPage.module.css'
import { Btn } from '../../shared/ui/Btn/Btn'
import Text from '../../shared/ui/Text/Text'
import Card from '../../shared/ui/Card/Card'
import { courseCards, tabs, getInfoTexts } from './modal'
import { useNavigate } from 'react-router-dom'

export default function CoursPage() {
  const [activeTab, setActiveTab] = useState('Все')
  const [isTabletRange, setIsTabletRange] = useState(false)
  const [visibleCount, setVisibleCount] = useState(courseCards.length)

  const navigate = useNavigate()

  const filteredCards = courseCards

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 992px) and (min-width: 577px)')

    const updateLayout = () => {
      const matches = mediaQuery.matches
      setIsTabletRange(matches)
      setVisibleCount(matches ? 3 : filteredCards.length)
    }

    updateLayout()

    mediaQuery.addEventListener('change', updateLayout)

    return () => {
      mediaQuery.removeEventListener('change', updateLayout)
    }
  }, [filteredCards.length, activeTab])

  const visibleCards = isTabletRange
    ? filteredCards.slice(0, visibleCount)
    : filteredCards

  const hasMoreCards = isTabletRange && visibleCount < filteredCards.length

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, filteredCards.length))
  }

  return (
    <div className={styles.container}>
      <Text fontFamily='involve' className={styles.TitleCourse}>
        Наши курсы
      </Text>

      <div className={styles.tabs}>
        {tabs.map(tab => (
          <Btn
            key={tab}
            color={activeTab === tab ? 'orange' : 'blue'}
            hasBackground={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Btn>
        ))}
      </div>

      <div className={styles.courses}>
        {visibleCards.map((card, index) => (
          <Card
            key={card.id}
            title={card.title}
            secondtitle={card.secodetitle}
            description={card.description}
            infoTexts={getInfoTexts(card.title)}
            directions={card.directions}
            className={(index === 1 || index === 4) ? styles.offsetCard : ''}
            onClick={() => navigate(`/cours/${card.id}`)}
          />
        ))}

        {hasMoreCards && (
          <button
            type='button'
            className={styles.showMoreCard}
            onClick={handleShowMore}
          >
            <Text fontFamily='onest' className={styles.showMoreText}>
              Показать еще
            </Text>
          </button>
        )}
      </div>
    </div>
  )
}