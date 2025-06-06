# 1단계: Next.js 앱 빌드
FROM node:18-alpine AS build

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 매니저 lock 파일과 package.json 복사
COPY package.json yarn.lock* package-lock.json* ./
# 의존성 설치 (yarn 또는 npm)
RUN yarn install --frozen-lockfile || npm install

# 전체 소스 복사
COPY . .
# Next.js 빌드
RUN yarn build || npm run build

# 2단계: 정적 파일 서빙 (nginx)
FROM nginx:alpine
# 빌드된 정적 파일을 nginx html 폴더로 복사
COPY --from=build /app/build /usr/share/nginx/html
# 3000번 포트 노출
EXPOSE 3000
# nginx 실행
CMD ["nginx", "-g", "daemon off;"]