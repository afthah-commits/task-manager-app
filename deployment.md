# Deployment Guide

## 1. Backend (Render.com)

1.  Push your latest code to GitHub.
2.  Log in to [Render](https://render.com/).
3.  Click **New +** -> **Blueprints**.
4.  Connect your GitHub repository `task-manager-app`.
5.  Render will automatically detect `render.yaml`.
6.  Click **Apply Blueprint**.
    *   This will create a **Web Service** and a **PostgreSQL Database**.

## 2. Frontend Configuration

**Crucial Step**: The frontend needs to know where the backend is!

1.  Wait for the **task-manager-backend** service to finish deploying.
2.  Copy its URL (e.g., `https://task-manager-app-backend.onrender.com`).
3.  Go to your **task-manager-frontend** service in the Render Dashboard.
4.  Click **Environment** -> **Add Environment Variable**.
5.  Add:
    *   **Key**: `VITE_API_URL`
    *   **Value**: (Paste your Backend URL)
6.  **Save Changes**.
7.  Render will automatically redeploy the frontend.

## 3. Final Verification

1.  Open your Frontend URL: **[https://task-manager-frontend-f3bd.onrender.com](https://task-manager-frontend-f3bd.onrender.com)**
2.  Test creating a task.
3.  Success!
