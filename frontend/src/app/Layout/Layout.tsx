import Header from '../../widgets/Header'
import Footer from '../../widgets/Footer'
import { Outlet } from 'react-router-dom'
import styles from './Layout.module.css'

function Layout() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      {}
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout