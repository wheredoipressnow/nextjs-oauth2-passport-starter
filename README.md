
# Next.js-OAuth2-Passport Starter

Small Next.js project which is ready to be connected to an OAuth2 authorization server.

## Features

- Next.js using Typescript
- PassportJS w/ OAuth2 strategy
- TailwindCSS

## Environment Variables

To run this project, you will need to add the environment variables from .env.local.example to your .env file.

## To Do

### Logout / Revoke token

Logout is handled inconsistently between different solutions. It ranges from a simple endpoint to revoke OAuth2 tokens to a feaderated sign out from IDP and the possibility to provide a redirect URL.

By default this starter only removes the session from the cookies. Implement your own logic accordingly.

### User Claims

Update the claims interface in `user.ts`. Update scopes in .env file.
