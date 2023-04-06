import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import Spinner from '../../components/spinner/spinner'
import Modal from '../../components/Modal/Modal'
import IconButton from '../../components/iconButton/IconButton'
import SearchBar from '../../modules/CoursePage/components/SearchBar/SearchBar'
import SwitcherButton from '../../modules/students/components/SwitcherButton/SwitcherButton'
import ProfileIcon from '../../modules/students/components/profileIcon/ProfileIcon'
import FilterButton from '../../modules/students/components/filterButton/filterButton'
import StudentCard from '../../modules/students/components/studentCard/StudentCard'
import StudentForm from '../../modules/students/forms/studentForm/StudentForm'
import GroupCard from '../../modules/students/components/groupCard/GroupCard'
import GroupForm from '../../modules/students/forms/groupForm/GroupForm'
import { getProfileById } from '../../modules/profilePage/redux/asyncActions'
import { profileReset } from '../../modules/profilePage/redux/profileSlice'
import { getStudentsOnStudy } from '../../modules/students/redux/asyncActions'
import { studentsOnStudyReset } from '../../modules/students/redux/studentsOnStudySlice'
import {
  plusIcon,
  allIcon,
  uxuiIcon,
  frontendIcon,
  pmIcon,
  backendIcon,
  androidIcon,
  iosIcon,
  flutterIcon,
  olympIcon,
} from '../../modules/students/assets/icons'

import styles from './StudentsPage.module.scss'

type ModalState = [boolean, Dispatch<SetStateAction<boolean>>]
type activeOptionState = [string, Dispatch<SetStateAction<string>>]

const departmentFilters = [
  { id: '', text: 'Все', icon: allIcon, extraClassForText: styles.all },
  { id: 'ux-ui', text: 'UX/UI', icon: uxuiIcon, extraClassForText: styles.ux },
  {
    id: 'front-end',
    text: 'Front-end',
    icon: frontendIcon,
    extraClassForText: styles.front,
  },
  { id: 'pm', text: 'PM', icon: pmIcon, extraClassForText: styles.pm },
  {
    id: 'back-end',
    text: 'Back-end',
    icon: backendIcon,
    extraClassForText: styles.back,
  },
  {
    id: 'android',
    text: 'Android',
    icon: androidIcon,
    extraClassForText: styles.android,
  },
  { id: 'ios', text: 'iOS', icon: iosIcon, extraClassForText: styles.ios },
  {
    id: 'flutter',
    text: 'Flutter',
    icon: flutterIcon,
    extraClassForText: styles.flutter,
  },
  {
    id: 'olimped_programming',
    text: 'Олимп. программирование',
    icon: olympIcon,
    extraClassForText: styles.olymp,
  },
]

const StudentsPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [activeOption, setActiveOption]: activeOptionState =
    useState('Студенты')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [modalActive, setModalActive]: ModalState = useState(false)

  const auth = useAppSelector((state) => state.auth)
  const profile = useAppSelector((state) => state.profile)
  const study = useAppSelector((state) => state.studentsOnStudy)

  const token = auth.user?.access
  const authUserId = auth.user?.id
  const auth_first_name = profile.profile?.first_name
  const auth_last_name = profile.profile?.last_name
  const auth_avatar = profile.profile?.image!
  const isProfileSuccess = profile.isSuccess
  const { isSuccess, isLoading } = study
  const studentsOnStudy = study.studentsOnStudy

  useEffect(() => {
    if (authUserId !== undefined) {
      dispatch(getProfileById(authUserId))
    }
  }, [])

  if (isProfileSuccess) {
    dispatch(profileReset())
  }

  useEffect(() => {
    if (activeOption === 'Студенты' && token !== undefined) {
      dispatch(getStudentsOnStudy({ token, departmentFilter }))
    }
  }, [departmentFilter])

  if (isSuccess) {
    dispatch(studentsOnStudyReset())
  }

  const onToggleModal = useCallback(() => {
    setModalActive((prev) => !prev)
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className={styles.studentPage}>
      <div className={styles.header}>
        <SearchBar />

        <div className={styles.actions}>
          <SwitcherButton
            activeOption={activeOption}
            setActiveOption={setActiveOption}
          />

          {activeOption === 'Студенты' ? (
            <IconButton
              text={'Добавить студента'}
              icon={plusIcon}
              onClick={onToggleModal}
            />
          ) : (
            <IconButton
              text={'Добавить группу'}
              icon={plusIcon}
              onClick={onToggleModal}
            />
          )}

          <ProfileIcon
            avatar={auth_avatar}
            text={`${auth_first_name} ${auth_last_name} `}
            onClick={() => navigate('/profile')}
          />
        </div>
      </div>

      <div className={styles.filterBtns} id='filterBtns'>
        {departmentFilters.map(({ id, text, icon, extraClassForText }) => (
          <FilterButton
            key={id}
            text={text}
            count={departmentFilter === id ? studentsOnStudy.length : icon}
            isActive={departmentFilter === id}
            onClick={() => setDepartmentFilter(id)}
            extraClassForText={extraClassForText}
          />
        ))}
      </div>

      <div className={styles.content}>
        {activeOption === 'Студенты' ? (
          studentsOnStudy.map((student) => {
            return (
              <StudentCard
                key={student.phone}
                id={student.id}
                first_name={student.first_name}
                last_name={student.last_name}
                phone={student.phone}
                department={student.department.name}
                came_from={student.came_from.name}
                payment_status={student.payment_status}
              />
            )
          })
        ) : (
          <>
            <GroupCard />
            <GroupCard />
            <GroupCard />
            <GroupCard />
            <GroupCard />
            <GroupCard />
            <GroupCard />
            <GroupCard />
          </>
        )}
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        {activeOption === 'Студенты' ? <StudentForm /> : <GroupForm />}
      </Modal>
    </div>
  )
}

export default StudentsPage
