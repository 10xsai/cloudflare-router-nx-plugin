# @cloudflare-router/nx-plugin

An Nx plugin for creating React Router v7 applications optimized for Cloudflare Workers deployment. This plugin automates the setup of React Router v7 apps with full-stack capabilities, server-side rendering, and seamless Cloudflare Workers integration.

## Features

- 🚀 **React Router v7** - Latest framework mode with file-based routing
- ⚛️ **React 19** - Latest React version with modern features
- ☁️ **Cloudflare Workers Integration** - Optimized for edge deployment with official Cloudflare Vite plugin
- 🎯 **Type-Safe Routes** - Automatic TypeScript type generation for routes
- ⚡ **Server-Side Rendering** - Built-in SSR support
- 🎨 **Styling Options** - Choose between Tailwind CSS v4 or vanilla CSS
- 🛠️ **Development Tools** - Hot module replacement and optimized dev experience
- 📦 **Production Ready** - Optimized builds with code splitting
- 🔧 **Nx Integration** - Full integration with Nx workspace and tooling
- 🔍 **ESLint Setup** - Pre-configured ESLint with Nx and React rules
- 📝 **TypeScript Project References** - Optimized TypeScript configuration with project references
- ⚙️ **Modern Vite Setup** - Latest Vite plugins and optimizations

## Installation

```bash
npm install @cloudflare-router/nx-plugin --save-dev
# or
pnpm add @cloudflare-router/nx-plugin --save-dev
# or
yarn add @cloudflare-router/nx-plugin --dev
```

## Usage

### Generate a new React Router v7 app

```bash
# Interactive mode (recommended)
nx generate @cloudflare-router/nx-plugin:app

# With specific options
nx generate @cloudflare-router/nx-plugin:app my-app \
  --style=tailwind \
  --directory=apps
```

### Available Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `name` | string | - | The name of the application |
| `directory` | string | - | The directory where the app will be created |
| `style` | `css` \| `tailwind` | `tailwind` | Styling approach |
| `skipTests` | boolean | false | Skip creating test files |
| `skipPackageJson` | boolean | false | Don't modify package.json |
| `tags` | string | - | Tags for linting |

### Commands

Once your app is generated, you can use these commands:

```bash
# Start development server
nx dev my-app

# Build for production
nx build my-app

# Type checking
nx typecheck my-app

# Generate TypeScript types for routes
nx typegen my-app

# Lint code
nx lint my-app

# Lint and fix issues
nx lint my-app --fix

# Deploy to Cloudflare Workers (production)
nx deploy my-app

# Deploy to staging environment
nx deploy my-app --environment staging
```

## Generated Project Structure

```
my-app/
├── app/                          # React Router v7 app directory
│   ├── root.tsx                  # Root layout component
│   ├── routes/                   # File-based routes
│   │   ├── _index.tsx           # Home page (/)
│   │   └── about.tsx            # About page (/about)
│   ├── tailwind.css             # Tailwind CSS (if selected)
│   └── root.css                 # Root CSS (if CSS selected)
├── public/                       # Static assets
│   ├── logo-light.png
│   └── logo-dark.png
├── build/                        # Build output (generated)
│   ├── client/                   # Client-side assets
│   └── server/                   # Server-side code
├── package.json                  # Dependencies and scripts
├── react-router.config.ts        # React Router configuration
├── tsconfig.json                 # Main TypeScript configuration
├── tsconfig.app.json             # App-specific TypeScript config
├── tsconfig.node.json            # Node.js TypeScript config
├── tsconfig.cloudflare.json      # Cloudflare-specific TypeScript config
├── vite.config.ts               # Vite configuration with Cloudflare plugin
├── wrangler.jsonc               # Cloudflare configuration
├── eslint.config.mjs            # ESLint configuration
├── tailwind.config.js           # Tailwind config (if selected)
└── postcss.config.js            # PostCSS config (if Tailwind)
```

## Modern Stack

The generated project uses the latest versions of:

### Core Dependencies
- **React 19.1.0** - Latest React with concurrent features and modern APIs
- **React Router 7.5.3** - Modern framework mode with file-based routing
- **TypeScript 5.8.3** - Latest TypeScript with enhanced type checking
- **Vite 6.3.3** - Fast build tool with modern optimizations

### Cloudflare Integration
- **@cloudflare/vite-plugin 1.0.12** - Official Cloudflare Vite integration
- **Wrangler 4.13.2** - Latest Cloudflare CLI for deployment
- **@cloudflare/workers-types** - TypeScript definitions for Workers APIs

### Styling (when Tailwind is selected)
- **Tailwind CSS 4.1.4** - Latest utility-first CSS framework
- **@tailwindcss/vite 4.1.4** - Modern Tailwind Vite integration

## Modern Vite Configuration

The generated project uses a modern Vite setup with:

### Vite Plugins
- **`@cloudflare/vite-plugin`** - Official Cloudflare integration for seamless deployment
- **`@react-router/dev/vite`** - React Router v7 development and build support
- **`@tailwindcss/vite`** - Modern Tailwind CSS integration (when selected)
- **`vite-tsconfig-paths`** - TypeScript path mapping support

### Build Optimizations
- **Nx cache integration** - Leverages Nx's build cache for faster builds
- **CommonJS compatibility** - Handles mixed ES modules and CommonJS
- **SSR optimization** - Configured for server-side rendering
- **Cloudflare Workers compatibility** - External conditions for edge runtime

### Development Experience
- **Hot module replacement** - Fast development iteration
- **TypeScript integration** - Full TypeScript support with path mapping
- **Environment-specific configs** - Development and preview server settings

Example Vite configuration:

```typescript
import { defineConfig } from 'vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => ({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    !process.env.VITEST && reactRouter(),
    tsconfigPaths(),
  ],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  ssr: {
    resolve: {
      externalConditions: ["workerd", "worker"],
    },
  },
}));
```

## React Router v7 Features

This plugin generates apps using React Router v7's framework mode, which includes:

### File-Based Routing
Routes are automatically generated based on your file structure in `app/routes/`:

- `app/routes/_index.tsx` → `/` (home page)
- `app/routes/about.tsx` → `/about`
- `app/routes/products.$id.tsx` → `/products/:id`
- `app/routes/blog._index.tsx` → `/blog`
- `app/routes/blog.$slug.tsx` → `/blog/:slug`

### Route Modules
Each route can export:

```typescript
import type { MetaFunction, LoaderFunction } from "react-router";

// Page metadata
export const meta: MetaFunction = () => {
  return [
    { title: "My Page" },
    { name: "description", content: "Page description" }
  ];
};

// Server-side data loading
export const loader: LoaderFunction = async ({ params }) => {
  return { data: await fetchData(params.id) };
};

// The page component
export default function MyPage() {
  const { data } = useLoaderData();
  return <div>{data.title}</div>;
}
```

### Type Safety
Routes automatically generate TypeScript types for:
- Route parameters
- Loader data
- Action data
- Meta functions

## TypeScript Configuration

The generated project uses TypeScript project references for optimal build performance and type checking:

### Configuration Files

- **`tsconfig.json`** - Main configuration with project references
- **`tsconfig.app.json`** - App-specific configuration for React Router code
- **`tsconfig.node.json`** - Node.js configuration for build tools (Vite, etc.)
- **`tsconfig.cloudflare.json`** - Cloudflare-specific configuration for deployment

### Project References Structure

```json
{
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" },
    { "path": "./tsconfig.cloudflare.json" }
  ]
}
```

This structure provides:
- **Faster builds** - Only rebuild changed projects
- **Better IDE performance** - Improved IntelliSense and error checking
- **Isolated configurations** - Different settings for different parts of your app
- **Cloudflare optimization** - Specific settings for edge runtime compatibility

## Code Quality

### ESLint Configuration

The generated project includes a pre-configured ESLint setup that extends:
- **Base workspace config** - Inherits from your workspace ESLint configuration
- **Nx React rules** - Nx-specific React linting rules
- **Flat config format** - Modern ESLint flat configuration

The ESLint configuration (`eslint.config.mjs`) includes:

```javascript
import nx from "@nx/eslint-plugin";
import baseConfig from "../../../eslint.config.mjs";

export default [
    ...baseConfig,
    ...nx.configs["flat/react"],
    {
        files: [
            "**/*.ts",
            "**/*.tsx",
            "**/*.js",
            "**/*.jsx"
        ],
        // Override or add rules here
        rules: {}
    }
];
```

### Available Lint Commands

```bash
# Lint the project
nx lint my-app

# Lint and automatically fix issues
nx lint my-app --fix

# Run lint from package.json scripts
npm run lint
npm run lint:fix
```

## Cloudflare Workers Deployment

### Cloudflare Setup

1. **Install Wrangler CLI** (if not already installed):
   ```bash
   npm install -g wrangler
   ```

2. **Authenticate with Cloudflare**:
   ```bash
   wrangler auth login
   ```

3. **Configure your deployment** in `wrangler.jsonc`:
   - Update the `name` field with your project name
   - Set your `account_id`
   - Configure any required bindings (KV, D1, R2, etc.)

### Deploy to Production

```bash
# Build and deploy to production
nx build my-app
nx deploy my-app
```

### Deploy to Staging

```bash
# Deploy to staging environment
nx deploy my-app --environment staging
```

The plugin automatically configures:
- **Wrangler CLI** setup with JSON configuration
- **Environment variables** management
- **Build outputs** optimized for Workers
- **Compatibility settings** for Cloudflare runtime
- **Official Cloudflare Vite plugin** for seamless integration

### Environment Configuration

Configure your deployment in `wrangler.jsonc`:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "my-app",
  "compatibility_date": "2024-12-18",
  "compatibility_flags": ["nodejs_compat"],
  "workers_dev": true,
  
  // Development variables
  "vars": {
    "NODE_ENV": "development"
  },
  
  // Environment-specific configurations
  "env": {
    "staging": {
      "name": "my-app-staging",
      "vars": {
        "ENVIRONMENT": "staging",
        "NODE_ENV": "production"
      }
    },
    "production": {
      "name": "my-app-production",
      "vars": {
        "ENVIRONMENT": "production",
        "NODE_ENV": "production"
      }
    }
  }
}
```

## Development Workflow

1. **Generate the app**:
   ```bash
   nx generate @cloudflare-router/nx-plugin:app my-app
   ```

2. **Start development**:
   ```bash
   nx dev my-app
   ```

3. **Add routes** by creating files in `app/routes/`

4. **Build and test**:
   ```bash
   nx build my-app
   nx typecheck my-app
   nx lint my-app
   ```

5. **Deploy to Cloudflare Workers**:
   ```bash
   # Production deployment
   nx deploy my-app
   
   # Staging deployment
   nx deploy my-app --environment staging
   ```

## Customization

### Adding Database Support

For Cloudflare D1 database support, add to your `wrangler.jsonc`:

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "my-database",
      "database_id": "your-database-id",
      "preview_database_id": "your-preview-database-id"
    }
  ]
}
```

### Adding KV Storage

For Cloudflare KV storage:

```jsonc
{
  "kv_namespaces": [
    {
      "binding": "MY_KV",
      "id": "your-kv-namespace-id",
      "preview_id": "your-preview-kv-namespace-id"
    }
  ]
}
```

### Adding R2 Storage

For Cloudflare R2 object storage:

```jsonc
{
  "r2_buckets": [
    {
      "binding": "MY_BUCKET",
      "bucket_name": "my-bucket",
      "preview_bucket_name": "my-bucket-preview"
    }
  ]
}
```

### Custom Styling

The generated app supports:
- **Tailwind CSS v4**: Latest utility-first CSS framework with modern Vite plugin
- **Vanilla CSS**: Traditional CSS with utility classes

You can easily switch or add additional styling solutions.

### ESLint Customization

You can customize the ESLint configuration by modifying the `rules` object in `eslint.config.mjs`:

```javascript
export default [
    ...baseConfig,
    ...nx.configs["flat/react"],
    {
        files: [
            "**/*.ts",
            "**/*.tsx",
            "**/*.js",
            "**/*.jsx"
        ],
        rules: {
            // Add your custom rules here
            "@typescript-eslint/no-unused-vars": "error",
            "react/prop-types": "off",
            // ... more rules
        }
    }
];
```

### TypeScript Customization

You can customize TypeScript configurations for different parts of your application:

- **App code** (`tsconfig.app.json`) - Modify for React Router specific settings
- **Build tools** (`tsconfig.node.json`) - Adjust for Vite and other Node.js tools
- **Cloudflare deployment** (`tsconfig.cloudflare.json`) - Optimize for edge runtime

### Vite Customization

You can extend the Vite configuration in `vite.config.ts`:

```typescript
export default defineConfig(() => ({
  // Add custom plugins
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    !process.env.VITEST && reactRouter(),
    tsconfigPaths(),
    // Add your custom plugins here
  ],
  // Customize build options
  build: {
    // Add custom build configuration
  },
  // Add custom server options
  server: {
    // Custom development server settings
  },
}));
```

## Troubleshooting

### Common Issues

1. **Build fails**: Ensure all dependencies are installed
   ```bash
   npm install
   ```

2. **Types not generated**: Run typegen manually
   ```bash
   nx typegen my-app
   ```

3. **Deployment fails**: Check your `wrangler.jsonc` configuration

4. **Development server issues**: Clear build cache
   ```bash
   rm -rf build/
   nx dev my-app
   ```

5. **ESLint errors**: Fix linting issues
   ```bash
   nx lint my-app --fix
   ```

6. **TypeScript errors**: Check project references
   ```bash
   nx typecheck my-app
   ```

7. **Vite plugin issues**: Clear Vite cache
   ```bash
   rm -rf node_modules/.vite
   nx dev my-app
   ```

### Getting Help

- [React Router v7 Documentation](https://reactrouter.com)
- [React 19 Documentation](https://react.dev)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Nx Documentation](https://nx.dev)
- [TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)
- [Vite Documentation](https://vitejs.dev)
- [Cloudflare Vite Plugin](https://github.com/cloudflare/workers-sdk/tree/main/packages/vite-plugin)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 