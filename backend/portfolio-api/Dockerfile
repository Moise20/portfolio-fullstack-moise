# ---- Build (Maven + JDK 17)
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Télécharger les deps en cache
COPY pom.xml .
RUN mvn -B -q -DskipTests dependency:go-offline

# Copier le code et builder un JAR exécutable
COPY src ./src
RUN mvn -B -DskipTests clean package spring-boot:repackage

# ---- Run (JRE 17)
FROM eclipse-temurin:17-jre
WORKDIR /app

# Un peu de marge mémoire en containers
ENV PORT=8080 \
    JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75.0 -XX:+ExitOnOutOfMemoryError"

# Exposer le port interne (Render injectera $PORT)
EXPOSE 8080

# Copier le JAR final et lancer Spring sur le port imposé par Render
COPY --from=build /app/target/*.jar app.jar
CMD ["sh","-c","java -Dserver.port=$PORT -jar app.jar"]
