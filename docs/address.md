# Address API Specification

## Create Address API

Endpoint : POST /api/contacts/:id/address

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
    "errors" : "country is required"
}
```

## Update Address API

Endpoint : POST /api/contacts/:id/address

Headers :

- Authorezation : token

Request Body :

```json
{}
```

Response Body Success :

```json
{}
```

Response Body Error :

```json
{}
```

## Get Address API

Endpoint : POST /api/contacts/:id/address

Headers :

- Authorezation : token

Request Body :

```json
{}
```

Response Body Success :

```json
{}
```

Response Body Error :

```json
{}
```

## List Address API

Endpoint : POST /api/contacts/:id/address

Headers :

- Authorezation : token

Request Body :

```json
{}
```

Response Body Success :

```json
{}
```

Response Body Error :

```json
{}
```

## Remove Address API

Endpoint : POST /api/contacts/:id/address

Headers :

- Authorezation : token

Request Body :

```json
{}
```

Response Body Success :

```json
{}
```

Response Body Error :

```json
{}
```
