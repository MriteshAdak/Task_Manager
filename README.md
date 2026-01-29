
<a href="https://task-manager-mritesh.vercel.app/" target="_blank" rel="noopener noreferer">To the App</a>

# Task Management Application

A full-stack task management application with a Next.js frontend, FastAPI backend, and PostgreSQL database.

## 🚀 Production Stack

- **Frontend**: Vercel (Next.js 16)
- **Backend**: Railway (FastAPI + Python 3.13) <!-- not really necessary but was implemented for learning -->
- **Database**: Supabase (PostgreSQL)

## 🏗️ Architecture

```
┌─────────────┐      ┌──────────────┐      ┌───────────────┐
│   Vercel    │─────▶│   Railway    │─────▶│   Supabase    │
│  (Next.js)  │      │   (FastAPI)  │      │ (PostgreSQL)  │
└─────────────┘      └──────────────┘      └───────────────┘
     Frontend              Backend              Database
```

## 🛠️ Local Development

### Prerequisites
- Docker & Docker Compose
- Node.js 20+
- Python 3.13+

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <repo-name>
   ```

2. **Start with Docker Compose**
   ```bash
   docker-compose up
   ```

### Manual Setup (without Docker)

**Backend:**
```bash
cd api
pip install -r requirements.txt
export DATABASE_URL="postgresql://user:password@localhost:5432/task_db"
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd ui
npm install
export BACKEND_URL="http://localhost:8000"
npm run dev
```

## 📦 Project Structure

```
.
├── api/                    # FastAPI backend
│   ├── app/
│   │   ├── main.py        # API routes & CORS config
│   │   ├── database.py    # Database connection
│   │   ├── models.py      # SQLAlchemy models
│   │   ├── repository.py  # Data access layer
│   │   └── schemas.py     # Pydantic schemas
│   ├── Dockerfile.prod    # Production Docker config
│   └── requirements.txt   # Python dependencies
├── ui/                    # Next.js frontend
│   ├── src/
│   │   ├── app/          # Next.js app router
│   │   ├── components/   # React components (Atomic Design)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities & API proxy
│   │   └── services/     # API & storage services
│   └── package.json
├── docker-compose.yml     # Local development setup
├── railway.json          # Railway deployment config
├── vercel.json          # Vercel deployment config
└── DEPLOYMENT.md        # Production deployment guide
```

## 🔧 Configuration

### Environment Variables

**Backend (Railway):**
- `DATABASE_URL` - PostgreSQL connection string from Supabase
- `UI_ORIGINS` - Comma-separated list of allowed origins for CORS

**Frontend (Vercel):**
- `BACKEND_URL` - Railway API URL for server-side requests
- `NEXT_PUBLIC_API_URL` - (Optional) Public API URL for client-side requests

See [.env.production.example](./.env.production.example) for detailed configuration.

## 🚀 Deployment

Follow the [complete deployment guide](./DEPLOYMENT.md) to deploy to production.

### Quick Deploy Steps

1. **Setup Supabase** → Get DATABASE_URL
2. **Deploy to Railway** → Set DATABASE_URL and UI_ORIGINS
3. **Deploy to Vercel** → Set BACKEND_URL to Railway URL
4. **Update CORS** → Add Vercel URL to Railway's UI_ORIGINS

## 🧪 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/tasks` | List all tasks |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/{id}` | Update a task |
| DELETE | `/tasks/{id}` | Delete a task |

Full API documentation available at `/docs` when running the backend.

## 🎨 Features

- ✅ Task CRUD operations
- ✅ Kanban board view (To Do, In Progress, Done)
- ✅ Due date support
- ✅ Responsive design with Tailwind CSS
- ✅ Smooth animations with Framer Motion
- ✅ Production-ready with proper error handling
- ✅ CORS configured for cross-origin requests
- ✅ Health checks and monitoring
- ✅ Connection pooling for database

## 🔒 Security

- Environment variables for sensitive data
- CORS protection on the backend
- Server-side API proxy to hide backend URLs
- Secure database connections with SSL
- Non-root Docker user

## 📊 Monitoring

- Railway: Built-in logging and metrics
- Vercel: Analytics and deployment logs
- Supabase: Database performance monitoring

## 🗺 Future Roadmap

# Phase 1: Microservices-Ready Transition (Next)
- [ ] **Service Split**: Decouple modules into a standalone internal service.
#### NOTE: This application has no practical purpose other than learning the transition from badly deisgned system (intentional) to a structured application design. Since these will be migrated to microservices, the first restructuring will be based on functionlity(service) of modules. Other Phases may or may not take place depending on how this one goes.

# Phase 2: Authentication & Identity
- [ ] **User-Task Mapping**: Transition Postgres schema to support `user_id` foreign keys.
- [ ] **Auth Service**: Implement a dedicated Microservice for User Auth (JWT/OAuth2).

# Phase 3: Security & Hardening
- [ ] **Input Sanitization**: Implement Pydantic-based strict validation and Bleach for XSS prevention.
- [ ] **Rate Limiting**: Protect API endpoints from brute force and DoS.


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `docker-compose up`
5. Submit a pull request

## 🆘 Support

For code issues, open an issue in this repository.

---

Built with ❤️ using Next.js, FastAPI, and PostgreSQL

PS: This project also involves heavy use of GPTs mainly for the frontEnd NEXT.js code. The intent is to learn how to use them effectively.
