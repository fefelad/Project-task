import prep1 from '../../../../assets/HomePage/prep1.png';
import prep2 from '../../../../assets/HomePage/prep2.png';
import prep3 from '../../../../assets/HomePage/prep3.png';
import prep4 from '../../../../assets/HomePage/prep4.png';


export interface HomePageTeacher {
  id: string;
  name: string;
  shortName?: string;
  image: string;
  description: string;
  ageText: string;
  startText: string;
}

export const homePageTeachers: HomePageTeacher[] = [
  {
    id: 'aleksandra-volkova',
    name: 'Александра Волкова',
    shortName: 'Саша Волкова',
    image: prep1,
    description:
      'Опытный практикующий дизайнер. Учит не только теории, но и реальным инструментам индустрии. Помогает развивать творческое мышление и собирать первые работы в портфолио.',
    ageText: 'Для детей от 7 лет',
    startText: 'Старт 15 октября',
  },
  {
    id: 'mark-belov',
    name: 'Марк Белов',
    image: prep2,
    description:
      'Веб-дизайнер с опытом в реальных проектах. Объясняет сложное простым языком и сразу даёт рабочие приёмы. На занятиях — композиция, типографика и логика интерфейсов.',
    ageText: 'Для детей от 8 лет',
    startText: 'Старт 23 октября',
  },
  {
    id: 'ivan-petrov',
    name: 'Иван Петров',
    image: prep3,
    description:
      'Практикующий дизайнер: учит решать задачи, а не просто рисовать. Много практики, понятная обратная связь и акцент на современный визуальный язык.',
    ageText: 'Для детей до 12 лет',
    startText: 'Старт 5 сентября',
  },
  {
    id: 'vera-shilina',
    name: 'Вера Шилина',
    image: prep4,
    description:
      'Педагог и графический дизайнер. Бережно развивает уверенность ребёнка и учит доводить работу до конца. Творческая свобода и понятные правила дизайна.',
    ageText: 'Для детей от 11 лет',
    startText: 'Старт 28 октября',
  },
];