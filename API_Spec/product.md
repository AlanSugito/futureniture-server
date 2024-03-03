# PRODUCT API

## GET

endpoint: /:category

response:

```json
{
  "message": "Success",
  "data": [
    {
      "name": "product1",
      "price": 100000,
      "quality": 5,
      "img_url": "product.png",
      "short_desc": "lorem ipsum"
    }
  ]
}
```

endpoint: /search

query params:

```js
{
  "search": string
}
```

response:

```json
{
  "message": "Success",
  "data": [
    {
      "name": "product1",
      "price": 100000,
      "quality": 5,
      "img_url": "product.png",
      "short_desc": "lorem ipsum"
    }
  ]
}
```

endpoint: /:productId

response:

```json
{
  "message": "Success",
  "data": {
    "name": "product1",
    "price": 100000,
    "quality": 5,
    "img_url": "product.png",
    "short_desc": "lorem ipsum",
    "description": "lorem ipsum dolor sit amet",
    "id": "1",
    "colors": [{"name": "red"}, {"name": "green"}, {"name": "blue"}]
  }
}
```
