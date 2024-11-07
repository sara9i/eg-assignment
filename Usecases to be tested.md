# Project Test Use Cases

## Frontend Use Cases (UI and Functional Testing)

### 1. Authentication & Authorization
- **Successful Login**: User provides valid credentials and is successfully logged in.
- **Failed Login (Invalid Credentials)**: Display appropriate error message if login fails due to incorrect email/password.
- **Email Pre-filling on Login Page**: Verify the email field is pre-filled if an email is passed as a URL parameter.
- **Signup Validation**: Ensure required fields (name, email, password, confirm password) display error messages when left empty.
- **Password Requirements**: Password must be at least 8 characters, include letters, numbers, and special characters.
- **Password Match**: Verify an error displays if the password and confirm password fields don’t match during signup.
- **Logout Functionality**: Verify that users can successfully log out and are redirected to the login page.

### 2. Form Validation
- **Email Format Validation**: Display an error for invalid email formats in both login and signup forms.
- **Error Display**: Ensure error alerts display correctly when the error state is set (both on login and signup).
- **Form Field Touch Detection**: Ensure the submit button becomes enabled only when fields are touched and contain valid input.

### 3. Navigation
- **Protected Routes**: Ensure unauthenticated users attempting to access protected routes are redirected to the login page.
- **Navigation Post-Login**: Verify that the user is redirected to the homepage containing welcome message after a successful login.
- **Redirect on Signup Success**: Check that the user is redirected to the homepage containing welcome message after a successful signup.
- **URL Parameter Handling**: Test if URL parameters (e.g., email) are correctly parsed and applied on the login page.

### 4. User Feedback
- **Error Messages**: Display user-friendly error messages for login/signup failures, server issues, or validation errors.
- **Loading Indicators**: Show loading states when API calls are in progress to improve user experience.

### 5. UI & Usability
- **Responsive Design**: Ensure the application layout adjusts for different screen sizes (mobile, tablet, desktop).
- **Button & Link States**: Verify hover, active, and disabled states for buttons and links.
- **Form Accessibility**: Ensure forms are accessible with keyboard navigation, screen readers, and provide ARIA labels where needed.

## Backend Use Cases (API and Integration Testing)

### 1. Authentication API
- **Login Success**: User provides valid credentials, receives a success response and a token.
- **Login Failure (Invalid Credentials)**: API returns an error if credentials are incorrect.
- **Signup Success**: User provides valid signup details and receives a success response.
- **Signup Failure (Validation)**: API returns appropriate error messages if required fields are missing or validation fails.
- **Token Generation**: Verify tokens are generated and contain correct user information for successful logins.
- **Token Expiration & Refresh**: Verify token expiration handling and, if applicable, ensure refresh tokens work.

### 2. Authorization
- **Protected Endpoints**: Ensure endpoints that require authentication reject requests without a valid token. (not applicable as there are no such endpoints for this assignment)
- **Token Validation**: Verify that expired or invalid tokens are rejected with appropriate error messages.

### 3. Error Handling
- **Invalid Input**: Ensure endpoints return validation errors for invalid inputs (e.g., incorrect email format, password requirements).
- **Rate Limiting**: Test rate limiting on endpoints like login to prevent brute-force attacks.

### 4. Database Interaction
- **User Creation**: Verify that a new user is added to the database upon a successful signup.
- **Duplicate User Check**: Ensure duplicate emails are not allowed, and an appropriate error is returned.
- **User Authentication**: Verify that only registered users with correct credentials can log in.


## Integration Testing (End-to-End)

### 1. Signup to Login Flow
- Complete the signup process, log out, and attempt login with the new credentials to verify the entire flow works end-to-end.

### 2. Login and Access Protected Route
- Login successfully, then access a protected route to verify proper redirection and authorization handling.

### 3. Error Flow for Invalid Login
- Attempt login with invalid credentials, then re-attempt with valid ones to ensure errors don’t persist across attempts.

### 4. Token Expiration
- Simulate token expiration (if possible) and verify that the user is logged out or asked to log in again.
