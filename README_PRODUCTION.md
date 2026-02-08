# RomanticaHQ Production Checklist

## Required env
- `JWT_SECRET` (base64 64 bytes)
- `APP_PUBLIC_URL` (https://romanticahq.com)
- `NEXT_PUBLIC_API_BASE_URL` (https://romanticahq.com)
- `MAIL_*` values for SMTP

## Run in production
1. `docker compose pull`
2. `docker compose build --no-cache`
3. `docker compose up -d`

## Verify
- `GET /api/health`
- Register user → verify email → login

## Notes
- Flyway runs on startup and creates tables.
- JPA ddl-auto is `validate` by default in production.
- Rate limiting is enabled at both Nginx and app layers.
