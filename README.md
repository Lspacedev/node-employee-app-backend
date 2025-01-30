# MERN Employee App | BACKEND

Node Express Employee API that allows users to add and manage employees.

### Employee App | Frontend

[https://github.com/Lspacedev/node-employee-app](https://github.com/Lspacedev/node-employee-app)

## Prerequisites

- Nodejs
- A Firebase account, follow the link [here](https://firebase.google.com/)

## Installation

1. Clone the repository

```bash
git@github.com:Lspacedev/node-employee-app-backend.git
```

2. Navigate to the project folder

```bash
cd node-employee-app-backend
```

3.  Install all dependencies

```bash
npm install
```

4. Create an env file and add the following:

```bash
BUCKET_URL="Firebase storage bucket url"
*** Store the firebase service account as an JSON Object ***
FIREBASE_SERVICE_ACCOUNT={"type": "service_account","project_id": "your-project-id","private_key_id":"your-private-key-id", }
```

5. Run the project

```bash
node index
```

## Usage

1. The server should run on PORT 8000, unless a port is specified.
2. Use http://localhost:8000, to test the API on Postman or any other tool.

## Routes:

API is built using a Node Express server, with Firebase as a database.
API uses session cookies to authenticate users.

#### Index Router:

- Login to an admin account.
- Get all admins.
- Add admins.
- Logout

Endpoints

```python
    1. POST /login
            Inputs: idToken


    2. GET /admins
    3. POST /admins
            Inputs: email, password

    4. POST /logout

```

#### Employees Router:

- Get all employees.
- Get individual employee.
- Add employee.
- Update employee.
- Delete employee.

Endpoints

```python
    1. POST /employees
        Inputs:  name, surname, id, email, department, position, phone, date, pic

    2. PUT /employees/:id
            Params: id
            Inputs:  name, surname, id, email, department, position, phone, date, pic

    3. DELETE /employees/:id
      Params: id

    5. GET /employees
    6. GET /employees/id
        Params: id
```

## Tech Stack

- NodeJs
- Express
- Firebase
