# Building and Testing the Nx Plugin

This document explains how to build, test, and publish the `@cloudflare-router/nx-plugin`.

## Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Plugin

```bash
npm run build
```

This will compile the TypeScript files to the `dist/` directory.

### 3. Link for Local Testing

```bash
npm link
```

Now you can use the plugin locally in other projects:

```bash
# In another Nx workspace
npm link @cloudflare-router/nx-plugin
```

## Testing the Plugin

### 1. Create a Test Workspace

```bash
npx create-nx-workspace@latest test-workspace --preset=empty
cd test-workspace
npm link @cloudflare-router/nx-plugin
```

### 2. Test App Generation

```bash
# Test basic generation
nx generate @cloudflare-router/nx-plugin:app test-app

# Test with different options
nx generate @cloudflare-router/nx-plugin:app pages-app --cloudflareType=pages --style=tailwind
nx generate @cloudflare-router/nx-plugin:app workers-app --cloudflareType=workers --style=scss
```

### 3. Test the Generated Apps

```bash
# Test development server
cd apps/test-app
npm install
npm run dev

# Test build
npm run build

# Test deployment (requires Cloudflare setup)
# npm run deploy
```

## Manual Testing Checklist

- [ ] Generator creates all expected files
- [ ] Package.json has correct dependencies for chosen options
- [ ] Vite configuration is correct
- [ ] Wrangler configuration matches cloudflareType
- [ ] TypeScript compilation works
- [ ] Development server starts successfully
- [ ] Build process completes without errors
- [ ] Routing works correctly (for react-router-dom)
- [ ] Styles are applied correctly
- [ ] Tailwind works (if selected)
- [ ] SCSS/Less compilation works (if selected)

## Directory Structure Verification

After generation, verify the following structure exists:

```
apps/my-app/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── App.[css|scss|less]
│   ├── index.[css|scss]
│   └── pages/ (if react-router-dom)
│       ├── Home.tsx
│       └── About.tsx
├── package.json
├── vite.config.ts
├── wrangler.toml
├── tsconfig.json
├── tsconfig.node.json
├── index.html
├── README.md
├── .gitignore
├── tailwind.config.js (if Tailwind)
└── postcss.config.js (if Tailwind)
```

## Publishing the Plugin

### 1. Update Version

```bash
npm version patch|minor|major
```

### 2. Build for Production

```bash
npm run build
```

### 3. Publish to NPM

```bash
npm publish
```

## Troubleshooting Development Issues

### Common Issues

1. **TypeScript compilation errors**:
   - Ensure all dependencies are installed
   - Check that @nx/devkit types are available
   - Verify tsconfig.json includes all necessary files

2. **Template rendering issues**:
   - Check EJS template syntax
   - Ensure all template variables are defined in the generator
   - Test with different option combinations

3. **File generation problems**:
   - Verify the `files` directory structure
   - Check that generateFiles path is correct
   - Ensure all conditional templates work

### Debugging Tips

1. **Add console.log statements** in the generator:
   ```typescript
   console.log('Generating with options:', normalizedOptions);
   ```

2. **Test incrementally**:
   - Start with basic file generation
   - Add options one by one
   - Test each template variation

3. **Check generated workspace**:
   - Inspect the generated project.json
   - Verify all targets are configured correctly
   - Test each executor manually

## Performance Considerations

- Keep template files minimal and focused
- Avoid generating unnecessary files
- Use conditional generation based on options
- Optimize file I/O operations in executors

## Future Enhancements

Potential improvements to consider:

1. **Additional Styling Options**:
   - Styled Components
   - Emotion
   - Chakra UI integration

2. **More Cloudflare Features**:
   - D1 Database integration
   - R2 Storage setup
   - Durable Objects configuration

3. **Testing Setup**:
   - Jest configuration
   - Testing Library setup
   - E2E testing with Playwright

4. **CI/CD Integration**:
   - GitHub Actions workflows
   - Automated deployment pipelines
   - Environment-specific configurations

5. **Developer Experience**:
   - Better error messages
   - Validation of user inputs
   - Auto-detection of existing configurations 