# Java 17 이미지 사용
FROM openjdk:17-jdk-alpine

# 작업 디렉토리 생성
WORKDIR /app

# Gradle 빌드 결과물 복사 (build/libs/*.jar)
COPY build/libs/*.jar app.jar

# 8080 포트 오픈
EXPOSE 8080

# Spring Boot 실행
ENTRYPOINT ["java", "-jar", "app.jar"]