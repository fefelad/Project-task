import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';

import Text from '../../shared/ui/Text/Text';
import korova from '../../assets/PortfolioPage/1.png';
import kur from '../../assets/PortfolioPage/2.png';
import loshad from '../../assets/PortfolioPage/3.png';
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