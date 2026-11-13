import styles from './SourceBadge.module.css';
import type { ReportSource } from '@/types';

interface Props {
  source?: ReportSource;
}

function SourceBadge({ source }: Props) {
  if (source !== 'AI') return null;
  return <span className={styles.badge} title="AI가 수집한 제보">AI</span>;
}

export default SourceBadge;
