import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from '../pages/Home'
import CouponReportPage from "../pages/CouponReportPage";
import AdminPage from '../pages/AdminPage'
import CouponCreatePage from '../pages/CouponCreatePage'

function App() {
  return (
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
  );
}
export default App
