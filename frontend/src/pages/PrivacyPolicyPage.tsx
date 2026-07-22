import { useNavigate } from 'react-router-dom';
import styles from './LegalPage.module.css';

function PrivacyPolicyPage() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
        <button className="actionBtn" onClick={() => navigate('/')}>
          돌아가기
        </button>
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>개인정보처리방침</h1>
        <p className={styles.updatedAt}>시행일: 2026년 7월 22일</p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. 수집하는 개인정보 항목</h2>
          <p>Redeeme(이하 "서비스")는 Google 소셜 로그인을 통해 아래 정보를 수집합니다.</p>
          <ul>
            <li>이메일 주소</li>
            <li>닉네임(Google 계정 프로필 이름)</li>
          </ul>
          <p>또한 쿠폰 제보, 문의 등록 시 이용자가 직접 입력한 내용이 계정 정보와 함께 저장됩니다.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. 개인정보 수집 및 이용 목적</h2>
          <ul>
            <li>회원 식별 및 로그인 유지</li>
            <li>쿠폰 제보, 문의 등록자 확인 및 처리 결과 안내</li>
            <li>부정 이용(허위 제보, 도배 등) 방지</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. 개인정보의 보유 및 이용 기간</h2>
          <p>이용자가 회원 탈퇴를 요청하거나 수집 목적이 달성될 때까지 보유하며, 이후 지체 없이 파기합니다.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. 개인정보의 제3자 제공 및 처리 위탁</h2>
          <p>서비스는 이용자의 개인정보를 외부에 제공하거나 처리 위탁하지 않습니다. 다만 Google 소셜 로그인 인증 과정에서 Google의 개인정보처리방침이 별도로 적용됩니다.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. 이용자의 권리</h2>
          <p>이용자는 언제든지 자신의 개인정보 열람, 정정, 삭제 및 회원 탈퇴를 요청할 수 있습니다. 아래 문의처를 통해 요청해주세요.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>6. 문의처</h2>
          <p>개인정보 관련 문의는 서비스 내 "건의하기" 메뉴를 통해 접수해주세요.</p>
        </section>
      </div>
    </>
  );
}

export default PrivacyPolicyPage;
