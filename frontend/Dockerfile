# Next.js 앱을 위한 Node.js 기반 Dockerfile
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일들 복사
COPY package.json package-lock.json* yarn.lock* ./

# 의존성 설치
RUN npm ci --only=production || yarn install --frozen-lockfile --production

# 소스 코드 복사
COPY . .

# Next.js 빌드
RUN npm run build || yarn build

# 3000번 포트 노출
EXPOSE 3000

# Next.js 서버 시작
CMD ["npm", "start"]