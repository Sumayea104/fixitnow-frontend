# 🛠️ FixItNow - Frontend

A modern, responsive Next.js application for a home services marketplace. Customers can browse available services, view technician profiles, and book qualified professionals. Technicians can build their service profiles, manage availability via an interactive scheduler, and handle job bookings. Admins oversee the entire platform through a comprehensive moderation dashboard.

---

## 🚀 Live Demo

- **Live URL:** <https://fixitnow-frontend.vercel.app>
- **Backend API:** <https://fixitnow-backend-m1ur.onrender.com>
- **API Documentation:** <https://fixitnow-backend-m1ur.onrender.com/api-docs>

---

## 🏗️ Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                      FIXITNOW - FRONTEND                    │
├─────────────────────────────────────────────────────────────┤
│  Next.js 15 (App Router) + TypeScript + Tailwind + shadcn   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────────┐ │
│  │ Middleware   │   │ Layout       │   │ Server Comps     │ │
│  │ (Auth/Proxy) │   │ (Role)       │   │ (SEO, Data)      │ │
│  └──────────────┘   └──────────────┘   └──────────────────┘ │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Client Components                                    │   │
│  │ ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌────────┐ │   │
│  │ │ Forms   │   │ Tables  │   │ Cards   │   │Payment │ │   │
│  │ └─────────┘   └─────────┘   └─────────┘   └────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Data Layer                                           │   │
│  │ ┌──────────────┐   ┌──────────────┐   ┌───────────┐  │   │
│  │ │ TanStack     │   │ React Hook   │   │ Zod       │  │   │
│  │ │ Query        │   │ Form         │   │ Validation│  │   │
│  │ └──────────────┘   └──────────────┘   └───────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ API Layer                                            │   │
│  │ ┌──────────────┐   ┌──────────────┐   ┌───────────┐  │   │
│  │ │ Fetch API    │   │ JWT Inter-   │   │ Error     │  │   │
│  │ │ Client       │   │ ceptor       │   │ Handling  │  │   │
│  │ └──────────────┘   └──────────────┘   └───────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Backend API (Render)                                 │   │
│  │ https://fixitnow-backend-m1ur.onrender.com/api       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| ------- | ------------ | --------- |
| **Framework** | Next.js 15 (App Router) | React Framework, Routing, Server Components |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS | Fast, maintainable, responsive |
| **UI Components** | shadcn/ui | Accessible, customizable, professional |
| **Forms** | React Hook Form | High performance form management |
| **Validation** | Zod | Runtime schema validation |
| **Server State** | TanStack Query | Data fetching, caching, synchronization |
| **Client State** | Zustand | Auth and UI state only |
| **Notifications** | Sonner | Toast notifications |
| **Icons** | Lucide React | Clean, consistent icons |
| **Theme** | next-themes | Dark/Light mode support |

---

## 📁 Project Structure

```text
fixitnow-frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/             # Authentication routes
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── admin/              # Admin dashboard
│   │   │   ├── dashboard/
│   │   │   ├── users/
│   │   │   ├── bookings/
│   │   │   └── categories/
│   │   ├── customer/           # Customer dashboard
│   │   │   ├── dashboard/
│   │   │   ├── bookings/
│   │   │   ├── payments/
│   │   │   └── reviews/
│   │   ├── technician/         # Technician dashboard
│   │   │   ├── dashboard/
│   │   │   ├── bookings/
│   │   │   └── profile/
│   │   ├── services/           # Browse services
│   │   ├── technicians/        # Browse technicians
│   │   │   └── [id]/           # Technician profile
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── common/             # Reusable components
│   │   └── shared/             # App-specific components
│   ├── features/               # Feature-based modules
│   │   ├── auth/
│   │   ├── admin/
│   │   ├── bookings/
│   │   ├── services/
│   │   ├── technicians/
│   │   └── categories/
│   ├── lib/
│   │   ├── api.ts              # API client
│   │   └── utils.ts
│   ├── providers/
│   │   └── QueryProvider.tsx
│   ├── middleware.ts
│   └── proxy.ts
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# API
NEXT_PUBLIC_API_URL=https://fixitnow-backend-m1ur.onrender.com/api

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here

# App
NEXT_PUBLIC_APP_NAME=FixItNow

## 🚀 Installation & Setup

Follow these steps to set up and run the FixItNow Frontend project locally.

### Prerequisites

Make sure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher
- **Package Manager**: `npm` (v9+) or `yarn` / `pnpm`

---

### Step 1: Clone the Repository

Clone the project repository to your local machine using Git:

```bash
git clone [https://github.com/your-username/fixitnow-frontend.git](https://github.com/your-username/fixitnow-frontend.git)
cd fixitnow-frontend

```

### Step 2: Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

### Step 3: Setup Environment Variables

```bash
cp .env.example .env.local
# Add your environment variables
```

### Step 4: Run Development Server

```bash
npm run dev
```

### Step 5: Build for Production

To create an optimized production build and run it:

```bash
# Generate production build
npm run build

# Start production server
npm start
```

## 👥 Roles & Permissions

| Role | Permissions |
| :--- | :--- |
| **Customer** | Browse services, book technicians, track bookings, leave reviews |
| **Technician** | Create profile, set availability, manage bookings, complete jobs |
| **Admin** | Manage users, oversee bookings, manage categories |

---

## 📚 API Integration

The frontend consumes the **FixItNow Backend API**. See `API_INTEGRATION.md` for detailed endpoint mapping.

- **Base URL:** `https://fixitnow-backend-m1ur.onrender.com/api`

---

## 🎯 Key Features

### 👤 Customer Features

- 🔍 **Browse Services:** Search and filter services by category, price, and rating.
- 👨‍🔧 **Technician Profiles:** View detailed technician profiles along with user reviews.
- 📅 **Easy Booking:** Book services with an intuitive date & time picker.
- 📍 **Track Status:** Real-time tracking of booking progress.
- ❌ **Cancel Bookings:** Ability to cancel bookings before they reach `IN_PROGRESS` status.
- 💳 **Payment History:** View past transactions and payment records.
- ⭐ **Reviews:** Submit reviews and ratings for completed services.

### 🛠️ Technician Features

- 📊 **Dashboard:** Access quick statistics and performance metrics.
- 👤 **Profile Management:** Manage personal profile, skills, and availability.
- 📥 **Incoming Bookings:** View and evaluate incoming service requests.
- ✅ **Manage Jobs:** Accept or decline booking requests.
- 🔄 **Status Updates:** Update job status to `IN_PROGRESS` or `COMPLETED`.

### 🛡️ Admin Features

- 📈 **Admin Dashboard:** Comprehensive overview of platform statistics and metrics.
- 👥 **User Management:** Oversee platform users with ban/unban capabilities.
- 🏷️ **Category Management:** Full CRUD operations for service categories.
- 📋 **All Bookings:** Monitor and manage all system-wide bookings.

---

## 🧪 Testing & Code Quality

This project uses standard Next.js testing and linting scripts to ensure code quality and type safety.

### 1. Run Unit/Integration Tests

Run all test suites configured in the repository:

```bash
npm run test
# or
yarn test
```

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

### Sumayea Rahman

- 🐙 **GitHub:** [@Sumayea104](https://github.com/Sumayea104)
- ✉️ **Email:** [sumayea104@gmail.com](mailto:sumayea104@gmail.com)

---

## 🙏 Acknowledgements

Special thanks to the amazing open-source tools and libraries that made this project possible:

- ⚡ [Next.js](https://nextjs.org/) - The React Framework for the Web
- 🎨 [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed UI components
- 🔄 [TanStack Query](https://tanstack.com/query/latest) - Powerful asynchronous state management
- 💅 [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework

---

Built with ❤️ by **Sumayea Rahman**

---

## 📁 **2. API_INTEGRATION.md**

### **API_INTEGRATION.md**

````markdown
# API Integration Documentation

## Base URL

```env
NEXT_PUBLIC_API_URL=https://fixitnow-backend-m1ur.onrender.com/api
```

Authentication

All protected endpoints require a JWT token in the Authorization header:

http

Authorization: Bearer `<token>`

Token is stored in:

localStorage (for mobile/SPA compatibility)

HTTP-Only Cookie (for web security)

Endpoint Mapping

Authentication

Frontend Action  Backend Endpoint  Method
Login  /api/auth/login  POST
Register  /api/auth/register  POST
Get Current User  /api/auth/me  GET
Services
Frontend Page  Backend Endpoint  Method
/services  /api/services  GET
Service Card  /api/services  GET
Filters:

category: Category slug

minPrice: Minimum price

maxPrice: Maximum price

rating: Minimum rating (1-5)

search: Search term
````

Technicians
Frontend Page  Backend Endpoint  Method
/technicians  /api/technicians  GET
/technicians/[id]  /api/technicians/:id  GET
Filters:

service: Service type

location: Location

minRating: Minimum rating

isAvailable: true/false

Bookings
Frontend Action  Backend Endpoint  Method
Create Booking  /api/bookings  POST
Get User Bookings  /api/bookings  GET
Get Booking Details  /api/bookings/:id  GET
Cancel Booking  /api/bookings/:id/cancel  PATCH

Create Booking Body:

```json
{
  "serviceId": "cmri8lbd000012243qh35lwhe",
  "scheduledDate": "2026-07-27T00:00:00.000Z",
  "scheduledTime": "14:30",
  "durationMinutes": 60,
  "notes": "Please bring your own tools"
}
```

---

### 💳 Payments

| Frontend Action | Backend Endpoint | Method |
| :--- | :--- | :--- |
| Create Payment | `/api/payments/create` | `POST` |
| Get Payment History | `/api/payments` | `GET` |
| Get Payment Details | `/api/payments/:id` | `GET` |

#### 📝 Create Payment Request Body

```json
{
  "bookingId": "booking_id",
  "provider": "SSLCOMMERZ"
}
```

👨‍🔧 Technician ManagementFrontend ActionBackend EndpointMethodUpdate Profile/api/technicians/profilePUTUpdate Availability/api/technicians/availabilityPUTGet Technician Bookings/api/technicians/bookingsGETUpdate Booking Status/api/technicians/bookings/:idPATCH📝 Update Booking Status Request Body:JSON{
  "status": "ACCEPTED"
}

🛡️ Admin ManagementFrontend ActionBackend EndpointMethodDashboard Stats/api/admin/dashboard/statsGETGet All Users/api/admin/usersGETUpdate User Status/api/admin/users/:id/statusPATCHGet Categories/api/admin/categoriesGETCreate Category/api/admin/categoriesPOSTUpdate Category/api/admin/categories/:idPATCHDelete Category/api/admin/categories/:idDELETE📝 Update User Status Request Body:JSON{
  "status": "BANNED"
}

⭐ ReviewsFrontend ActionBackend EndpointMethodCreate Review/api/reviewsPOSTGet Reviews/api/reviewsGETGet Review Details/api/reviews/:idGETReply to Review/api/reviews/:id/replyPOST📝 Create Review Request Body:JSON{
  "bookingId": "booking_id",
  "rating": 5,
  "comment": "Excellent service!"
}

⚠️ Error & Response Format

All API responses strictly follow a standardized JSON structure:

✅ Success Response:

```json
{
  "success": true,
  "message": "Success message",
  "data": { ... }
}
```

❌ Error Response:

```json
{
  "success": false,
  "message": "Error message",
  "errorDetails": { ... }
}
```

HTTP Status Codes

```text
Status  Description
200     Success
201     Created
400     Validation Error
401     Unauthorized
403     Forbidden
404     Not Found
409     Conflict
500     Internal Server Error
```

React Query Integration

Query Keys

```text
Data                  Query Key
Services              ['services', filters]
Technicians           ['technicians', filters]
Technician Profile    ['technician', id]
Bookings              ['bookings']
Booking Details       ['booking', id]
User Profile          ['user']
Admin Stats           ['admin-stats']
Admin Users           ['admin-users']
Admin Categories      ['admin-categories']
```

Mutations

Action  Mutation Hook
Login  useAuth().login
Register  useAuth().register
Create Booking  useBookings().createBooking
Cancel Booking  useBookings().cancelBooking
Update User Status  useAdmin().updateUserStatus
Create Category  useAdmin().createCategory

Environment Variables

```env
# Required
NEXT_PUBLIC_API_URL=https://fixitnow-backend-m1ur.onrender.com/api

# Optional (for development)
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Testing with Postman

Postman collection is available at:

```text
/postman/FixItNow.postman_collection.json
```
