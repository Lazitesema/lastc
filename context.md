# Cashora Frontend Project PRD

## 1.  Overview

**Cashora** is a comprehensive web application designed to manage user accounts, transactions (deposits, withdrawals, transfers), and administrative tasks. The system includes distinct portals for Admin and User roles. Although the backend will eventually be managed with Supabase, this project focuses on delivering a fully functional, visually appealing, and responsive frontend. The UI should feature smooth animations/transitions, support both light and dark modes, and display all monetary values in Ethiopian Birr (ETB).

## 2. Objectives

- **User Experience:** Provide a modern, Web 3.0-style interface with an intuitive design, responsive layouts, and engaging animations.
- **Modular & Production-Ready Code:** Use React/Next.js and a modern UI library (Tailwind CSS or Material UI) to build a scalable, modular codebase. Include clear placeholder comments for future backend API integrations.
- **Seamless Navigation:** Implement proper routing with file-based Next.js pages and integrated sidebar navigation in both portals.
- **Future Integration:** Ensure all components include placeholders (e.g., `// TODO: integrate API call`) to facilitate future backend integration with Supabase.

## 3. Functional Requirements

### 3.1 General

- **Framework & Structure:**  
    - Use React/Next.js with a clear pages directory structure.
    - Each major page corresponds to a unique URL.
- **UI/UX:**  
    - Smooth animations (on load, hover, focus, etc.) and responsive design.
    - Support both light and dark modes.
    - All currency values must display in ETB.
- **Modularity & Comments:**  
    - Code must be modular and include placeholder comments for future backend integration.

### 3.2 Landing & Authentication

- **Landing Page (Route: `/`):**  
  - Full-width hero section with an animated background, central headline “Welcome to Cashora”, and call-to-action buttons (“Sign In” and “Create Account”).
  - Navigation link/button for “Admin” access.
  - Smooth fade-in/slide animations.
  - *Placeholder:* `// TODO: integrate dynamic hero text from backend.`

- **Sign-In Page (Route: `/signin`):**  
  - Centered login form with Cashora logo, “Login” headline, input fields for Username and Password, and a link “Don't have an account? Sign up here.”
  - On successful sign-in, route to `/user/dashboard`.
  - *Placeholder:* `// TODO: integrate authentication API.`

- **Sign-Up Page (Route: `/signup`):**  
  - Registration form collecting First Name, Last Name, Username, Email, Date of Birth, Place of Birth, Residence, Nationality, and ID Card Upload.
  - Indicate that new accounts are set to “pending” and require admin approval.
  - Real-time validation and smooth input animations.
  - *Placeholder:* `// TODO: integrate registration API.`

### 3.3 Admin Portal (Routes prefixed with `/admin`)

- **Admin Sidebar:**  
  - Navigation items (using Next.js Links):  
    - Dashboard (`/admin/dashboard`)  
    - Users Management (`/admin/users`)  
    - Banks (`/admin/banks`)  
    - Withdrawal Requests (`/admin/withdrawals`)  
    - Deposit Requests (`/admin/deposits`)  
    - Sending Requests (`/admin/sending`)  
    - Email (`/admin/email`)  
    - Settings (`/admin/settings`)  
    - Profile (`/admin/profile`)

- **Admin Dashboard (Route: `/admin/dashboard`):**  
  - Display key metrics: Total Transactions, Total Deposits, Withdrawals, Transfers, Total Fees, and Users.
  - Include a scrollable area for "Recent User Transactions."
  - Use interactive charts/graphs (e.g., Chart.js or Recharts).
  - *Placeholder:* `// TODO: integrate dynamic dashboard data.`

- **Users Management (Route: `/admin/users`):**
  - **Create New User Form:**  
    - Fields: First Name, Last Name, Username, Email, Date of Birth, Place of Birth, Residence, Nationality, and ID Card Upload.
  - **Pending Users Section:**  
    - A “Pending Users” button to toggle a list of pending users.
    - Each pending user entry must include a “Detail View” button displaying the exact signup details (no balance information).
    - Within the detail view, include two actions:  
      - **Approve:** Send an approval email.  
        *Placeholder:* `// TODO: send approval email.`
      - **Reject:** Display an input box for the rejection reason and send a rejection email.  
        *Placeholder:* `// TODO: send rejection email with reason.`
  - **All Users List:**  
    - Options to add/deduct balance, set sending/withdrawal limits (or "no limit"), delete users, and view/edit detailed user info.
    - *Placeholder:* `// TODO: integrate user update APIs.`

- **Banks Management (Route: `/admin/banks`):**  
  - A page to add, edit, and delete bank names.
  - Functionality to assign banks to users via checkboxes, including an "All Users" option.
  - *Placeholder:* `// TODO: integrate banks assignment API.`

- **Requests Management:**  
  - **Withdrawal Requests (Route: `/admin/withdrawals`):**  
    - List withdrawal requests with a “Detail View” that shows a filled form with the user's withdrawal details.
    - Provide Approve (with receipt details form and email trigger) and Reject (with rejection reason input and email trigger) actions.
    - *Placeholder:* `// TODO: integrate withdrawal requests API.`
  - **Deposit Requests (Route: `/admin/deposits`):**  
    - List deposit requests with actions to Approve, Reject, and View Details.
    - The detail view should include a preview of the receipt image/file.
    - *Placeholder:* `// TODO: integrate deposit requests API.`
  - **Sending Requests (Route: `/admin/sending`):**  
    - List sending requests with similar actions as above.
    - *Placeholder:* `// TODO: integrate sending requests API.`

- **Email Module (Route: `/admin/email`):**  
  - Interface to compose and send custom emails.
  - A scrollable user selection box for when there are many users.
  - Options to select all users or individual users via checkboxes.
  - *Placeholder:* `// TODO: integrate email sending service.`

- **Settings (Route: `/admin/settings`):**  
  - Settings to set general withdrawal and sending limits (default “no limit”) and other configuration options (exclude two-factor auth).
  - *Placeholder:* `// TODO: integrate settings API.`

- **Admin Profile (Route: `/admin/profile`):**  
  - Display and allow editing of detailed admin profile information.
  - *Placeholder:* `// TODO: integrate profile update API.`

### 3.4 User Portal (Routes prefixed with `/user`)

- **User Sidebar:**  
    - Navigation items (using Next.js Links):  
        - Dashboard (`/user/dashboard`)  
        - Transaction History (`/user/transactions`)  
    - Deposit (`/user/deposit`)  
    - Withdraw (`/user/withdraw`)  
    - Send (`/user/send`)  
    - Profile (`/user/profile`)  
    - Customer Support (`/user/support`)

- **User Dashboard (Route: `/user/dashboard`):**  
  - Display current balance, total sent, and total withdrawn.
  - Include a section for recent transactions with clickable details.
  - *Placeholder:* `// TODO: integrate dashboard analytics API.`

- **Transaction History (Route: `/user/transactions`):**  
  - Show a detailed, scrollable list of all transactions.
  
- **Deposit Component (Route: `/user/deposit`):**  
  - A form for deposit requests (full name, amount, receipt upload).
  - List deposit transactions with statuses (pending, accepted, rejected) and details.
  - *Placeholder:* `// TODO: integrate deposit API and balance update.`

- **Withdraw Component (Route: `/user/withdraw`):**  
  - A form for withdrawal requests with fields for Amount, Bank Name (dropdown with assigned banks), Account Number, and Account Holder’s Name.
  - Display dynamic fee calculations.
  - List withdrawal transactions with statuses and details.
  - *Placeholder:* `// TODO: integrate withdrawal API.`

- **Send Component (Route: `/user/send`):**  
  - A form for sending money (Recipient: Username/Email, Amount).
  - Display dynamic fee calculations.
  - List sending transactions with statuses and details.
  - *Placeholder:* `// TODO: integrate sending API.`

- **User Profile (Route: `/user/profile`):**  
  - Display personal info, current balance, and recent activity.
  - Allow editing of profile details.
  - *Placeholder:* `// TODO: integrate profile update API.`

- **Customer Support Chatbox (Route: `/user/support` or integrated in dashboard):**  
  - A chat component with auto-reply functionality for user support.
  - *Placeholder:* `// TODO: integrate support chat API.`

## 5. Additional UI/UX Considerations

- **Scrollability:**  
  - Ensure all detail view panels and forms are scrollable for content overflow.
- **Smooth Animations:**  
  - Implement smooth animations for page transitions, button hovers, and input focus.
- **Consistent Design:**  
  - Use a harmonious color palette consistently across all pages.
- **Placeholder Comments:**  
  - Use clear `// TODO: ...` comments for future backend integrations.

## 6. Technical Requirements

- **Framework:** React with Next.js (file-based routing)
- **Styling:** Tailwind CSS or Material UI
- **State Management:** React Hooks and Context API (with placeholders for backend state management integration)
- **Responsiveness:** Mobile-friendly design
- **Code Quality:** Modular, clean, production-ready code with detailed inline comments.

## 7. Deliverables

- A complete frontend codebase for Cashora with all pages, components, routing, and sidebars as described.
- Modular code with clear placeholder comments for future API integrations.
- Comprehensive, production-ready code that meets the above PRD.

*End of Cashora Frontend Project PRD.*