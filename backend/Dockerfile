# JDK 17 Alpine 이미지를 기반으로 사용
FROM eclipse-temurin:17-jdk-alpine
# 작업 디렉토리 설정
WORKDIR /app
# 빌드된 JAR 파일을 컨테이너로 복사
COPY build/libs/*.jar app.jar
# 8080 포트 노출
EXPOSE 8080
# JAR 파일 실행
ENTRYPOINT ["java","-jar","app.jar"]