# ToDoAPI

The ToDoAPI is a RESTful API built with Express.js and MongoDB, providing secure authentication, role-based access control, and robust task management capabilities. It allows users to create, update, and delete to-do lists and individual tasks, with role-specific functionalities for admins and superadmins.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Getting Started](#getting-started)
   -  [Prerequisites](#prerequisites)
   -  [Installation](#installation)
4. [Usage](#usage)
   -  [Authentication](#authentication)
   -  [User Profiles](#user-profiles)
   -  [To-Do Lists](#to-do-lists)
   -  [Admin and SuperAdmin](#admin-and-superadmin)
5. [Routes](#routes)
6. [Error Handling](#error-handling)
7. [Testing](#testing)
8. [Documentation](#documentation)
9. [Contributing](#contributing)
10.   [License](#license)

## Introduction

The ToDoAPI is designed to facilitate task management for users with different roles. It includes user authentication, role-based access control (RBAC), and CRUD operations for both to-do lists and individual tasks.

## Features

-  User registration and login with JWT authentication
-  Role-based access control (User, Admin, SuperAdmin)
-  CRUD operations for user profiles
-  Create, update, and delete to-do lists
-  Manage individual tasks within a list
-  Admin and SuperAdmin functionalities

## Getting Started

### Prerequisites

Before running the ToDoAPI, ensure you have the following installed:

-  Node.js
-  MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/m-ehab2/ToDoAPI.git
```

2. Navigate to the project directory:

```bash
cd ToDoAPI
```

3. Install dependencies:

```bash
npm install
```

## Usage

### Authentication

-  Use the `/register` and `/login` routes for user registration and login.
-  Include the JWT token received upon login in the Authorization header for authenticated routes.

### User Profiles

-  Access and update user profiles using the `/profile` route.

### To-Do Lists

-  Create, update, and delete to-do lists using the `/list` route.
-  Manage individual tasks within a list using nested routes under `/list/:listId/todos`.

### Admin and SuperAdmin

-  Access admin functionalities using the `/Dashboard` route (requires Admin or SuperAdmin role).
-  SuperAdmins can perform additional tasks through the `/SuperBoard` route.

## Routes

-  **Authentication Routes:**

   -  `/register` (POST): User registration.
   -  `/login` (POST): User login.

-  **User Routes:**

   -  `/profile` (GET, PUT): Access and update user profiles.

-  **To-Do List Routes:**

   -  `/list` (POST): Create a new to-do list.
   -  `/list/:listId` (GET, PUT, DELETE): Access and manage individual to-do lists.

-  **To-Do Routes (Within a List):**

   -  `/list/:listId/todos` (GET): Get all to-dos in a list.
   -  `/list/:listId/todos/:todoId` (GET, PUT, DELETE): Access and manage individual to-dos within a list.

-  **Admin and SuperAdmin Routes:**
   -  `/Dashboard` (GET): Access admin functionalities (requires Admin or SuperAdmin role).
   -  `/SuperBoard` (GET): Access SuperAdmin functionalities.

## Error Handling

The API includes comprehensive error handling for various scenarios. Common HTTP error codes are used, along with detailed error messages in the response.

## Testing

The project includes unit tests for critical functions and integration tests for API routes. Ensure to run tests to verify the correctness of the implementation.

## Documentation

For detailed API documentation, refer to the provided code comments, API routes, and the [Postman collection](link_to_postman_collection).

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
