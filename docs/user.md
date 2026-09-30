# User API Specification

## Register User API

- **Endpoint** : `POST /api/register`

### Register User Request Body

```json
{
 "name": "adipati suryanegara", // required
 "username": "adipati", // required
 "password": "rahasia", // required
}
```

### Register User Response Body Success

```json
{
 "data": {
  "username": "adipati",
  "name": "adipati suryanagara"
 }
}
```

### Register User API Response Body Error

```json
{
 "errors": "Username alrady registered"
}
```

## Login User API

- **Endpoint** : `POST /api/login`

### Login User Request Body

```json
{
  "username": "adipati",
  "password": "rahasia"
}
```

### Login User Response Body Success

```json
{
  "data": {
   "token": "unique-token"
  }
}
```

### Login User API Response Body Error

```json
{
  "errors": "Username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current
Header :

- Authorization : token

Request Body :

```json
{
	"name": "april de jong", // optional
	"password": "rahasia" // optional
}
```

Response Body Success :

```json
{
	"data": {
		"name": "april de jong"
	}
}
```

Update User API Response Body Error :

```json
{
	"errors": "Name length max 500"
}
```

## Get User API

Endpoint : GET /api/users/current
Header :

- Authorization : token

Response Body Success :

```json
{
	"data": {
		"username": "aprilmop",
		"name": "april de jong"
	}
}
```

Get User API Response Body Error :

```json
{
	"errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout
Header :

- Authorization : token

Response Body Success :

```json
{
	"data": "OK"
}
```

Logout User API Response Body Error :

```json
{
	"errors": "Unauthorized"
}
```
