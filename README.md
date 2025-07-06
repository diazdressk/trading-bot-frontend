# Trading Bots Dashboard - Frontend

A modern React-based frontend application for managing trading bots with a beautiful UI built using TypeScript, Vite, Tailwind CSS, and shadcn/ui components.

## Prerequisites

Before running the frontend, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd testtask/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the frontend directory with the following variable:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

The frontend connects to the backend API. Make sure the backend is running before starting the frontend.

### 4. Start the Development Server

```bash
npm run dev
```

The frontend application will be available at `http://localhost:5173`

## Features

### 🔐 Authentication
- **User Registration** - Create new user accounts
- **User Login** - Secure login with JWT tokens
- **Auto Token Refresh** - Automatic token renewal to maintain sessions
- **Protected Routes** - Secure access to dashboard pages
- **Password Visibility Toggle** - User-friendly password input

### 🤖 Bot Management
- **View Bots** - Display public bots and user's private bots
- **Create Bots** - Add new trading bots with validation
- **Edit Bots** - Modify existing user bots (public bots are read-only)
- **Delete Bots** - Remove user bots with confirmation dialogs
- **Bot Status** - Visual status indicators (Active, Pause, Error)
- **Real-time Updates** - Automatic data refresh

### 📊 Statistics
- **Bot Performance** - View trading statistics for user's bots
- **Profit Tracking** - Monitor profits in USDT and percentages
- **Cycle Completion** - Track completed trading cycles
- **Responsive Tables** - Mobile-friendly data display

### 🎨 UI/UX
- **Modern Design** - Clean and intuitive interface
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Dark/Light Theme Support** - Built-in theme switching capability
- **Loading States** - Smooth loading indicators
- **Error Handling** - User-friendly error messages
- **Confirmation Dialogs** - Prevent accidental actions

## Tech Stack

### Core Technologies
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing

### UI & Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Unstyled, accessible components
- **Lucide React** - Beautiful icons
- **class-variance-authority** - Component variants

### Forms & Validation
- **React Hook Form** - Performant forms with minimal re-renders
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation integration

### HTTP & State Management
- **Axios** - HTTP client with interceptors
- **js-cookie** - Cookie management for JWT tokens

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **Vite Plugin React** - React support for Vite

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── auth/         # Authentication components
│   │   ├── bots/         # Bot management components
│   │   ├── layout/       # Layout components (Header, DashboardLayout)
│   │   └── ui/           # shadcn/ui components
│   ├── lib/              # Utility libraries
│   │   ├── api.ts        # API client and endpoints
│   │   ├── auth.ts       # Authentication utilities
│   │   └── utils.ts      # General utilities
│   ├── pages/            # Page components
│   ├── schemas/          # Zod validation schemas
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main app component
│   └── main.tsx          # App entry point
├── components.json        # shadcn/ui configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.ts         # Vite configuration
```

## Available Scripts

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## API Integration

The frontend integrates with the backend API for:

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Token refresh

### Bot Management Endpoints
- `GET /api/bots` - Fetch all bots
- `POST /api/bots` - Create new bot
- `PUT /api/bots/:id` - Update bot
- `DELETE /api/bots/:id` - Delete bot

### Statistics Endpoints
- `GET /api/bots/statistics` - Fetch bot statistics

## Authentication Flow

1. **Login/Register** - User provides credentials
2. **JWT Storage** - Tokens stored in secure HTTP-only cookies
3. **Auto Refresh** - Access tokens automatically refreshed
4. **Protected Routes** - Unauthorized users redirected to login
5. **Logout** - Tokens cleared and user redirected

## Component Architecture

### Layout System
- **DashboardLayout** - Wraps all protected pages
- **Header** - Navigation and user actions
- **ProtectedRoute** - Route protection wrapper

### Form Components
- **LoginForm** - User authentication
- **RegisterForm** - User registration
- **BotForm** - Bot creation/editing

### Display Components
- **BotCard** - Individual bot display
- **Statistics Table** - Performance data display

## Styling Guidelines

### Tailwind CSS
- Utility-first approach
- Responsive design with mobile-first strategy
- Consistent spacing and typography
- Dark mode support ready

### Component Variants
- Consistent button styles and sizes
- Status-based color coding
- Interactive states (hover, focus, active)

## Browser Support

- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)

## Development Guidelines

### Code Style
- TypeScript strict mode enabled
- ESLint configuration for code quality
- Consistent naming conventions
- Component-based architecture

### Best Practices
- Form validation with Zod schemas
- Error boundary implementation
- Loading state management
- Responsive design patterns
- Accessibility considerations

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   ```bash
   # Check if backend is running
   curl http://localhost:3000/api
   ```

2. **Build Errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Port Already in Use**
   ```bash
   # Kill process on port 5173
   sudo lsof -i :5173
   sudo kill -9 <PID>
   ```

4. **TypeScript Errors**
   ```bash
   # Check TypeScript configuration
   npx tsc --noEmit
   ```

## Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Serve with a static server
npx serve -s dist
```

## Deployment

The built application (`dist` folder) can be deployed to:
- **Vercel** - Automatic deployments from Git
- **Netlify** - Static site hosting
- **GitHub Pages** - Free static hosting
- **AWS S3** - Static website hosting
- **Any static file server**

## Environment Variables

The application uses the following environment variable:

```env
# Development
VITE_API_BASE_URL=http://localhost:3000/api

# Production
VITE_API_BASE_URL=https://your-api-domain.com/api
```

**Note:** All environment variables for Vite must be prefixed with `VITE_` to be accessible in the browser.

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Update documentation for new components
4. Test responsive design on multiple devices
5. Ensure accessibility standards are met

## License

This project is for educational/demonstration purposes.
