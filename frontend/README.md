# Todo Application - Frontend

This is the frontend for the Todo Application, built with Next.js 16+, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom component library based on specification
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Toast Notifications**: react-hot-toast
- **Authentication**: Better Auth

## Features

- **Modern Design**: Premium productivity tool aesthetic with refined minimalism
- **Responsive**: Works on mobile, tablet, and desktop
- **Dark/Light Mode**: With seamless theme switching
- **Real-time Updates**: Optimistic UI updates for instant feedback
- **Authentication**: Complete sign up and sign in flow
- **Task Management**: Create, read, update, delete, and complete tasks
- **Filtering**: Filter tasks by status (all, active, complete)
- **Animations**: Smooth, purposeful micro-interactions

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Access to backend API at http://localhost:8000

### Installation

1. Clone the repository
2. Navigate to the frontend directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy the environment variables file:
   ```bash
   cp .env.local.example .env.local
   ```
5. Update the values in `.env.local` with your configuration

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
```

### Other Commands

- `npm run start`: Start the production server
- `npm run lint`: Run linting checks
- `npm run format`: Format code with Prettier

## Architecture

The frontend follows a modular architecture with clear separation of concerns:

- **App Directory**: Next.js 13+ App Router with layout and page structure
- **Components**: Organized by category (ui, layout, auth, tasks)
- **Lib**: API client, hooks, utility functions, and providers
- **Public**: Static assets including custom fonts

## Environment Variables

- `NEXT_PUBLIC_API_URL`: The URL of the backend API
- `BETTER_AUTH_SECRET`: Secret for JWT token verification (must match backend)
- `DATABASE_URL`: Database connection string for Better Auth

## Design System

The application implements a custom design system with:

- Typography: Clash Display for headings, Inter Variable for body text
- Color Palette: Sophisticated neutrals with accent colors for light/dark modes
- Spacing: 8pt grid system from 2xs (4px) to 4xl (96px)
- Border Radius: From sm (4px) to 2xl (24px) with full for circles
- Animations: CSS custom properties for durations and easing functions

## API Integration

The frontend communicates with the backend through:

- Authentication: Better Auth for user management
- Task Operations: REST API endpoints with JWT token authentication
- Error Handling: Centralized error handling with toast notifications

## Security

- JWT token security with proper expiration handling
- Input validation on all forms
- XSS protection via React's built-in protections
- Secure storage of authentication tokens

## Performance

- Optimized with Next.js features
- Efficient animations using CSS transforms
- Proper image optimization
- Bundle size under 200KB gzipped
- Fast loading times (FCP < 1.5s, LCP < 2.5s)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
