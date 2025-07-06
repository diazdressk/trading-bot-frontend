# Frontend Architecture

This document describes the architecture of the trading bots dashboard frontend application.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Zustand** - State management
- **React Router** - Client-side routing
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── bots/           # Bot-related components
│   ├── layout/         # Layout components
│   ├── stats/          # Statistics components
│   └── ui/             # Base UI components (shadcn/ui)
├── lib/                # Utility libraries
├── pages/              # Page components
├── schemas/            # Zod validation schemas
├── stores/             # Zustand stores
└── types/              # TypeScript type definitions
```

## State Management with Zustand

The application uses Zustand for state management, organized into domain-specific stores:

### Auth Store (`useAuthStore`)
- Manages user authentication state
- Handles login/register/logout operations
- Provides authentication status

```typescript
interface AuthState {
  user: { username: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
```

### Bots Store (`useBotsStore`)
- Manages bot data (public and private bots)
- Handles CRUD operations for bots
- Separates public bots from user's private bots

```typescript
interface BotsState {
  bots: Bot[];
  publicBots: Bot[];
  myBots: Bot[];
  isLoading: boolean;
  error: string | null;
}
```

### Stats Store (`useStatsStore`)
- Manages statistics data
- Computes summary statistics automatically
- Provides loading and error states

```typescript
interface StatsState {
  statistics: BotStatistic[];
  isLoading: boolean;
  error: string | null;
  // Computed values
  totalDeposit: number;
  totalProfit: number;
  totalCycles: number;
  avgProfitPercentage: number;
  profitableBots: number;
  activeBots: number;
}
```

## Component Architecture

### Composition Pattern
Components are designed using composition patterns for better reusability:

- **Container Components** - Handle data fetching and state management
- **Presentation Components** - Pure UI components with props
- **Layout Components** - Structural components for page layout

### Component Organization

#### Auth Components
- `LoginForm` - Login form with validation
- `RegisterForm` - Registration form with validation

#### Bot Components
- `BotCard` - Individual bot display card
- `BotForm` - Bot creation/editing form
- `BotsList` - List of bots with grid layout
- `BotsEmptyState` - Empty state when no bots exist
- `BotsLoadingState` - Loading state for bots

#### Stats Components
- `StatsSummaryCards` - Summary statistics cards
- `StatsCard` - Individual bot statistics card
- `StatsEmptyState` - Empty state when no statistics
- `StatsLoadingState` - Loading state for statistics

#### Layout Components
- `Header` - Navigation header
- `DashboardLayout` - Main layout wrapper
- `ProtectedRoute` - Route protection with auth check

## Best Practices

### Zustand Usage
1. **Single Responsibility** - Each store handles one domain
2. **Computed Values** - Derived state is computed in stores
3. **Error Handling** - Errors are managed in store state
4. **Devtools Integration** - All stores use devtools for debugging

### Component Design
1. **TypeScript First** - All components are fully typed
2. **Props Interface** - Clear interfaces for component props
3. **Composition** - Components are composed rather than monolithic
4. **Separation of Concerns** - Logic separated from presentation

### Performance Optimizations
1. **Selective Subscriptions** - Components subscribe only to needed state
2. **Memoization** - Expensive computations are memoized
3. **Code Splitting** - Components are lazily loaded where beneficial
4. **Efficient Re-renders** - Zustand prevents unnecessary re-renders

## Data Flow

1. **User Actions** → Component handlers
2. **Component Handlers** → Store actions
3. **Store Actions** → API calls
4. **API Responses** → Store state updates
5. **Store Updates** → Component re-renders

## Error Handling

- **Store Level** - Errors are caught and stored in state
- **Component Level** - Error UI is displayed based on store state
- **API Level** - Axios interceptors handle token refresh and errors

## Authentication Flow

1. User submits credentials
2. `authStore.login()` called
3. API request made with credentials
4. On success: tokens stored, user state updated
5. Protected routes check `isAuthenticated` state
6. Automatic token refresh handled by axios interceptors

## Development Guidelines

### Adding New Features
1. Define TypeScript types first
2. Create/update relevant store if needed
3. Build reusable components
4. Compose components in pages
5. Add proper error handling
6. Write tests for critical paths

### Store Updates
- Use `set()` for state updates
- Use `get()` to access current state in actions
- Keep actions pure and predictable
- Handle loading and error states consistently

### Component Guidelines
- Keep components small and focused
- Use composition over inheritance
- Prefer props over context for data passing
- Use proper TypeScript interfaces
- Include loading and error states 