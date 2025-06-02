# Remote Todo App - Module Federation Demo

This is the **Remote Application** in a Module Federation setup that exposes a TodoApp component for consumption by other applications (micro-frontends).

## What This Project Does

The Remote Todo App is a standalone React application that:

- **Exposes Components**: Makes the TodoApp component available for other applications to consume
- **Runs Independently**: Can run as a standalone application or be consumed remotely
- **Manages Todo State**: Provides complete todo list functionality with local storage
- **Shares Dependencies**: Coordinates shared React dependencies with consuming applications

## Module Federation Setup

### Exposed Components

- **TodoApp**: Main todo list component exposed as `./TodoApp`
- **Entry Point**: Available at `/remoteEntry.js` for consuming applications

### Shared Dependencies

```javascript
shared: {
  react: { singleton: true, requiredVersion: "^18.2.0" },
  "react-dom": { singleton: true, requiredVersion: "^18.2.0" }
}
```

## TodoApp Features

### Core Functionality

- ✅ **Add Todos**: Create new todo items
- ✏️ **Toggle Complete**: Mark todos as completed/active
- 🗑️ **Delete Todos**: Remove individual todo items
- 🧹 **Clear Completed**: Remove all completed todos at once
- 📊 **Statistics**: Display total, active, and completed counts

### Filtering

- 🔍 **All**: Show all todos
- 🟡 **Active**: Show only incomplete todos
- 🟢 **Completed**: Show only completed todos

### Data Persistence

- 💾 **Local Storage**: Automatically saves todos to browser storage
- 🔄 **Auto-sync**: Loads saved todos on app start

## Architecture

```
Remote Todo App (localhost:3001)
├── TodoApp Component (exposed)
├── Local Storage Management
├── State Management (React hooks)
└── CSS Styling
```

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development Mode

```bash
npm start
```

- Runs on `http://localhost:3001`
- Available as standalone app at `http://localhost:3001`
- Exposes `remoteEntry.js` for Module Federation consumption

### Production Build

```bash
npm run build
```

## Deployment

This application is configured for deployment on **Zephyr Cloud**:

- **Package Name**: Must match `"remotetodo"` in package.json
- **Exposes Configuration**: TodoApp component available for consumption
- **Standalone Capability**: Can run independently or be consumed remotely

## Usage Scenarios

### 1. Standalone Application

```bash
npm start
# Visit http://localhost:3001
```

### 2. Remote Component (via Module Federation)

```javascript
// In consuming application
const RemoteTodoApp = React.lazy(() => import("remotetodo/TodoApp"));

// Use in JSX
<Suspense fallback={<div>Loading...</div>}>
  <RemoteTodoApp />
</Suspense>;
```

## Key Files

- `src/TodoApp.tsx` - Main todo component (exposed via Module Federation)
- `src/TodoApp.css` - Component styling
- `src/bootstrap.tsx` - Application bootstrap for standalone mode
- `webpack.config.js` - Module Federation configuration
- `package.json` - Dependencies and package configuration

## Component API

### TodoApp

```typescript
interface TodoApp extends React.FC {
  // No props required - self-contained component
}
```

The TodoApp component is fully self-contained and manages its own state, requiring no external props or configuration.

## Module Federation Benefits

1. **Reusable Component**: TodoApp can be used across multiple applications
2. **Independent Development**: Can be developed and deployed separately
3. **Shared Dependencies**: Reduces bundle size by sharing React dependencies
4. **Standalone Capability**: Works as both standalone app and remote module
5. **Technology Isolation**: Uses its own styling and state management

## Integration with Host Application

This remote todo app is designed to be consumed by the **[Host Application](../host/README.md)**:

- Host app dynamically loads this TodoApp component
- Shared React dependencies prevent version conflicts
- Error boundaries in host app handle any loading failures
- Can be deployed independently while host app continues running

## Development Tips

- **Port Configuration**: Ensure this runs on port 3001 (host expects this)
- **CORS Headers**: Webpack dev server includes necessary CORS headers
- **Hot Reloading**: Changes reflect immediately during development
- **Local Storage**: Todo data persists across page refreshes and deployments
