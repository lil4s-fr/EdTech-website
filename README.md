# 🚀 EdTech HDF Platform

A modern web application for EdTech Hauts-de-France, build with Next.js and Strapi.

## 🛠️ Technical Stack

**Frontend:**
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Optimizations:** React Compiler

**Backend:**
- **CMS:** Strapi 5
- **Database:** SQLite (development), PostgreSQL (production)

**Tooling:**
- **Package Manager:** pnpm
- **Orchestration:** Concurrently

---

## 📝 Prerequisites

Before starting, ensure you have the following installed:
- **Node.js** (v20 or higher)
- **pnpm** (Install via `npm install -g pnpm`)
- **Git** (for cloning the repository)

## ⚙️ Installation

1. **Clone the repository:**
   ```bash
   git clone git@github.com:lil4s-fr/EdTech-website.git
   cd EdTech-website
   ```

2. **Install dependencies:** Since this is a monorepo, run the following command at the root level:
   ```bash
   pnpm install
   ```
   
3. **Set up environment variables:**
   - **Backend:** Create a `.env` file in the `backend` directory based on the `.env.example` file.
   - **Frontend:** Create a `.env.local` file in the `frontend` directory based on the `.env.local.example` file.

## 🚀 Running the Application

### Development Mode (recommended)

To start both the Strapi backend and Next.js frontend simultaneously in development mode, run the following command at the root level:

```bash
pnpm run dev
```

This will start:
- Strapi backend at `http://localhost:1337`
- Next.js frontend at `http://localhost:3000`
- Strapi admin panel at `http://localhost:1337/admin`

If you'd rather run them in separate terminals:

**Backend only:**
```bash
pnpm --filter back run develop
```

**Frontend only:**
```bash
pnpm --filter front run dev
```

## 📂 Project Structure

```
.
├── package.json          # Root scripts (orchestration)
├── pnpm-workspace.yaml   # Workspace configuration
├── backend/              # Strapi CMS application
│   ├── src/              # Content Types & APIs
│   └── ...
└── frontend/             # Next.js application
    ├── src/              # Components & Pages
    ├── public/           # Static assets
    └── ...
```

## 🤝 Contributing

Ensure you always use conventional commits. For more info, see (this website)[https://www.conventionalcommits.org/en/v1.0.0/]

1. Create a new branch from `main` using `git checkout -b feat/my-new-feature`
2. Commit your changes: `git commit -m 'feat: added my new beautiful feature'`
3. Push to the remote repository: `git push origin feat/my-new-feature`
4. Submit a pull request and inform the maintainer(s) of the repository.

## 📜 License

The technical source code and architecture of this repository are released under the **MIT License**.

All intellectual property related to EDTech, business logic, including but not limited to branding, logos, design assets,
course contents, and specific "EdTech"-related information is strictly **Copyright © 2026 EdTech**. All rights reserved.
