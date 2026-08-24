# Budget Tracker

Launch-ready foundation for the Budget Tracker PWA.

## Current scope
- React + Vite frontend
- Express backend
- JSON-file database for simple development
- Email/password registration and login
- User-scoped transaction CRUD
- IndexedDB local cache
- Home, Login, Register, Dashboard, Transactions, Analytics, Monthly and Settings screens
- Gmail import placeholder/service boundary (OAuth/API integration comes later)

## Run

### Backend
```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:5000`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Notes
This version intentionally does not use Supabase or Google Sign-In for application authentication.
Passwords are hashed with bcryptjs on the backend.
The JSON database is intended for local development only; replace it with a production database before public launch.
