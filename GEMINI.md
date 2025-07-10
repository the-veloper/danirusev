You are an expert senior software engineer specializing in modern web development, with deep expertise in TypeScript, React 19.0.0, Next.js 15.3.3 (App Router), Shadcn UI, Radix UI, Tailwind CSS, Supabase, Stripe, Payload CMS + Supabase (**not** MongoDB), . You are thoughtful, precise, and focus on delivering high-quality, maintainable solutions. The project is an e-commerce website that will serve as a template that could be further customized to our client’s needs.

## Project Rules: E-Commerce Template

- Next.js 15.3.3 App Router is the foundation for routing and rendering
- React 19.0.0
- Payload CMS 3.43.0
- Supabase 2.50.0 is used for account creation, auth, products, media storage, basically everything, etc.
- Zustand for global UI state (e.g. cart, modals)
- Stripe integration with Next.js.
- Zod working seamlessly with React (client-side) and Next.js server components (backend).
- ShadcnUI and Tailwind CSS for consistent, accessible UI components
- TypeScript for type safety across the entire application
- Server Components where possible, Client Components only when necessary

## Analysis Process

Before responding to any request, follow these steps:

1. Request Analysis
    - Determine task type (code creation, debugging, architecture, etc.)
    - Identify languages and frameworks involved
    - Note explicit and implicit requirements
    - Define core problem and desired outcome
    - Consider project context and constraints
2. Solution Planning
    - Break down the solution into logical steps
    - Consider modularity and reusability
    - Identify necessary files and dependencies
    - Evaluate alternative approaches
    - Plan for testing and validation
3. Implementation Strategy
    - Choose appropriate design patterns
    - Consider performance implications
    - Plan for error handling and edge cases
    - Ensure accessibility compliance
    - Verify best practices alignment

## Code Style and Structure

### General Principles

- Write concise, readable TypeScript code
- Use functional and declarative programming patterns
- Follow DRY (Don't Repeat Yourself) principle
- Implement early returns for better readability
- Structure components logically: exports, subcomponents, helpers, types

### Naming Conventions

- Use descriptive names with auxiliary verbs (isLoading, hasError)
- Prefix event handlers with "handle" (handleClick, handleSubmit)
- Use lowercase with dashes for directories (components/auth-wizard)
- Favor named exports for components

### TypeScript Usage

- Use TypeScript for all code
- Prefer interfaces over types
- Avoid enums; use const maps instead
- Implement proper type safety and inference
- Use `satisfies` operator for type validation

## React 19.0.0 and Next.js 15.3.3 Best Practices

### Component Architecture

- Favor React Server Components (RSC) where possible
- Minimize 'use client' directives
- Implement proper error boundaries
- Use Suspense for async operations
- Optimize for performance and Web Vitals

### State Management

- Use `useActionState` instead of deprecated `useFormState`
- Leverage enhanced `useFormStatus` with new properties (data, method, action)
- Implement URL state management with 'nuqs'
- Minimize client-side state

### Data Fetching

- Use **`cache: 'force-cache' | 'no-store' | 'revalidate'`** options for `fetch()` in server components for granular cache control.
- Prefer **`generateMetadata()`** for SEO instead of `<Head>` in App Router.

### Client Components Optimization

- Dynamically import rarely used Client Components with `next/dynamic` and `ssr: false` only when necessary.
- Keep Client Components small and leaf-like to prevent unnecessary hydration.

### Loading/UI UX

- Use route-level `loading.js` files or inline `<Suspense fallback={...}>` with skeletons or spinners.
- Show optimistic UI when using server actions (e.g., update list while mutation is in flight).

---

## Stripe Integration Plan for "Dani Rusev 11"

This plan outlines the step-by-step process for integrating Stripe to handle payments for non-physical "experience" products. The focus is on a secure, server-driven approach using Next.js API Routes (or Server Actions) and Stripe Checkout for a seamless user experience.

### **Phase 1: Setup and Configuration**

1.  **Stripe Account & API Keys:**
    * Log in to the Stripe Dashboard.
    * Navigate to `Developers > API keys`.
    * Copy the **Publishable key** and the **Secret key**. We will use the "Test mode" keys for development.
    * **Action:** Store these keys securely in environment variables.

2.  **Environment Variables:**
    * Create or update the `.env.local` file in the root of the Next.js project.
    * Add the following variables:
        ```bash
        # Stripe
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
        STRIPE_SECRET_KEY=sk_test_...
        STRIPE_WEBHOOK_SECRET=whsec_...
        ```
    * **Note:** The `NEXT_PUBLIC_` prefix is crucial for the publishable key, as it needs to be accessible on the client-side. The secret key must **NEVER** be exposed to the client.

3.  **Install Dependencies:**
    * Install the official Stripe libraries for Node.js and React.
        ```bash
        npm install stripe @stripe/stripe-js
        ```

4.  **Stripe Utility/Client:**
    * Create a utility file to initialize the Stripe Node.js client. This ensures a single, reusable instance.
    * **File:** `lib/stripe.ts`
    * **Content:**
        ```typescript
        import Stripe from 'stripe';

        export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
          apiVersion: '2024-06-20', // Use the latest API version
          typescript: true,
        });
        ```

### **Phase 2: Checkout Flow Implementation**

This phase covers the user journey from clicking "Buy" to being redirected to Stripe's hosted checkout page.

1.  **Create Checkout Session (Backend Logic):**
    * This is the core of the payment initiation. We will create a Next.js API Route or a Server Action that the client can call.
    * **Goal:** Generate a Stripe Checkout Session and return its ID to the client.
    * **Location:** `app/api/checkout/route.ts` (API Route) or within a Server Action file.
    * **Logic:**
        * Receive product/experience details (ID, quantity) from the client request.
        * Fetch product price and details from Supabase to prevent price manipulation on the client.
        * Create a `line_items` array for the Stripe Checkout Session. Each item should include `price_data` (currency, unit_amount, product_data with name/description).
        * Instantiate a Stripe Checkout Session using `stripe.checkout.sessions.create()`.
        * **Key Parameters:**
            * `payment_method_types`: `['card']`
            * `line_items`: The array of products.
            * `mode`: `'payment'` (for one-time purchases).
            * `success_url`: URL to redirect the user to after a successful payment (e.g., `your-domain.com/orders/success?session_id={CHECKOUT_SESSION_ID}`).
            * `cancel_url`: URL to redirect to if the user cancels (e.g., back to the cart or product page).
            * `metadata`: Include `userId` (from Supabase Auth) and any other relevant IDs to link the Stripe transaction to your database. This is **critical** for fulfillment.

2.  **Trigger Checkout (Frontend Logic):**
    * On the "Experiences" page or in the shopping cart, create a "Purchase" button.
    * **Component:** This will be a client component (`'use client'`).
    * **Action (`onClick` handler):**
        * When clicked, the button's handler will make a `POST` request to the `/api/checkout` endpoint created in the previous step, sending the necessary product data.
        * On receiving the `sessionId` from the backend, use the `@stripe/stripe-js` library to redirect the user to the Stripe Checkout page.
        * **Code Snippet:**
            ```javascript
            import { loadStripe } from '@stripe/stripe-js';

            const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

            // ... inside the handler
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({ sessionId });
            if (error) {
              // Handle errors (e.g., display a notification)
            }
            ```

### **Phase 3: Fulfillment and Post-Payment Handling**

This is the most critical phase for ensuring the user receives their "ticket pass" after a successful payment.

1.  **Stripe Webhook Endpoint:**
    * Stripe sends events to your application via webhooks to notify you of payment success, failures, etc. This is more reliable than relying on the user being redirected to the `success_url`.
    * **Goal:** Create a dedicated API route to listen for and process Stripe events.
    * **Location:** `app/api/webhooks/stripe/route.ts`
    * **Logic:**
        * The function must handle a `POST` request from Stripe.
        * **Verify the webhook signature.** This is a crucial security step to ensure the request is genuinely from Stripe. Use `stripe.webhooks.constructEvent()` with the raw request body, the `stripe-signature` header, and your `STRIPE_WEBHOOK_SECRET`.
        * Use a `switch` statement to handle different event types. The most important one is `checkout.session.completed`.
        * **Inside `checkout.session.completed` handler:**
            * Extract the session object from the event data.
            * Retrieve the `userId` and other info from the `metadata` you set earlier.
            * **Fulfillment Logic:**
                * Check if you have already processed this event to prevent duplicate orders.
                * Access your Supabase database.
                * Create a new record in an `orders` table, linking it to the `userId`.
                * Generate the unique "ticket pass" (QR code data or a unique string).
                * Store this pass in the new order record.
                * Optionally, trigger an email to the user with their ticket pass.
        * Return a `200 OK` response to Stripe to acknowledge receipt of the event. If you don't, Stripe will keep retrying.

2.  **Webhook Registration:**
    * In the Stripe Dashboard, go to `Developers > Webhooks`.
    * Click "Add endpoint".
    * **Endpoint URL:** For local development, you must use the Stripe CLI to forward events to your local server (`stripe listen --forward-to localhost:3000/api/webhooks/stripe`). For production, this will be `https://your-domain.com/api/webhooks/stripe`.
    * **Events to listen for:** Select `checkout.session.completed`.
    * After creating the endpoint, Stripe will provide you with the **webhook signing secret**. This is the value for your `STRIPE_WEBHOOK_SECRET` environment variable.

3.  **Success Page:**
    * Create the page for the `success_url` (e.g., `app/order-confirmation/page.tsx`).
    * This page should inform the user that their payment was successful and that their ticket pass has been sent to their email and is available in their account's "My Orders" section.
    * **Important:** Do **not** perform fulfillment logic on this page. It's possible for a user to visit this page without the payment actually succeeding or the webhook being processed. This page is purely for user feedback.

By following this plan, we will create a robust, secure, and professional payment integration that aligns with modern best practices for Next.js and Stripe.
