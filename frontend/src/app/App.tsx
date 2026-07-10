import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '@/hooks/AuthContext';
import Layout from '@/components/Layout/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import Home from '../pages/Home'
import CouponReportPage from "../pages/CouponReportPage";
import AdminPage from '../pages/AdminPage'
import CouponCreatePage from '../pages/CouponCreatePage'
import AdminReportsPage from '../pages/AdminReportsPage'
import InquiryPage from '../pages/InquiryPage'
import AdminInquiriesPage from '../pages/AdminInquiriesPage'

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
              <Route path="/inquiry" element={<InquiryPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/coupon-create" element={<CouponCreatePage />} />
                <Route path="/admin/coupon-reports" element={<AdminReportsPage />} />
                <Route path="/admin/inquiries" element={<AdminInquiriesPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
export default App
