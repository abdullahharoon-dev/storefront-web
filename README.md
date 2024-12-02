# Storefront Web

![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

A modern e-commerce storefront built with Next.js 14, TypeScript, and Tailwind CSS. Full-featured frontend for the [Storefront API](https://github.com/abdullahharoon-dev/storefront-api).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui |
| **State** | Zustand |
| **Data Fetching** | TanStack Query (React Query) |
| **HTTP Client** | Axios |
| **Icons** | Lucide React |
| **Payments** | Stripe Checkout |

## Features

- **Authentication** — Login, register, forgot password with JWT tokens
- **Product Browsing** — Search, filters (category, brand, price), sorting, pagination
- **Product Detail** — Image gallery, ratings, reviews, add to cart
- **Shopping Cart** — Add/update/remove items, quantity controls, order summary
- **Wishlist** — Save products for later
- **Checkout** — Address selection, coupon codes, Stripe payment
- **Order Tracking** — Order history, order details, status tracking
- **User Profile** — Edit info, change password, avatar
- **Admin Dashboard** — Revenue stats, order management, low stock alerts
- **Responsive Design** — Mobile-first, works on all screen sizes
- **Loading States** — Skeleton loaders throughout the app

## Pages

| Route | Description |
|-------|------------|
| `/` | Homepage with hero, categories, featured products |
| `/products` | Product listing with search, filters, pagination |
| `/products/:slug` | Product detail with gallery, reviews |
| `/categories` | Browse all categories |
| `/brands` | Browse all brands |
| `/cart` | Shopping cart |
| `/wishlist` | Saved products |
| `/checkout` | Checkout flow |
| `/orders` | Order history |
| `/orders/:id` | Order detail |
| `/profile` | User profile |
| `/admin` | Admin dashboard |
| `/login` | Sign in |
| `/register` | Sign up |
| `/forgot-password` | Password reset |

## Getting Started

### Prerequisites

- Node.js 20+
- [Storefront API](https://github.com/abdullahharoon-dev/storefront-api) running on `localhost:3000`

### Setup

```bash
# Clone the repository
git clone https://github.com/abdullahharoon-dev/storefront-web.git
cd storefront-web

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── (auth)/           # Auth pages (login, register, forgot-password)
│   ├── products/         # Product listing and detail
│   ├── cart/             # Shopping cart
│   ├── checkout/         # Checkout flow
│   ├── orders/           # Order history and detail
│   ├── profile/          # User profile
│   ├── admin/            # Admin dashboard
│   └── ...
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Navbar, Footer, Providers
│   ├── products/         # Product card, star rating
│   └── reviews/          # Review form, review list
├── hooks/                # React Query hooks
├── stores/               # Zustand stores (auth, cart)
├── lib/                  # API client, utilities
└── types/                # TypeScript interfaces
```

## Scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Environment Variables

| Variable | Description |
|----------|------------|
| `NEXT_PUBLIC_API_URL` | Backend API URL (default: `http://localhost:3000/api/v1`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |

## License

This project is licensed under the MIT License.
