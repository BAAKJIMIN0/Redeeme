import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link to="/terms">이용약관</Link>
        <Link to="/privacy">개인정보처리방침</Link>
      </div>
    </footer>
  )
}

export default Footer
