import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const createCouponIssueReport = async (
  token: string,
  data: { couponId: number; reason: string; detail?: string }
) => {
  const response = await axios.post(`${BASE_URL}/coupon-issue-reports`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
