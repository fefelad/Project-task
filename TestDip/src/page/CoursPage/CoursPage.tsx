import { useEffect, useMemo, useState } from 'react'
import styles from './CoursPage.module.css'
import { Btn } from '../../shared/ui/Btn/Btn'
import Text, { TextWeight } from '../../shared/ui/Text/Text'
import Card from '../../shared/ui/Card/Card'
import {
  courseCards,
  getCourseGroups,
  sortCourseCards,
  tabs,
  getInfoTexts,
  type CourseCard,
} from './modal'
import { useNavigate } from 'react-router-dom'
import podves2 from '../../assets/CoursePage/podvers2.png'

const CARDS_PER_DIRECTION = 3

const renderCourseCard = (
  card: CourseCard,
  index: number,
  navigate: (path: string) => void
) => (
  <Card
    key={card.id}
    title={card.title}
    secondtitle={card.secodetitle}
    description={card.description}
    infoTexts={getInfoTexts(card.id)}
    directions={[...card.directions]}
    className={index % 3 === 1 ? styles.offsetCard : ''}
    onClick={() => navigate(`/cours/${card.id}`)}
  />
)

export default function CoursPage() {
  const [activeTab, setActiveTab] = useState('Все')
  const [isTabletRange, setIsTabletRange] = useState(false)
  const [visibleCount, setVisibleCount] = useState(courseCards.length)

  const navigate = useNavigate()
  const isAllTab = activeTab === 'Все'

  const filteredCards = useMemo(() => {
    const cards = isAllTab
      ? courseCards
      : courseCards.filter(card => card.directions[0] === activeTab)

    return sortCourseCards(cards)
  }, [activeTab, isAllTab])

  const visibleDirectionGroups = useMemo(() => {
    if (!isAllTab) {
      return null
    }

    const groups = getCourseGroups()

    if (!isTabletRange) {
      return groups
    }

    return groups
      .map((group, groupIndex) => {
        const cardsBeforeGroup = groupIndex * CARDS_PER_DIRECTION
        const remainingVisible = visibleCount - cardsBeforeGroup

        if (remainingVisible <= 0) {
          return null
        }

        return {
          ...group,
          cards: group.cards.slice(0, Math.min(remainingVisible, CARDS_PER_DIRECTION)),
        }
      })
      .filter((group): group is NonNullable<typeof group> => group !== null)
  }, [isAllTab, isTabletRange, visibleCount])

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(max-width: 999px) and (min-width: 577px)'
    )

    const updateLayout = () => {
      const matches = mediaQuery.matches

      setIsTabletRange(matches)
      setVisibleCount(matches ? CARDS_PER_DIRECTION : filteredCards.length)
    }

    updateLayout()

    mediaQuery.addEventListener('change', updateLayout)

    return () => {
      mediaQuery.removeEventListener('change', updateLayout)
    }
  }, [filteredCards.length])

  const visibleCards = isTabletRange
    ? filteredCards.slice(0, visibleCount)
    : filteredCards

  const hasMoreCards = isTabletRange && visibleCount < filteredCards.length

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + CARDS_PER_DIRECTION, filteredCards.length))
  }

  const renderShowMoreButton = () => (
    <button
      type="button"
      className={styles.showMoreCard}
      onClick={handleShowMore}
    >
      <Text fontFamily="onest" className={styles.showMoreText}>
        Показать еще
      </Text>
    </button>
  )

  return (
    <section className={styles.container}>
      <Text fontFamily="involve" className={styles.TitleCourse}>
        Наши курсы
      </Text>

      <div className={styles.tabs}>
        {tabs.map(tab => (
          <Btn
            key={tab}
            color={activeTab === tab ? 'orange' : 'blue'}
            hasBackground={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={styles.tabsClass}
          >
            {tab}
          </Btn>
        ))}
      </div>

      {isAllTab && visibleDirectionGroups ? (
        <div className={styles.coursesList}>
          {visibleDirectionGroups.map((group, groupIndex) => {
            const isLastVisibleGroup =
              groupIndex === visibleDirectionGroups.length - 1

            return (
              <section key={group.direction} className={styles.directionSection}>
                <Text
                  fontFamily="involve"
                  weight={TextWeight.MEDIUM}
                  className={styles.directionTitle}
                >
                  {group.direction}
                </Text>

                <div className={styles.coursesWrapper}>
                  {groupIndex === 0 && (
                    <img
                      src={podves2}
                      alt="Линия для курсов"
                      className={styles.podves}
                    />
                  )}

                  <div className={styles.courses}>
                    {group.cards.map((card, index) =>
                      renderCourseCard(card, index, navigate)
                    )}

                    {hasMoreCards && isLastVisibleGroup && renderShowMoreButton()}
                  </div>
                </div>
              </section>
            )
          })}
        </div>
      ) : (
        <div className={styles.courses}>
          {visibleCards.map((card, index) =>
            renderCourseCard(card, index, navigate)
          )}

          {hasMoreCards && renderShowMoreButton()}
        </div>
      )}
    </section>
  )
}
