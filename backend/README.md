# 🛡️ SafeNet — Local Development Setup

A secure resource management service built with **Spring Boot 3**, **Java 21**, **Keycloak**, and **PostgreSQL**.
This guide covers everything needed to run the project locally using **Docker Compose**.

---

## ⚙️ 1. Prerequisites

Before running the project, make sure the following tools are installed:

| Tool               | Version | Installation                                                 |
| ------------------ | ------- | ------------------------------------------------------------ |
| **Java**           | 21+     | [Download OpenJDK 21](https://adoptium.net/)                 |
| **Maven**          | 3.9+    | [Maven Install Guide](https://maven.apache.org/install.html) |
| **Docker**         | 24+     | [Docker Install Guide](https://docs.docker.com/get-docker/)  |
| **Docker Compose** | v2+     | Comes with recent Docker Desktop versions                    |

Verify installation:

```bash
java -version
mvn -version
docker --version
docker compose version
```

---

## 📁 2. Clone Repository

```bash
git clone https://github.com/<your-org>/SafeNet.git
cd SafeNet
```

---

## 🌍 3. Environment Configuration

Create a `.env` file in the project root and paste the following:

```bash
# ================================
# Server Configuration
# ================================
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=dev
HOST=http://localhost

# ================================
# Database Configuration (Supabase)
# ================================
DATABASE_URL=jdbc:postgresql://localhost:5433/resourcedb
DATABASE_USERNAME=safenet
DATABASE_PASSWORD=hackathon26

# ================================
# Connection Pool Settings
# ================================
MAXIMUM_POOL_SIZE=10
MINIMUM_IDLE=2
CONNECTION_TIMEOUT=30000
IDLE_TIMEOUT=600000
MAX_LIFETIME=1800000

# ================================
# Security Configuration
# ================================
KEYCLOAK_CLIENT_ID=frontend-app
KEYCLOAK_CLIENT_SECRET=s3cureR@nd0mStr1ng123!

# ================================
# Actuator Configuration
# ================================
MANAGEMENT_ENDPOINTS_WEB_EXPOSURE_INCLUDE=health,info,metrics,prometheus
MANAGEMENT_ENDPOINT_HEALTH_SHOW_DETAILS=when_authorized

# ================================
# Google OAuth2 Configuration
# ================================
GOOGLE_CLIENT_ID=change-me
GOOGLE_CLIENT_SECRET=change-me

# ================================
# Docker Configuration
# ================================
POSTGRES_USER=safenet
POSTGRES_PASSWORD=hackathon26
POSTGRES_RESOURCE_DB=resourcedb
POSTGRES_KEYCLOAK_DB=keycloakdb

PGADMIN_EMAIL=safenet.hackathon26@gmail.com
PGADMIN_PASSWORD=hackathon26

KEYCLOAK_ADMIN=safenet
KEYCLOAK_ADMIN_PASSWORD=hackathon26
```

---

## 🐳 4. Start Docker Services

Start PostgreSQL + Keycloak (base services):

```bash
docker-compose up --build
```

Optionally include **PgAdmin**:

```bash
docker-compose --profile tools up --build
```

> 🧠 Note: The `--profile tools` flag includes developer tools like **PgAdmin** but is not required for the core system.

---

## 🔐 5. Keycloak Configuration

1. Open **Keycloak** in your browser:
   👉 [http://localhost:8081](http://localhost:8081)

2. Log in with admin credentials:

   ```
   Username: safenet
   Password: hackathon26
   ```

3. Import custom user attributes:

  * Navigate to **Realm Settings → User Profile → JSON Editor**
  * Paste the contents of:

    ```
    docker/keycloak/user-attributes.json
    ```

4. Verify realm import (if applicable):

  * Realm name: **safenet**
  * Issuer URI: `https://localhost:8081/realms/safenet`

---

## 🗄️ 6. PgAdmin (Optional)

1. Access PgAdmin:
   👉 [http://localhost:5050](http://localhost:5050)

2. Login:

   ```
   Email: safenet.hackathon26@gmail.com
   Password: hackathon26
   ```

3. Add Server Connection:

   | Field            | Value                   |
      | ---------------- | ----------------------- |
   | Name             | Postgres                |
   | Hostname/Address | postgres                |
   | Port             | 5432                    |
   | Username         | safenet                 |
   | Password         | hackathon26             |
   | Database         | resourcedb / keycloakdb |

> 💡 Inside Docker, use `postgres` as hostname.
> Outside Docker (e.g., your local IDE), use `localhost:5433`.

---

## ☕ 7. Running the Spring Boot Application

Once Docker services are up:

```bash
mvn clean install
mvn spring-boot:run
```

Or package it into a JAR and run it:

```bash
mvn package
java -jar target/SafeNet-0.0.1-SNAPSHOT.jar
```

---

## 📊 8. Verify Services

| Service             | URL                                                                            | Description         |
| ------------------- | ------------------------------------------------------------------------------ | ------------------- |
| **API Server**      | [http://localhost:8080](http://localhost:8080)                                 | Spring Boot backend |
| **Swagger UI**      | [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html) | API documentation   |
| **Actuator Health** | [http://localhost:8080/actuator/health](http://localhost:8080/actuator/health) | Health endpoint     |
| **Keycloak**        | [http://localhost:8081](http://localhost:8081)                                 | Identity provider   |
| **PgAdmin**         | [http://localhost:5050](http://localhost:5050)                                 | Database GUI        |

---

## 🧰 9. Useful Docker Commands

```bash
# Stop all containers
docker-compose down

# Restart with rebuild
docker-compose up --build

# View logs
docker logs postgres -f
docker logs keycloak -f

# Access Postgres shell
docker exec -it postgres psql -U safenet -d resourcedb

# Prune unused containers/images
docker system prune -f
```

---

## 🧩 10. Project Tech Stack

| Layer                 | Technology               |
| --------------------- | ------------------------ |
| **Language**          | Java 21                  |
| **Framework**         | Spring Boot 3.5.6        |
| **Database**          | PostgreSQL               |
| **Identity Provider** | Keycloak                 |
| **Containerization**  | Docker Compose           |
| **ORM**               | JPA (Hibernate)          |
| **Docs**              | SpringDoc OpenAPI        |
| **Monitoring**        | Actuator                 |
| **Testing**           | JUnit 5 + Testcontainers |

---

## 🚀 Quick Lookup

| Action             | Command                                        |
| ------------------ | ---------------------------------------------- |
| Start services     | `docker-compose up --build`                    |
| Start with PgAdmin | `docker-compose --profile tools up --build`    |
| Stop services      | `docker-compose down`                          |
| Run app            | `mvn spring-boot:run`                          |
| Open Keycloak      | [http://localhost:8081](http://localhost:8081) |
| Open PgAdmin       | [http://localhost:5050](http://localhost:5050) |
