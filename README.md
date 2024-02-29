This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Infrastructure
- **Hosting** : Vercel
- **Production Database**: Amazon RDS (us-east-1)
- **Development Database**: Amazon RDS (ap-south-1)
- **Production Userpool**: AWS Cognito Userpool (us-east-1)
- **Development Userpool**: AWS Cognito Userpool (app-south-1)

## Environment Variables required
- AUTH_SECRET=""
- NEXTAUTH_URL=""
- COGNITO_USER_POOL_ID=""
- COGNITO_CLIENT_ID=""
- COGNITO_CLIENT_SECRET=""
- COGNITO_ISSUER=""
- COGNITO_REGION=""
- COGNITO_SENNOVATE_IDP_NAME=""
- COGNITO_HOSTED_UI_DOMAIN=""
- COGNITO_LOGOUT_URI=""
- AWS_ACCESS_KEY_ID=""
- AWS_SECRET_ACCESS_KEY=""
- SENNOVATE_MAIN_WEBSITE_URL=""
- DATABASE_URL="postgresql://postgres:...."



