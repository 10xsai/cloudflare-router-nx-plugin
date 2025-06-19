# Publishing Guide for Cloudflare Router Nx Plugin

This guide explains how to publish the `cloudflare-router-nx-plugin` to npm.

## Prerequisites

1. **npm Account**: You need an npm account. Create one at [npmjs.com](https://www.npmjs.com/)
2. **npm CLI**: Make sure you have npm installed and are logged in:
   ```bash
   npm login
   ```
3. **Repository Setup**: Update the repository URLs in `package.json` to match your actual repository

## Before Publishing

### 1. Update package.json Metadata

Edit the following fields in `package.json`:

```json
{
  "author": {
    "name": "Your Name",
    "email": "your.email@example.com"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/cloudflare-router-nx-plugin.git"
  },
  "homepage": "https://github.com/yourusername/cloudflare-router-nx-plugin#readme",
  "bugs": {
    "url": "https://github.com/yourusername/cloudflare-router-nx-plugin/issues"
  }
}
```

### 2. Update the License

Edit the `LICENSE` file to include your name and the correct year.

### 3. Test the Plugin

Run the test to make sure everything works:

```bash
npm test
```

### 4. Build the Package

Build the plugin to ensure all files are properly compiled:

```bash
npm run build
```

## Publishing Steps

### 1. Check Package Contents

Before publishing, verify what files will be included:

```bash
npm pack --dry-run
```

This shows you exactly what files will be included in the published package.

### 2. Version Management

Update the version number in `package.json`. Follow [semantic versioning](https://semver.org/):
- **Patch** (1.0.1): Bug fixes
- **Minor** (1.1.0): New features, backward compatible
- **Major** (2.0.0): Breaking changes

Or use npm's version command:

```bash
# For patch version
npm version patch

# For minor version  
npm version minor

# For major version
npm version major
```

### 3. Publish to npm

#### First Time Publishing

For the initial publication:

```bash
npm publish --access public
```

Note: Since we're using an unscoped package name, the `--access public` flag is not needed.

#### Subsequent Publications

For updates:

```bash
npm publish
```

### 4. Verify Publication

Check that your package is available:

1. Visit https://www.npmjs.com/package/@cloudflare-router/nx-plugin
2. Or install it in a test project:
   ```bash
   npm install @cloudflare-router/nx-plugin
   ```

## Package Information

### What Gets Published

The following files/folders are included in the npm package (defined in `package.json` `files` field):

- `dist/**/*` - Compiled JavaScript and TypeScript declarations
- `generators.json` - Generator configuration
- `executors.json` - Executor configuration  
- `README.md` - Documentation
- `LICENSE` - License file

### Package Entry Points

- **Main**: `dist/index.js` - Main CommonJS entry point
- **Types**: `dist/index.d.ts` - TypeScript declarations
- **Generators**: `./generators.json` - Nx generators configuration
- **Executors**: `./executors.json` - Nx executors configuration

## Usage After Publishing

Once published, users can install and use your plugin:

```bash
# Install the plugin
npm install --save-dev @cloudflare-router/nx-plugin

# Generate a new Cloudflare Router app
nx g @cloudflare-router/nx-plugin:app my-app

# Use executors
nx dev my-app
nx deploy my-app
nx typecheck my-app
nx typegen my-app
```

## Troubleshooting

### Common Issues

1. **Authentication Error**: Make sure you're logged in with `npm login`
2. **Package Name Taken**: The package name might be already taken. Choose a different name.
3. **Permission Denied**: For scoped packages, ensure you have the correct permissions
4. **Build Errors**: Run `npm run build` and fix any TypeScript compilation errors

### Updating After Publication

If you need to make changes after publishing:

1. Make your changes
2. Update the version number
3. Run `npm run build` 
4. Run `npm publish`

## Best Practices

1. **Test Before Publishing**: Always test your plugin in a separate workspace
2. **Semantic Versioning**: Follow semantic versioning strictly
3. **Changelog**: Consider maintaining a CHANGELOG.md file
4. **Documentation**: Keep README.md up to date with usage examples
5. **Security**: Regularly update dependencies and scan for vulnerabilities

## Support

If you encounter issues:

1. Check the [npm documentation](https://docs.npmjs.com/)
2. Verify your package.json configuration
3. Test the plugin locally before publishing
4. Check npm registry status at [status.npmjs.org](https://status.npmjs.org/) 