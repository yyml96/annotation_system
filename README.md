# Annotation Workflow Console

<img src="assets/portfolio-overview.svg" alt="Annotation workflow console overview" width="100%" />

A React Admin console for annotation and review operations. It includes user, post, todo, audit-log, and settings views, with Firebase email-and-password authentication and role lookup through the PHP API.

## Main areas

- **User administration** — browse and manage user records.
- **Annotation and review content** — create and edit post records and assignment fields.
- **Workflow support** — todo lists and audit history.
- **Role-aware access** — the app defines admin, site-builder, and expert-reviewer roles.

## Run the frontend

    npm install
    npm run dev

Other available scripts include <code>npm run type-check</code>, <code>npm run build</code>, and <code>npm run serve</code>.

## Backend and configuration

The frontend currently calls a PHP API on local port <code>8098</code>. The repository includes a PHP Dockerfile with MongoDB support; update the Windows-specific volume in <code>docker-compose.yml</code> to your checkout path before using Compose.

Review Firebase and API configuration before deployment. Use environment-specific configuration and keep private credentials out of source control.

## Technology

**React Admin** · **TypeScript** · **React** · **Vite** · **Firebase Authentication** · **PHP** · **MongoDB**

---

*Portfolio overview based on the source files currently in the repository.*
