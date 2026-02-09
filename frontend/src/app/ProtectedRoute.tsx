import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth';

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
