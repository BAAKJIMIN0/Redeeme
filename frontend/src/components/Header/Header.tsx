import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/hooks/useAuth';
import styles from './Header.module.css'

function Header() {
  const { user, loading, login, logout } = useAuth();

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    if (credentialResponse.credential) {
      login(credentialResponse.credential);
    }
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <h2>리딤이</h2>
      </Link>
      <div className={styles.userArea}>
        {loading ? null : user ? (
          <>
            <span className={styles.userName}>
              {user.nickname || user.email}
            </span>
            <button onClick={logout} className={styles.logoutBtn}>
              로그아웃
            </button>
          </>
        ) : (
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.error('Google login failed')}
            size="medium"
          />
        )}
      </div>
    </header>
  );
}

export default Header
