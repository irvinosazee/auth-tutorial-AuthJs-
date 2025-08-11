# NextAuth.js Authentication Tutorial

This project demonstrates how to implement authentication using NextAuth.js in a Next.js application. It includes features like user login, registration, two-factor authentication, and protected routes.

## Features

- **User Authentication**: Email/password login and registration.
- **Two-Factor Authentication**: Optional two-factor authentication for enhanced security.
- **Protected Routes**: Restrict access to certain pages based on user authentication.
- **Session Management**: Manage user sessions with JWT.
- **Custom Middleware**: Handle route protection and redirects.

## Project Structure

- **`actions/`**: Contains server-side logic for authentication actions like login and logout.
- **`app/`**: Houses the Next.js app directory structure, including pages for authentication and protected routes.
- **`components/`**: Reusable UI components for forms, buttons, and authentication-specific elements.
- **`data/`**: Database models and queries for user and token management.
- **`lib/`**: Utility functions for database access, email sending, and token generation.
- **`prisma/`**: Prisma schema for database modeling.
- **`routes.ts`**: Defines public and protected routes.
- **`middleware.ts`**: Middleware for handling authentication and route protection.

## Credits 
- **YouTube Video**: [Next Auth V5 - Advanced Guide](https://youtu.be/1MTyCvS05V4?si=M1XpD-HNwpwHAvwa)

## Getting Started

### Prerequisites

- Node.js (v22 or later)
- npm or yarn
- A PostgreSQL database (or any database supported by Prisma)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/irvinosazee/auth-tutorial-AuthJs-v5.git
   cd auth-tutorial-AuthJs-v5
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```env
    DATABASE_URL="database_url"
    AUTH_SECRET="authsecret"
    AUTH_GITHUB_CLIENT_ID=github_client_id
    AUTH_GITHUB_CLIENT_SECRET=github_client_secret
    AUTH_GOOGLE_CLIENT_ID=google_client_id
    AUTH_GOOGLE_CLIENT_SECRET=google_client_secret
    RESEND_API_KEY=resend_api_key
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

1. Run database setup and migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma migrate dev
   npx prisma studio
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Visit `/auth/login` to log in.
- Visit `/auth/register` to create a new account.
- Visit `/auth/reset` to reset your password.
- Visit `/auth/new-verification` to resend a verification email.

## Customization

- Modify the Prisma schema in `prisma/schema.prisma` to adapt the database to your needs.
- Customize UI components in the `components/` directory.
- Update authentication logic in the `actions/` directory.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.