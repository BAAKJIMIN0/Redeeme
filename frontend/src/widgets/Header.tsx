import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../features/auth';

function Header() {
  const { user, loading, login, logout } = useAuth();

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    if (credentialResponse.credential) {
      login(credentialResponse.credential);
    }
  };

  return (
    <header style={{
      padding: '4px 16px',
      borderBottom: '1px solid #222',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <h2>리딤이</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {loading ? null : user ? (
          <>
            <span style={{ fontSize: '14px' }}>
              {user.nickname || user.email}
            </span>
            <button
              onClick={logout}
              style={{
                padding: '6px 12px',
                fontSize: '13px',
                cursor: 'pointer',
                border: '1px solid #555',
                borderRadius: '4px',
                background: 'transparent',
                color: 'inherit',
              }}
            >
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
