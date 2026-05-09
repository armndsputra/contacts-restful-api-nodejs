# Address API Specification

## Create Address API

Endpoint : POST /api/contacts/:contactId/address

Headers :

- Authorezation : token

Request Body :

```json
{
	"street": "JL mawar no 45",
	"city": "Sleman",
	"province": "Yogyakarta",
    "country" : "indonesia"
	"postal_code": "5567"
}
```

Response Body Success :

```json
{
	"data": {
        "id" : 1,
		"street": "JL mawar no 45",
		"city": "Sleman",
		"province": "Yogyakarta",
        "country" : "indonesia"
		"postal_code": "5567"
	}
}
```

Response Body Error :

```json
{
	"errors": "country is required"
}
```

## Update Address API

Endpoint : PUT /api/contacts/:contactId/address/:addressId

Headers :

- Authorezation : token

Request Body :

```json
{
	"street": "JL mawar no 45",
	"city": "Sleman",
	"province": "Yogyakarta",
    "country" : "indonesia"
	"postal_code": "5567"
}
```

Response Body Success :

```json
{
	"data": {
		"id": 1,
		"street": "JL mawar no 45",
		"city": "Sleman",
		"province": "Yogyakarta",
		"country": "indonesia",
		"postal_code": "5567"
	}
}
```

Response Body Error :

```json
{
	"errors": "country is required"
}
```

## Get Address API

Endpoint : GET /api/contacts/:contactId/address/:addressId

Headers :

- Authorezation : token

Response Body Success :

```json
{
	"data": {
		"id": 1,
		"street": "JL mawar no 45",
		"city": "Sleman",
		"province": "Yogyakarta",
		"country": "indonesia",
		"postal_code": "5567"
	}
}
```

Response Body Error :

```json
{
	"errors": "contact is not found"
}
```

## List Address API

Endpoint : GET /api/contacts/:contactId/address

Headers :

- Authorezation : token

Response Body Success :

```json
{
	"data": [
		{
			"id": 1,
			"street": "JL mawar no 45",
			"city": "Sleman",
			"province": "Yogyakarta",
			"country": "indonesia",
			"postal_code": "5567"
		},
		{
			"id": 2,
			"street": "JL mawar no 45",
			"city": "Sleman",
			"province": "Yogyakarta",
			"country": "indonesia",
			"postal_code": "5567"
		}
	]
}
```

Response Body Error :

```json
{
    "errors" : "contact is not found"
}
```

## Remove Address API

Endpoint : DELETE /api/contacts/:contactId/address/:addressId

Headers :

- Authorezation : token



Response Body Success :

```json
{
    "data" : "OK"
}
```

Response Body Error :

```json
{
    "errors" : "contact is not found"
}
```
