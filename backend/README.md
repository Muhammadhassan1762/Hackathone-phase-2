# Todo Application - Backend

FastAPI backend for the full-stack todo application.

## Tech Stack

- **Framework**: FastAPI 0.110.0
- **Database**: SQLModel ORM with Neon PostgreSQL
- **Authentication**: JWT-based (compatible with Better Auth)
- **Validation**: Pydantic for request/response validation
- **Testing**: pytest for comprehensive testing

## Features

- **Secure Authentication**: JWT-based authentication with Better Auth compatibility
- **User Isolation**: Users can only access their own tasks
- **RESTful API**: Predictable endpoints with proper HTTP status codes
- **Type Safety**: Full Pydantic validation for all requests/responses
- **Performance**: Async/await for I/O operations, connection pooling
- **Error Handling**: Consistent error response format
- **CORS**: Configured for frontend origin only

## Setup

1. Clone the repository
2. Navigate to the backend directory
3. Create virtual environment: `python -m venv venv`
4. Activate: `source venv/bin/activate` (Linux/Mac) or `venv\Scripts\activate` (Windows)
5. Install dependencies: `pip install -r requirements.txt`
6. Copy `.env.example` to `.env` and fill in values:
   ```
   DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require
   BETTER_AUTH_SECRET=your-super-secret-key-minimum-32-characters
   ALLOWED_ORIGINS=http://localhost:3000
   ```
7. Run database migrations: `python init_db.py`
8. Start the development server: `python -m uvicorn main:app --reload`

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string for Neon
- `BETTER_AUTH_SECRET`: Secret key for JWT verification (must match frontend)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed origins for CORS
- `ENV`: Environment (development/production)
- `DEBUG`: Enable/disable debug mode

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/tasks` - List user's tasks with filtering/sorting
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{id}` - Get a specific task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task
- `PATCH /api/tasks/{id}/complete` - Toggle task completion

## Authentication

All endpoints except `/health` require JWT authentication. The token should be included in the Authorization header as `Bearer <token>`.

## Database Models

- `Task`: Represents a user's task with title, description, completion status, priority, etc.
- `User`: Reference model for user data (read-only, managed by Better Auth)

## Error Handling

All errors follow the format:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

## Development

Run tests: `pytest -v`
With coverage: `pytest --cov=. --cov-report=html`

## Security

- JWT tokens verified on every request
- User isolation enforced at database query level
- Input validation with Pydantic models
- SQL injection prevention via ORM
- Proper CORS configuration