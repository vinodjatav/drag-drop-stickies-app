# Step 1: Use an official JDK image
FROM openjdk:22-jdk-slim

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the Spring Boot JAR file
COPY target/drag-drop-stickies-0.0.1-SNAPSHOT.jar app.jar

# Expose the port on which the Spring Boot app will run
EXPOSE 8080

# Step 4: Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]