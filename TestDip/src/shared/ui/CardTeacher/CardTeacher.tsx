import Text, { TextSizes, TextWeight } from '../Text/Text';
import styles from './CardTeacher.module.css';
import ImgAlexsandra from '../../../assets/TeacherPage/image 65.png';
import ImgMark from '../../../assets/TeacherPage/Mark.png';
import ImgVera from '../../../assets/TeacherPage/Vera.png';
import Btn from '../Btn/Btn';
import Feedback from '../FeedbackBlock/Feedback';


export default function CardTeacher() {
  return (
    <>
        <div className={styles.CardTeacherWrapper}>

            {/* TODO - СЕЙЧАС ПРОСТО РЕНДЕР КАРТОЧКИ, КОГДА БУДЕТ БД - СДЕЛАТЬ ЧЕРЗ map с запросом */}
            <div className={styles.CardTeacher}>
                <img src={ImgAlexsandra} alt="Александра" />
                <div className={styles.CardTeacherContent}>
                    <Text fontFamily='involve' size={TextSizes.XL3} weight={TextWeight.MEDIUM} >
                        Александра <br /> Волкова
                    </Text>
                    <Text fontFamily='onest' size={TextSizes.XL2} weight={TextWeight.REGULAR}>
                        Опытный практикующий дизайнер, который научит вас не только теории, но и реальным инструментам индустрии. 
                        Её подход сочетает развитие творческого мышления с точным пониманием пользовательского опыта. 
                        На занятиях царит вдохновляющая атмосфера, где рождаются смелые проекты. 
                        Вы получите не просто знания, а готовое портфолио для старта карьеры
                    </Text>
                    <div className={styles.BtnFooterContent}>
                        <Btn color='blue' width='355px'>
                            Подробнее
                        </Btn>
                    </div>
                </div>
            </div>
            <div className={styles.CardTeacher}>
                <img src={ImgMark} alt="Марк" />
                <div className={styles.CardTeacherContent}>
                    <Text fontFamily='involve' size={TextSizes.XL3} weight={TextWeight.MEDIUM} >
                        Марк Белов
                    </Text>
                    <Text fontFamily='onest' size={TextSizes.XL2} weight={TextWeight.REGULAR}>
                        Преподаватель, который помогает превратить креативные идеи в рабочие дизайн-решения и сильное портфолио. 
                        Его уроки — это погружение в актуальные тренды и отточенное владение современными программами. 
                        Каждое занятие — это шаг к созданию проекта, которым не стыдно похвастаться. Идеальный наставник 
                        для тех, кто ценит структуру и конкретный результат.
                    </Text>
                    <div className={styles.BtnFooterContent}>
                        <Btn color='blue' width='355px'>
                            Подробнее
                        </Btn>
                    </div>
                </div>
            </div>
            <div className={styles.CardTeacher}>
                <img src={ImgVera} alt="Вера" />
                <div className={styles.CardTeacherContent}>
                    <Text fontFamily='involve' size={TextSizes.XL3} weight={TextWeight.MEDIUM} >
                        Вера Шилина
                    </Text>
                    <Text fontFamily='onest' size={TextSizes.XL2} weight={TextWeight.REGULAR}>
                        Преподаватель, вдохновляющий на смелые эксперименты и поиск уникального визуального языка. 
                        Он верит, что лучший дизайн рождается на стыке эстетики, функциональности и глубокого понимания аудитории. 
                        Её занятия — это творческая лаборатория, где вы научитесь  творить и критически оценивать свою работу.
                    </Text>
                    <div className={styles.BtnFooterContent}>
                        <Btn color='blue' width='355px'>
                            Подробнее
                        </Btn>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <Feedback title='Поможем раскрыть талант вашего ребёнка!' fullWidth={true} textBtn='Записаться на пробное занятие'>
                Запишитесь на бесплатный пробный урок. Определим сильные стороны вашего ребенка и подберём идеальное направление для развития
            </Feedback>
        </div>
    </>
  )
}
