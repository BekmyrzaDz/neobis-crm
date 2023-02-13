import { useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import loginImg from '../../modules/Auth/assets/login-img.svg'
import {
  renderAuthForm,
  TLocation,
} from '../../modules/auth/helpers/renderAuthForm'
import styles from './AuthPage.module.scss'

const AuthPage = () => {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <section className={styles.login}>
      <div className={styles.loginContent}>
        <div className={styles.logo}>
          <img className={styles.logoItem} src={logo} alt='logo' />
        </div>

        <div className={styles.wrapper}>
          <div className={styles.img}>
            <img className={styles.imgItem} src={loginImg} alt='login-img' />
          </div>

          {renderAuthForm(currentPath as TLocation)}
        </div>
      </div>
    </section>
  )
}

export default AuthPage