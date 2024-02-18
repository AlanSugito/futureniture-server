## AUTH

BASE_URL = {domain}/users/auth

### POST

Endpoint: /login

body:

```json
{
  "data": {
    "email": "test@mail.com",
    "password": "password123"
  }
}
```

response:

```json
{
  "message": "Successfully login",
  "data": {
    "accessToken": "token"
  }
}
```

error:

```json
{
  "message": "Password is not valid!"
}
```

##

Endpoint: /register

body:

```json
{
  "data": {
    "full_name": "name",
    "phone": "0823xxx",
    "address": "address",
    "email": "password",
    "password": "passwordxxx"
  }
}
```

response:

```json
{
  "message": "Successfully registered!"
}
```

error:

```json
{
  "message": "Email is not valid"
}
```
