# Shoppy__Globe – Node.js Backend for React E-Commerce Demo

A clean, modular Node.js + Express backend for the **Shoppy_Globe React frontend**.
Handles products, cart management, authentication, and checkout functionality.

---

## Live Demo

This backend is intended to work with the [Shoppy_Globe React frontend](https://Pandit17.github.io/Shoppy_Globe).

---

## Features

* RESTful API for products, cart, and user authentication
* JWT-based authentication for protected routes
* Cart operations: add, update, delete items
* Checkout endpoint: validates cart, updates stock, clears cart, and creates orders
* Seed script to populate database with sample products and test user
* Search functionality in products API via query parameter `?search=...`
* Fully modular folder structure with clear separation of concerns
* Secure with Helmet and CORS middleware
* Error handling using centralized middleware
* Supports professional testing via ThunderClient or Postman
* Ready for local development or deployment

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Pandit17/Shoppy__Globe.git
cd Shoppy__Globe
```

### 2. Install dependencies

```bash
npm install
npm install -D nodemon
```

### 3. Setup environment variables

Copy `.env.example` to `.env` and update as needed:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shoppyglobe
JWT_SECRET=YourSecretKeyHere
JWT_EXPIRE=7d
NODE_ENV=development
```

### 4. Seed the database

```bash
node scripts/seed.js
```

This populates the database with sample products and a test user.

### 5. Run the server

```bash
npm run dev
```

Default server URL: `http://localhost:5000`

* Note: JWT token expires in 7 days (JWT_EXPIRE=7d)


---

## Folder Structure

```
Shoppy__Globe/
├─ config/
│  ├─ db.js                      # MongoDB connection handler
│  └─ env.js                     # Centralized environment variables
├─ models/
│  ├─ User.js                    # User schema and model
│  ├─ Product.js                 # Product schema and model
│  ├─ CartItem.js                # Cart item schema and model
│  └─ Order.js                   # Order schema and model
├─ controllers/
│  ├─ authController.js          # Handles register/login
│  ├─ productController.js      # Handles product listing & search
│  ├─ cartController.js          # Handles cart CRUD operations
│  └─ orderController.js         # Handles checkout & order creation
├─ middleware/
│  ├─ auth.js                    # JWT authentication middleware
│  └─ errorHandler.js            # Centralized error handling
├─ routes/
│  ├─ auth.js                    # Routes: /register, /login
│  ├─ products.js                # Routes: /api/products
│  ├─ cart.js                    # Routes: /api/cart
│  └─ order.js                   # Routes: /api/checkout
├─ scripts/
│  └─ seed.js                    # Database seeder script
├─ utils/
│  └─ seedData.js                # Sample products & test user data
├─ .env.example                  # Example environment variables
├─ .gitignore                    # Node.js exclusions
├─ package.json
├─ package-lock.json
└─ README.md                     
```

---

## API Endpoints

### Authentication

* **POST /api/register** → Registers a new user
* **POST /api/login** → Logs in and returns JWT

### Products

* **GET /api/products** → Get all products
* **GET /api/products/:id** → Get product details
* **GET /api/products?search=query** → Search products by name

### Cart (Protected)

* **POST /api/cart** → Add item to cart
* **PUT /api/cart/:cartItemId** → Update cart item quantity
* **DELETE /api/cart/:cartItemId** → Remove item from cart
* **GET /api/cart** → View all cart items

### Checkout (Protected)

* **POST /api/checkout** → Place order, update stock, clear cart

---

## Testing

Use **ThunderClient** or **Postman** to test API endpoints:

1. Register/Login to get JWT token.
2. Add products to cart using `/api/cart` with Authorization header:

```
Authorization: Bearer <token>
```

3. Place an order using `/api/checkout`.
4. Verify database updates in **MongoDB**.

---

## Notes

* Cart and checkout functionality is mock-friendly: it validates stock and clears cart but does **not** handle actual payments.
* Search functionality is implemented via query parameter in products API and works if the frontend uses it.
* Ensure MongoDB is running locally before seeding or running the server.

---


