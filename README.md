# api-response-wrapper

[![npm version](https://img.shields.io/npm/v/api-response-wrapper)](https://www.npmjs.com/package/api-response-wrapper)
[![npm downloads](https://img.shields.io/npm/dw/api-response-wrapper)](https://www.npmjs.com/package/api-response-wrapper)
[![GitHub license](https://img.shields.io/github/license/Trithanka/api-response-wrapper)](https://github.com/Trithanka/api-response-wrapper/blob/main/LICENSE)
[![Build](https://github.com/Trithanka/api-response-wrapper/actions/workflows/node.js.yml/badge.svg)](https://github.com/Trithanka/api-response-wrapper/actions)

A lightweight and flexible Node.js utility for standardizing API responses — works seamlessly with Express and in service layers.

---

## 🚀 Features

- ✅ Clean, consistent API responses
- ✅ Works **with or without Express** `res` object
- ✅ No dependencies
- ✅ Developer-friendly API
- ✅ Supports future extensibility (logging, i18n, etc.)

---

## 📦 Installation

```bash
npm install api-response-wrapper
```

---

## 🔧 Usage

### ✅ In Express

```js
const resHandler = require('api-response-wrapper');

app.get('/api/user', (req, res) => {
  const user = { id: 1, name: 'Trithanka' };
  return resHandler.success(res, 'User fetched successfully', user);
});
```

### ✅ In Service/Logic Layer

```js
const resHandler = require('api-response-wrapper');

function getUserData() {
  const user = { id: 1, name: 'Trithanka' };
  return resHandler.success('User fetched successfully', user);
}
```

---

## 🧾 Response Format

```json
{
  "success": true,
  "message": "User fetched successfully",
  "data": {
    "id": 1,
    "name": "Trithanka"
  },
  "statusCode": 200
}
```

---

## 📘 API Methods

| Method             | Description                              |
|--------------------|------------------------------------------|
| `success(...)`     | Send or return a `200` success response  |
| `error(...)`       | Return a `400` bad request               |
| `unauthorized(...)`| Return a `401` unauthorized              |
| `forbidden(...)`   | Return a `403` forbidden                 |
| `serverError(...)` | Return a `500` internal server error     |
| `schema()`         | Get response object schema definition    |

---

## ✨ Example

```js
// With res
resHandler.error(res, 'Invalid ID');

// Without res
const response = resHandler.error('Invalid ID');
console.log(response);
/*
{
  success: false,
  message: 'Invalid ID',
  data: null,
  statusCode: 400
}
*/
```

---

## 📄 License

MIT © [Trithanka](https://github.com/Trithanka)
