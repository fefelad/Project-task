import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';

import Text from '../../shared/ui/Text/Text';
import pauk from '../../assets/PortfolioPage/uiPortfioloi/pauk.png';
import losh from '../../assets/PortfolioPage/3124123421.png';
import styles from './PortfolioPage.module.css';

import niuphoto from '../../assets/PortfolioPage/uiPortfioloi/1231.png';
import niuphoto2 from '../../assets/PortfolioPage/uiPortfioloi/Rectangle 203.png';
import niuphoto3 from '../../assets/PortfolioPage/uiPortfioloi/Rectangle 205.png';
import niuphoto4 from '../../assets/PortfolioPage/uiPortfioloi/Rectangle 207.png';
import niuphoto5 from '../../assets/PortfolioPage/uiPortfioloi/Rectangle 209.png';
import niuphoto6 from '../../assets/PortfolioPage/uiPortfioloi/Rectangle 210.png';
import niuphoto7 from '../../assets/PortfolioPage/uiPortfioloi/Rectangle 212.png';

import Btn from '../../shared/ui/Btn/Btn';

type PortfolioItem = {
  id: number;
  img: string;
  alt: string;
  text: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    img: niuphoto,
    alt: 'Постер Пёс и Кот',
    text: 'Постер для компании «Пёс&Кот» — компании, примиряющей пёсиков и котиков во всём пушистом мире.',
  },
  {
    id: 2,
    img: niuphoto2,
    alt: 'Яркий плакат',
    text: 'Плакат в яркой палитре: учились делать акцент и не перегружать композицию деталями.',
  },
  {
    id: 3,
    img: niuphoto3,
    alt: 'Карточки и баннеры',
    text: 'Карточки и баннеры для конвертов: отработали сетку, отступы и типографику. Такие навыки сразу делают работу лучше.',
  },
  {
    id: 4,
    img: niuphoto4,
    alt: 'Кошачий постер',
    text: 'Изящные когти, грациозная походка и роскошные усы — у каждого уважающего себя представителя кошачьих должна быть возможность показать себя с лучшей стороны.',
  },
  {
    id: 5,
    img: niuphoto5,
    alt: 'Heco System',
    text: 'Heco System — это лаборатория, которая создаёт товарные знаки в виде лошадей. В данном проекте разработаны несколько таких знаков.',
  },
  {
    id: 6,
    img: niuphoto6,
    alt: 'Bionic',
    text: 'Bionic — кибер-зоопарк, в котором реальные животные заменены робо-копиями. Благодаря этому посетители могут не только смотреть на зверей, но и изучать необычный мир технологий.',
  },
  {
    id: 7,
    img: niuphoto7,
    alt: 'Постер для магазина',
    text: 'Постер для магазина, связанного с товарами для животных.',
  },
];

export default function PortfolioPage() {
  return (
    <div className={styles.continerPortfolio}>

      <div>
        <Text fontFamily='involve' className={styles.titlePortfolio}>
          Работы детей
        </Text>
      </div>
      <div className={styles.WrapperPromo}>
        <div className={styles.pauk}>
          <img src={pauk} alt="#" />
        </div>

        <div className={styles.wrapperPromoRow}>
          <Text className={styles.deskPortfolio} fontFamily='onest'>
            Работы наших учеников — это не “просто картинки”, а продуманные проекты, где видно рост: от идеи и наброска до аккуратного digital‑результата.
          </Text>
          <div className={styles.possvg}>
            <svg width="113" height="44" viewBox="0 0 113 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M72.12 6.43672C79.8841 7.3742 60.0375 19.6273 53.2628 23.4848C40.6426 30.6906 43.7868 30.755 48.4263 28.182C50.0827 27.2693 54.9639 24.6379 59.2458 22.3505C72.2664 15.3892 75.6429 13.1214 77.529 10.2191C81.7966 3.64034 64.5882 1.40392 51.2109 6.77344C33.4819 13.9068 10.333 30.1449 5.7109 35.7286C3.49107 38.4273 4.24509 39.7805 11.4064 34.4642C37.1596 15.2356 59.4925 4.9124 72.12 6.43672Z" fill="#FF0000" />
              <path d="M103.964 0.776289C102.427 1.8307 99.3258 4.06 95.9605 6.60915C62.4024 32.0208 34.4993 45.6547 34.0556 37.0017C33.8376 33.0441 41.9091 22.6724 48.4251 18.4508C50.7095 16.9596 48.8159 16.4219 46.7361 17.4654C42.6033 19.5461 34.522 26.8202 32.0278 31.2065C28.7449 37.0351 30.7792 41.0937 37.2058 41.5584C44.4702 42.0763 65.6636 32.5686 78.8395 22.8393C82.4605 20.1714 100.52 5.70541 105.271 1.71181C107.788 -0.34761 105.164 -0.0258952 103.964 0.776289Z" fill="#FF0000" />
            </svg>
          </div>
          <img src={niuphoto6} alt="#" />
        </div>

        <div className={styles.wrapperPromoRow2}>
          <img src={losh} alt="#" />
          <div>
            <Btn width='100%'  color='blue'>
              Подробнее
            </Btn>
          </div>
        </div>
      </div>

      <div className={styles.wrapperrTopworkText}>
        <Text className={styles.topWork}>
          Лучшие работы
        </Text>
      </div>

      <div className={styles.portfolioGallery}>
        <Box sx={{ width: '100%' }}>
          <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={3}>
            {portfolioItems.map((item) => (
              <div key={item.id} className={styles.portfolioCard}>
                <img
                  src={item.img}
                  alt={item.alt}
                  className={styles.portfolioCardImage}
                />
                <Text fontFamily="onest" className={styles.portfolioCardText}>
                  {item.text}
                </Text>
              </div>
            ))}
          </Masonry>
        </Box>
      </div>

      <div className={styles.promoblockBtnfooter}>
        <Btn width="480px" color="blue">
          Подробнее
        </Btn>
      </div>
    </div>
  );
}