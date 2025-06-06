# email-service

> 이메일 이차인증 서비스 구현

## 1. 프로젝트 개요

- **목표**: Spring Boot와 Next.js를 결합하여 로그인, 아이디/비밀번호 찾기, 이메일 이차인증 기능을 구현한 미니 프로젝트를 개발하며, Docker Compose를 활용해 개발 및 배포 환경을 통합적으로 관리.
- **기술 스택**:
  - **백엔드**: Spring Boot 3.x, Spring Security, Spring Data JPA, JavaMailSender, MySQL
  - **프론트엔드**: Next.js 15.x, Axios (HTTP 클라이언트), Tailwind CSS
  - **컨테이너화**: Docker, Docker Compose
  - **빌드 도구**: Gradle (백엔드), npm/yarn (프론트엔드)
- **주요 기능**:
  - 회원가입 및 로그인 (JWT 기반 인증)
  - 아이디/비밀번호 찾기 (이메일 기반)
  - 이메일 이차인증 (OTP 전송 및 검증)
  - 프론트엔드와 백엔드 간 REST API 연동
- **배포 환경**: Docker Compose를 사용해 MySQL, Spring Boot, Next.js 애플리케이션을 컨테이너화하여 통합 실행.

## 2. 프로젝트 구조

```xml
EMAIL-SERVICE/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/loginproject/
│   │   │   │   ├── config/
│   │   │   │   ├── controller/
│   │   │   │   ├── entity/
│   │   │   │   ├── repository/
│   │   │   │   ├── service/
│   │   │   │   ├── dto/
│   │   │   │   └── util/
│   │   │   └── resources/
│   │   │       ├── templates/ (optional for error pages)
│   │   │       └── application.yml
│   ├── build.gradle
│   └── settings.gradle
|   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── assets/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

```env
# 데이터베이스 환경변수
MYSQL_ROOT_PASSWORD= "루드계정 비밀번호"
MYSQL_DATABASE= "데이터베이스 이름"
MYSQL_USER= "아이디를 입력하세요"
MYSQL_PASSWORD= "비밀번호를 입력하세요"

# 프론트 환경변수 (Next.js)
NEXT_PUBLIC_API_BASE_URL= "백엔드API주소"
```

## 3. 기능별 계획

### 3.1. 회원가입

- **설명**: 사용자가 이메일, 비밀번호, 이름을 입력하여 계정을 생성.
- **백엔드**:
  - `/api/auth/signup` 엔드포인트 (POST)로 회원가입 요청 처리.
  - 비밀번호는 BCrypt로 해싱하여 MySQL에 저장.
  - 이메일 중복 체크 후 에러 응답.
- **프론트엔드**:
  - Next.js 페이지(`/signup`)에서 회원가입 폼 제공.
  - Axios로 백엔드 API 호출, 성공/실패 메시지 표시.
- **흐름**:
  1. 사용자가 회원가입 폼에 정보 입력.
  2. Next.js에서 POST 요청 전송.
  3. Spring Boot가 데이터 검증 후 DB 저장.
  4. 성공/실패 응답을 Next.js로 반환하여 UI에 반영.

### 3.2. 로그인

- **설명**: 이메일과 비밀번호로 로그인 후 JWT 토큰 발급, 이메일로 OTP 전송.
- **백엔드**:
  - `/api/auth/login` 엔드포인트 (POST)로 로그인 처리.
  - Spring Security로 인증 후 JWT 토큰 생성.
  - 로그인 성공 시 OTP 생성 및 JavaMailSender로 이메일 전송.
  - `/api/auth/verify-otp` 엔드포인트로 OTP 검증.
- **프론트엔드**:
  - Next.js 페이지(`/login`)에서 로그인 폼 제공.
  - 성공 시 OTP 입력 페이지(`/otp`)로 이동.
  - OTP 입력 후 검증 요청 전송.
- **흐름**:
  1. 사용자가 로그인 폼에 정보 입력.
  2. 백엔드에서 인증 후 JWT와 OTP 전송.
  3. 사용자가 OTP 입력 후 검증 요청.
  4. 검증 성공 시 보호된 페이지로 이동.

### 3.3. 아이디 찾기

- **설명**: 이름과 이메일을 입력하여 등록된 이메일(아이디) 확인.
- **백엔드**:
  - `/api/auth/find-id` 엔드포인트 (POST)로 요청 처리.
  - 이름과 이메일 일치 여부 확인 후 이메일로 아이디 전송.
- **프론트엔드**:
  - Next.js 페이지(`/find-id`)에서 아이디 찾기 폼 제공.
  - 성공 시 사용자에게 이메일 발송 메시지 표시.
- **흐름**:
  1. 사용자가 이름과 이메일 입력.
  2. 백엔드에서 데이터 확인 후 이메일 전송.
  3. 프론트엔드에서 결과 메시지 표시.

### 3.4. 비밀번호 찾기

- **설명**: 이메일로 비밀번호 재설정 링크를 받아 재설정.
- **백엔드**:
  - `/api/auth/reset-password` 엔드포인트 (POST)로 재설정 링크 전송.
  - 링크에 포함된 토큰으로 유효성 검증 후 `/api/auth/reset-password/{token}`으로 비밀번호 변경.
- **프론트엔드**:
  - Next.js 페이지(`/reset-password`)에서 비밀번호 재설정 요청 폼 제공.
  - 재설정 링크 클릭 시 새로운 비밀번호 입력 폼 표시(`/reset-password/[token]`).
- **흐름**:
  1. 사용자가 이메일 입력.
  2. 백엔드에서 토큰 생성 및 이메일 전송.
  3. 사용자가 링크 클릭 후 비밀번호 재설정.
  4. 성공 메시지 표시.

### 3.5. 이메일 이차인증

- **설명**: 로그인 성공 후 OTP를 이메일로 받아 검증.
- **백엔드**:
  - OTP 생성 및 저장 (Redis 또는 DB 사용 가능).
  - JavaMailSender로 OTP 전송.
  - `/api/auth/verify-otp`로 OTP 유효성 확인.
- **프론트엔드**:
  - Next.js 페이지(`/otp`)에서 OTP 입력 폼 제공.
  - 검증 성공/실패에 따라 UI 업데이트.
- **흐름**:
  1. 로그인 성공 후 OTP 전송.
  2. 사용자가 OTP 입력.
  3. 백엔드에서 OTP 검증 후 결과 반환.
  4. 성공 시 보호된 리소스 접근 허용.

## 4. Docker Compose 설정

- **구성**:
  - **MySQL 컨테이너**: 사용자 데이터 저장.
  - **Spring Boot 컨테이너**: 백엔드 API 제공.
  - **Next.js 컨테이너**: 프론트엔드 애플리케이션 제공.
- **환경 설정**:
  - MySQL: 포트 3306, 환경 변수로 DB 설정.
  - Spring Boot: 포트 8080, MySQL과 연동.
  - Next.js: 포트 3000, Spring Boot API와 통신.
- **docker-compose.yml 구조**:
  - 서비스 정의: `db`, `backend`, `frontend`.
  - 네트워크 설정: 단일 브리지 네트워크로 컨테이너 간 통신.
  - 볼륨 설정: MySQL 데이터 영속성 보장.
- **흐름**:
  1. `docker-compose up`으로 모든 서비스 실행.
  2. MySQL이 먼저 초기화 후 Spring Boot 연결.
  3. Next.js 앱이 백엔드 API 호출.

## 5. 개발 및 배포 계획

- **개발 단계**:
  1. Gradle로 Spring Boot 프로젝트 초기화, 의존성 추가 (Spring Security, JPA, JavaMailSender 등).
  2. Next.js 프로젝트 생성, 필요한 라이브러리 설치 (Axios, Tailwind CSS 등).
  3. REST API 엔드포인트 설계 및 구현.
  4. Next.js 페이지/컴포넌트 개발 및 API 연동.
  5. Docker Compose 파일 작성 및 테스트.
- **테스트**:
  - 단위 테스트: JUnit으로 백엔드 서비스 테스트.
  - 통합 테스트: Postman으로 API 테스트.
  - 프론트엔드 테스트: React Testing Library, Jest 등 사용.
- **배포**:
  - 로컬에서 Docker Compose로 테스트.
  - CI/CD 파이프라인 고려 (예: GitHub Actions).
- **일정**:
  - 1주차: 프로젝트 설정, DB 및 백엔드 기본 구조 구현.
  - 2주차: 회원가입, 로그인, 이메일 인증 기능 구현.
  - 3주차: 아이디/비밀번호 찾기, 프론트엔드 연동.
  - 4주차: Docker Compose 설정, 테스트 및 최적화.

## 6. 추가 고려사항

- **보안**: HTTPS 설정, JWT 토큰 만료 시간 관리, OTP 유효 기간 설정.
- **확장성**: Redis를 추가하여 OTP 저장 및 세션 관리 최적화 가능.
- **에러 처리**: 프론트엔드와 백엔드에서 사용자 친화적인 에러 메시지 제공.
- **문서화**: Swagger로 API 문서 생성, README에 프로젝트 실행 방법 명시.
