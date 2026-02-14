---
id: 1
title: amend-project-constitution
stage: constitution
date_iso: 2026-02-08
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: main
user: Hassan Asif
command: sp.constitution
labels: ["constitution", "governance", "setup"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - ".specify/memory/constitution.md"
tests_yaml: []
---

# Amend Project Constitution

## Prompt Text

```
Project: Full-Stack Todo Application

Core principles:
- Spec-first development (all features fully specified before implementation)
- Agentic workflow (Claude Code generates all code, humans architect and review)
- Security by default (authentication required, user isolation enforced)
- Separation of concerns (frontend, backend, database are independent layers)
- Monorepo cohesion (single repo, clear boundaries, shared specifications)

Development method:
- Write specification → Generate plan → Break into tasks → Implement via Claude Code
- Zero manual coding allowed
- Review process, prompts, and iterations (not just output)
- Specs are versioned and updated formally, never verbally

Key architectural decisions:
- Frontend: Next.js 16+ (App Router), TypeScript, Tailwind CSS
- Backend: Python FastAPI, SQLModel ORM
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth (frontend) with JWT tokens (backend verification)
- Repository: Monorepo with /frontend, /backend, /specs, /shared
- Shared secret: BETTER_AUTH_SECRET must be identical in both frontend and backend

Critical security standards:
- JWT token required for all API endpoints except /health
- User identity comes from JWT token only (never from URL parameters)
- All database queries filtered by current_user from JWT
- Ownership verification on every update/delete operation
- CORS enabled only for known origins (localhost:3000 dev, production domain)
- All secrets in environment variables (never hardcoded)
- Input validation on all endpoints (Pydantic models required)

API conventions:
- Base URL: /api (no user_id in paths)
- Authentication: Authorization: Bearer <token> header
- Status codes: 200 OK, 201 Created, 204 No Content, 401 Unauthorized, 403 Forbidden, 404 Not Found
- Response format: {success: boolean, data: object, message: string}
- Error format: {success: false, error: {code: string, message: string}}
- Endpoints: GET/POST /api/tasks, GET/PUT/DELETE /api/tasks/{id}, PATCH /api/tasks/{id}/complete

Database rules:
- Better Auth owns users table (application reads only, never writes)
- All user data queries must filter by user_id
- CASCADE delete for user → tasks relationship
- Migrations via Alembic (never manual schema edits)
- Indexes on: user_id, completed, due_date, created_at

Frontend patterns:
- Server components by default (async data fetching)
- Client components only for interactivity (forms, buttons, state)
- All API calls through /lib/api.ts client
- Component naming: PascalCase (TaskList.tsx)
- Styling: Tailwind utility classes only (no inline styles)

Backend patterns:
- All routes use dependency injection (Depends)
- JWT verification via get_current_user dependency
- Database sessions via get_session dependency
- File naming: snake_case (task_routes.py)
- Type hints required on all functions
- Pydantic schemas for all request/response bodies

Directory structure:
```
hackathon-todo/
├── specs/                    # What to build
│   ├── features/            # Feature specifications
│   ├── api/                 # API contracts
│   ├── database/            # Schema & migrations
│   ├── ui/                  # Component & page specs
│   └── deployment/          # Environment & deployment
├── shared/                   # Shared types/constants
├── frontend/                 # Next.js application
│   ├── app/                 # Pages (App Router)
│   ├── components/          # UI components
│   └── lib/                 # API client, auth, utils
├── backend/                  # FastAPI application
│   ├── routes/              # API endpoints
│   ├── models/              # SQLModel schemas
│   ├── middleware/          # Auth, CORS, errors
│   └── schemas/             # Request/response DTOs
├── CLAUDE.md                 # Root AI guidance
└── sp.constitution           # This file
```

File naming:
- Specs: kebab-case (task-crud.md)
- Frontend components: PascalCase (TaskList.tsx)
- Frontend utilities: camelCase (api.ts)
- Backend modules: snake_case (task_routes.py)
- Backend classes: PascalCase (class Task)

Testing requirements:
- Backend: pytest, minimum 80% coverage
- Frontend: Jest + React Testing Library, minimum 70% coverage
- Critical paths (auth, CRUD): 100% coverage required
- All tests must pass before merge

Environment variables (must be documented in .env.example):
```
# Frontend (.env.local)
BETTER_AUTH_SECRET=<min-32-chars>
DATABASE_URL=postgresql://...
NEXT_PUBLIC_API_URL=http://localhost:8000

# Backend (.env)
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=<same-as-frontend>
ALLOWED_ORIGINS=http://localhost:3000
```

Constraints:
- No manual coding (all code via Claude Code)
- No alternative frameworks (no Django, no Vue, no Express)
- No additional databases (no Redis, no MongoDB)
- No authentication alternatives (no Auth0, no Supabase Auth)
- All features must have corresponding spec in /specs

Success criteria:
- All 5 basic CRUD features working (create, read, update, delete, toggle complete)
- User authentication functional (signup, signin, JWT verification)
- User isolation enforced (users only see their own tasks)
- All tests passing (>80% backend, >70% frontend)
- Zero manual code edits (100% Claude Code generated)
- Process documented (prompts, iterations, outcomes reviewable)
- Application runs: frontend localhost:3000, backend localhost:8000
- Database persists to Neon PostgreSQL

Quality metrics:
- Test coverage: >80% backend, >70% frontend
- API response time: <200ms average
- Page load time: <2 seconds
- Zero ESLint/TypeScript errors
- Zero Python type check errors
- All OWASP Top 10 vulnerabilities addressed

Workflow checkpoints:
Before starting feature:
- [ ] Read sp.constitution
- [ ] Read feature spec from /specs
- [ ] Read relevant CLAUDE.md
- [ ] Understand acceptance criteria

During implementation:
- [ ] Follow naming conventions
- [ ] Follow security standards
- [ ] Write tests alongside code
- [ ] Commit with clear messages

Before marking complete:
- [ ] All tests passing
- [ ] Code reviewed (process + output)
- [ ] Spec marked complete
- [ ] Demo-ready

References:
- Specs: /specs/**/*.md
- Architecture: /specs/architecture.md
- API docs: /specs/api/rest-endpoints.md
- Database: /specs/database/schema.md
- Root guidance: /CLAUDE.md

Amendment process:
- Create spec: /specs/constitution-amendments/[change].md
- Get approval from project lead
- Update sp.constitution
- Update affected CLAUDE.md files
- Notify team
```