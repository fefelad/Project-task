import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { useEffect, useMemo, useState } from 'react';
import Text from '../../shared/ui/Text/Text';
import Btn from '../../shared/ui/Btn/Btn';
import styles from './PortfolioPage.module.css';
import ph8 from '../../assets/PortfolioPage/uiPortfioloi/8.png';
import ph9 from '../../assets/PortfolioPage/uiPortfioloi/9.png';

import newPhoto1 from '../../assets/PortfolioPage/newPhoto/1.png';
import newPhoto2 from '../../assets/PortfolioPage/newPhoto/2.png';
import newPhoto3 from '../../assets/PortfolioPage/newPhoto/4123132.png';
import newPhoto4 from '../../assets/PortfolioPage/newPhoto/4.png';
import newPhoto5 from '../../assets/PortfolioPage/newPhoto/5.png';

import Feedback from '../../shared/ui/FeedbackBlock/Feedback';
import { useNavigate } from 'react-router-dom';
import { tabs, type DesignDirection } from '../CoursPage/modal';

type PortfolioItem = {
  id: number;
  img: string;
  alt: string;
  text: string;
  direction: DesignDirection;
  childName: string;
  age: number;
  preserveImageRatio?: boolean;
  imageCrop?: boolean;
};

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    img: newPhoto1,
    alt: 'Фирменный стиль для бренда пижам',
    text: 'Фирменный стиль для бренда пижам.',
    direction: 'Графический дизайн',
    childName: 'Анфиса',
    age: 10,
  },
  {
    id: 2,
    img: newPhoto2,
    alt: 'Иллюстрация для банка настроения',
    text: 'Иллюстрация для банка настроения.',
    direction: 'Графический дизайн',
    childName: 'Ира',
    age: 10,
    imageCrop: true,
  },
  {
    id: 3,
    img: newPhoto4,
    alt: 'Сайт Tasmin Design',
    text: 'Сайт Tasmin Design.',
    direction: 'Веб-дизайн',
    childName: 'Кирилл',
    age: 10,
  },
  {
    id: 4,
    img: newPhoto3,
    alt: 'Макет коробки для чая',
    text: 'Макет коробки для кофе.',
    direction: 'Графический дизайн',
    childName: 'Артём',
    age: 10,
    preserveImageRatio: true,
  },
  {
    id: 5,
    img: ph8,
    alt: 'Heco System',
    text: 'Heco System — это лаборатория, которая создаёт товарные знаки в виде кроликов. В данном проекте разработаны несколько таких знаков.',
    direction: 'Дизайн иллюстраций',
    childName: 'Максим',
    age: 7,
  },
  {
    id: 6,
    img: ph9,
    alt: 'Bionic',
    text: 'Bionic — кибер-зоопарк, в котором реальные животные заменены робо-копиями. Благодаря этому посетители могут не только смотреть на зверей, но и изучать необычный мир технологий.',
    direction: 'Дизайн иллюстраций',
    childName: 'Алиса',
    age: 10,
  },
  {
    id: 7,
    img: newPhoto5,
    alt: 'Сайт для продажи новых домов',
    text: 'Сайт для продажи новых домов.',
    direction: 'Веб-дизайн',
    childName: 'Даниил',
    age: 8,
  },
];

const NARROW_MOBILE_BREAKPOINT = 500;

export default function PortfolioPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Все');
  const [isNarrowMobile, setIsNarrowMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${NARROW_MOBILE_BREAKPOINT}px)`);

    const updateLayout = () => {
      setIsNarrowMobile(mediaQuery.matches);
    };

    updateLayout();
    mediaQuery.addEventListener('change', updateLayout);

    return () => {
      mediaQuery.removeEventListener('change', updateLayout);
    };
  }, []);

  const filteredItems = useMemo(() => {
    if (activeTab === 'Все') {
      return portfolioItems;
    }

    return portfolioItems.filter((item) => item.direction === activeTab);
  }, [activeTab]);

  return (
    <div className={styles.continerPortfolio}>
      <div className={styles.wrapperrTopworkText}>
        <Text className={styles.topWork} fontFamily='involve'>
          Работы наших учеников        
        </Text>
      </div>

      <div className={styles.tabs}>
        {tabs.map((tab) => (
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

      <div className={styles.portfolioGallery}>
        {filteredItems.length === 0 ? (
          <Text fontFamily="onest" className={styles.emptyState}>
            Пока нет работ по этому направлению
          </Text>
        ) : (
        <Box sx={{ width: '100%' }}>
          <Masonry
            columns={{ xs: 1, sm: 2, md: 3 }}
            spacing={isNarrowMobile ? 0 : 3}
            className={styles.portfolioMasonry}
            sx={{ width: '100%' }}
          >
            {filteredItems.map((item) => (
              <div key={item.id} className={styles.portfolioCard}>
                {item.imageCrop ? (
                  <div className={styles.portfolioCardImageFrame}>
                    <img
                      src={item.img}
                      alt={item.alt}
                      className={`${styles.portfolioCardImage} ${styles.portfolioCardImageCropped}`}
                    />
                  </div>
                ) : (
                  <img
                    src={item.img}
                    alt={item.alt}
                    className={`${styles.portfolioCardImage} ${
                      item.preserveImageRatio ? styles.portfolioCardImageNatural : ''
                    }`}
                  />
                )}

                <div className={styles.portfolioCardMeta}>
                  <Text fontFamily="onest" className={styles.portfolioCardDirection}>
                    {item.direction}
                  </Text>
                  <Text fontFamily="onest" className={styles.portfolioCardAuthor}>
                    {item.childName}, {item.age} лет
                  </Text>
                </div>

                <Text fontFamily="onest" className={styles.portfolioCardText}>
                  {item.text}
                </Text>
              </div>
            ))}
          </Masonry>
        </Box>
        )}
      </div>

      <div className={styles.promoblockBtnfooter}>
        <Btn width="480px" color="blue" onClick={() => navigate('/about')}>
          Узнать о школе
        </Btn>
      </div>

      <Feedback
        fullWidth
        title="Хотите, чтобы работа вашего ребёнка была здесь?"
        textBtn="Записаться на курс"
        adminComment="Заявка со страницы портфолио"
        successDescription="Спасибо! Мы получили вашу заявку и скоро свяжемся с вами, чтобы рассказать о курсах и записи."
      >
        Каждая работа в этой галерее — проект нашего ученика. Запишите ребёнка на курс:
        он освоит навыки, создаст свои проекты, а лучшие из них мы с радостью
        покажем в портфолио школы.
      </Feedback>
    </div>
  );
}