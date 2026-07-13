import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '@/hooks/AuthContext';
import { ToastProvider } from '@/hooks/ToastContext';
import Layout from '@/components/Layout/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import Home from '../pages/Home'
import CouponReportPage from "../pages/CouponReportPage";
import AdminPage from '../pages/AdminPage'
import CouponCreatePage from '../pages/CouponCreatePage'
import AdminReportsPage from '../pages/AdminReportsPage'
import AdminInquiriesPage from '../pages/AdminInquiriesPage'
import AdminCouponIssueReportsPage from '../pages/AdminCouponIssueReportsPage'

const GOOGLE_CLIENT_ID = '815467473744-7s3bfsjcil6jfnp53vsotj8vm27kean1.apps.googleusercontent.com';

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/coupon-report" element={<CouponReportPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/admin/coupon-create" element={<CouponCreatePage />} />
                  <Route path="/admin/coupon-reports" element={<AdminReportsPage />} />
                  <Route path="/admin/coupon-issue-reports" element={<AdminCouponIssueReportsPage />} />
                  <Route path="/admin/inquiries" element={<AdminInquiriesPage />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
export default App
