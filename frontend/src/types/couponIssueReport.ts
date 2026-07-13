export interface CouponIssueReport {
  id: number;
  reporterId: number;
  couponId: number;
  couponCode: string;
  korName: string;
  server: string;
  reason: string;
  detail?: string;
  createdAt: string;
}
