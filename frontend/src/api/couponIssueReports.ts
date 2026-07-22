import axios from 'axios';
import { API_BASE_URL } from '@/api/config';

const BASE_URL = `${API_BASE_URL}/api`;

export const createCouponIssueReport = async (
  token: string,
  data: { couponId: number; reason: string; detail?: string }
) => {
  const response = await axios.post(`${BASE_URL}/coupon-issue-reports`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
