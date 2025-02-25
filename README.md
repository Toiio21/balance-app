
# Тестовое задание

Простое webApp, используя Node.js (Express, JavaScript), PostgresQL (Sequelize ORM).



Запуск приложения

```bash
  node app.js

```

Запрос для проверки /balance

```bash
  curl -X PUT -H "Content-Type: application/json" -d '{"userId": 1, "amount": -2}' http://localhost:3000/balance
```

Ожидаемый ответ:

```json
  {"balance": 9998}
```

Для проверки использовал Artillery, файл для тестирования в проекте

```bash
artillery run load-test.yml
```

