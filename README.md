# email-service

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.0-brightgreen?logo=springboot)](https://spring.io/projects/spring-boot)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?logo=nextdotjs)](https://nextjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue?logo=docker)](https://docs.docker.com/compose/)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Stjoo0925/email-service)

### 더 자세한 내용은 [!링크](https://deepwiki.com/Stjoo0925/email-service)

## 1. 프로젝트 개요

- **목표**: Spring Boot와 Next.js를 결합하여 로그인, 아이디/비밀번호 찾기, 이메일 이차인증 기능을 구현한 미니 프로젝트를 개발하며, Docker Compose를 활용해 개발 및 배포 환경을 통합적으로 관리.
- **기술 스택**:
  - **백엔드**: Spring Boot 3.5.0, Spring Security, Spring Data JPA, JavaMailSender, MySQL
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

```
EMAIL-SERVICE/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/loginproject/
│   │   │   │   ├── config/          # 설정 클래스
│   │   │   │   ├── controller/      # API 컨트롤러
│   │   │   │   ├── dto/            # 데이터 전송 객체
│   │   │   │   ├── entity/         # JPA 엔티티
│   │   │   │   ├── jwt/            # JWT 관련 클래스
│   │   │   │   ├── repository/     # JPA 리포지토리
│   │   │   │   └── service/        # 비즈니스 로직
│   │   │   └── resources/
│   │   │       └── application.yml
│   │   └── build.gradle
│   └── Dockerfile
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

## 3. 환경 변수 설정

```env
# 데이터베이스 환경변수
MYSQL_ROOT_PASSWORD= "루트계정 비밀번호"
MYSQL_DATABASE= "데이터베이스 이름"
MYSQL_USER= "아이디를 입력하세요"
MYSQL_PASSWORD= "비밀번호를 입력하세요"

# 프론트 환경변수 (Next.js)
NEXT_PUBLIC_SPRING_BASE_URL=http://localhost:8080

# 백엔드 환경변수 (Spring Boot)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME="이메일 주소를 입력하세요"
MAIL_PASSWORD="이메일 비밀번호를 입력하세요(앱 비밀번호)"
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

# JWT 환경변수
JWT_SECRET="JWT 시크릿키를 입력하세요"
```

## 4. 실행 방법

### 4.1. Docker Compose로 실행

```bash
# 모든 서비스 실행
docker compose up --build

# 백그라운드에서 실행
docker compose up -d

# 서비스 중지
docker compose down
```

### 4.2. 개별 서비스 실행

#### 백엔드 (Spring Boot)

```bash
cd backend
./gradlew build
./gradlew bootRun
```

#### 프론트엔드 (Next.js)

```bash
cd frontend
npm install
npm run dev
```

## 5. API 문서

애플리케이션 실행 후 다음 URL에서 Swagger UI를 통해 API 문서를 확인할 수 있습니다:

```
http://localhost:8080/swagger-ui/index.html
```

## 6. 주요 기능 설명

### 6.1. 회원가입/로그인

- 이메일, 비밀번호, 이름으로 회원가입
- JWT 기반 인증
- 이메일 중복 체크

### 6.2. 이메일 인증

- OTP 기반 이메일 인증
- 비밀번호 재설정 링크 발송
- 아이디 찾기 이메일 발송

### 6.3. 보안

- Spring Security를 통한 인증/인가
- JWT 토큰 기반 세션 관리
- 비밀번호 암호화 (BCrypt)

## 7. 개발 가이드

### 7.1. 백엔드 개발

- Spring Boot 3.5.0 기반
- Gradle 빌드 도구 사용
- JPA/Hibernate로 데이터베이스 연동
- Spring Security로 보안 처리

### 7.2. 프론트엔드 개발

- Next.js 15.x 기반
- Tailwind CSS로 스타일링
- Axios로 API 통신
- React Hooks 사용

### 7.3. Docker 개발

- 멀티 스테이지 빌드 사용
- 환경 변수로 설정 관리
- 볼륨으로 데이터 영속성 보장
