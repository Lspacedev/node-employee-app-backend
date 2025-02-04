# Employee App | Backend - Part One

Node Express Employee API that allows users to add and manage employees.

### Employee App | Frontend - Part One

[https://github.com/Lspacedev/node-employee-app/tree/part_one](https://github.com/Lspacedev/node-employee-app/tree/part_one)

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

3. Navigate to the git branch

```bash
git checkout part_one

```

3.  Install all dependencies

```bash
npm install
```

4. Create an env file and add the following:

```bash
BUCKET_URL="Firebase storage bucket url"

```

5. Create tmp folder.

6. Add a Firebase service account file as: serviceAccount.json

7. Run the project

```bash
node app
```

## Usage

1. The server should run on PORT 8000, unless a port is specified.
2. Use http://localhost:8000, to test the API on Postman or any other tool.

## Routes:

API is built using a Node Express server, with Firebase as a database.
API uses session cookies to authenticate users.

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
