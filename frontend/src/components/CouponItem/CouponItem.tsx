import styles from './CouponItem.module.css'
import ExpiryBadge from '@/components/ExpiryBadge/ExpiryBadge';
import RewardList from '@/components/RewardList/RewardList';
import type { Coupon } from '@/types';
import { formatRelativeTime } from '@/utils/formatRelativeTime';
import { useToast } from '@/hooks/useToast';

interface Props {
  coupon: Coupon;
}

export const CouponItem = ({ coupon }: Props) => {
  const iconUrl = '/gameIcons/gameIcon_' + coupon.slug + '.png';
  const { showToast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    showToast('코드가 클립보드에 복사되었습니다');
  };

  return (
    <tr>
          <td className={styles.centerText}>
            <img className={styles.gameImg} src={iconUrl} alt={coupon.korName} />
          </td>
          <td className={styles.centerText}>{coupon.server}</td>
          <td>
            <div className={styles.codeRow}>
              <span className={styles.codeBox} onClick={handleCopy}>{coupon.code}</span>
              {coupon.quickUrl && (
                <a href={coupon.quickUrl} target="_blank" rel="noopener noreferrer" className={styles.linkIcon} title="쿠폰 교환 페이지">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
            </div>
            <div className={styles.codeDescription}>{coupon.description}</div>
          </td>
          <td>
            <RewardList rewards={coupon.rewards || []} />
          </td>
          <td className={styles.centerText}>
            <ExpiryBadge expiredAt={coupon.expiredAt} />
          </td>
          <td className={styles.centerText}>{formatRelativeTime(coupon.createdAt)}</td>
        </tr>
  );
};
