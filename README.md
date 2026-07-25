# Redeeme

게임별 리딤(redeem) 쿠폰과 공방/이벤트 일정을 한곳에서 확인할 수 있는 통합 관리 웹 서비스입니다.
게임마다 흩어져 있는 쿠폰 코드와 이벤트 일정을 직접 찾아다닐 필요 없이, 게임을 선택해 필터링하고 클릭 한 번으로 코드를 복사할 수 있습니다.
사용자가 새로운 쿠폰이나 일정을 제보하면 운영자 검토를 거쳐 반영되는 구조입니다.

## 주요 기능

- 게임별 쿠폰 목록 조회 및 필터링
- 최신순 / 만료 임박순 정렬
- 공방·이벤트 일정 캘린더 / 리스트 보기
- 쿠폰 제보/이벤트 일정 제보
- 건의사항(문의) 등록
- Google 소셜 로그인

### 관리자 페이지

<img width="769" height="272" alt="Image" src="https://github.com/user-attachments/assets/dcfe42a3-aa59-4687-ad4c-64324d6e07c8" />

  - 쿠폰 생성 / 수정 / 삭제
<img width="784" height="326" alt="Image" src="https://github.com/user-attachments/assets/fee46cd8-a0ed-4d27-9265-a03c4eb5b55f" />

  - 제보된 쿠폰 검토(승인 · 반려)
  - 이벤트 일정 생성 / 수정 / 삭제
  - 제보된 이벤트 일정 검토
  - 건의사항 조회 / 삭제

## 사용 기술

- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Spring Boot 3, Java 21
- **Database**: MySQL 8, Spring Data JPA (Hibernate)
- **인증**: Google OAuth2 + JWT
- **배포**: Docker
