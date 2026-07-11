import styles from './Pagination.module.css'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={styles.pagination}>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={page === currentPage ? `${styles.pageBtn} ${styles.active}` : styles.pageBtn}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </nav>
  );
}

export default Pagination
