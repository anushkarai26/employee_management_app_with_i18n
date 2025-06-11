#  Employee Database Management App with Internationalization (i18n)

## Features

- **Role-Based Access Control (RBAC):**
  - Admins: Full access to create, read, update employee data
  - Regular Users: Can only view homepage and their profile
  - Unauthenticated users: Redirected to login page

-  **Internationalization (i18n)**:
  - Supports English (default), French, and Dutch
  - Switch language dynamically using frontend buttons
  - Angular `@angular/localize` based multi-locale architecture

- **CRUD Operations** for Employee Records:
  - Add new employees with full form validation
  - Update and delete existing employees
  - View full employee list in a structured table

- **Responsive UI with Angular 18**:
  - Built using Bootstrap 5
  - Component-driven structure with real-time data updates

- **RESTful APIs with Node.js + Express**:
  - Secure API endpoints with user authentication
  - JWT-based protected routes

- **MongoDB Database**:
  - Schema-less employee & user models
  - Flexible and horizontally scalable

---

## Technologies Used

| Layer      | Tools/Frameworks                        |
|------------|------------------------------------------|
| Frontend   | Angular 18, Bootstrap 5, i18n, RxJS       |
| Backend    | Node.js, Express.js, Passport.js         |
| Database   | MongoDB (NoSQL)                          |
| Testing    | Postman (API Testing), Manual UI Testing |
| Security   | JWT Tokens, Role Guards, Angular AuthGuard |

---

## Internationalization (i18n)

The application supports English (default), French, and Dutch using Angular's built-in i18n system.

**Key steps followed:**

- Tagged UI text for translation
- Generated and translated message files (`xlf`)
- Added build configurations for each language
- Included language switch buttons for dynamic locale changes
- Built and tested locale-specific versions (e.g., `npm run start:fr` for French)

![eng](https://github.com/user-attachments/assets/e3c53fd2-c8d4-470f-aedc-ab75dd3aa0bf)

![image](https://github.com/user-attachments/assets/f1256dc1-5bde-4c11-a712-e284225edd04)

![image](https://github.com/user-attachments/assets/0f17bd0c-09c0-44b1-ae35-4d2084c45913)




---

##  User Roles & Access Control

| **Role**     | **Homepage** | **Add/Edit Employees** | **Profile Access** | **Admin Panel** | **Authentication Required** |
|--------------|--------------|-------------------------|--------------------|-----------------|------------------------------|
| **Admin**    | ✅            | ✅                       | ✅                  | ✅               | Yes                          |
| **User**     | ✅            | ❌                       | ✅                  | ❌               | Yes                          |
| **Guest**    | ❌ (Redirected to login) | ❌       | ❌                  | ❌               | No                           |

---

##  Security Highlights

- **JWT-based Authentication**: Secures all API endpoints
- **Hashed Passwords**: Stored securely using `bcrypt`
- **Angular Route Protection**: AuthGuard ensures only authorized users can access routes
- **Role-Based API Access**: Prevents unauthorized operations at backend level
- **Session Handling**: Tokens expire and are stored in local storage

---

## 👩🏻‍💻 Author

**Anushka Rai**  
  
