# DB 스키마 (실제 DB 기준)

`DESCRIBE {table}` 결과를 기준으로 작성. 스키마는 `spring.jpa.hibernate.ddl-auto=update`로 엔티티에서 자동 생성되며, 별도 마이그레이션 SQL 파일은 없다. 컬럼을 바꾸려면 해당 엔티티(`backend/src/main/java/com/redeeme/backend/domain/**`)를 수정한다.

## users
| Column | Type | Null | Key | Default | Extra |
|---|---|---|---|---|---|
| id | bigint | NO | PRI | | auto_increment |
| nickname | varchar(255) | YES | | | |
| role | varchar(255) | NO | | | |
| created_at | datetime | YES | | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| updated_at | datetime | YES | | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |

## user_oauth
| Column | Type | Null | Key | Default | Extra |
|---|---|---|---|---|---|
| id | bigint | NO | PRI | | auto_increment |
| user_id | bigint | NO | MUL | | |
| provider | varchar(255) | NO | MUL | | (provider, provider_user_id) 복합 unique) |
| provider_user_id | varchar(255) | NO | | | |
| email | varchar(255) | YES | | | |
| created_at | datetime | YES | | CURRENT_TIMESTAMP | DEFAULT_GENERATED |

## games
| Column | Type | Null | Key | Default | Extra |
|---|---|---|---|---|---|
| id | bigint | NO | PRI | | auto_increment |
| kor_name | varchar(255) | YES | | | |
| eng_name | varchar(255) | YES | | | |
| slug | varchar(255) | NO | UNI | | |
| active | tinyint(1) | NO | | 1 | |
| priority | int | NO | | | |
| servers | json | YES | | | |

## coupons
| Column | Type | Null | Key | Default | Extra |
|---|---|---|---|---|---|
| id | bigint | NO | PRI | | auto_increment |
| game_id | bigint | NO | MUL | | FK → games.id |
| code | varchar(255) | YES | | | |
| description | varchar(255) | YES | | | |
| server | varchar(255) | YES | | | |
| rewards | json | YES | | | |
| created_at | datetime(6) | YES | | | 쿠폰 등록 시각, `@PrePersist`로 자동 설정 (구 `started_at`을 rename+retype) |
| expired_at | date | YES | | | |
| quick_url | varchar(255) | YES | | | |
| active | tinyint(1) | NO | | 1 | |

## coupon_reports
| Column | Type | Null | Key | Default | Extra |
|---|---|---|---|---|---|
| id | bigint | NO | PRI | | auto_increment |
| reporter_id | bigint | NO | MUL | | FK → users.id |
| game_id | bigint | YES | MUL | | FK → games.id |
| kor_name | varchar(255) | YES | | | |
| server | varchar(255) | YES | | | |
| code | varchar(255) | YES | | | |
| description | varchar(255) | YES | | | |
| rewards | json | YES | | | |
| expired_at | date | YES | | | |
| quick_url | varchar(255) | YES | | | |
| created_at | datetime(6) | YES | | | 제보 등록 시각 (기존 `started_at`은 중복이라 drop됨) |

관리자가 승인(`POST /api/admin/coupon-reports/{id}/accept`)하면 이 row의 데이터가 `coupons` 테이블로 변환되어 들어간다. 이때 새 `Coupon` row의 `created_at`은 report의 값을 복사하지 않고 승인 시점에 새로 찍힌다.

## inquiries
| Column | Type | Null | Key | Default | Extra |
|---|---|---|---|---|---|
| id | bigint | NO | PRI | | auto_increment |
| reporter_id | bigint | NO | MUL | | FK → users.id |
| title | varchar(255) | NO | | | |
| content | text | NO | | | |
| created_at | datetime(6) | YES | | | |
