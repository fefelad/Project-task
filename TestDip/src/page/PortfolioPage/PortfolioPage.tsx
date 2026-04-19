import Text from '../../shared/ui/Text/Text';
import korova from '../../assets/PortfolioPage/1.png';
import kur from '../../assets/PortfolioPage/2.png';
import loshad from '../../assets/PortfolioPage/3.png';
import styles from './PortfolioPage.module.css';
import Btn from '../../shared/ui/Btn/Btn';

export default function PortfolioPage() {
  return (
    <div className={styles.continerPortfolio}>
      <Text fontFamily="involve" className={styles.PageTitle}>
        Работы детей
      </Text>

      <div className={styles.promoProtfolioBlock}>
        <img src={korova} alt="Корова" />

        <div className={styles.promoblock}>
          <Text fontFamily="onest" className={styles.promoProtfoliodesk}>
            Работы наших учеников — это не “просто картинки”,
            а продуманные проекты, где видно рост: от идеи и наброска до аккуратного
            digital-результата.
          </Text>
          <div className={styles.posSvg}>
            <svg width="113" height="44" viewBox="0 0 113 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M72.12 6.43672C79.8841 7.3742 60.0375 19.6273 53.2628 23.4848C40.6426 30.6906 43.7868 30.755 48.4263 28.182C50.0827 27.2693 54.9639 24.6379 59.2458 22.3505C72.2664 15.3892 75.6429 13.1214 77.529 10.2191C81.7966 3.64034 64.5882 1.40392 51.2109 6.77344C33.4819 13.9068 10.333 30.1449 5.7109 35.7286C3.49107 38.4273 4.24509 39.7805 11.4064 34.4642C37.1596 15.2356 59.4925 4.9124 72.12 6.43672Z" fill="#FF0000" />
              <path d="M103.964 0.778243C102.427 1.83266 99.3258 4.06196 95.9605 6.6111C62.4024 32.0228 34.4993 45.6566 34.0556 37.0037C33.8376 33.046 41.9091 22.6743 48.4251 18.4528C50.7095 16.9615 48.8159 16.4238 46.7361 17.4674C42.6033 19.548 34.522 26.8222 32.0278 31.2084C28.7449 37.037 30.7792 41.0957 37.2058 41.5603C44.4702 42.0783 65.6636 32.5706 78.8395 22.8412C82.4605 20.1733 100.52 5.70737 105.271 1.71377C107.788 -0.345657 105.164 -0.0239421 103.964 0.778243Z" fill="#FF0000" />
            </svg>
          </div>
          <img src={kur} alt="Петух" />
        </div>
        <img src={loshad} alt="Лошадь" />
      </div>
      <div className={styles.promoblockBtn}>
        <Btn width='480px' color='blue'>
          Подробнее
        </Btn>
      </div>
    </div>
  );
}