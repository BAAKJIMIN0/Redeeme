import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '../features/auth';
import Layout from './Layout/Layout';
import Home from '../pages/Home'
import CouponReportPage from "../pages/CouponReportPage";
import AdminPage from '../pages/AdminPage'
import CouponCreatePage from '../pages/CouponCreatePage'

const GOOGLE_CLIENT_ID = '815467473744-7s3bfsjcil6jfnp53vsotj8vm27kean1.apps.googleusercontent.com';

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/coupon-report" element={<CouponReportPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/coupon-create" element={<CouponCreatePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
export default App
