# Build Stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy the pom and source from the nested folder
COPY money-coach-backend/money-coach-backend/pom.xml .
COPY money-coach-backend/money-coach-backend/src ./src

# Build JAR skipping unit tests for fast deploy
RUN mvn clean package -DskipTests

# Run Stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 5000
ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=${PORT:-5000}"]