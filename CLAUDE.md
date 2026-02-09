# Redeeme - 게임 쿠폰 통합 관리 플랫폼

## 프로젝트 개요
게임별 리딤 쿠폰을 수집·관리하고, 관리자(ADMIN)가 쿠폰을 등록/수정/삭제할 수 있는 웹 서비스.

## 기술 스택

| 구분 | 기술 |
|------|------|
| **Frontend** | React 19, TypeScript 5.9 (strict), Vite 7 |
| **Backend** | Spring Boot 3.5, Java 21, Maven |
| **DB** | MySQL 8.0, Spring Data JPA |
| **인증** | Google OAuth2 → JWT (7일 만료), `@react-oauth/google` |
| **스타일링** | CSS Modules + CSS Variables (`theme.css`) |
| **폰트** | NEXON Lv2 Gothic (300/400/500/700) |
| **라우팅** | react-router-dom 7 |
| **HTTP** | axios (프론트), RestTemplate 없음 (백엔드는 API 제공만) |

## 실행 명령어

```bash
# Frontend (localhost:5173, /api → :8080 프록시)
cd frontend && npm run dev

# Backend (localhost:8080)
cd backend && ./mvnw spring-boot:run

# 빌드 (프론트 → backend/src/main/resources/static 으로 출력)
cd frontend && npm run build

# 린트
cd frontend && npm run lint
```

## 프로젝트 구조

### Frontend (`frontend/src/`)
Feature-Sliced Design 아키텍처:
```
app/            # App.tsx, Layout, ProtectedRoute, 글로벌 스타일
entities/       # 도메인 모델 (coupon, game, user) — api/, model/, ui/, index.ts
features/       # 기능 단위 (auth, admin, coupon-filter)
widgets/        # 조합 컴포넌트 (Header, Footer, CouponTable, AdminCouponTable 등)
pages/          # 라우트 페이지 (Home, AdminPage, CouponReportPage, CouponCreatePage)
shared/         # 공통 리소스 (styles/theme.css, fonts/)
```

### Backend (`backend/src/main/java/com/redeeme/backend/`)
```
config/         # SecurityConfig, JwtUtil, JwtAuthenticationFilter, WebConfig
domain/
  auth/         # AuthService, AuthController, DTOs (GoogleLoginRequest, LoginResponse)
  coupon/       # Coupon entity, CouponService, AdminCouponService, Controllers, DTOs
  game/         # Game entity, GameRepository, GameController
  user/         # User, UserOauth entities, Repositories
```

## API 엔드포인트

| Method | Path | 인증 | 설명 |
|--------|------|------|------|
| GET | `/api/coupons?gameIds=1,2` | X | 쿠폰 목록 (게임 필터 선택) |
| GET | `/api/games` | X | 활성 게임 목록 (priority 순) |
| POST | `/api/auth/google` | X | Google 로그인 → JWT 발급 |
| GET | `/api/auth/me` | Bearer | 현재 유저 정보 |
| POST | `/api/admin/coupon-create` | ADMIN | 쿠폰 생성 |
| PUT | `/api/admin/coupons/{id}` | ADMIN | 쿠폰 수정 |
| DELETE | `/api/admin/coupons/{id}` | ADMIN | 쿠폰 삭제 |

## 코딩 컨벤션

### Frontend
- **컴포넌트**: `function` 선언 + `export default` (파일 하단)
- **훅**: `export const useSomething = () => {}` (named export)
- **API 함수**: `export const getSomething = async () => {}` (named export)
- **타입**: `interface` 사용, `types.ts` 파일에 정의
- **배럴 export**: `entities/*/index.ts`에서 public API 노출
- **import 경로**: `@/` alias 사용 (`@/entities/coupon`)
- **스타일**: CSS Modules (`styles.className`), 클래스명은 camelCase
- **에러 로그**: 한국어 (`console.error('쿠폰 로드 실패:', error)`)
- **조건부 렌더링**: 삼항 연산자, `&&` 패턴

### Backend
- **Lombok**: `@Getter`, `@Setter`, `@NoArgsConstructor`, `@RequiredArgsConstructor` 적극 사용
- **DI**: 생성자 주입 (RequiredArgsConstructor)
- **DTO**: 생성자에서 Entity → DTO 변환
- **트랜잭션**: 조회는 `@Transactional(readOnly = true)`
- **JSON 컬럼**: `JsonNode` + `@JdbcTypeCode(SqlTypes.JSON)`
- **에러 메시지**: 한국어 (`throw new IllegalArgumentException("쿠폰을 찾을 수 없습니다")`)
- **패키지**: `jakarta.persistence` (Spring Boot 3+)

## 주요 타입

### Coupon (Frontend)
```typescript
interface Coupon {
  id: number; gameId: number; korName: string; engName: string;
  code: string; description?: string; server: string;
  rewards: RewardItem[]; startedAt: string; expiredAt?: string;
  slug: string; quickUrl?: string;
}
interface RewardItem { item: string; amount: number; }
```

### Game (Frontend)
```typescript
interface Game {
  id: number; korName: string; engName: string; slug: string;
  active: boolean; priority: number; servers: string[];
}
```

### Auth (Frontend)
```typescript
interface AuthUser { id: number; nickname: string; role: string; email: string; }
// useAuth() → { user, token, loading, login, logout }
```

## 인증 흐름
1. Google OAuth → `idToken` 획득
2. `POST /api/auth/google` → 백엔드에서 토큰 검증, 유저 생성/조회, JWT 발급
3. JWT를 `localStorage`에 저장
4. 인증 필요 API: `Authorization: Bearer {token}` 헤더
5. Admin 라우트: `ProtectedRoute`에서 `user.role === 'ADMIN'` 체크

## 알아야 할 것들
- Vite dev 서버가 `/api`를 `:8080`으로 프록시하지만, 프론트 API 코드에는 `http://localhost:8080` 하드코딩됨 (프록시 미활용)
- 프론트 빌드 결과물이 `backend/src/main/resources/static`으로 출력됨 (통합 배포)
- `rewards` 필드: 프론트에서는 `RewardItem[]`, 백엔드에서는 `JsonNode` (MySQL JSON 컬럼)
- CSS Variables는 `shared/styles/theme.css`에 정의 (`--color-*`)
- 커밋 메시지: 한국어
