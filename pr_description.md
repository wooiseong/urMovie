# Summary
This PR completes the build scripts for both the client and server applications and configures them for Vercel deployment. It also updates the error handling by introducing new error codes and standardizing the import of shared types.

# Changes
- **Client Deployment Configuration**: Added `client/vercel.json` to define Vercel deployment settings, including installation, build commands, output directory, and routing.
- **Server Deployment Configuration**: Added `server/vercel.json` to configure Vercel deployment for the server, specifying build commands, builds, and API routes.
- **Server API Entry Point**: Introduced `server/api/index.ts` to serve as the main entry point for the serverless function, setting up Apollo Server, Express, MongoDB connection, and CORS.
- **Error Code Enhancements**: Added new error codes (`USER_NOT_AUTHENTICATED`, `INTERNAL_SERVER_ERROR`, `NOT_FOUND`) to `packages/types/errorCodes.ts`.
- **Shared Types Module**: Created `packages/types/index.ts` to export all types from the `@urmovie/types` package.
- **TypeScript Configuration Updates**: Modified `server/tsconfig.json` to remove old path aliases and add `skipLibCheck`.
- **Dependency Updates**: Updated `package-lock.json`, `package.json`, and `server/package.json` to reflect changes in `typescript` versions and the addition of `@urmovie/types` dependency.
- **Import Path Refactoring**: Updated various server-side resolver and utility files to import `ErrorCodes` from `@urmovie/types` instead of `@shared-types/errorCodes`.
- **Development Tooling**: Added `Bash(npm run build:*)` to `.claude/settings.local.json` for improved local development experience.

# How to Test
1. **Pull the branch**: `git checkout <branch-name>`
2. **Install dependencies**: `npm install`
3. **Build the packages**:
   - `cd packages/i18n && npm run build`
   - `cd packages/types && npm run build`
4. **Build the client**: `cd client && npm run build`
5. **Build the server**: `cd server && npm run build`
6. **Start the server**: `cd server && npm start`
7. Verify that both client and server applications build successfully without errors.
8. Test the deployed versions on Vercel to ensure correct routing and functionality for both client and server.

# Related Issues
None