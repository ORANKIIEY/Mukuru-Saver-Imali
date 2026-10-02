# Multi-stage Dockerfile: Unified Frontend + Spring Boot Backend on 1 Single Port

# 1. Build Frontend React Assets
FROM node:20-alpine AS frontend-build
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps
COPY frontend/ ./
RUN npx vite build

# 2. Package Backend with Frontend Assets embedded in classpath:/static/
FROM maven:3.9-eclipse-temurin-21 AS backend-build
WORKDIR /app

# Copy the pom and source from the nested folder
COPY money-coach-backend/money-coach-backend/pom.xml .

# Copy the pom and source from the nested folder
COPY money-coach-backend/money-coach-backend/pom.xml .
COPY money-coach-backend/money-coach-backend/src ./src

# Build JAR skipping unit tests for fast deploy
RUN mvn clean package -DskipTests

# Build JAR skipping unit tests for fast deploy
RUN mvn clean package -DskipTests

# Run Stage
# Run Stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
COPY --from=build /app/target/*.jar app.jar
EXPOSE 5000
ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=${PORT:-5000}"]
ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=${PORT:-5000}"]