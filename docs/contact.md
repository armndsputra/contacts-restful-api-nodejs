# Contact API Specification

## Create Contact API

Endpoint : POST /api/contacts

Headers :

- Authorization : token

Request Body :

```json
{
	"first_name": "april",
	"last_name": "de jong",
	"email": "april@gmail.com",
	"phone": "44532"
}
```

Response Body Success :

```json
{
	"data": {
		"id": 1,
		"first_name": "april",
		"last_name": "de jong",
		"email": "april@gmail.com",
		"phone": "44532"
	}
}
```

Response Body Error :

```json
{
	"errors": "Email is not valid format"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Headers :

- Authorization : token

Request Body :

```json
{
	"first_name": "april",
	"last_name": "de jong",
	"email": "april@gmail.com",
	"phone": "556743"
}
```

Response Body Success :

```json
{
	"data": {
		"id": 1,
		"first_name": "april",
		"last_name": "de jong",
		"email": "april@gmail.com",
		"phone": "556743"
	}
}
```

Response Body Error :

```json
{
	"errors": "Email is not valid format"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
	"data": {
		"id": 1,
		"first_name": "april",
		"last_name": "de jong",
		"email": "april@gmail.com",
		"phone": "556743"
	}
}
```

Response Body Error :

```json
{
	"errors": "Contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers :

- Authorization : token

Query Params :

- name : search by first_name & last_name using like, optional
- email : search by email, using like, optional
- phone : search by phone, using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
	"data": [
		{
			"id": 1,
			"first_name": "april",
			"last_name": "de jong",
			"email": "april@gmail.com",
			"phone": "556743"
		},
		{
			"id": 2,
			"first_name": "april",
			"last_name": "de jong",
			"email": "april@gmail.com",
			"phone": "556743"
		}
	],
	"paging": {
		"page": 1,
		"total_page": 3,
		"total_items": 30
	}
}
```

## Remove Contact API

Endpoint : DELETE /api/contacts/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
	"data": "OK"
}
```

Response Body Error :

```json
{
	"Errors": "contact is not found"
}
```
