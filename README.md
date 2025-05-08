# 📝 My Blog – Full-Stack Blogging Platform

A modern full-stack blogging application with authentication, multilingual support, and a clean responsive UI. Built with React, TypeScript, Tailwind CSS, Node.js, and MongoDB.
Implemented protected routes, client-side form validation, and responsive design. Integrated TanStack Query for efficient data fetching and Zustand for lightweight state management.

## 🚀 Features

- 🔐 User registration and login (JWT-based authentication)
- ✍️ Create, edit, delete blog posts with rich text editor (React Quill)
- 💬 Comment system with moderation capabilities
- 🛠️ Admin panel to manage users, posts, and comments
- 🌐 Multilingual support (i18next)
- 🔒 Protected routes and role-based access control
- ⚡ Fast and responsive UI using Tailwind CSS + Flowbite
- 📦 Efficient data fetching with TanStack Query
- 🧪 Form validation with React Hook Form and Zod
- 🛡️ Input sanitization (DOMPurify) for XSS protection

## 🛠️ Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS + Flowbite
- Zustand (state management)
- TanStack Query
- React Hook Form + Zod
- React Router DOM
- React Quill
- i18next
- DOMPurify
- ESLint + Prettier

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcryptjs
- dotenv, cookie-parser, CORS
- Nodemon (dev server)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/NickNedilko/My-blog.git
cd My-blog

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../
npm install
