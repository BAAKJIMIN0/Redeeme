import { useNavigate } from 'react-router-dom';
import styles from './LegalPage.module.css';

function TermsPage() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
        <button className="actionBtn" onClick={() => navigate('/')}>
          돌아가기
        </button>
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>이용약관</h1>
        <p className={styles.updatedAt}>시행일: 2026년 7월 22일</p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. 목적</h2>
          <p>본 약관은 Redeeme(이하 "서비스")가 제공하는 게임 리딤 쿠폰 정보 조회, 제보, 문의 서비스 이용과 관련하여 서비스와 이용자 간의 권리·의무를 정함을 목적으로 합니다.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. 서비스의 내용</h2>
          <ul>
            <li>게임별 리딤 쿠폰 정보 조회</li>
            <li>이용자의 쿠폰 제보 및 관리자 검토를 통한 등록</li>
            <li>서비스 관련 문의·건의 접수</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. 정보의 정확성</h2>
          <p>서비스에 등록된 쿠폰 정보는 이용자 제보와 관리자 검토를 거쳐 게시되지만, 각 게임사의 정책 변경이나 쿠폰 조기 만료 등으로 실제 사용 가능 여부와 차이가 있을 수 있습니다. 서비스는 쿠폰 정보의 정확성을 보증하지 않으며, 이로 인해 발생한 손해에 대해 책임을 지지 않습니다.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. 이용자의 의무</h2>
          <ul>
            <li>허위 정보나 타인의 권리를 침해하는 내용을 제보·등록하지 않습니다.</li>
            <li>서비스 운영을 방해하는 도배, 반복 제보 등의 행위를 하지 않습니다.</li>
            <li>위반 시 서비스 이용이 제한될 수 있습니다.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. 저작권 및 상표권</h2>
          <p>서비스에 노출되는 게임명, 게임 아이콘 등은 각 게임사에 저작권 및 상표권이 있으며, 서비스는 정보 제공 목적으로만 이를 사용합니다. 서비스는 각 게임사와 제휴 또는 협력 관계에 있지 않습니다.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>6. 약관의 변경</h2>
          <p>본 약관은 서비스 운영상 필요에 따라 변경될 수 있으며, 변경 시 서비스 내 공지를 통해 안내합니다.</p>
        </section>
      </div>
    </>
  );
}

export default TermsPage;
