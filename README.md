# ✨ Glowora

### Modern Beauty & E-Commerce Platform

Glowora is a modern beauty e-commerce web application designed to provide a smooth and engaging shopping experience for makeup, skincare, haircare, fragrance, wellness, and personal-care products.

The project combines a premium beauty-focused interface with practical e-commerce functionality such as product discovery, search, filtering, wishlist management, cart and checkout flows, user profiles, order tracking, reviews, offers, and an admin management portal.

It also includes an interactive **AI Beauty & Skin Advisor** concept that helps users discover products based on their beauty profile and primary concerns.

---

## 🌸 Features

### 🛍️ Customer Storefront

* Modern beauty-focused homepage
* Hero banner and promotional sections
* Product categories
* Trending products
* Best-selling products
* Exclusive offers
* Featured brands
* Customer reviews
* Product detail pages
* Product search and filtering
* Responsive shopping interface

### 💄 Product Categories

Glowora includes multiple beauty and personal-care categories:

* 💄 Makeup
* 🧴 Skincare
* 💇 Haircare
* 🌸 Fragrance
* 🛁 Bath & Body
* 🌿 Wellness
* 🧔 Men's Grooming
* 💅 Nails

---

## 🛒 Shopping Experience

Users can:

* Browse products
* View detailed product information
* Add products to cart
* Increase or decrease quantities
* Remove products from cart
* Add products to wishlist
* Apply coupon codes
* Calculate discounts
* Get delivery-charge calculations
* Proceed through checkout
* Select payment methods
* Place orders
* View order history
* Track order status
* Generate/view invoices

The current application calculates free delivery for orders of **₹499 or above** and applies a ₹50 delivery charge below that threshold.

---

## 🤖 AI Beauty & Skin Advisor

Glowora includes an interactive beauty-advisor experience designed to personalize product discovery.

Users can provide information such as:

* Skin/beauty profile
* Primary beauty concern
* Preferred product type

The advisor then matches the selected concern against the product catalog and presents a personalized set of product recommendations.

The current implementation uses product information and matching logic on the client side, making it a prototype/personalization feature rather than a medical or dermatological diagnostic system.

---

## 👤 User Features

Glowora provides customer account functionality including:

* Login
* Signup
* Logout
* Profile management
* Address management
* Default address selection
* Order history
* Order tracking
* Wishlist
* Product reviews

Application state is persisted locally using browser `localStorage`.

---

## 🔐 Admin Portal

The project also contains an administrative interface for managing the store.

Admin functionality includes:

* Product management
* Add products
* Update products
* Delete products
* Restock products
* Coupon management
* Order-status management
* Review management
* Customer/order information
* Store management workflows

This makes Glowora more than a static shopping UI and demonstrates how a customer-facing storefront and administrative interface can be integrated into one React application.

---

## 🧾 Order Management

Glowora supports an order lifecycle including:

```text
Ordered
   ↓
Packed
   ↓
Shipped
   ↓
Out for Delivery
   ↓
Delivered
```

Orders contain information such as:

* Order ID
* Customer information
* Products
* Quantity
* Subtotal
* Discount
* Delivery charge
* Final amount
* Coupon
* Shipping address
* Payment method
* Payment status
* Order status
* Estimated delivery
* Tracking history

The application also updates product stock after an order is placed.

---

## 🎨 UI & Design

Glowora uses a premium beauty-inspired visual design featuring:

* Soft pink and neutral tones
* Modern cards
* Rounded UI elements
* Product-focused layouts
* Responsive sections
* Smooth transitions
* Interactive modals
* Toast notifications
* Icon-based navigation
* Clean typography

The main application uses reusable React components for areas such as the navbar, footer, homepage sections, shop, product details, cart, wishlist, checkout, user dashboard, admin portal, authentication, and beauty advisor.

---

## 🧑‍💻 Tech Stack

### Frontend

* **React 19**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **Lucide React**
* **Motion**

### Application & State Management

* React Context API
* React Hooks
* Browser Local Storage

### AI

* Google Gemini API integration through `@google/genai`

### Additional Technologies

* Express.js
* Node.js
* dotenv
* TypeScript

The repository's `package.json` currently lists React 19, Vite, Tailwind CSS, `@google/genai`, Lucide React, Motion, Express, dotenv, and TypeScript among its dependencies.

---

## 📁 Project Structure

```text
glowora/
│
├── src/
│   ├── components/
│   │   ├── admin/
│   │   ├── advisor/
│   │   ├── auth/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── orders/
│   │   ├── pages/
│   │   ├── product/
│   │   ├── shop/
│   │   ├── user/
│   │   └── wishlist/
│   │
│   ├── context/
│   │   └── AppContext.tsx
│   │
│   ├── data/
│   │   └── mockData.ts
│   │
│   ├── assets/
│   │   └── images/
│   │
│   ├── App.tsx
│   └── ...
│
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

The repository currently contains the main React source under `src`, along with Vite, TypeScript, environment configuration, and package configuration files.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/tanyaa8/glowora.git
```

### 2. Navigate to the project

```bash
cd glowora
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file based on `.env.example`.

```env
GEMINI_API_KEY=your_gemini_api_key
APP_URL=http://localhost:3000
```

The repository includes `.env.example` with configuration entries for the Gemini API key and application URL.

### 5. Start the development server

```bash
npm run dev
```

The Vite development server is configured to run on port `3000`.

### 6. Open the application

```text
http://localhost:3000
```

---

## 🏗️ Available Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start the development server        |
| `npm run build`   | Create a production build           |
| `npm run preview` | Preview the production build        |
| `npm run lint`    | Run TypeScript checking             |
| `npm run clean`   | Remove generated build/server files |

These scripts are defined in the repository's `package.json`.

---

## 💡 Key Technical Concepts Demonstrated

This project demonstrates practical implementation of:

* Component-based architecture
* React functional components
* React Context API
* State management
* TypeScript interfaces and types
* CRUD operations
* Product catalog management
* Shopping cart logic
* Wishlist management
* Coupon and discount calculations
* Order processing
* Stock management
* Local data persistence
* Authentication UI flows
* Role-based application views
* Modal-based interactions
* Responsive UI development
* AI-assisted product recommendation concepts

---

## 🔄 Application Flow

```text
                    ┌─────────────────┐
                    │     Glowora     │
                    │   Home Page     │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            ↓                ↓                ↓
       Browse Shop       AI Advisor        Offers
            │                │                │
            ↓                ↓                ↓
       Product Details   Recommendations    Products
            │
       ┌────┴─────┐
       ↓          ↓
     Cart      Wishlist
       │
       ↓
    Checkout
       │
       ↓
     Order
       │
       ↓
 Order Tracking
       │
       ↓
   Delivered
```

---

## 📊 Current Architecture

Glowora currently uses a client-side application architecture.

```text
React UI
   │
   ↓
AppContext
   │
   ├── Products
   ├── Cart
   ├── Wishlist
   ├── Users
   ├── Orders
   ├── Coupons
   └── Reviews
          │
          ↓
     localStorage
```

This architecture makes the project easy to run and demonstrate locally while keeping the application state persistent between sessions.

---

## 🔮 Future Improvements

Possible next steps for turning Glowora into a production-ready e-commerce platform include:

* Real backend API
* PostgreSQL/MySQL/MongoDB database
* Secure authentication
* Password hashing
* JWT/session-based authorization
* Real payment gateway integration
* Real order-processing API
* Cloud image storage
* Product search API
* Server-side inventory management
* Real-time order tracking
* Persistent customer accounts
* Admin authentication
* Backend validation
* Automated testing
* CI/CD pipeline
* Production deployment
* Advanced AI-powered beauty recommendations

---

## 🎯 Project Objective

The primary objective of Glowora is to demonstrate how a modern e-commerce platform can be designed and developed using contemporary web technologies.

The project focuses on combining:

**User Experience + E-Commerce + React Development + State Management + AI Concepts**

into one practical web application.

---

## 📌 Project Status

**Status:** 🚧 Active Development

Glowora is currently a functional e-commerce project/prototype with a complete customer-facing experience and an administrative interface. Some production-level backend services and real-world integrations are planned for future development.

---

## 👩‍💻 Author

**Tanya Jatav**

GitHub: [@tanyaa8](https://github.com/tanyaa8)

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

### 📄 License

This project is developed for educational and portfolio purposes.
