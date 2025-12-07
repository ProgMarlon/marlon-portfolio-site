# MERN Backend Setup - Complete Step-by-Step Guide

## 📋 Overview
This guide explains how I set up your Express backend for handling contact form submissions with email functionality and MongoDB storage.

---

## 🏗️ **STEP 1: Folder Structure Created**

I created a `server` folder at the root of your project with this structure:

```
server/
├── config/
│   ├── db.js              (MongoDB connection)
│   └── mailer.js          (Email configuration)
├── models/
│   └── Contact.js         (MongoDB schema for contacts)
├── routes/
│   └── contactRoutes.js   (API endpoints)
├── server.js              (Main server file)
├── package.json           (Dependencies)
├── .env.example           (Environment variables template)
└── .env                   (Your actual secrets - NOT in git)
```

---

## 🔧 **STEP 2: Backend Files Explained**

### **A. package.json**
- Lists all dependencies: `express`, `cors`, `mongoose`, `nodemailer`, `dotenv`
- `nodemon` for development (auto-restart on changes)
- Scripts: `npm start` or `npm run dev`

### **B. config/db.js**
- Connects to MongoDB using `MONGODB_URI` from `.env`
- Automatically logs connection status
- Handles connection errors

### **C. config/mailer.js**
- Sets up Nodemailer with Gmail SMTP
- Authenticates using `EMAIL_USER` and `EMAIL_PASSWORD`
- Verifies connection on startup

### **D. models/Contact.js**
- MongoDB schema for storing form submissions
- Fields: name, email, subject, message, status
- Includes validation (email format, max lengths)
- Timestamps (createdAt, updatedAt)

### **E. routes/contactRoutes.js**
- **POST `/api/contact`** - Receives form data
  - Validates fields
  - Saves to MongoDB
  - Sends 2 emails:
    - ✉️ To you (with all details)
    - ✉️ To visitor (confirmation)
- **GET `/api/contact`** - Retrieves all submissions (admin use)

### **F. server.js**
- Initializes Express app
- Sets up CORS (allows requests from your React app)
- Mounts all routes
- Includes error handling
- Starts server on port 5000

---

## 🚀 **STEP 3: Installation & Setup**

### **1. Install Backend Dependencies**
```bash
cd server
npm install
```

This installs:
- `express` - Web framework
- `cors` - Cross-Origin requests
- `mongoose` - MongoDB driver
- `nodemailer` - Email sending
- `body-parser` - Request parsing
- `dotenv` - Environment variables
- `nodemon` - Dev auto-restart

### **2. Create MongoDB Account**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

### **3. Create .env File**
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` with your actual values:
```
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/portfolio-db
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
PORT=5000
NODE_ENV=development
```

### **4. Gmail App Password Setup** ⚠️ Important
- Enable 2-factor authentication on your Gmail
- Go to https://myaccount.google.com/apppasswords
- Generate "App password" for Mail
- Copy and paste into `.env` as `EMAIL_PASSWORD`
- DO NOT use your regular Gmail password

---

## ▶️ **STEP 4: Run the Backend**

```bash
cd server
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:5000
📧 Email service configured
📦 MongoDB connected
```

---

## 📱 **STEP 5: React Frontend Integration**

Your ContactSection component now:
1. Collects form data
2. POSTs to `http://localhost:5000/api/contact`
3. Backend validates & stores in MongoDB
4. Sends 2 emails (to you + visitor confirmation)
5. Shows success message

The contact form is already updated! Just make sure backend is running.

---

## 🔌 **STEP 6: Testing**

1. Start backend: `npm run dev` (in `server` folder)
2. Start frontend: `npm run dev` (in root folder)
3. Fill out contact form
4. Check:
   - ✅ Email in your inbox
   - ✅ Confirmation email to visitor
   - ✅ Entry in MongoDB

---

## 📊 **How Data Flows**

```
User fills form
        ↓
React state updates
        ↓
User clicks "Send Message"
        ↓
Form submits to POST /api/contact
        ↓
Express receives data
        ↓
Validates fields
        ↓
Saves to MongoDB (Contact collection)
        ↓
Nodemailer sends 2 emails
        ↓
Returns success response to React
        ↓
Shows "Message sent successfully!" 
```

---

## 🛡️ **Security Best Practices**

✅ **What I did:**
- `.env` file NOT included in git (add to `.gitignore`)
- CORS whitelist (only your domains)
- Input validation in schema
- Error handling (no sensitive info leaked)
- Email app-password (not main password)

⚠️ **What you should do:**
- Never commit `.env` to git
- Keep MongoDB credentials secret
- Use HTTPS in production
- Add rate limiting (prevent spam)
- Add CSRF protection

---

## 📦 **Production Deployment**

When deploying to production (Vercel, Heroku, etc.):

1. Update CORS origin to your domain:
```javascript
origin: ['https://yourdomain.com']
```

2. Deploy backend separately (or use serverless)

3. Update frontend API URL:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'
fetch(`${API_URL}/api/contact`, ...)
```

---

## 🐛 **Troubleshooting**

**Error: "Cannot find module 'express'"**
→ Run `npm install` in server folder

**Error: "Invalid connection string"**
→ Check MongoDB URI in `.env`

**Email not sending**
→ Check Gmail app-password, not regular password
→ Verify EMAIL_USER is correct

**CORS error in browser**
→ Make sure backend is running on port 5000
→ Check CORS whitelist includes localhost:5173

**MongoDB connection failed**
→ Check internet connection
→ Add your IP to MongoDB whitelist

---

## ✨ **Next Steps**

1. ✅ Backend is set up
2. ✅ Contact form integrated
3. Next: Add admin dashboard to view submissions
4. Next: Add email templates
5. Next: Deploy to production

---

## 📚 **File Reference**

| File | Purpose |
|------|---------|
| `server.js` | Main server entry point |
| `config/db.js` | MongoDB connection |
| `config/mailer.js` | Email configuration |
| `models/Contact.js` | Contact schema/validation |
| `routes/contactRoutes.js` | API endpoints |
| `.env` | Secret credentials |
| `package.json` | Dependencies |

---

Need help with any specific part? Let me know! 🚀
