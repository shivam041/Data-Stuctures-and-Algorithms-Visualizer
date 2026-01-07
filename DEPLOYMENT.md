# Deployment Guide for Render

## Render Configuration

### Option 1: Using render.yaml (Recommended)
If you're using the `render.yaml` file, Render will automatically use these settings:

- **Build Command**: `cd frontend && npm install && npm run build`
- **Start Command**: `cd frontend && npm run start`
- **Environment**: Node.js

### Option 2: Manual Configuration in Render Dashboard

If configuring manually in the Render dashboard, use these settings:

1. **Root Directory**: Leave empty (or set to root of repository)
2. **Build Command**: `cd frontend && npm install && npm run build`
3. **Start Command**: `cd frontend && npm run start`
4. **Environment**: Node.js
5. **Node Version**: 18.x or higher

### Important Notes

- The `serve` package is included in dependencies to serve the built static files
- The build process creates a `dist` folder in the `frontend` directory
- The start command uses the `PORT` environment variable (Render sets this automatically)
- Make sure the root `package.json` exists (it's required for Render to detect the Node.js project)

### Troubleshooting

If you see errors about missing package.json:
- Ensure the root `package.json` exists
- Check that the build/start commands use the correct paths (`cd frontend && ...`)
- Verify that the `frontend/package.json` has the `serve` package in dependencies

