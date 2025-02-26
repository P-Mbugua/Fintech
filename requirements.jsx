// 📂 src
//  ┣ 📂 assets
//  ┃ ┣ 📂 images
//  ┃ ┣ 📂 icons
//  ┃ ┗ 📂 styles (global styles, Tailwind configurations)
//  ┣ 📂 components
//  ┃ ┣ 📂 common (shared components like buttons, modals, loaders)
//  ┃ ┣ 📂 auth (login, register, forgot password)
//  ┃ ┣ 📂 cart (cart page, cart items, checkout)
//  ┃ ┣ 📂 dashboard (main user dashboard)
//  ┃ ┣ 📂 payments (M-Pesa, PayPal, Stripe integration)
//  ┃ ┗ 📂 orders (order history, tracking, details)
//  ┣ 📂 contexts
//  ┃ ┣ AuthContext.tsx (handles authentication state)
//  ┃ ┣ CartContext.tsx (manages shopping cart state)
//  ┃ ┣ ThemeContext.tsx (light/dark mode)
//  ┣ 📂 hooks
//  ┃ ┣ useAuth.ts (custom hook for authentication)
//  ┃ ┣ useCart.ts (manages cart functionalities)
//  ┣ 📂 layouts
//  ┃ ┣ AuthLayout.tsx (layout for authentication pages)
//  ┃ ┣ DashboardLayout.tsx (layout for dashboard)
//  ┃ ┗ MainLayout.tsx (general layout with navbar & footer)
//  ┣ 📂 pages
//  ┃ ┣ 📂 auth
//  ┃ ┃ ┣ Login.tsx
//  ┃ ┃ ┣ Register.tsx
//  ┃ ┃ ┗ ForgotPassword.tsx
//  ┃ ┣ 📂 home
//  ┃ ┃ ┗ Home.tsx
//  ┃ ┣ 📂 cart
//  ┃ ┃ ┗ Cart.tsx
//  ┃ ┣ 📂 orders
//  ┃ ┃ ┣ OrderHistory.tsx
//  ┃ ┃ ┗ OrderDetails.tsx
//  ┃ ┣ 📂 payments
//  ┃ ┃ ┣ Checkout.tsx
//  ┃ ┃ ┣ Payment.tsx
//  ┃ ┃ ┗ Success.tsx
//  ┃ ┗ 📂 user
//  ┃ ┃ ┣ Profile.tsx
//  ┃ ┃ ┗ Settings.tsx
//  ┣ 📂 services (API calls)
//  ┃ ┣ authService.ts (authentication API)
//  ┃ ┣ cartService.ts (cart API)
//  ┃ ┣ paymentService.ts (M-Pesa, Stripe API)
//  ┣ 📂 utils (helper functions)
//  ┃ ┣ formatCurrency.ts
//  ┃ ┣ validateEmail.ts
//  ┃ ┗ toastNotifications.ts
//  ┣ App.tsx
//  ┣ main.tsx
//  ┣ routes.tsx (all application routes)
//  ┣ firebase.ts (Firebase configuration)
//  ┣ tailwind.config.ts (Tailwind configuration)
//  ┣ tsconfig.json
//  ┗ package.json
