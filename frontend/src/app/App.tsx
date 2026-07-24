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
import SchedulePage from '../pages/SchedulePage'
import AdminEventsPage from '../pages/AdminEventsPage'
import EventReportPage from '../pages/EventReportPage'
import AdminEventReportsPage from '../pages/AdminEventReportsPage'
import InquiryPage from '../pages/InquiryPage'
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage'
import TermsPage from '../pages/TermsPage'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

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
                <Route path="/event-report" element={<EventReportPage />} />
                <Route path="/inquiry" element={<InquiryPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/admin/coupon-create" element={<CouponCreatePage />} />
                  <Route path="/admin/coupon-reports" element={<AdminReportsPage />} />
                  <Route path="/admin/coupon-issue-reports" element={<AdminCouponIssueReportsPage />} />
                  <Route path="/admin/inquiries" element={<AdminInquiriesPage />} />
                  <Route path="/admin/events" element={<AdminEventsPage />} />
                  <Route path="/admin/event-reports" element={<AdminEventReportsPage />} />
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
