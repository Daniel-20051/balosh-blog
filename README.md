# Balosh Blog

A modern blog management application built with React, TypeScript, and Vite.

## Features

- 🔐 Authentication system
- 📝 Blog post creation and management
- 📂 Category management
- 📊 Dashboard with analytics
- 🎨 Modern, responsive UI with Tailwind CSS
- ⚡ Fast development with Vite

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

This application is configured to handle Single Page Application (SPA) routing properly. Choose the deployment method that best fits your hosting platform:

### Netlify

1. Build your application: `npm run build`
2. Deploy the `dist` folder to Netlify
3. The `public/_redirects` file will automatically handle SPA routing

### Vercel

1. Connect your repository to Vercel
2. The `vercel.json` file will automatically handle SPA routing
3. Deploy with: `vercel --prod`

### Other Platforms (Express.js Server)

For platforms that support Node.js:

1. Install dependencies: `npm install`
2. Build the application: `npm run build`
3. Start the production server: `npm start`

The Express.js server (`server.js`) will handle SPA routing by serving `index.html` for all routes.

### Manual Server Configuration

If you're using a different web server, configure it to:

1. Serve static files from the `dist` directory
2. Redirect all routes to `index.html` (except for API routes)

**Apache (.htaccess):**

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

**Nginx:**

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

## SPA Routing Configuration

This application uses React Router DOM for client-side routing. The following configurations ensure that direct navigation to routes like `/login`, `/dashboard`, etc. works correctly:

- **Development**: Vite is configured with `historyApiFallback: true`
- **Netlify**: Uses `public/_redirects` file
- **Vercel**: Uses `vercel.json` configuration
- **Express.js**: Custom server handles all routes

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth)
├── layouts/            # Layout components
├── pages/              # Page components
│   ├── login/         # Authentication pages
│   ├── dashboard/     # Dashboard pages
│   ├── newblog/       # Blog creation
│   ├── allblogs/      # Blog management
│   ├── categories/    # Category management
│   └── settings/      # User settings
└── routes/            # Route protection components
```

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Express.js** - Production server (optional)

## License

This project is private and proprietary.
