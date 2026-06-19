import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { useMemo, useState } from 'react';
import Text from '../../shared/ui/Text/Text';
import Btn from '../../shared/ui/Btn/Btn';
import styles from './PortfolioPage.module.css';
import ph4 from '../../assets/PortfolioPage/uiPortfioloi/4.png';
import ph5 from '../../assets/PortfolioPage/uiPortfioloi/5.png';
import ph6 from '../../assets/PortfolioPage/uiPortfioloi/6.png';
import ph7 from '../../assets/PortfolioPage/uiPortfioloi/7.png';
import ph8 from '../../assets/PortfolioPage/uiPortfioloi/8.png';
import ph9 from '../../assets/PortfolioPage/uiPortfioloi/9.png';
import ph10 from '../../assets/PortfolioPage/uiPortfioloi/10.png';
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
};

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    img: ph4,
    alt: 'Постер Пёс и Кот',
    text: 'Постер для компании «Пёс&Кот» — компании, примиряющей пёсиков и котиков во всём пушистом мире.',
    direction: 'Графический дизайн',
    childName: 'Артём',
    age: 8,
  },
  {
    id: 2,
    img: ph5,
    alt: 'Яркий плакат',
    text: 'Плакат в яркой палитре: учились делать акцент и не перегружать композицию деталями.',
    direction: 'Графический дизайн',
    childName: 'Мила',
    age: 7,
  },
  {
    id: 3,
    img: ph6,
    alt: 'Карточки и баннеры',
    text: 'Карточки и баннеры для конвертов: отработали сетку, отступы и типографику. Такие навыки сразу делают работу лучше.',
    direction: 'Веб-дизайн',
    childName: 'Кирилл',
    age: 10,
  },
  {
    id: 4,
    img: ph7,
    alt: 'Кошачий постер',
    text: 'Изящные когти, грациозная походка и роскошные усы — у каждого уважающего себя представителя кошачьих должна быть возможность показать себя с лучшей стороны.',
    direction: 'Графический дизайн',
    childName: 'София',
    age: 9,
  },
  {
    id: 5,
    img: ph8,
    alt: 'Heco System',
    text: 'Heco System — это лаборатория, которая создаёт товарные знаки в виде лошадей. В данном проекте разработаны несколько таких знаков.',
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
    img: ph10,
    alt: 'Постер для магазина',
    text: 'Постер для магазина, связанного с товарами для животных.',
    direction: 'Веб-дизайн',
    childName: 'Даниил',
    age: 8,
  },
];

export default function PortfolioPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Все');

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

      <div className={styles.filterTabs}>
        {tabs.map((tab) => (
          <Btn
            key={tab}
            color={activeTab === tab ? 'orange' : 'blue'}
            hasBackground={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={styles.filterTabBtn}
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
            spacing={3}
            sx={{
              width: '100%',
              '@media (max-width: 576px)': {
                margin: '0 !important',
                '& > *': {
                  padding: '0 !important',
                },
              },
            }}
          >
            {filteredItems.map((item) => (
              <div key={item.id} className={styles.portfolioCard}>
                <img
                  src={item.img}
                  alt={item.alt}
                  className={styles.portfolioCardImage}
                />

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