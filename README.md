# My React Vite App

This is a simple React application built using Vite as the build tool. It demonstrates the basic structure of a React app with TypeScript.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/handraromel/trutrip-engineering-technical-test
   cd trutrip-engineering-technical-test
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm start
   ```

4. **Open your browser:**

   Navigate to `http://localhost:3123/` to see your app in action.

5. **API Collection:**

   Fetch users (GET)

   ```bash
   https://68975669250b078c20419f42.mockapi.io/tru-trip-test/api/v1/users
   ```

   Fetch user by id (GET)

   ```bash
   https://68975669250b078c20419f42.mockapi.io/tru-trip-test/api/v1/users/:id
   ```

   Create user (POST)

   ```bash
   https://68975669250b078c20419f42.mockapi.io/tru-trip-test/api/v1/users
   ```

   Payload

   ```bash
   {
    "name": "User1",
    "origin": "Indonesia"
   }
   ```

   Edit user (PUT)

   ```bash
   https://68975669250b078c20419f42.mockapi.io/tru-trip-test/api/v1/users/:id
   ```

   Payload

   ```bash
   {
    "name": "User1",
    "origin": "Indonesia"
   }
   ```

   Delete user (DELETE)

   ```bash
   https://68975669250b078c20419f42.mockapi.io/tru-trip-test/api/v1/users/:id
   ```

   A Postman collection also included within repository.
