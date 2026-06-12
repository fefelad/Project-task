import { matchPath } from 'react-router-dom'

import logo from '../../../assets/Logo/logoFinal.png'
import PeopleHomePage from '../../../assets/HomePage/peopleHomepage.png'
import Media500 from '../../../assets/HomePage/media500.png'
import Lenta from '../../../assets/HomePage/lenta.svg'
import work1 from '../../../assets/HomePage/work11.png'
import work2 from '../../../assets/HomePage/work22.png'
import work3 from '../../../assets/HomePage/work33.png'
import work4 from '../../../assets/HomePage/work44.png'
import work5 from '../../../assets/HomePage/work55.png'
import arrow1 from '../../../assets/HomePage/arrow1.svg'
import arrow2 from '../../../assets/HomePage/arrow2.svg'
import arrow3 from '../../../assets/HomePage/arrow3.svg'
import podves2 from '../../../assets/CoursePage/podvers2.png'
import ph4 from '../../../assets/PortfolioPage/uiPortfioloi/4.png'
import ph5 from '../../../assets/PortfolioPage/uiPortfioloi/5.png'
import ph6 from '../../../assets/PortfolioPage/uiPortfioloi/6.png'
import ph7 from '../../../assets/PortfolioPage/uiPortfioloi/7.png'
import ph8 from '../../../assets/PortfolioPage/uiPortfioloi/8.png'
import ph9 from '../../../assets/PortfolioPage/uiPortfioloi/9.png'
import ph10 from '../../../assets/PortfolioPage/uiPortfioloi/10.png'
import content1 from '../../../assets/AboutPage/1.png'
import content2 from '../../../assets/AboutPage/2.png'
import content3 from '../../../assets/AboutPage/3.png'
import content4 from '../../../assets/AboutPage/4.png'
import cat2 from '../../../assets/cats/cat2Contanct.svg'
import cat from '../../../assets/cats/cat11.svg'
import catTeacherList from '../../../assets/cats/catOnlyTeacherSpicok.svg'
import catTeacherDetail from '../../../assets/cats/catOnlyTeacher.svg'
import photoCur1 from '../../../assets/CoursePage/CoursePageDeatil/photo1DetailCours.png'
import photoCur2 from '../../../assets/CoursePage/CoursePageDeatil/photo2DetailCours.png'
import carusel1 from '../../../assets/CoursePage/CoursePageDeatil/carusel1.png'
import carusel2 from '../../../assets/CoursePage/CoursePageDeatil/carusel2.png'
import carusel3 from '../../../assets/CoursePage/CoursePageDeatil/carusel3.png'
import courseArrow1 from '../../../assets/CoursePage/CoursePageDeatil/arrow1.svg'
import courseArrow2 from '../../../assets/CoursePage/CoursePageDeatil/arrow2.svg'
import courseArrow3 from '../../../assets/CoursePage/CoursePageDeatil/arrow3.svg'
import courseArrow4 from '../../../assets/CoursePage/CoursePageDeatil/arrow4.svg'
import lentaTeacherDetail from '../../../assets/TeacherPage/TeacherDetailPege/lenta1.svg'
import teacherDetailPhoto1 from '../../../assets/TeacherPage/TeacherDetailPege/Photo1.png'
import teacherDetailPhoto2 from '../../../assets/TeacherPage/TeacherDetailPege/Photo2.png'
import teacherDetailPhoto3 from '../../../assets/TeacherPage/TeacherDetailPege/Photo3.png'

import { homePageTeachers } from '../../ui/HomePageCard/modal'
import { teachers } from '../../ui/CardTeacher/modal/teacher'
import { teachersData } from '../../../page/TeachersPage/ui/modal/modal'

const unique = (urls: string[]): string[] => [...new Set(urls.filter(Boolean))]

export const LAYOUT_IMAGE_URLS = [logo]

const HOME_PAGE_IMAGE_URLS = unique([
  PeopleHomePage,
  Media500,
  Lenta,
  work1,
  work2,
  work3,
  work4,
  work5,
  arrow1,
  arrow2,
  arrow3,
  ...homePageTeachers.map(teacher => teacher.image),
])

const COURS_PAGE_IMAGE_URLS = [podves2]

const PORTFOLIO_PAGE_IMAGE_URLS = [ph4, ph5, ph6, ph7, ph8, ph9, ph10]

const ABOUT_PAGE_IMAGE_URLS = [content1, content2, content3, content4]

const CONTACT_PAGE_IMAGE_URLS = [cat2]

const NOT_FOUND_PAGE_IMAGE_URLS = [cat]

const TEACHERS_PAGE_IMAGE_URLS = unique([
  catTeacherList,
  ...teachers.map(teacher => teacher.image),
])

const COURSE_DETAIL_IMAGE_URLS = unique([
  photoCur1,
  photoCur2,
  carusel1,
  carusel2,
  carusel3,
  courseArrow1,
  courseArrow2,
  courseArrow3,
  courseArrow4,
])

const TEACHER_DETAIL_IMAGE_URLS = unique([
  catTeacherDetail,
  lentaTeacherDetail,
  teacherDetailPhoto1,
  teacherDetailPhoto2,
  teacherDetailPhoto3,
  ...teachersData.map(teacher => teacher.image),
])

const STATIC_ROUTE_IMAGES: Record<string, string[]> = {
  '/': HOME_PAGE_IMAGE_URLS,
  '/cours': COURS_PAGE_IMAGE_URLS,
  '/portfolio': PORTFOLIO_PAGE_IMAGE_URLS,
  '/about': ABOUT_PAGE_IMAGE_URLS,
  '/contact': CONTACT_PAGE_IMAGE_URLS,
  '/privacy': [],
  '/404': NOT_FOUND_PAGE_IMAGE_URLS,
  '/teachers': TEACHERS_PAGE_IMAGE_URLS,
}

export const resolvePageImageUrls = (pathname: string): string[] => {
  if (matchPath('/cours/:courseId', pathname)) {
    return unique([...LAYOUT_IMAGE_URLS, ...COURSE_DETAIL_IMAGE_URLS])
  }

  if (matchPath('/teachers/:teacherId', pathname)) {
    return unique([...LAYOUT_IMAGE_URLS, ...TEACHER_DETAIL_IMAGE_URLS])
  }

  const staticImages = STATIC_ROUTE_IMAGES[pathname] ?? []

  return unique([...LAYOUT_IMAGE_URLS, ...staticImages])
}

export const getAllSiteImageUrls = (): string[] =>
  unique([
    ...LAYOUT_IMAGE_URLS,
    ...HOME_PAGE_IMAGE_URLS,
    ...COURS_PAGE_IMAGE_URLS,
    ...PORTFOLIO_PAGE_IMAGE_URLS,
    ...ABOUT_PAGE_IMAGE_URLS,
    ...CONTACT_PAGE_IMAGE_URLS,
    ...NOT_FOUND_PAGE_IMAGE_URLS,
    ...TEACHERS_PAGE_IMAGE_URLS,
    ...COURSE_DETAIL_IMAGE_URLS,
    ...TEACHER_DETAIL_IMAGE_URLS,
  ])
