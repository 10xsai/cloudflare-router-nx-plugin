# Getting Started with @cloudflare-router/nx-plugin

This guide will help you set up and use the Cloudflare Router Nx plugin to create React Router applications with Cloudflare deployment.

## Prerequisites

- Node.js 18 or later
- An existing Nx workspace, or create a new one
- Cloudflare account (for deployment)

## Setup

### 1. Create an Nx Workspace (if you don't have one)

```bash
npx create-nx-workspace@latest my-workspace --preset=empty
cd my-workspace
```

### 2. Install the Plugin

```bash
npm install @cloudflare-router/nx-plugin --save-dev
```

### 3. Generate Your First App

```bash
# Interactive generation (recommended for first time)
nx generate @cloudflare-router/nx-plugin:app my-first-app

# Or with specific options
nx generate @cloudflare-router/nx-plugin:app my-first-app \
  --cloudflareType=pages \
  --style=tailwind \
  --routing=react-router-dom
```

## Development Workflow

### Start Development Server

```bash
nx serve my-first-app
```

This will start the Vite development server with HMR on `http://localhost:3000`.

### Build for Production

```bash
nx build my-first-app
```

The built files will be in `dist/apps/my-first-app/`.

## Cloudflare Setup

### For Cloudflare Pages

1. **Install Wrangler CLI** (if not already installed):
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**:
   ```bash
   wrangler login
   ```

3. **Deploy your app**:
   ```bash
   nx deploy my-first-app
   ```

4. **Set up custom domain** (optional):
   - Go to Cloudflare Dashboard > Pages > Your Project > Custom domains
   - Add your domain and follow the instructions

### For Cloudflare Workers

1. **Install and login to Wrangler** (same as above)

2. **Update KV namespaces** in `wrangler.toml`:
   ```bash
   wrangler kv:namespace create "ASSETS"
   wrangler kv:namespace create "ASSETS" --preview
   ```
   
   Update the IDs in your `wrangler.toml` file.

3. **Deploy**:
   ```bash
   nx deploy my-first-app
   ```

## Configuration Options

### Environment Variables

Create a `.env` file in your app directory:

```env
# These will be available in your React app (must start with VITE_)
VITE_API_URL=https://api.example.com
VITE_APP_NAME=My App

# These are for build-time configuration
NODE_ENV=development
```

### Customizing Wrangler Configuration

Edit `apps/my-first-app/wrangler.toml`:

```toml
name = "my-first-app"
compatibility_date = "2023-12-01"

[build]
command = "npm run build"
publish = "dist"

# Custom redirects for SPA routing
[[redirects]]
from = "/*"
to = "/index.html"
status = 200

# Custom headers
[[headers]]
for = "/*"
[headers.values]
X-Frame-Options = "DENY"
X-Content-Type-Options = "nosniff"
```

## Adding More Features

### Add a New Route

If you're using `react-router-dom`, add a new page:

1. Create `src/pages/Contact.tsx`:
   ```tsx
   function Contact() {
     return (
       <div className="page">
         <h2>Contact Page</h2>
         <p>Get in touch with us!</p>
       </div>
     );
   }

   export default Contact;
   ```

2. Update `src/App.tsx`:
   ```tsx
   import Contact from './pages/Contact';

   // Add to your Routes
   <Route path="/contact" element={<Contact />} />
   ```

3. Add navigation link:
   ```tsx
   <Link to="/contact" className="nav-link">Contact</Link>
   ```

### Add API Routes (Workers only)

For Cloudflare Workers, you can add API endpoints:

1. Create `src/api/handler.ts`:
   ```tsx
   export async function handleApiRequest(request: Request): Promise<Response> {
     const url = new URL(request.url);
     
     if (url.pathname.startsWith('/api/hello')) {
       return new Response(JSON.stringify({ message: 'Hello from Workers!' }), {
         headers: { 'Content-Type': 'application/json' },
       });
     }
     
     return new Response('Not Found', { status: 404 });
   }
   ```

2. Update your Worker script to handle API routes.

## Troubleshooting

### Common Issues

1. **Build fails with TypeScript errors**:
   - Check your `tsconfig.json` configuration
   - Ensure all dependencies are installed

2. **Deployment fails**:
   - Verify you're logged into Wrangler: `wrangler whoami`
   - Check your `wrangler.toml` configuration
   - Ensure your Cloudflare account has proper permissions

3. **Routing doesn't work after deployment**:
   - For Pages: Ensure redirects are configured in `wrangler.toml`
   - For Workers: Implement proper request handling for SPA routing

### Getting Help

- Check the [Cloudflare Documentation](https://developers.cloudflare.com/)
- Review [React Router Documentation](https://reactrouter.com/)
- Open issues on the plugin repository

## Next Steps

- Explore [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/) for serverless API endpoints
- Add [Cloudflare Analytics](https://developers.cloudflare.com/analytics/) to track your app performance
- Set up [CI/CD pipelines](https://developers.cloudflare.com/pages/platform/build-configuration/) for automatic deployments
- Configure [custom domains and SSL](https://developers.cloudflare.com/pages/platform/custom-domains/) 
 