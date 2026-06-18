# Maison — eCommerce Web App (Internship Project)

React + Vite + Tailwind CSS + Firebase (Auth + Realtime Database).

## Setup
1. `npm install`
2. Create Firebase project, enable Email/Password Auth + Realtime Database
3. Paste config in `src/firebase/firebaseConfig.js`
4. `npm run dev`
5. Signup, copy your UID from Firebase Console → Authentication → Users, paste into `ADMIN_UID` in `src/context/AuthContext.jsx`
6. Login as admin, go to `/admin`, click "Seed sample data"

## Deploy
Push to GitHub repo `ecommerce-fullstack-design`, import in Vercel, framework = Vite, deploy.
