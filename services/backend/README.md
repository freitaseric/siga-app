<!-- omit in toc -->
# SIGA Backend — Spring Boot API Service

SIGA Backend is a robust, scalable Spring Boot application that provides a comprehensive REST API for managing agricultural service records, technicians, and rural producers.

<!-- omit in toc -->
## Table of Contents

- [Overview](#overview)
  - [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
  - [System Layers](#system-layers)
  - [Security Flow](#security-flow)
- [Requirements](#requirements)
- [Setup](#setup)
  - [1. Environment Configuration](#1-environment-configuration)
  - [2. Required Environment Variables](#2-required-environment-variables)
  - [3. Database Setup](#3-database-setup)
- [How to Run](#how-to-run)
- [API Endpoints](#api-endpoints)
  - [Base URL](#base-url)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Protected Endpoints](#protected-endpoints)
  - [Example Usage](#example-usage)
    - [Login](#login)
    - [Health Check](#health-check)
- [Configuration](#configuration)
  - [Spring Profiles](#spring-profiles)
  - [Database Configuration](#database-configuration)
  - [JWT Configuration](#jwt-configuration)
- [Development](#development)
  - [Project Structure](#project-structure)
  - [Development Commands](#development-commands)
  - [Code Style](#code-style)
- [Documentation](#documentation)
- [License](#license)

## Overview

SIGA Backend is the core API service that handles all business logic for the agricultural management system. It provides JWT-based authentication, role-based access control, and comprehensive data management through a RESTful API architecture.

### Key Features

- **JWT Authentication**: Secure, stateless token-based security
- **User Management**: Complete user lifecycle with role-based access control
- **Producer Management**: Rural producer registration and data management
- **Service Records**: Agricultural service tracking and management
- **Real-time Monitoring**: Health checks and metrics via Spring Actuator

## Technology Stack

- **Java 17**: Latest LTS version with modern features
- **Spring Boot 3.5.4**: Rapid application development framework
- **Spring Security**: Comprehensive security framework with JWT
- **Spring Data JPA**: Data access layer with Hibernate
- **PostgreSQL 16**: Primary relational database
- **Gradle 8.9**: Modern build automation
- **Docker**: Containerization support

## Architecture

### System Layers

```txt
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │ Controllers │  │    DTOs     │  │ Exception Handler   │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                     Business Layer                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  Services   │  │    JWT      │  │     Security        │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │Repositories │  │   Models    │  │   Converters        │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Security Flow

```txt
HTTP Request → JWT Filter → Token Validation → User Service → Database
```

## Requirements

- **Java 17+**: Required for Spring Boot 3.x
- **Gradle 8.9**: Build tool (included via wrapper)
- **PostgreSQL 16+**: Primary database
- **Docker & Docker Compose**: For containerized deployment (optional)

## Setup

### 1. Environment Configuration

Copy the environment template and configure your variables:

```bash
# From project root
cp .env.example .env

# Edit with your configuration
nano .env
```

### 2. Required Environment Variables

```bash
# Database
POSTGRES_DB=siga
POSTGRES_USER=siga_user
POSTGRES_PASSWORD=your_secure_password
DB_HOST=db
DB_PORT=5432

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random_at_least_256_bits
JWT_ISSUER=siga-backend
```

### 3. Database Setup

The application will automatically create the database schema on first run using Hibernate's `ddl-auto=update`.

## How to Run

```bash
# From project root
./deploy.sh docker      # Docker environment
./deploy.sh dev         # Development environment
./deploy.sh prod        # Production environment
```

## API Endpoints

### Base URL

```txt
http://localhost:8080/api/v1
```

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/login` | User authentication |
| `POST` | `/auth/register` | User registration |
| `POST` | `/auth/refresh` | Token refresh |
| `POST` | `/auth/logout` | User logout |

### Protected Endpoints

All endpoints except authentication require a valid JWT token:

```http
Authorization: Bearer your_jwt_token_here
```

### Example Usage

#### Login

```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

#### Health Check

```bash
curl http://localhost:8080/api/actuator/health
```

## Configuration

### Spring Profiles

- **`dev`**: Development environment with debugging enabled
- **`prod`**: Production environment with security optimizations
- **`docker`**: Container-optimized settings

### Database Configuration

Connection pool and JPA settings are automatically configured based on the active profile.

### JWT Configuration

Token expiration times and security settings are configurable via environment variables.

## Development

### Project Structure

```tree
src/
├── main/
│   ├── java/br/gov/rr/canta/siga/backend/
│   │   ├── config/          # Security and configuration
│   │   ├── controller/      # REST endpoints
│   │   ├── dto/             # Data transfer objects
│   │   ├── model/           # Entity models
│   │   ├── repository/      # Data access layer
│   │   └── service/         # Business logic
│   └── resources/
│       ├── application.yml  # Application configuration
└── test/                    # Test classes
```

### Development Commands

```bash
./gradlew build        # Build project
./gradlew test         # Run tests
./gradlew bootRun      # Run application
./gradlew clean build  # Clean build
```

### Code Style

- Follow Oracle Java Code Conventions
- Use Spring Framework conventions
- Include JavaDoc for public APIs
- Maintain consistent naming conventions

## Documentation

- **Database Architecture**: `../../docs/DATABASE_ARCHITECTURE.md`
- **API Documentation**: Available at `/api/actuator` when running
- **Health Checks**: `/api/actuator/health`
- **Metrics**: `/api/actuator/metrics`

## License

This project is licensed under [AGPL-3.0](../../LICENSE) license.

---

**SIGA Backend** - Empowering agricultural management through technology 🌱
