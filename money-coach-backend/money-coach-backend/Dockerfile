# Multi-stage Dockerfile: Unified Frontend + Spring Boot Backend on 1 Single Port

# 1. Build Frontend React Assets
FROM node:20-alpine AS frontend-build
WORKDIR /frontend
COPY frontend/package.json ./
RUN npm install --legacy-peer-deps
COPY frontend/src ./src
COPY frontend/public ./public
COPY frontend/index.html ./
COPY frontend/vite.config.js ./
RUN npx vite build

# 2. Package Backend with Frontend Assets embedded in classpath:/static/
FROM maven:3.9-eclipse-temurin-21 AS backend-build
WORKDIR /app
COPY money-coach-backend/money-coach-backend/pom.xml ./
COPY money-coach-backend/money-coach-backend/src ./src
COPY --from=frontend-build /frontend/dist ./src/main/resources/static
RUN mvn clean package -DskipTests -Dmaven.test.skip=true

# 3. Run Single Unified App Container with RAM limits for Render Free Tier (512MB)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=backend-build /app/target/*.jar app.jar
EXPOSE 5000
ENV PORT=5000
ENTRYPOINT ["java", "-Xmx384m", "-jar", "app.jar"]
