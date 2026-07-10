# Redeeme - 게임 쿠폰 통합 관리 플랫폼

## 1. 프로젝트 설명
게임별 리딤(redeem) 쿠폰을 수집·관리하는 웹 서비스.
- 일반 사용자: 쿠폰 목록 조회(게임별 필터), 쿠폰 제보, 건의(문의) 등록
- 관리자(ADMIN): 쿠폰 생성/수정/삭제, 제보된 쿠폰 검토(승인/삭제), 건의 조회/삭제
- 인증은 Google OAuth2 로그인 → 자체 JWT 발급 방식

## 2. 실행 방법

```bash
# Frontend (localhost:5173)
cd frontend && npm run dev

# Backend (localhost:8080)
cd backend && ./mvnw spring-boot:run

# Frontend 빌드 → backend/src/main/resources/static 으로 출력 (통합 배포용)
cd frontend && npm run build

# 린트
cd frontend && npm run lint
```

> Vite dev 서버에 `/api` → `:8080` 프록시 설정이 있지만, 프론트 API 코드는 `http://localhost:8080`을 하드코딩해서 직접 호출한다 (프록시 미사용). 새 API 함수를 만들 때도 이 패턴을 따른다.

## 3. 기술 스택

| 구분 | 기술 |
|------|------|
| **Frontend** | React 19, TypeScript 5.9 (strict), Vite 7 |
| **Backend** | Spring Boot 3.5, Java 21, Maven |
| **DB** | MySQL 8.0, Spring Data JPA (Hibernate) |
| **인증** | Google OAuth2 → JWT (`jjwt` 0.12.6, 7일 만료), `@react-oauth/google` |
| **스타일링** | CSS Modules + CSS Variables (`theme.css`) |
| **폰트** | NEXON Lv2 Gothic (300/400/500/700) |
| **라우팅** | react-router-dom 7 |
| **HTTP** | axios (프론트) |
| **보안** | Spring Security (stateless, JWT 필터 기반) |

## 4. 디렉토리 구조

역할 기반(role-based) 폴더 구조를 사용한다. FSD(entities/features) 스타일이 아니다.

### Frontend (`frontend/src/`)
```
app/            # App.tsx(라우팅), main.tsx(진입점)
pages/          # 라우트 페이지 단위 (Home, AdminPage, CouponReportPage, InquiryPage 등)
components/     # 재사용 UI 컴포넌트 (컴포넌트별 하위 폴더 + .module.css)
hooks/          # 커스텀 훅 + AuthContext
api/            # 백엔드 통신 함수 (도메인별 파일: coupons, games, auth, admin)
types/          # 타입 정의 (도메인별 파일 + index.ts 배럴)
styles/         # 글로벌 스타일 (theme.css, index.css)
assets/fonts/   # NEXON Lv2 Gothic 폰트
```

### Backend (`backend/src/main/java/com/redeeme/backend/`)
```
config/         # SecurityConfig, JwtUtil, JwtAuthenticationFilter, WebConfig
domain/
  auth/         # AuthService, controller/AuthController, dto/
  coupon/       # Coupon, CouponReport 엔티티, CouponService, AdminCouponService,
                # CouponReportService, controller/(CouponController, AdminCouponController,
                # CouponReportController), dto/
  game/         # Game 엔티티, GameRepository, controller/GameController
  inquiry/      # Inquiry 엔티티, InquiryRepository, InquiryService,
                # controller/InquiryController, dto/
  user/         # User, UserOauth 엔티티, Repository
```
도메인 패키지 내부 규칙: 엔티티/Repository/Service는 패키지 루트에, Controller는 `controller/` 서브패키지, DTO는 `dto/` 서브패키지에 둔다.

## 5. 주요 컴포넌트 / 모듈

### Frontend
- `hooks/AuthContext.tsx` + `hooks/useAuth.ts` — 로그인 상태(user, token) 전역 관리, localStorage에 JWT 저장
- `components/ProtectedRoute.tsx` — `user.role !== 'ADMIN'`이면 `/`로 리다이렉트, 관리자 라우트 감싸는 용도
- `components/Layout/Layout.tsx` — 공통 레이아웃(Header/Footer 포함), `<Outlet />` 사용
- `components/CouponTable`, `components/AdminCouponTable` — 쿠폰 목록 표시(일반/관리자용)
- `components/CouponReportForm`, `components/InquiryForm` — 사용자 제보/건의 폼
- `components/AdminReportTable`, `components/AdminInquiryList` — 관리자용 제보/건의 검토 UI
- `components/GameListContainer`, `components/GameIcon` — 게임 필터 UI

### Backend
- `config/JwtAuthenticationFilter` + `config/JwtUtil` — 모든 요청에서 JWT 검증, `SecurityContext`에 인증 정보 세팅
- `config/SecurityConfig` — 엔드포인트별 인가 규칙 정의 (아래 API 규칙 참고)
- `domain/auth/AuthService` — Google idToken 검증 → `User`/`UserOauth` 조회 또는 생성 → JWT 발급
- `domain/coupon/AdminCouponService` — 관리자 쿠폰 CRUD
- `domain/coupon/CouponReportService` — 사용자 제보 등록, 관리자 승인(`accept`) 시 `CouponReport` → `Coupon`으로 변환
- `domain/inquiry/InquiryService` — 건의 등록/조회/삭제

## 6. API 규칙

| Method | Path | 인증 | 설명 |
|--------|------|------|------|
| GET | `/api/coupons?gameIds=1,2` | 없음 | 쿠폰 목록 (게임 필터 선택) |
| GET | `/api/games` | 없음 | 활성 게임 목록 (priority 순) |
| POST | `/api/auth/google` | 없음 | Google 로그인 → JWT 발급 |
| GET | `/api/auth/me` | Bearer | 현재 유저 정보 |
| POST | `/api/coupon-reports` | Bearer | 쿠폰 제보 등록 |
| POST | `/api/inquiries` | Bearer | 건의 등록 |
| POST | `/api/admin/coupon-create` | ADMIN | 쿠폰 생성 |
| PUT | `/api/admin/coupons/{id}` | ADMIN | 쿠폰 수정 |
| DELETE | `/api/admin/coupons/{id}` | ADMIN | 쿠폰 삭제 |
| GET | `/api/admin/coupon-reports` | ADMIN | 제보 목록 조회 |
| POST | `/api/admin/coupon-reports/{id}/accept` | ADMIN | 제보 승인 → 쿠폰 등록 |
| DELETE | `/api/admin/coupon-reports/{id}` | ADMIN | 제보 삭제(반려) |
| GET | `/api/admin/inquiries` | ADMIN | 건의 목록 조회 |
| DELETE | `/api/admin/inquiries/{id}` | ADMIN | 건의 삭제 |

규칙:
- 인증 필요 API는 `Authorization: Bearer {token}` 헤더 사용
- 관리자 전용 API는 `/api/admin/**` prefix 고정 (`SecurityConfig`에서 `hasRole("ADMIN")`으로 일괄 처리)
- 새 엔드포인트 추가 시 `SecurityConfig.filterChain()`의 `authorizeHttpRequests`에 인가 규칙을 함께 추가할 것
- Controller는 얇게 유지하고 실제 로직은 Service에 위임 (생성자 주입, `@RequiredArgsConstructor`)
- 응답은 Entity를 직접 반환하지 않고 DTO(`dto/` 패키지)로 변환해서 반환

## 7. DB 구조

스키마는 별도 SQL 파일 없이 JPA 엔티티(Hibernate, `ddl-auto=update`)로 정의된다. 테이블/컬럼을 바꾸려면 엔티티를 수정한다. 실제 DB에서 `DESCRIBE`로 확인한 컬럼 단위 상세 스펙(nullable, key, default)은 [`docs/DB_SCHEMA.md`](docs/DB_SCHEMA.md) 참고 — 엔티티 정의와 실제 DB 간 drift 없음을 확인했다(2026-07-11 기준, 이후 `coupons.started_at → created_at` rename 반영됨).

| 테이블 | 엔티티 | 주요 컬럼 | 비고 |
|--------|--------|-----------|------|
| `users` | `User` | id, nickname, role(기본 `"USER"`), created_at, updated_at | role 기본값은 Java 필드 초기값(`= "USER"`)이며 DB 레벨 DEFAULT 제약은 아님 |
| `user_oauth` | `UserOauth` | id, user_id(FK), provider, provider_user_id, email | `(provider, provider_user_id)` unique |
| `games` | `Game` | id, kor_name, eng_name, slug(unique), active, priority, servers(JSON, `List<String>`) | priority 오름차순 정렬 노출 |
| `coupons` | `Coupon` | id, game_id(FK), code, description, server, rewards(JSON), created_at, expired_at, quick_url, active | `created_at`은 `@PrePersist`로 자동 설정되는 등록 시각(구 `started_at`을 rename+retype, 수동 입력 아님) |
| `coupon_reports` | `CouponReport` | id, reporter_id(FK→users), game_id(FK, nullable), kor_name, server, code, description, rewards(JSON), expired_at, quick_url, created_at | 관리자 승인 시 `Coupon`으로 변환되고 원본 row는 **삭제**됨(`CouponReportService.acceptReport`). 변환된 `Coupon.createdAt`은 report의 값을 복사하지 않고 승인 시점에 새로 찍힘 |
| `inquiries` | `Inquiry` | id, reporter_id(FK→users), title, content(TEXT), created_at | |

- JSON 컬럼: `@JdbcTypeCode(SqlTypes.JSON)` + `columnDefinition = "json"`, 자바 타입은 `JsonNode` 또는 `List<String>`
- 프론트에서는 `rewards`가 `RewardItem[]`(`{ item: string; amount: number }[]`)로 매핑됨
- 새 엔티티 추가 시 `@Entity @Table(name = "...")`, `@Getter @Setter @NoArgsConstructor` (Lombok) 패턴을 따를 것

## 8. 네이밍 규칙

### Frontend
- 컴포넌트 파일/함수: `PascalCase` (`CouponTable.tsx`, `function CouponTable() {}`)
- 훅: `camelCase`, `use` 접두사 (`useAuth`, `useCoupons`)
- API 함수: `camelCase` 동사형 (`getCoupons`, `createCoupon`)
- 타입/인터페이스: `PascalCase` (`Coupon`, `RewardItem`, `AuthUser`)
- CSS Module 클래스명: `camelCase`
- 파일명은 default export 컴포넌트명과 동일하게 맞춘다

### Backend
- 클래스: `PascalCase`, 역할 접미사 고정 — `~Controller`, `~Service`, `~Repository`, `~Request`/`~Response`(DTO)
- 필드/메서드: `camelCase`, DB 컬럼은 `snake_case` (`@Column(name = "kor_name")`로 매핑)
- 패키지명: 소문자, 도메인 단위 (`domain.coupon`, `domain.inquiry`)
- 예외 메시지: 한국어 문자열 그대로 사용 (`"쿠폰을 찾을 수 없습니다"`)

## 9. 코드 스타일

### Frontend
- 컴포넌트: `function` 선언 + `export default` (파일 하단에 배치)
- 훅/API 함수: `export const xxx = () => {}` (named export)
- import 경로: 항상 `@/` alias 사용 (`@/hooks/useAuth`, `@/types`) — 상대경로(`../../`) 지양
- 스타일: CSS Modules (`styles.className`)
- 조건부 렌더링: 삼항 연산자, `&&` 패턴
- 에러 로그: 한국어 (`console.error('쿠폰 로드 실패:', error)`)
- TypeScript strict 모드 — `any` 사용 지양, 타입은 `types/`에 정의 후 import
- 여러 컴포넌트에서 공용으로 쓰는 순수 함수(날짜 포맷 등)는 `utils/`에 둔다 (예: `utils/formatRelativeTime.ts`)

### Backend
- Lombok 적극 사용: `@Getter`, `@Setter`, `@NoArgsConstructor`, `@RequiredArgsConstructor`
- DI는 생성자 주입만 사용 (필드 주입 `@Autowired` 지양)
- 조회 메서드는 `@Transactional(readOnly = true)`
- DTO는 생성자에서 Entity → DTO 변환 로직 처리
- Update 로직은 `@Transactional` 메서드 안에서 조회한 영속 엔티티의 필드를 setter로 바꾸는 방식(JPA dirty checking)을 쓰고, 명시적으로 `repository.save()`를 다시 호출하지 않는다 (`AdminCouponService.updateCoupon` 참고)
- `jakarta.persistence` 사용 (Spring Boot 3+, `javax.*` 아님)
- 에러는 한국어 메시지의 `IllegalArgumentException` 등으로 처리 (커스텀 예외 계층 없음 — 기존 패턴 유지)

## 10. 커밋 규칙
- 커밋 메시지는 **한국어**로 작성
- 형식: 기능 단위로 짧게 서술 (예: `쿠폰 제보 기능 구현`, `쿠폰 게임 선택 UI 개선`) — Conventional Commits 접두사(`feat:` 등) 사용하지 않음
- 하나의 커밋에는 하나의 기능/개선 단위를 담는다 (기존 로그 참고: `git log --oneline`)

## 11. 테스트 방법
- 현재 프론트/백엔드 모두 **자동화된 테스트 코드가 없다** (`backend/src/test`, 프론트 `*.test.ts`는 비어있음). `spring-boot-starter-test`만 의존성으로 존재.
- 코드 수정 후 검증은 수동으로 진행:
  - Backend: `cd backend && ./mvnw spring-boot:run` 후 `curl` 또는 Postman으로 관련 엔드포인트 직접 호출
  - Frontend: `cd frontend && npm run dev` 후 브라우저에서 실제 플로우(로그인 → 쿠폰 조회/제보 → 관리자 승인) 확인
  - Frontend 타입/린트 체크: `npm run lint`, 빌드 시 `tsc -b`가 타입 에러를 잡아준다
- 새 기능에 테스트를 추가하고 싶다면: 백엔드는 `spring-boot-starter-test`(JUnit5+Mockito) 기반으로 `backend/src/test/java/...`에 작성, 프론트는 아직 테스트 러너(vitest 등)가 설정되어 있지 않으므로 먼저 설정이 필요함 — 사용자에게 먼저 확인 후 도입할 것

## 12. 주의사항
- 프론트 API 코드는 백엔드 주소(`http://localhost:8080`)를 하드코딩한다 — 배포 환경 분리 시 이 부분을 먼저 확인
- 프론트 빌드 결과물이 `backend/src/main/resources/static`으로 출력되어 통합 배포된다 — 프론트만 따로 배포하지 않음
- `rewards` 필드는 프론트 `RewardItem[]` ↔ 백엔드 `JsonNode`(MySQL JSON 컬럼) 간 변환이 필요하다
- 관리자 권한 체크는 프론트(`ProtectedRoute`, UI 숨김)와 백엔드(`SecurityConfig`, `hasRole("ADMIN")`) 양쪽에 모두 있다 — 하나만 고치고 끝내지 말 것
- 새 관리자 API를 추가하면 `SecurityConfig`의 인가 규칙과 프론트 `ProtectedRoute` 라우팅을 함께 갱신해야 한다
- `CouponReport` 승인(`accept`) 로직은 제보 데이터를 `Coupon`으로 변환하는 흐름이라 필드 매핑이 어긋나지 않도록 두 엔티티의 필드를 동시에 확인할 것
- `coupon_reports.game_id`가 없는 "기타 게임" 제보는 승인(`accept`) 시 예외가 발생한다 (`"기타 게임 제보는 직접 쿠폰을 생성해주세요."`) — 이런 제보는 관리자가 `/api/admin/coupon-create`로 직접 등록해야 하며, 승인 API를 그대로 호출하도록 수정하면 안 된다
- CSS Variables는 `styles/theme.css`에서만 정의하고 컴포넌트에서는 재정의하지 않는다
- 쿠폰의 "등록" 표시는 절대 날짜가 아니라 `utils/formatRelativeTime.ts`로 상대 시간(`n분 전`/`n시간 전`/`n일 전`)을 보여준다 (`CouponItem`, `AdminCouponItem`, `AdminReportTable`) — 만료일(`마감`)은 그대로 절대 날짜로 표시
- `CouponTable`/`AdminCouponTable`의 정렬 모드는 `latest`(최신순)와 `expiry`(만료 임박순) 두 가지뿐이다(과거 있었던 `default` 모드는 제거됨). 기본값은 `latest`다 — 처음 화면 진입 시 최신 등록순으로 보여야 하므로 임의로 `expiry`로 바꾸지 말 것
