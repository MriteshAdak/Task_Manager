# TaskFlow Hybrid

A modern, containerized Task Management application built with a **Local-First** philosophy. This project is currently in its "Monolith" phase, designed specifically to be decoupled and migrated into a microservices architecture.

## 🚀 Current Architecture
The app features a **Traffic Controller** logic in the frontend that allows for an immediate "Guest Mode" while maintaining a production-ready PostgreSQL backend for future authenticated users.

### Tech Stack
- **Frontend:** Next.js 15 (App Router) + Tailwind CSS
- **Backend:** FastAPI (Python 3.13) + SQLAlchemy 2.0
- **Database:** PostgreSQL 18.1
- **Infrastructure:** Docker & Docker Compose
- **Data Layer:** Hybrid (LocalStorage for guests / Psycopg3 for cloud)

### App will go live with just the LocalStorage while Auth is being figured out.

### 🗺 Future Roadmap

## Phase 1: Microservices-Ready Transition (Next)
- [ ] **Service Split**: Decouple modules into a standalone internal service.

## Phase 2: Authentication & Identity
- [ ] **Auth Service**: Implement a dedicated Microservice for User Auth (JWT/OAuth2).
- [ ] **User-Task Mapping**: Transition Postgres schema to support `user_id` foreign keys.
- [ ] **Sync Engine**: Logic to migrate localStorage data to the cloud upon first login.


## Phase 3: Security & Hardening
- [ ] **Input Sanitization**: Implement Pydantic-based strict validation and Bleach for XSS prevention.
- [ ] **Rate Limiting**: Protect API endpoints from brute force and DoS.
- [ ] **CORS Policy**: Restrict cross-origin requests to trusted domains only.