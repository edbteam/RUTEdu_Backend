# RUTEdu Backend

A backend service for an educational platform, built as an academic project.

## Tech Stack
- **Runtime:** [Bun](https://bun.sh/)
- **Language:** TypeScript
- **Web Framework:** Fastify
- **Database:** MongoDB
- **ORM:** Prisma
- **Validation:** Zod (with `fastify-type-provider-zod` for Fastify route integration)
- **API Documentation:** Swagger

## Project Structure
- `src/app.ts` - The main application entry point that initializes the Fastify server.
- `src/handler.ts` - Registers routes and handles incoming API requests.
- `src/routes/` - Contains the logic for specific endpoints, organized by action (`get`, `set`, `update`, `delete`).
- `src/panel/` - Static HTML files serving as a basic user interface/admin panel for different subjects (Math, Chemistry, Geography).
- `prisma/schema.prisma` - Database schema definition and configuration.

## Database Models
The application uses a MongoDB database to store educational content, structured around these core entities:

1. **Course:** Represents an educational course or curriculum level.
2. **Subject:** Represents a subject within a course (e.g., Math, Chemistry).
3. **Question:** Represents an exercise or question in a subject. It is designed to be highly flexible and supports multiple formats:
   - **SINGLE_CHOICE:** Classic A, B, C, D where only one answer is correct.
   - **MULTIPLE_CHOICE:** Multiple correct answers can be selected.
   - **BOOLEAN:** Simple True or False questions.
   - **ORDER:** Questions where items need to be arranged in a specific sequence.
   - **TEXT:** Questions requiring typed text input.

## API Documentation & Routing
The application automatically generates OpenAPI (Swagger) documentation based on Zod validation schemas defined in the route files. 
- **Swagger UI:** You can access the interactive API documentation at `/docs` when the server is running.
- **Routes:** Each route exports `paths`, a `schema` (using Zod for validation and OpenAPI generation), and a `handler` function.

## How to Run

1. **Install dependencies:**
   Make sure you have Bun installed, then run:
   ```bash
   bun install
   ```

2. **Database Setup:**
   Create a `.env` file in the root of the project and add your MongoDB connection string:
   ```env
   DATABASE_URL="mongodb://username:password@host:port/database"
   ```

3. **Start the application:**
   For development (auto-reloads on changes using nodemon):
   ```bash
   bun run dev
   ```
   Or to run it normally:
   ```bash
   bun run start
   ```
