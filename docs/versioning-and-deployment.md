# Versioning and Deployment

This repository keeps one public website live at a time.

## Preserved versions

- `v1-agentic-zero-2025` is the Git tag for the original Agentic Zero 2025 website snapshot.
- `archive/v1-agentic-zero-2025` is the browseable branch for that same v1 snapshot.

Do not make the archive branch the production branch. It exists so the older site remains recoverable inside this repository without being served from the main URL.

## Active website

- `main` is the production branch.
- The main domain should deploy from `main`.
- New site work should happen on feature branches, such as `redesign/v2`, and merge into `main` when ready.

## Deployment expectation

If the site is hosted on Vercel, set the project's Production Branch to `main`. Vercel preview deployments may still exist for pull requests or branches, but the custom production domain should point only at `main`.

If the site is hosted as static files instead of a Next.js server, configure Next.js static export before deployment.
