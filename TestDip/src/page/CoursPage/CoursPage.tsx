import { useState } from 'react'
import styles from './CoursPage.module.css'
import { Btn } from '../../shared/ui/Btn/Btn'
import Text from '../../shared/ui/Text/Text'
import Card from '../../shared/ui/Card/Card'
import { courseCards, tabs, getInfoTexts } from './modal'
import { useNavigate } from 'react-router-dom'

export default function CoursPage() {
  const [activeTab, setActiveTab] = useState('Все')
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <Text fontFamily='involve' className={styles.TitleCourse}>Наши курсы</Text>
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
        {courseCards.map((card, index) => (
          <Card
            key={card.id}
            title={card.title}
            secondtitle={card.secodetitle}
            description={card.description}
            infoTexts={getInfoTexts(card.title)}
            className={(index === 1 || index === 4) ? styles.offsetCard : ''}
            onClick={() => navigate(`/cours/${card.id}`)}
          />
        ))}
      </div>
    </div>
  )
}
