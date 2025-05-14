# React + Vite App with Google Sign-In

This project is a React application built with Vite that includes Google Sign-In integration.

## Features

- Modern React application setup with Vite
- Google Sign-In authentication
- Responsive login page
- Persistent authentication using localStorage

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Google Cloud Platform account for OAuth credentials

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Navigate to "APIs & Services" > "Credentials"
   - Create an OAuth 2.0 Client ID (Web application type)
   - Add authorized JavaScript origins:
     - For development: `http://localhost:5173`
     - For production: Your domain(s)
   - Copy the Client ID

4. Configure environment variables:
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Edit `.env.local` and add your Google Client ID:
     ```
     VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
     ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173).

### Building for Production

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Technology Stack

- React 19
- Vite 6
- @react-oauth/google for Google authentication
