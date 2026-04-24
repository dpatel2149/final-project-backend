# Bruno API Testing

Base URL:
http://localhost:5000

This folder documents the API requests for testing the backend through Bruno.

## Auth

### Register
POST /api/auth/register

Body:
```json
{
  "name": "Tirth",
  "email": "tirth@example.com",
  "password": "123456"
}
