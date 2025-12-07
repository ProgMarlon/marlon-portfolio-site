DEPLOY SUMMARY — Quick steps I prepared and what you must do now

What I added for you (files created/updated):
- `server/.env` — placeholder file with the `MONGODB_URI`, `EMAIL_USER`, `EMAIL_PASSWORD`, `PORT` variables. (This file contains placeholders — fill it with your secrets.)
- `server/SETUP_GUIDE.md` — full setup guide (already present). I left that as the detailed reference.

Concise step-by-step to finish setup and run locally

1) Encode password (only if it has special characters)
   - Open CMD and run:
     ```cmd
     node -e "console.log(encodeURIComponent('YOUR_PASSWORD_HERE'))"
     ```
   - Copy the printed value and use it as `<ENCODED_PASSWORD>` in the `.env` `MONGODB_URI`.

2) Edit `server/.env` and replace placeholders
   - `MONGODB_URI`: replace `<DB_USER>` and `<ENCODED_PASSWORD>` with your Atlas DB user and encoded password.
   - `EMAIL_USER`: your Gmail address (or other SMTP user).
   - `EMAIL_PASSWORD`: Gmail app password (16-character) or SMTP password from provider.

   Example `MONGODB_URI` (replace with your values):
   ```text
   mongodb+srv://marlonUser:P%40ssw0rd%21@cluster0.ljw3y8v.mongodb.net/portfolio-db?retryWrites=true&w=majority&appName=Cluster0
   ```

3) Whitelist your IP in MongoDB Atlas
   - In Atlas UI → Security → Network Access → Add IP Address → click "Add Current IP Address"
   - Or for testing only: add `0.0.0.0/0` (less secure)

4) Install backend dependencies
   - Open Command Prompt, navigate to server folder, then run:
     ```cmd
     cd "C:\Users\PC\Desktop\Portfolio website\marlon-portfolio-site\server"
     npm install
     ```

5) Start the backend
   ```cmd
   npm run dev
   ```
   Expected console messages on success:
   - `MongoDB Connected: <host>`
   - `Email service ready!` (mailer verification)
   - `🚀 Server running on http://localhost:5000`

6) Start frontend (separate terminal) and test form
   - From project root:
     ```cmd
     npm run dev
     ```
   - Submit the contact form and verify:
     - email to `EMAIL_USER` with full submission details
     - confirmation email to visitor (the form's email)
     - document saved in MongoDB: `portfolio-db` → `contacts` collection

Troubleshooting (concise)
- `Authentication failed` from MongoDB: double-check user and encoded password, make sure user exists and has correct DB privileges.
- `IP access not allowed`: whitelist your IP in Atlas.
- `Email not sending`: use Gmail app password (if using Gmail). If using another SMTP provider (SendGrid, Mailgun), update `server/config/mailer.js` auth accordingly.
- `npm install` errors on Windows PowerShell: run `npm install` from Command Prompt (`cmd`) or use `npm.cmd install`.

Security reminder
- Do NOT commit `.env` to git. `.gitignore` already includes `server/.env`.

If you want, I can:
- Walk you step-by-step while you paste the actual DB username and encoded password (so I can update `.env` for you), OR
- Walk you through generating the Gmail app password step-by-step.

What's next from you (pick one):
- Paste your encoded MongoDB URI (or full sanitized string without exposing your real password here) and I will update `server/.env` for you; OR
- Tell me to walk you through creating the Gmail app password.
