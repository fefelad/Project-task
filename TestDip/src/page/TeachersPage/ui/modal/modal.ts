import ImgAlexsandra from '../../../../assets/TeacherPage/image 65.png';
import ImgMark from '../../../../assets/TeacherPage/Mark.png';
import ImgVera from '../../../../assets/TeacherPage/Vera.png';

export interface TeacherEducation {
  institution: string;
  specialization: string;
}

export interface TeacherData {
  id: string;
  name: string;
  role: string;
  experience: string;
  teachingExperience?: string;
  image: string;
  education: TeacherEducation[];
  qualifications: string[];
  professionalPath: string;
  teachingApproach: string;
  learningPoints: string[];
  approachNote?: string;
  courseIds?: number[];
}

export const teachersData: TeacherData[] = [
  {
    id: 'aleksandra-volkova',
    name: 'Александра Волкова',
    role: 'Графический дизайнер',
    experience: '8 лет',
    image: ImgAlexsandra,
    courseIds: [1, 4],
    education: [
      {
        institution:
          'Санкт-Петербургская государственная художественно-промышленная академия им. А. Л. Штиглица',
        specialization: 'Графический дизайн',
      },
    ],
    qualifications: [
      '«Типографика и верстка в цифровой среде» — НИУ ИТМО',
      '«Методика дополнительного образования детей» — РГПУ им. А. И. Герцена',
    ],
    professionalPath:
      'Работала в петербургской студии айдентики. Разрабатывала фирменные стили, логотипы, упаковку, полиграфию и рекламные материалы. Имеет опыт работы как с малым бизнесом, так и с городскими проектами.',
    teachingApproach:
      'Александра отвечает за структуру графического направления. Она выстраивает программу так, чтобы ребенок освоил базовые принципы и научился аргументировать свои решения. На занятиях она часто спрашивает: «Почему ты выбрал именно это решение?»',
    learningPoints: [
      'анализируют задачу',
      'ищут референсы',
      'создают эскизы',
      'работают в цифровой среде',
      'презентуют результат',
    ],
  },
  {
    id: 'mark-belov',
    name: 'Марк Белов',
    role: 'UX/UI дизайнер',
    experience: 'более 10 лет',
    teachingExperience: '3 года',
    image: ImgMark,
    courseIds: [2, 5],
    education: [
      {
        institution:
          'Санкт-Петербургский государственный университет телекоммуникаций им. проф. М. А. Бонч-Бруевича',
        specialization: 'Информационные системы и технологии',
      },
    ],
    qualifications: [
      '«UX-исследования и аналитика» — Нетология',
      '«Проектирование цифровых продуктов» — НИУ ИТМО',
      '«Дизайн-мышление» — образовательные интенсивы Сколково',
      '«Методика обучения подростков цифровым навыкам» — РГПУ им. А. И. Герцена',
    ],
    professionalPath:
      'Работал в digital-агентствах и IT-компаниях. Участвовал в разработке образовательных платформ, корпоративных порталов и мобильных сервисов.',
    teachingApproach:
      'Марк выстраивает обучение по логике реального digital-проекта:',
    learningPoints: [
      'Исследование',
      'Структура',
      'Wireframe',
      'UI-дизайн',
      'Презентация',
    ],
    approachNote:
      'Марк уделяет большое внимание аргументации решений и навыку публичного выступления.',
  },
  {
    id: 'vera-shilina',
    name: 'Вера Шилина',
    role: 'Иллюстратор и арт-наставник',
    experience: '7 лет',
    teachingExperience: '2 года',
    image: ImgVera,
    courseIds: [3, 6],
    education: [
      {
        institution:
          'Российский государственный педагогический университет им. А. И. Герцена',
        specialization: 'Изобразительное искусство',
      },
    ],
    qualifications: [
      '«Цветоведение и композиция» — СПГХПА им. Штиглица',
      '«Психология художественного развития ребенка» — РГПУ им. А. И. Герцена',
      '«Современная детская иллюстрация» — Bang Bang Education',
    ],
    professionalPath:
      '— Участие в городских художественных выставках\n— Сотрудничество с детскими издательскими проектами\n— Разработка иллюстраций для образовательных материалов',
    teachingApproach:
      'Вера формирует основу визуального мышления. На занятиях ребенок:',
    learningPoints: [
      'развивает аккуратность',
      'формирует чувство цвета',
      'учит доводить работу до завершения',
      'постепенно вводит дизайнерскую логику',
    ],
  },
];

export const getTeacherById = (teacherId?: string) =>
  teachersData.find(teacher => teacher.id === teacherId);