# Multi-stage Dockerfile: Unified Frontend + Spring Boot Backend on 1 Single Port

# 1. Build Frontend React Assets
FROM node:20-alpine AS frontend-build
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# 2. Package Backend with Frontend Assets embedded in classpath:/static/
FROM maven:3.9-eclipse-temurin-21 AS backend-build
WORKDIR /app
COPY money-coach-backend/money-coach-backend/pom.xml .
RUN mvn dependency:go-offline -B
COPY money-coach-backend/money-coach-backend/src ./src
COPY --from=frontend-build /frontend/dist ./src/main/resources/static
RUN mvn package -DskipTests

# 3. Run Single Unified App Container
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=backend-build /app/target/*.jar app.jar
EXPOSE 5000
ENTRYPOINT ["java", "-jar", "app.jar"]
