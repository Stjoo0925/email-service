# Java 17 JDK 베이스 이미지 사용
FROM eclipse-temurin:17-jdk

# 임시 파일 저장용 볼륨 설정
VOLUME /tmp

# 빌드된 JAR 파일을 컨테이너로 복사
COPY build/libs/*.jar app.jar

# Spring Boot 애플리케이션 실행
ENTRYPOINT ["java","-jar","/app.jar"]