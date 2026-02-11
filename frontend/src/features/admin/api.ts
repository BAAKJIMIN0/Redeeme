import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/admin';

export const updateCoupon = async (token: string, id: number, data: Record<string, unknown>) => {
  const response = await axios.put(`${BASE_URL}/coupons/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteCoupon = async (token: string, id: number) => {
  const response = await axios.delete(`${BASE_URL}/coupons/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createCoupon = async (token: string, data: Record<string, unknown>) => {
  const response = await axios.post(`${BASE_URL}/coupon-create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getReports = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/coupon-reports`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const acceptReport = async (token: string, id: number) => {
  const response = await axios.post(`${BASE_URL}/coupon-reports/${id}/accept`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteReport = async (token: string, id: number) => {
  const response = await axios.delete(`${BASE_URL}/coupon-reports/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
