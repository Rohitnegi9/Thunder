# ==============================
# Stage 1: Build
# ==============================

FROM maven:3.9.13-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline -B

COPY src ./src

RUN mvn clean package -DskipTests


# ==============================
# Stage 2: Production
# ==============================

FROM eclipse-temurin:21-jre-alpine AS production

WORKDIR /app

COPY --from=build \
     /app/target/demo-0.0.1-SNAPSHOT.jar \
     app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]