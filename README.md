# Shoppy_Globe – Full-Stack React E-Commerce Demo

A full-stack e-commerce application built with **React + Redux Toolkit** for the frontend and **Node.js + Express + MongoDB** for the backend.

➤ Lazy-loaded components with fallback UI (`LoadingFallback.jsx`)

➤ GitHub Pages-ready frontend deployment

➤ Backend provides RESTful APIs for products, cart, orders, and authentication

➤ JWT authentication with token blacklist for secure login/logout

➤ Styled with global CSS including custom scrollbar, header, product cards, and toast notifications

➤ Toast notifications powered by [React Toastify](https://fkhadra.github.io/react-toastify/) with custom theme

---

## Live Demo (Frontend)

* Currently Under Step . The frontend will be available here once deployed. *
[]() 

---

## Features

**Frontend:**

* Product listing and detail pages fetched from backend API
* Add to cart functionality with quantity management
* Checkout page with order summary and stock validation
* Search functionality integrated with Redux Toolkit
* Lazy loading of routes with fallback UI (`LoadingFallback.jsx`)
* Responsive plain CSS styling
* Custom scrollbar, header, product card, and toast styles
* Toast notifications for success, error, info, and warning messages
* 404 Not Found page for invalid routes
* Ready for GitHub Pages deployment (`/Shoppy_Globe` basename)

**Backend:**

* RESTful APIs for Products, Cart, Orders, and Authentication
* User registration and login with JWT tokens
* JWT token blacklist to prevent reuse after logout
* Cart management with add, update, delete, and clear operations
* Order placement with stock deduction and cart clearing
* MongoDB database with Mongoose schemas
* Seed scripts for demo data (products and demo user)
* Centralized error handling middleware

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Pandit17/ShoppyGlobeFS.git
cd Shoppy_Globe_Full_Stack
````

---

### 2. Backend Setup

```bash
cd backend
npm install
node scripts/seed.js        # Populate database with sample products and demo user
npm run dev                 # Start backend server at http://localhost:5000
```

> Default demo user credentials (from seed script):
> `Email:` [gmail@pandatji.com](mailto:gmail@pandatji.com)
> `Password:` PanditJi@#$17

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev          # Start frontend server at http://localhost:5173
```

> Open in browser: `http://localhost:5173`
> Ensure backend is running on port 5000 for API requests.

---

### 4. Build and Deploy Frontend

```bash
npm run build         # Create production build in dist/
npm run deploy        # Deploy to GitHub Pages
```

> Ensure `vite.config.js` has `base: '/ShoppyGlobeFS/'` and `<RouterProvider>` is wrapped in `<HashRouter>` for proper routing.

---

## Project Structure

```
Shoppy_Globe_Full_Stack/
├─ backend/
│  ├─ config/    
│  ├─ controllers/       # API logic (auth, cart, orders, payment, products)
│  ├─ middleware/        # Auth, error handling, etc.
│  ├─ models/            # Mongoose schemas (User, Product, Cart, CartItem, Order, TokenBlacklist)
│  ├─ routes/            # API endpoints
│  ├─ scripts/           # Seed script
│  ├─ utils/             # Helper functions
│  ├─ .env.example       # Sample environment variables
│  ├─ server.js          # Express entry point
│  └─ package.json
├─ frontend/
│  ├─ src/
│  │  ├─ api/            # API utility functions
│  │  ├─ assets/         # Images, favicon
│  │  ├─ components/     # Cart, Checkout, Header, LoadingFallback, NotFound, ProductList, etc.
│  │  ├─ hooks/          # Custom hooks
│  │  ├─ routes/         # Router setup
│  │  ├─ store/          # Redux slices and store
│  │  ├─ utils/          # Utility functions
│  │  ├─ styles/         # global.css (header, product card, scrollbar, toast)
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  ├─ .env.example       # Sample environment variables
│  ├─ index.html
│  ├─ vite.config.js
│  └─ package.json
├─ .gitignore
└─ README.md
```

---

## Notes for GitHub Pages (Frontend)

* Wrap `<RouterProvider router={router} />` inside `<HashRouter>` in `main.jsx`.
* `vite.config.js` must have `base: '/ShoppyGlobeFS/'` for correct routing.
* 404 page (`NotFound.jsx`) works correctly for client-side navigation.
* Lazy-loaded components use `LoadingFallback.jsx` as fallback.
* Toast notifications fully styled and functional using `react-toastify`.

---

## Dependencies

**Frontend:**

* React 19+
* Redux Toolkit
* React Redux
* React Router DOM v6
* Prop-Types
* Vite
* React Toastify
* gh-pages (for deployment)

**Backend:**

* Node.js + Express.js
* MongoDB + Mongoose
* bcryptjs
* jsonwebtoken
* express-async-errors
* cors + helmet

---

## Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature/YourFeature`)
3. Commit changes (`git commit -m "Add YourFeature"`)
4. Push to branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

