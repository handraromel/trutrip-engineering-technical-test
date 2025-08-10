# TruTrip Technical Assessment

This is a React application for TruTrip technical assessment. Built using Vite as the build tool.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/handraromel/trutrip-engineering-technical-test
   ```

   ```bash
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

5. **API Collection (Using [mockapi.io](https://mockapi.io) service):**

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

   A Postman collection also included within repository https://github.com/handraromel/trutrip-engineering-technical-test/blob/main/TruTripTest.postman_collection.json.

6. **Running Test Case:**
   Current test cases are available within the hooks for useModal and useUsers query.
   To verbosely run test case for each hook file:

   useUsers query:

   ```bash
   npm test -- --testPathPatterns=useUsers.test.ts
   ```

   useModal:

   ```bash
   npm test -- --testPathPatterns=useModal.test.ts
   ```
