# Docker для разработки: быстрый сетап без лишнего

## Базовый Dockerfile

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
CMD ["npm", "run", "dev"]
```

## Быстрые советы

### Используй кеш слоёв

Копируй `package*.json` отдельно — так `npm ci` кешируется.

## Заключение

Сделай простой Docker-скелет и улучшай его по мере роста проекта.


