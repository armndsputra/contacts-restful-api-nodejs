# User API Specification

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
	"username": "aprilmop",
	"password": "rahasia",
	"name": "april de jong"
}
```

Response Body Success :

```json
{
	"data": {
		"username": "aprilmop",
		"name": "april de jong"
	}
}
```

Response Body Error :

```json
{
	"errors": "Username alrady registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
	"username": "aplilmop",
	"password": "rahasia"
}
```

Response Body Success :

```json
{
	"data": {
		"token": "unique-token"
	}
}
```

Response Body Error :

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

Response Body Error :

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

Response Body Error :

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
    "data" : "OK"
}
```

Response Body Error : 
```json
{
    "errors" : "Unauthorized"
}
```
