import { useParams, useNavigate } from 'react-router-dom';
import Text, { TextSizes, TextWeight } from '../../../../shared/ui/Text/Text';
import Btn from '../../../../shared/ui/Btn/Btn';
import styles from './TeacherDetailPage.module.css';
import ImgAlexsandra from '../../../../assets/TeacherPage/image 65.png';
import ImgMark from '../../../../assets/TeacherPage/Mark.png';
import ImgVera from '../../../../assets/TeacherPage/Vera.png';

const teachersData = [
  {
    id: 'aleksandra-volkova',
    name: 'Александра Волкова',
    role: 'Графический дизайнер',
    experience: '8 лет',
    image: ImgAlexsandra,
    education: [
      {
        institution: 'Санкт-Петербургская государственная художественно-промышленная академия им. А. Л. Штиглица',
        specialization: 'Графический дизайн'
      }
    ],
    qualifications: [
      '«Типографика и верстка в цифровой среде» — НИУ ИТМО',
      '«Методика дополнительного образования детей» — РГПУ им. А. И. Герцена'
    ],
    professionalPath: 'Работала в петербургской студии айдентики. Разрабатывала фирменные стили, логотипы, упаковку, полиграфию и рекламные материалы. Имеет опыт работы как с малым бизнесом, так и с городскими проектами.',
    teachingApproach: 'Александра отвечает за структуру графического направления. Она выстраивает программу так, чтобы ребенок освоил базовые принципы и научился аргументировать свои решения. На занятиях она часто спрашивает: «Почему ты выбрал именно это решение?»',
    learningPoints: [
      'анализируют задачу',
      'ищут референсы',
      'создают эскизы',
      'работают в цифровой среде',
      'презентуют результат'
    ]
  },
  {
    id: 'mark-belov',
    name: 'Марк Белов',
    role: 'UX/UI дизайнер',
    experience: 'более 10 лет',
    teachingExperience: '3 года',
    image: ImgMark,
    education: [
      {
        institution: 'Санкт-Петербургский государственный университет телекоммуникаций им. проф. М. А. Бонч-Бруевича',
        specialization: 'Информационные системы и технологии'
      }
    ],
    qualifications: [
      '«UX-исследования и аналитика» — Нетология',
      '«Проектирование цифровых продуктов» — НИУ ИТМО',
      '«Дизайн-мышление» — образовательные интенсивы Сколково',
      '«Методика обучения подростков цифровым навыкам» — РГПУ им. А. И. Герцена'
    ],
    professionalPath: 'Работал в digital-агентствах и IT-компаниях. Участвовал в разработке образовательных платформ, корпоративных порталов и мобильных сервисов.',
    teachingApproach: 'Марк выстраивает обучение по логике реального digital-проекта:',
    learningPoints: [
      'Исследование',
      'Структура',
      'Wireframe',
      'UI-дизайн',
      'Презентация'
    ],
    approachNote: 'Марк уделяет большое внимание аргументации решений и навыку публичного выступления.'
  },
  {
    id: 'vera-shilina',
    name: 'Вера Шилина',
    role: 'Иллюстратор и арт-наставник',
    experience: '7 лет',
    teachingExperience: '2 года',
    image: ImgVera,
    education: [
      {
        institution: 'Российский государственный педагогический университет им. А. И. Герцена',
        specialization: 'Изобразительное искусство'
      }
    ],
    qualifications: [
      '«Цветоведение и композиция» — СПГХПА им. Штиглица',
      '«Психология художественного развития ребенка» — РГПУ им. А. И. Герцена',
      '«Современная детская иллюстрация» — Bang Bang Education'
    ],
    professionalPath: '— Участие в городских художественных выставках\n— Сотрудничество с детскими издательскими проектами\n— Разработка иллюстраций для образовательных материалов',
    teachingApproach: 'Вера формирует основу визуального мышления. На занятиях ребенок:',
    learningPoints: [
      'развивает аккуратность',
      'формирует чувство цвета',
      'учит доводить работу до завершения',
      'постепенно вводит дизайнерскую логику'
    ]
  }
];

export default function TeacherDetailPage() {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  
  const teacher = teachersData.find(t => t.id === teacherId);

  if (!teacher) {
    return (
      <div className={styles.notFound}>
        <Text size={TextSizes.XL3}>Преподаватель не найден</Text>
        <Btn color="blue" onClick={() => navigate('/teachers')}>
          Вернуться к списку преподавателей
        </Btn>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Btn color="blue" onClick={() => navigate('/teachers')}>
          ← Назад к списку
        </Btn>
      </div>

      <div className={styles.teacherProfile}>
        <div className={styles.imageSection}>
          <img src={teacher.image} alt={teacher.name} className={styles.image} />
        </div>
        
        <div className={styles.infoSection}>
          <Text size={TextSizes.XL} weight={TextWeight.BOLD} className={styles.name}>
            {teacher.name}
          </Text>
          
          <Text size={TextSizes.XL2} weight={TextWeight.MEDIUM} className={styles.role}>
            {teacher.role}
          </Text>

          <div className={styles.experience}>
            <Text weight={TextWeight.BOLD}>Опыт в профессии:</Text>
            <Text> {teacher.experience}</Text>
            {teacher.teachingExperience && (
              <Text> • Опыт преподавания: {teacher.teachingExperience}</Text>
            )}
          </div>

          <div className={styles.education}>
            <Text weight={TextWeight.BOLD} size={TextSizes.XL2}>Образование</Text>
            {teacher.education.map((edu, index) => (
              <div key={index} className={styles.educationItem}>
                <Text weight={TextWeight.MEDIUM}>— {edu.institution}</Text>
                <Text className={styles.specialization}>Направление: {edu.specialization}</Text>
              </div>
            ))}
          </div>

          <div className={styles.qualifications}>
            <Text weight={TextWeight.MEDIUM}>Повышение квалификации:</Text>
            <ul className={styles.qualificationsList}>
              {teacher.qualifications.map((qual, index) => (
                <li key={index}>
                  <Text>• {qual}</Text>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.professionalPath}>
            <Text weight={TextWeight.BOLD} size={TextSizes.XL2}>Профессиональный путь</Text>
            <Text>{teacher.professionalPath}</Text>
          </div>

          <div className={styles.teachingApproach}>
            <Text weight={TextWeight.BOLD} size={TextSizes.XL2}>Как строит обучение</Text>
            <Text>{teacher.teachingApproach}</Text>
            
            <div className={styles.learningPoints}>
              <Text weight={TextWeight.MEDIUM}>Дети:</Text>
              <ul>
                {teacher.learningPoints.map((point, index) => (
                  <li key={index}>
                    <Text>— {point}</Text>
                  </li>
                ))}
              </ul>
            </div>
            
            {teacher.approachNote && (
              <Text className={styles.approachNote}>{teacher.approachNote}</Text>
            )}
          </div>

          <div className={styles.actions}>
            <Btn color="blue" width="300px">
              Записаться на пробное занятие
            </Btn>
          </div>
        </div>
      </div>

    </div>
  );
}